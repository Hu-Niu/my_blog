const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')
const generateUuid = require('../utils/generateUuid')
const fileDao = require('../dao/file')
const fileSortDao = require('../dao/fileSort')

const {baseUrl}  =require('../constant/config')


// 递归创建嵌套目录 同步创建
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}

/**
 * 处理查询出来文件的数据格式
 * 按照日期分组
 * @param fileList
 * @return {*}
 */
function handleFileData(fileList) {
    return fileList.reduce((prev, current) => {

        let file = {
            fileId: current.uid,
            fileUrl: `${baseUrl}/upload/${current.file_suffix}/${current.create_time.split(' ')[0]}/${current.file_current_name}`,
            fileName: current.file_original_name,
            fileMarkDown: '',
        }

        let findIndex = prev.findIndex(item => item.uploadTime.split(' ')[0] === current.create_time.split(' ')[0])

        // 没找到，说明不是同一天上传的文件，另起炉灶，新push一条数据到数组中
        if (findIndex === -1) {
            let tempObj = {
                uploadTime: current.create_time.split(' ')[0],
                files: [file]
            }
            prev.push(tempObj)
        } else { // 找到了，说明是同一天的数据，push到当天数据的files字段里
            prev[findIndex].files.push(file)
        }
        return prev

    }, [])
}


const uploadFile = async (files, fileExtraData) => {
    // 递归创建文件夹，不存在就创建
    let resultPathArr = []

    /**
     * 判断传过来的有没有fileSortUid、fileSortName、如果没有就去t_file_sort表中查找有没有uid为-1的文件分类
     * 规定，如果没有传分类，就去数据库建一个分类
     */

    const findResultSort = await fileSortDao.queryFileSortBySortId('-1')
    console.log(findResultSort,'findResultSort')
    if(!findResultSort){ // 没找到就新增一个默认图片分类 uid = '-1'，sort_name = '默认'，order = '-1'
        await fileSortDao.saveFileSort('-1','','默认','-1')
    }

    let fileSortUid = fileExtraData.uid ? fileExtraData.uid : '-1'
    let fileSortName = fileExtraData.sort_name ? fileExtraData.sort_name : '默认'


    console.log('aaaaaaaaaaaaa')
    console.log(fileSortUid,fileSortName)

    for (let file of files) {

        console.log(file, 'file')


        /**
         * 1、首先根据上传的文件后缀，拼接不同的存放路径
         * 例如 public\upload\jpg\20210708\7.jpg
         */
            // 根据文件类型，判断上传的目录，目录格式为 koa-blog-service\public\upload\jpg\20210708\7.jpg
        const suffix = path.extname(file.name).slice(1) // 获取后缀，拼接路径，把第一个.去掉
        const nowDate = dayjs().format('YYYY-MM-DD') // 当天的时间 20210708
        const myPath = `upload/${suffix}/${nowDate}` // 上传的文件夹目录，为了待会回显数据地址用
        const uploadPath = path.resolve(__dirname, `../../public`, myPath) // 拼接文件上传的目录，不包含文件名
        let uid = generateUuid() // 随机生成uid，作为文件名
        const finalFileName = `${uid}.${suffix}` // 文件上传到服务器最终的文件名，防止重复
        const filePath = path.resolve(uploadPath, finalFileName) // 上传后的文件全路径 koa-blog-service\public\upload\jpg\20210708\7.jpg

        /**
         * 2、判断文件夹是否存在，不存在的话就递归创建嵌套的文件夹
         */
        // 判断文件夹是否存在 不存在就先创建
        await mkdirsSync(uploadPath)

        /**
         * 3、开始创建可读流和可写流，上传文件到对应的文件目录中
         */
            // 创建可读流
        const reader = fs.createReadStream(file.path)
        // 创建可写流
        const upStream = fs.createWriteStream(filePath)
        // 可读流通过管道写入可写流
        reader.pipe(upStream);

        /**
         * 4、将文件信息存储到数据库
         */
        await fileDao.saveFile(uid, file.name, finalFileName, suffix, fileSortUid, fileSortName)


        /**
         * 5、将生成的服务器路径存到数组中，返回给前台
         */
        resultPathArr.push({
            name: file.name,
            url: `${baseUrl}/${myPath}/${finalFileName}`,
        })
    }
    return resultPathArr
}

const queryAllFileSort = async () => {
    return await fileDao.queryAllFileSort()
}

const queryAllFilePage = async (currentPage, pageSize, fileSortId, createTime) => {
    let result = await fileDao.queryAllFilePage(currentPage, pageSize, fileSortId, createTime)
    // 处理数据
    return handleFileData(result)
}
const queryAllFile = async (fileSortId, createTime) => {
    let result = await fileDao.queryAllFile(fileSortId, createTime)
    // 处理数据
    return handleFileData(result)
}



const queryAllFileCount = async (fileSortId, createTime) => {
    return await fileDao.queryAllFileCount(fileSortId, createTime)
}

const deleteFileByUid = async uids => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(fileDao.deleteFileByUid(uid))
    }
    return await Promise.all(promiseArr)
}

const updateFileSortByUid = async (fileIds, sortId) => {
    // 根据sortId查询名字
    let {sort_name} = await fileSortDao.queryFileSortBySortId(sortId)
    let promiseArr = []
    for (const fileId of fileIds) {
        promiseArr.push(fileDao.updateFileSortByUid(fileId, sortId, sort_name))
    }
    await Promise.all(promiseArr)
    return true
}


module.exports = {
    uploadFile,
    queryAllFileSort,
    queryAllFilePage,
    queryAllFileCount,
    deleteFileByUid,
    updateFileSortByUid,
    queryAllFile,
}
