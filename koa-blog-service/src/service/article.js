const articleDao = require('../dao/article')
const {dealTableData} = require('../utils/toolsFunction')
const dayjs = require('dayjs')
// html -> md
const TurndownService = require('turndown')

// 文件打包 https://stuk.github.io/jszip/
const JSZip = require("jszip");

const queryArticleByBlogTitle = async (blogTitle) => {
    return await articleDao.queryArticleByBlogTitle(blogTitle)
}

const queryArticleByUid = async (uid) => {
    return await articleDao.queryArticleByUid(uid)
}
const updateArticleClicksByUid = async (uid) => {
    return await articleDao.updateArticleClicksByUid(uid)
}

const queryArticleByUid2 = async (uid) => {
    const data = await articleDao.queryArticleByUid2(uid)
    /**
     * 处理数据，tag有多个，拼接成数组
     */

    let result = dealTableData(['blog_tag_id', 'tag_name'], data, 'blog_tags')

    return result
}



const queryArticleTagIdsByArticleUid = async (uid) => {
    return await articleDao.queryArticleTagIdsByArticleUid(uid)
}

const saveArticle = async (params) => {
    /**
     * 1、先插入文章
     * 2、再插入文章标签到数据库中
     */
    let {blogTagIds, uid, updateTime} = params

    await articleDao.saveArticle(params)

    if (blogTagIds && blogTagIds.length > 0) {
        let promiseArr = []
        for (const blogTagId of blogTagIds) {
            promiseArr.push(articleDao.saveArticleTag(uid, blogTagId, updateTime))
        }
        await Promise.all(promiseArr)
    }
    return true
}

const queryAllCountArticle = async (params) => {
    const data = await articleDao.queryAllCountArticle(params)
    /**
     * 处理数据，tag有多个，拼接成数组
     */

    let result = dealTableData(['blog_tag_id', 'tag_name'], data, 'blog_tags')

    // 如果有tag 就再筛选一次
    const {blogTag} = params

    if (blogTag) {
        let result2 = []
        result.map(item => {
            item.blog_tags.map(tag => {
                if (tag.blog_tag_id === blogTag) {
                    result2.push(item)
                }
            })
        })

        return result2.length
    }

    return result.length

}

const queryArticlePage = async (params) => {
    const data = await articleDao.queryArticlePage(params)
    /**
     * 处理数据，tag有多个，拼接成数组
     */

    let result = dealTableData(['blog_tag_id', 'tag_name'], data, 'blog_tags')

    // 如果有tag 就再筛选一次
    const {blogTag} = params

    if (blogTag) {
        let result2 = []
        result.map(item => {
            item.blog_tags.map(tag => {
                if (tag.blog_tag_id === blogTag) {
                    result2.push(item)
                }
            })
        })

        return result2
    }

    return result
}

const queryArticleAll2 = async (params) => {
    const data = await articleDao.queryArticleAll2(params)
    /**
     * 处理数据，tag有多个，拼接成数组
     */

    let result = dealTableData(['blog_tag_id', 'tag_name'], data, 'blog_tags')


    // 如果有tag 就再筛选一次
    const {blogTag} = params

    if (blogTag) {
        let result2 = []
        result.map(item => {
            item.blog_tags.map(tag => {
                if (tag.blog_tag_id === blogTag) {
                    result2.push(item)
                }
            })
        })

        return result2
    }

    return result
}




const queryHotArticlePage = async (params) => {
    return await articleDao.queryHotArticlePage(params)
}

const updateArticleByUid = async (params) => {
    /**
     * 1、根据博客uid更新数据
     * 2、比对博客标签，如果一样，不插入新标签，如果不同，删除之前标签，重新插入
     */
    await articleDao.updateArticleByUid(params)

    const {uid, blogTagIds, updateTime} = params
    const findIds = await queryArticleTagIdsByArticleUid(uid)
    // 比较 标签是否一致，如果一致说明没有变更，就不更新了，如果不一致。就先删除原来的，再重新添加新的
    const flag = areTheTagsConsistent(findIds, blogTagIds)
    if (!flag) { // 如果不一致 删除原先的标签
        if (findIds.length > 0) {
            await articleDao.deleteArticleTagByArticleUid(uid)
        }

        if (blogTagIds.length > 0) { // 如果此时有新添加的标签 新增进去
            for (const blogTagId of blogTagIds) {
                await articleDao.saveArticleTag(uid, blogTagId, updateTime)
            }
        }
    }
    return true
}


function areTheTagsConsistent(findIds, blogTagIds) {

    const originalTagIds = findIds.reduce((prev, current) => {
        prev.push(current.blog_tag_id)
        return prev
    }, [])

    return originalTagIds.sort().toString() === blogTagIds.sort().toString()
}


const deleteArticleByUid = async (uids) => {

    let promiseArr = []

    for (const uid of uids) {
        promiseArr.push(articleDao.deleteArticleByUid(uid))
    }

    return await Promise.all(promiseArr)
}

const queryArticleByRecommendLevel = async (recommendLevel) => {
    return articleDao.queryArticleByRecommendLevel(recommendLevel)
}

const exportArticle = async (uids) => {
    /**
     * 1、根据uid 查出所有文章的内容
     * 2、获取html->md对象
     * 3、获取jszip对象，待会好打成二进制的zip包，返回给前台
     * 4、将html文本转换为md文本，然后打包
     * 5、返回最终打包好的二进制zip文件
     */

    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(articleDao.queryArticleByUid(uid))
    }

    // 1、根据uid 查出所有文章的内容 mysql 不支持in查询，所以一个一个查，用promise.all获得最后的结果，保证所有数据都查寻完毕
    const findAllResult = await Promise.all(promiseArr)

    // 2、获取html->md对象
    const turndownService = new TurndownService({
        headingStyle: 'atx',
    })
    // 3、获取jszip对象，待会好打成二进制的zip包，返回给前台
    const zip = new JSZip()
    const folder = zip.folder(dayjs().format('YYYY-MM-DD HH-mm-ss')) // zip包里塞一个文件夹，不让文件裸奔

    // 4、将html文本转换为md文本，然后打包
    findAllResult.map(item => {
        const mdContent = turndownService.turndown(item.blog_content)
        folder.file(`${item.blog_title}.md`, mdContent) // 文件以 .md 结尾
    })

    // 5、返回最终打包好的二进制zip文件
    return await zip.generateAsync({type: 'nodebuffer'})

}



const queryArticleAll = async () => {
    return await articleDao.queryArticleAll()
}
const queryAllArticleCreateTimeList = async (isChenyOrXzz) => {
    return await articleDao.queryAllArticleCreateTimeList(isChenyOrXzz)
}


const queryRecommendArticleByRecommendLevel = async (levelId) => {
    return await articleDao.queryRecommendArticleByRecommendLevel(levelId)
}

function convertTxtPictureLink(pictures, txt) {
    const reg = /\!\[(.*)\]\((.*)\)/g
    const picMap = picturesToMap(pictures)
    console.log(picMap,'picMap')

    let newStr = txt.replace(reg, (_, a1, a2) => {
        if(picMap.has(a1)){
            return `![${a1}](${picMap.get(a1)})`
        }else {
            return `![${a1}](${a2})`
        }
    })

    return newStr
}

function picturesToMap(pictures) {
    let picMap = new Map()

    pictures.map(item => {
        picMap.set(item.fileName.replace(/\.\w+$/,''), item.fileUrl)
    })

    return picMap
}


module.exports = {
    saveArticle,
    deleteArticleByUid,
    updateArticleByUid,
    queryArticlePage,
    queryAllCountArticle,
    queryArticleByBlogTitle,
    queryArticleByUid,
    exportArticle,
    queryArticleByRecommendLevel,
    queryArticleAll,
    queryRecommendArticleByRecommendLevel,
    queryHotArticlePage,
    convertTxtPictureLink,
    queryArticleAll2,
    queryAllArticleCreateTimeList,
    queryArticleByUid2,
    updateArticleClicksByUid,
}
