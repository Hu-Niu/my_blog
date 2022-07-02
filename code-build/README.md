# 自定义接口模板

## 数据库创建规则

- 除了中间表，所有数据表主键都是uid，不为空，不设置默认值，由服务端直接生成uid
- 除了uid，所有必填项都必须设置默认值，必填项在服务端会进行不为空校验，`create_time`和`update_time`必填但不设置默认值，由服务端生成
- 所有需要模糊搜索的字段，都需要设置一个默认值
- 表以t_xxx命名，字段以xxx_xxx命名，字段名不能起关键字
- 所有表都需要有create_time,update_time字段，必填项、不设置默认值，varchar类型
- 所有的列都必须有注释，所有的表也必须有注释

## `/router/`

### `article.js`

```js
const Router = require('koa-router') // 引入路由
const articleRouter = new Router()

const articleController = require('../controller/article')

articleRouter.post('/saveArticle', articleController.saveArticle )
articleRouter.post('/deleteArticleByUid', articleController.deleteArticleByUid )
articleRouter.post('/queryArticlePage', articleController.queryArticlePage )
articleRouter.post('/updateArticleByUid', articleController.updateArticleByUid )


module.exports = articleRouter
```

### `index.js`

```js
const Router = require('koa-router') // 引入路由
const router = new Router()

const userRouter = require('./user')
const articleSortRouter = require('./articleSort')
const articleTagRouter = require('./articleTag')
/**
 * 在此处新增该模块引入代码
*/
const articleRouter = require('./article')

router.use('/user', userRouter.routes(), userRouter.allowedMethods())
router.use('/articleSort', articleSortRouter.routes(), articleSortRouter.allowedMethods())
router.use('/articleTag', articleTagRouter.routes(), articleTagRouter.allowedMethods())
/**
 * 在此处新增该模块引入代码
*/
router.use('/article', articleRouter.routes(), articleRouter.allowedMethods())

module.exports = router // 导出router给app.js使用
```

## `/controller/`

### `article.js`

#### `文件头`

```js
const articleService = require('../service/article')
const {
    saveArticleValidator,
    deleteArticleByUidValidator,
    updateArticleByUidValidator,
    queryArticlePageValidator,
} = require('../validation/article')
const resCode = require('../constant/resCode')
/**
 * 获取错误码所属的模块
 *
 * 模式：$保存接口，获取已存在错误码模块$
 * 模式解析方式：从控制台中获得---通过正则解析出原文件resCodeVariable.js中的错误码模块名
 *  （每次创建新模块时候，如果需要，提前创建好所需的错误码），
 *    然后运行npm run add 执行创建代码脚本时，从控制台选择所涉及到的模块错误码，
 *  替换为常量格式字符串
*/
const {ARTICLE, APP} = require('../constant/resCodeVariable')
const generateUuid = require('../utils/generateUuid')
const dayjs = require('dayjs')
```

#### `saveArticle` 新增

```js
/**
 * 分析： 
 * 保存接口，关系到分页查询接口
 * 只要需要条件查询的字段，在保存的时候都不能是null，
 * ( koa中使用mysql包写sql语句传参时，天然存在参数解析问题，不能用 %?% ，不能用in (?) 等 )
 * （ 在模糊查询的时候，得在传递参数的时候把 %param%直接拼接好，然后使用 like ?  ）
 * （ 这就导致了，当在有null值的多条件查询时，写sql语句非常麻烦，得考虑很多参数的有无，无法写一个通用的多条件模糊查询语句 ）
 * （ 而假如，把所有需要条件查询的值，在保存的时候都给一个默认值，即不为null，那么就可以写一个比较通用的sql语句 ）
 *
 *  select * from t_blog
 *  where blog_title like ?
 *  and blog_author_id like ?
 *  and is_original like ?
 *  and blog_sort_id like ?
 *  and recommend_level like ?
 *  and is_open_comment like ?
 *  and blog_status like ?
 *  order by order_num,create_time desc
 *  limit ?,?
 *
 * （ 这样，即便是有的参数没有传，在分页查询的接口接收参数的时候，也可以提前判断出来，为其赋值一个空字符串，然后参数替换后就变成了 ）
 *  select * from t_blog
 *  where blog_title like %哈哈哈%
 *  and blog_author_id like %%
 *  and is_original like %%
 *  and blog_sort_id like %%
 *  and recommend_level like %%
 *  and is_open_comment like %%
 *  and blog_status like %%
 *  order by order_num,create_time desc
 *  limit ?,?
 *
 * （ 这样即便是前台没有传递参数，也可以查询出来期望的结果 ）
 *
 * 所以，在写通用保存接口时，为了解决这个问题，直接把所有需要模糊查询的字段，在保存这条记录的时候，直接就设置一个不是null的默认值
 * 那么， 模式 $保存接口，参数校验参数接收$ ，可以在设计数据库时，勾选 不为null，以此来区分，这些参数是前台必须传递过来的参数，
 * 而 模式 $分页查询接口，未传递参数设置空字符串$，可以在设计数据库时，给所有需要条件查询的字段，设置一个不为null的默认值，以此来区分。
 *
*/



const saveArticle = async ctx => {
    /**
     * 这里把数据库表里的字段都声明出来
     * 除了 uid create_time update_time
     *
     * 这些都是可以从前台接收来的参数
     *
     * 模式：$保存接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid,createTime,updateTime
     */
    let {
        blogTitle, blogSummary, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, order, isOpenComment, blogStatus,
        coverUrl, blogContent, blogTagIds
    } = ctx.request.body

    console.log(ctx.request.body, 'ctx.request.body')
    /**
     * 这里把需要校验的参数传递进去
     * 
     * 模式：$保存接口，参数校验参数接收$
     * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 uid,createTime,updateTime
     * 
     */
    const {errorMsg, isValid} = saveArticleValidator(blogTitle, isOriginal, isOpenComment, blogStatus, blogTagIds)

    /**
     * 为一些参数设置默认值，根据数据表中的默认值设置
     * 
     * 模式：$新增接口，未传递参数设置默认值$
     * 模式解析方式：提取出解析过的数据表中，有默认值的字段，替换为小驼峰格式字符串，排除 uid,createTime,updateTime
     * 
     */
    blogSummary = blogSummary ? blogSummary : ''
    blogSortId = blogSortId ? blogSortId : ''
    recommendLevel = recommendLevel ? recommendLevel : '-1'
    order = order ? order : '0'
    isOpenComment = isOpenComment ? isOpenComment : '2'
    blogStatus = blogStatus ? blogStatus : '2'
    blogContent = blogContent ? blogContent : ''
    blogTagIds = blogTagIds ? blogTagIds : []
    
    // 补充参数
    const uid = generateUuid()
    const createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    /**
     * 封装好处理过的参数
     *
     * 模式：$保存接口，封装处理过的参数$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰变量
     *
     */
    const params = {
        uid, blogTitle, blogSummary, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, order, isOpenComment, blogStatus,
        coverUrl, blogContent, blogTagIds, createTime, updateTime
    }


    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        /**
         * 保存的时候需要校验 是否已经保存过
         * 定义默认根据数据库表中的第二个字段查询（第一个字段是Uid）
         *
         * 模式：$保存接口，根据第二个字段查询是否已经保存过$
         * 模式解析方式：提取出所有解析过的数据表字段，数组第二项的字段值，替换为为大驼峰格式字符串
         *
         */
        let result = await articleService.queryArticleByBlogTitle(blogTitle)
        if (result) { // 已存在，不保存
            /**
             * 获取错误码所属的模块
             *
             * 模式：$保存接口，获取已存在错误码模块$
             * 模式解析方式：从控制台中获得---通过正则解析出原文件resCodeVariable.js中的错误码模块名
             *  （每次创建新模块时候，如果需要，提前创建好所需的错误码），
             *    然后运行npm run add 执行创建代码脚本时，从控制台选择所涉及到的模块错误码，
             *  替换为常量格式字符串
             */
            ctx.fail(resCode.get(ARTICLE.ARTICLE_TITLE_ALREADY_EXISTS))
        } else {
            let flag = await articleService.saveArticle(params)
            if (flag) {
                ctx.success()
            }
        }
    }
}
```

#### `deleteArticleByUid`删除

```js
/**
 * 删除接口传入的参数是一个uid的数组
 * 数据库设计的时候，所有的主键规定都为uid，由服务端自行生成，
 * （除非中间表，不需要维护主键，选择id自增，由数据库自己维护）
*/
const deleteArticleByUid = async ctx => {
    let uids = ctx.request.body
    console.log(uids, 'uids')
    const {errorMsg, isValid} = deleteArticleByUidValidator(ctx.request.body)

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let result = articleService.deleteArticleByUid(uids)
        if (result) {
            ctx.success()
        }
    }
}
```

#### `queryArticlePage`分页查询

```js
const queryArticlePage = async ctx => {
    /**
     * 这里把数据库表里的字段都声明出来
     * 除了 uid create_time update_time
     *
     * 这些都是可以从前台接收来的参数
     *
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {
        currentPage, pageSize,
        blogTitle, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, isOpenComment, blogStatus
    } = ctx.request.body

    console.log(ctx.request.body, 'ctx.request.body')
    /**
     * 这里把需要校验的参数传递进去
     * 
     * 模式：$分页查询接口，参数校验参数接收$
     * 模式解析方式：只需校验 currentPage, pageSize
     * 
     */
    const {errorMsg, isValid} = queryArticlePageValidator(currentPage, pageSize)

    /**
     * 模糊查询，如果前台没有传入，就设置为空字符串
     * 
     * 模式：$分页查询接口，未传递参数设置空字符串$
     * 模式解析方式：提取出所有解析过的数据表字段，有默认值，且默认值不为null的字段，替换为小驼峰格式字符串
     * 
     */
    blogTitle = blogTitle ? blogTitle : ''
    blogAuthorId = blogAuthorId ? blogAuthorId : ''
    isOriginal = isOriginal ? isOriginal : ''
    blogSortId = blogSortId ? blogSortId : ''
    recommendLevel = recommendLevel ? recommendLevel : ''
    isOpenComment = isOpenComment ? isOpenComment : ''
    blogStatus = blogStatus ? blogStatus : ''


    /**
     * 封装好处理过的参数
     *
     * 模式：$分页查询接口，封装处理过的参数$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，
     *
     */
    let params = {
        currentPage: +currentPage,
        pageSize: +pageSize,
        blogTitle, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, isOpenComment, blogStatus
    }

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let result = await articleService.queryArticlePage(params)
        let {total} = await articleService.queryAllCountArticle(params)
        let newResult = {
            result,
            total,
            currentPage,
            pageSize,
        }
        ctx.success(newResult)
    }
}
```

#### `updateArticleByUid`更新

```js
const updateArticleByUid = async ctx => {
    /**
     * 这里把数据库表里的字段都声明出来
     * 除了 create_time update_time
     *
     * 这些都是可以从前台接收来的参数
     *
     * 模式：$更新接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 createTime,updateTime
     */
    let {
        uid, blogTitle, blogSummary, isOriginal, blogSortId,
        recommendLevel, order, isOpenComment, blogStatus,
        coverUrl, blogContent, blogTagIds
    } = ctx.request.body

    console.log(ctx.request.body, 'ctx.request.body')
    
    /**
     * 这里把需要校验的参数传递进去
     * 
     * 模式：$更新接口，参数校验参数接收$
     * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 createTime,updateTime
     * 
     */
    const {
        errorMsg,
        isValid
    } = updateArticleByUidValidator(uid, blogTitle, isOriginal, isOpenComment, blogStatus, blogTagIds)
    
    /**
     * 为一些参数设置默认值，根据数据表中的默认值设置
     * 
     * 模式：$更新接口，未传递参数设置默认值$
     * 模式解析方式：提取出所有解析过的数据表字段，有默认值的字段，替换为小驼峰格式字符串，排除 uid,createTime,updateTime
     * 
     */
    blogSummary = blogSummary ? blogSummary : ''
    blogSortId = blogSortId ? blogSortId : ''
    recommendLevel = recommendLevel ? recommendLevel : '-1'
    order = order ? order : '0'
    isOpenComment = isOpenComment ? isOpenComment : '2'
    blogStatus = blogStatus ? blogStatus : '2'
    blogContent = blogContent ? blogContent : ''
    blogTagIds = blogTagIds ? blogTagIds : []

    // 补充参数
    const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    /**
     * 封装好处理过的参数
     *
     * 模式：$保存接口，封装处理过的参数$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰变量
     *
     */
    let params = {
        uid, blogTitle, blogSummary, isOriginal, blogSortId,
        recommendLevel, order, isOpenComment, blogStatus,
        coverUrl, blogContent, blogTagIds, updateTime
    }

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {

        // 补充参数
        let {blog_author_id, create_time} = await articleService.queryArticleByUid(uid)
        params.blogAuthorId = blog_author_id
        params.createTime = create_time

        // 根据uid修改这条记录
        let result = await articleService.updateArticleByUid(params)
        if (result) {
            ctx.success()
        }
    }

}
```

#### `脚部`

```js
module.exports = {
    saveArticle,
    deleteArticleByUid,
    updateArticleByUid,
    queryArticlePage,
}
```

## `/validation/article/`

### `index.js`

```js
const saveArticleValidator = require('./saveArticle')
const deleteArticleByUidValidator = require('./deleteArticleByUid')
const updateArticleByUidValidator = require('./updateArticleByUid')
const queryArticlePageValidator = require('./queryArticlePage')

module.exports = {
    saveArticleValidator,
    deleteArticleByUidValidator,
    updateArticleByUidValidator,
    queryArticlePageValidator,
}
```

### `saveArticle.js`

```js
const {isEmpty} = require('../../utils/toolsFunction')

/**
 * 生成保存接口的校验参数注释
 * 
 * 模式：$保存接口参数校验，注释生成$
 * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 uid,createTime,updateTime
 * 
*/


/**
 * @param blogTitle 不能为空
 * @param isOriginal 不能为空
 * @param isOpenComment 不能为空
 * @param blogStatus 不能为空
 * @param blogTagIds 如果有，必须为数组类型
 */
module.exports = (blogTitle, isOriginal, isOpenComment,blogStatus,blogTagIds) => {
/**
 * 保存接口校验参数获取
 * 
 * 模式：$保存接口参数校验，校验参数接收$
 * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 uid,createTime,updateTime
 * 
*/
    
    
    /**
     * 临时变量生成
     * 
     * 模式：$保存接口参数校验，临时变量生成$
     * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 uid,createTime,updateTime
     * 
    */
    let _blogTitle = isEmpty(blogTitle) ? '' : blogTitle
    let _isOriginal = isEmpty(isOriginal) ? '' : isOriginal
    let _isOpenComment = isEmpty(isOpenComment) ? '' : isOpenComment
    let _blogStatus = isEmpty(blogStatus) ? '' : blogStatus
    let _blogTagIds = isEmpty(blogTagIds) ? '' : blogTagIds

    let isValid = false // 默认校验不通过
    
    /**
     * 临时变量校验
     * 
     * 模式：$保存接口参数校验，临时变量校验$
     * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 uid,createTime,updateTime
     * 
    */
    if (!_blogTitle) {
        return {
            errorMsg: '标题不能为空',
            isValid,
        }
    }
    if (!_isOriginal) {
        return {
            errorMsg: '是否原创不能为空',
            isValid,
        }
    }
    if (!_isOpenComment) {
        return {
            errorMsg: '是否开启评论不能为空',
            isValid,
        }
    }
    if (!_blogStatus) {
        return {
            errorMsg: '博客状态不能为空',
            isValid,
        }
    }


    isValid = true // 当所有的逻辑走完之后，校验通过

    return {
        errorMsg: '校验通过',
        isValid
    }
}

```

### `deleteArticleByUid`

```js
const {isEmpty} = require('../../utils/toolsFunction')

/**
 * @param uids 不能为空 且为数组类型
 */
module.exports = (uids) => {

    let _uids = isEmpty(uids)? '' : uids

    let isValid = false // 默认校验不通过

    if (!_uids) {
        return {
            errorMsg: '参数不能为空',
            isValid,
        }
    }
    if (!Array.isArray(_uids)) {
        return {
            errorMsg: '参数必须位数组类型',
            isValid,
        }
    }

    isValid = true // 当所有的逻辑走完之后，校验通过

    return {
        errorMsg: '校验通过',
        isValid
    }
}

```

### `queryArticlePage`

```js
const {isEmpty} = require('../../utils/toolsFunction')

/**
 * @param currentPage 不能为空
 * @param pageSize 不能为空
 */
module.exports = (currentPage, pageSize) => {

    let _currentPage = isEmpty(currentPage)? '' : currentPage
    let _pageSize = isEmpty(pageSize)? '' : pageSize

    let isValid = false // 默认校验不通过

    if (!_currentPage) {
        return {
            errorMsg: 'currentPage不能为空',
            isValid,
        }
    }
    if (!_pageSize) {
        return {
            errorMsg: 'pageSize不能为空',
            isValid,
        }
    }

    isValid = true // 当所有的逻辑走完之后，校验通过

    return {
        errorMsg: '校验通过',
        isValid
    }
}
```

### `updateArticleByUid.js`

```js
const {isEmpty} = require('../../utils/toolsFunction')

/**
 * 生成更新接口的校验参数注释
 * 
 * 模式：$更新接口参数校验，注释生成$
 * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 createTime,updateTime
 * 
*/



/**
 * @param uid 不能为空
 * @param blogTitle 不能为空
 * @param isOriginal 不能为空
 * @param isOpenComment 不能为空
 * @param blogStatus 不能为空
 * @param blogTagIds 如果有，必须为数组类型
 */
module.exports = (uid, blogTitle, isOriginal, isOpenComment, blogStatus, blogTagIds) => {
/**
 * 更新接口校验参数获取
 * 
 * 模式：$更新接口参数校验，校验参数接收$
 * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 createTime,updateTime
 * 
*/
    
    let _uid = isEmpty(uid) ? '' : uid
    let _blogTitle = isEmpty(blogTitle) ? '' : blogTitle
    let _isOriginal = isEmpty(isOriginal) ? '' : isOriginal
    let _isOpenComment = isEmpty(isOpenComment) ? '' : isOpenComment
    let _blogStatus = isEmpty(blogStatus) ? '' : blogStatus
    let _blogTagIds = isEmpty(blogTagIds) ? '' : blogTagIds

    let isValid = false // 默认校验不通过

    if (!_uid) {
        return {
            errorMsg: 'uid不能为空',
            isValid,
        }
    }

    if (!_blogTitle) {
        return {
            errorMsg: '标题不能为空',
            isValid,
        }
    }
    if (!_isOriginal) {
        return {
            errorMsg: '是否原创不能为空',
            isValid,
        }
    }
    if (!_isOpenComment) {
        return {
            errorMsg: '是否开启评论不能为空',
            isValid,
        }
    }
    if (!_blogStatus) {
        return {
            errorMsg: '博客状态不能为空',
            isValid,
        }
    }

    isValid = true // 当所有的逻辑走完之后，校验通过

    return {
        errorMsg: '校验通过',
        isValid
    }
}

```

## `/service/`

#### `article.js`

```js
const articleDao = require('../dao/article')

/**
 * 根据第一个参数查询
 * 
 * 模式：$查询接口 根据第一个参数查询$ 
 * 替换方式：获取第一个参数，转换为大驼峰的格式
 */
const queryArticleByBlogTitle = async (blogTitle) => {
    return await articleDao.queryArticleByBlogTitle(blogTitle)
}

const queryArticleByUid = async (uid) => {
    return await articleDao.queryArticleByUid(uid)
}

const saveArticle = async (params) => {
    return await articleDao.saveArticle(params)
}

const queryArticlePage = async (params) => {
    return await articleDao.queryArticlePage(params)
}

const updateArticleByUid = async (params) => {
    return await articleDao.updateArticleByUid(params)
}

const deleteArticleByUid = async (uids) => {
    for (const uid of uids) {
        await articleDao.deleteArticleByUid(uid)
    }
    return true
}

const queryAllCountArticle = async (params) => {
    return await articleDao.queryAllCountArticle(params)
}

module.exports = {
    saveArticle,
    deleteArticleByUid,
    updateArticleByUid,
    queryArticlePage,
    queryAllCountArticle,
    queryArticleByBlogTitle,
    queryArticleByUid,
}

```

## `dao`

### `article.js`

```js
/**
 * 模式 $头部 第二个参数大驼峰$
 *  替换方式：获取第二个参数，转换为大驼峰的格式
 */
const {
    saveArticleSql,
    deleteArticleByUidSql,
    updateArticleByUidSql,
    queryArticlePageSql,
    queryAllCountArticleSql,
    queryArticleByBlogTitleSql,
    queryArticleByUidSql,
} = require('../sql/article')
const query = require('../utils/db')

const saveArticle = async (params) => {
    /**
     * 模式：$保存接口，参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    let {
        uid, blogTitle, blogSummary, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, order, isOpenComment, blogStatus,
        coverUrl, blogContent,createTime,updateTime
    } = params

    /**
     * 模式：$保存接口，sql参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    await query(
        saveArticleSql,
        [uid, blogTitle, blogSummary, blogAuthorId, isOriginal, blogSortId,
            recommendLevel, order, isOpenComment, blogStatus,
            coverUrl, blogContent, createTime, updateTime]
    )
    return true
}


const queryArticlePage = async (params) => {
    /**
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {currentPage, pageSize,
        blogTitle, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, isOpenComment, blogStatus}  = params

    let _currentPage = (currentPage - 1) * pageSize

    /**
     * 模式：$分页查询接口，sql参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    return await query(
        queryArticlePageSql,
        [
            `%${blogTitle}%`,
            `%${blogAuthorId}%`,
            `%${isOriginal}%`,
            `%${blogSortId}%`,
            `%${recommendLevel}%`,
            `%${isOpenComment}%`,
            `%${blogStatus}%`,
            _currentPage,
            pageSize
        ])
}
const queryAllCountArticle = async (params) => {
    /**
     * 模式：$查询接口，查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    let {blogTitle, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, isOpenComment, blogStatus}  = params

    /**
     * 模式：$查询接口，sql查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    let result = await query(
        queryAllCountArticleSql,
        [
            `%${blogTitle}%`,
            `%${blogAuthorId}%`,
            `%${isOriginal}%`,
            `%${blogSortId}%`,
            `%${recommendLevel}%`,
            `%${isOpenComment}%`,
            `%${blogStatus}%`
        ])
    return result[0]
}


const updateArticleByUid = async (params) => {
    /**
     * 模式：$更新接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    let {
        uid, blogTitle, blogSummary, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, order, isOpenComment, blogStatus,
        coverUrl, blogContent,createTime,updateTime
    } = params

    /**
     * 模式：$更新接口，sql参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    await query(
        updateArticleByUidSql,
        [blogTitle, blogSummary, blogAuthorId, isOriginal, blogSortId,
            recommendLevel, order, isOpenComment, blogStatus,
            coverUrl, blogContent, createTime, updateTime,uid]
    )
}

const deleteArticleByUid = async (uid) => {
    await query(deleteArticleByUidSql, [uid])
}

/**
 * 模式 $查询接口 第二个参数大驼峰$ $查询接口 第二个参数小驼峰$
 *  替换方式：获取第二个参数，转换为大驼峰和小驼峰的格式
 */
const queryArticleByBlogTitle = async (blogTitle) => {
    let resultArr = await query(queryArticleByBlogTitleSql, [blogTitle])
    return resultArr[0]
}

const queryArticleByUid = async (uid) => {
    let resultArr = await query(queryArticleByUidSql, [uid])
    return resultArr[0]
}

module.exports = {
    saveArticle,
    deleteArticleByUid,
    updateArticleByUid,
    queryArticlePage,
    queryAllCountArticle,
    queryArticleByBlogTitle,
    queryArticleByUid,
}

```

## `/sql/`

### `article.js`

```js
/**
 * 模式 $查询接口语句 第二个参数大驼峰格式占位符$
 *  替换方式：从tableData提取出所有列名，
 *          取第二个参数
 *          将连字符变量，替换为为大驼峰格式字符串，
 *
 * 模式 $查询接口语句 第二个参数占位符$
 *  替换方式：从tableData提取出所有列名，
 *          取第二个参数
 *          将连字符变量，替换为为小驼峰格式字符串，
 */
const queryArticleByBlogTitleSql = `
    select * from t_blog where blog_title = ?
`

const queryArticleByUidSql = `
    select * from t_blog where uid = ?
`
/**
 * 模式 $保存接口语句 参数接收占位符$
 *  替换方式：取出所有列名
 *
 * 模式 $保存接口语句 参数接收问号占位符$
 *  替换方式：根据列名的个数，拼接 ?,?,
 */
const saveArticleSql = `
    insert into t_blog 
    (
        uid,blog_title, blog_summary, blog_author_id, is_original, blog_sort_id,
        recommend_level, order_num,is_open_comment, blog_status,
        cover_url, blog_content, create_time, update_time
    )
    values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
`

const deleteArticleByUidSql = `
    delete from t_blog where uid = ?
`
/**
 * 模式 $更新接口语句 参数接收问号占位符$
 *  替换方式：根据列名 循环拼接字符串，排除uid，拼接格式为 blog_title = ?, blog_summary = ?, blog_author_id = ?,\n
 */
const updateArticleByUidSql = `
    update t_blog 
    set
        blog_title = ?, blog_summary = ?, blog_author_id = ?, 
        is_original = ?, blog_sort_id = ?, recommend_level = ?, 
        order_num = ?, is_open_comment = ?, blog_status = ?,
        cover_url = ?, blog_content = ?, create_time = ?, update_time = ?
    where uid = ?
`

/**
 * 模式 $分页查询接口语句 参数接收问号占位符$
 *  替换方式：从tableData提取出所有列名，
 *          有默认值，且默认值不为null，
 *          排除 uid
 *          例如：        blog_title like ?\n        and blog_author_id like ?
 */
const queryArticlePageSql = `
    select 
        * 
    from 
        t_blog
    where 
        blog_title like ?
        and blog_author_id like ?
        and is_original like ?
        and blog_sort_id like ?
        and recommend_level like ?
        and is_open_comment like ?
        and blog_status like ?
    order by 
        order_num, create_time desc
    limit ?,?
`

/**
 * 模式 $查询总条数接口语句 参数接收问号占位符$
 *  替换方式：从tableData提取出所有列名，
 *          有默认值，且默认值不为null，
 *          排除 uid
 *          例如：        blog_title like ?\n        and blog_author_id like ?
 */
const queryAllCountArticleSql = `
    select 
        count(uid) as total 
    from 
        t_blog
    where 
        blog_title like ?
        and blog_author_id like ?
        and is_original like ?
        and blog_sort_id like ?
        and recommend_level like ?
        and is_open_comment like ?
        and blog_status like ?
`

module.exports = {
    saveArticleSql,
    deleteArticleByUidSql,
    updateArticleByUidSql,
    queryArticlePageSql,
    queryAllCountArticleSql,
    queryArticleByBlogTitleSql,
    queryArticleByUidSql,
}

```

## `前端页面`

### `/api/`

#### `blogSort.js`

```js

import axios from '../lib/request'
/*
	模式 $API文件占位符替换$
	替换方式：模块名大小驼峰替换
*/
export const blogSortApi = {
  saveBlogSort: (data) => {
    return axios.post(`/blogSort/saveBlogSort`, data)
  },
  deleteBlogSortByUid: (data) => {
    return axios.post(`/blogSort/deleteBlogSortByUid`, data)
  },
  queryBlogSortPage: (data) => {
    return axios.post(`/blogSort/queryBlogSortPage`, data)
  },
  queryArticleSortAll: (data) => {
    return axios.post(`/blogSort/queryBlogSortAll`, data)
  },
  updateBlogSortByUid: (data) => {
    return axios.post(`/blogSort/updateBlogSortByUid`, data)
  },
}

```

### `/blog/blogSort/`

#### `BlogSort.vue`

```vue
<template>
<!-- 
	模式 $Vue文件class类名占位符替换$
	替换方式：模块名变为连字符类型
		blogSort -> blog-sort
-->
  <div class="blog-container">
    <!--  筛选框  -->
    <div class="filter-container" v-show="!isHideSearch" :style="{height:`${filterContainerHeight}px`}">
      <el-form :inline="true">
          <!--  筛选框  
                模式 $Vue文件筛选条件输入框占位符替换$
                替换方式：拼接筛选条件的按钮代码
                    数据表中有默认值、且默认值不为null的的字段，排除uid、create_time、update_time
            -->
        <el-input
          clearable
          style="width: 150px;"
          v-model="searchParam.sortName"
          placeholder="请输入分类名"
          @keyup.enter.native="handleFind"
        />

        <el-button
          style="margin-left: 10px;"
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFind"
        >
          查找
        </el-button>

      </el-form>
    </div>

    <!--  功能按钮  -->
    <div class="feature-btns" :style="{height: `${featureBtnsHeight}px`}">
      <el-row :gutter="10">
        <el-col :span="1.5">
          <el-button class="filter-item" type="primary" @click="handleAdd" icon="el-icon-edit"
          >添加
          </el-button>
        </el-col>

        <el-col :span="1.5">
          <el-button class="filter-item" type="danger" @click="handleDeleteSelected" icon="el-icon-delete"
          >删除选中
          </el-button>
        </el-col>

        <RightToggleBar
          :hide-search="isHideSearch"
          @refresh="resetTableList"
          @toggleSearch="toggleSearchStatus"
        />

      </el-row>
    </div>

    <!-- 内容展示表格 -->
    <div class="table-container" :style="{height: `calc(100% - ${calcTableHeight}px)`}">
      <el-table
        :data="tableData"
        height="100%"
        :header-cell-style="{background:'#f0efef',color:'#333'}"
        style="width: 100%"
        @selection-change="selectHandle"
        ref="table"
      >

        <el-table-column type="selection"></el-table-column>

        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
		<!--    
            模式 $Vue文件数据表内容替换$
            	替换方式：拼接数据表中所有字段，排除uid
         -->
        <el-table-column label="分类名" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.sort_name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="分类介绍" min-width="250" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.intro }}</span>
          </template>
        </el-table-column>

        <el-table-column label="点击数" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.clicks }}</span>
          </template>
        </el-table-column>

        <el-table-column label="排序" min-width="100" align="center">
          <template slot-scope="scope">
            <el-tag type="warning">{{ scope.row.order_num }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="创建时间" min-width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="150">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑
            </el-button>
            <el-button @click="handleSingleDelete(scope.row,scope.$index+1)" type="danger" size="small">删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <!--  分页  -->
    <div class="pagination-box" :style="{height: `${paginationBoxHeight}px`}">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentPageChange"
        :current-page="this.searchParam.currentPage"
        :page-sizes="[30, 60, 90, 120]"
        :page-size="this.searchParam.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

	<!-- 
		模式：$Vue文件添加或修改对话框内容替换$ 
		替换方式：label标签可以从注释里取，名字列名取，排除uid、create_time、update_time
	-->

    <!-- 添加或修改对话框 -->
    <el-dialog :title="isUpdate ? '编辑分类':'增加分类'" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名" label-width="120px" prop="sortName">
          <el-input v-model="form.sortName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="分类介绍" label-width="120px" prop="content">
          <el-input v-model="form.intro" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="排序" label-width="120px" prop="sort">
          <el-input v-model="form.order" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 批量删除对话框 -->
    <el-dialog title="批量删除" :visible.sync="batchDeleteDialogVisible" width="500px" :before-close="deleteBeforeClose">
      <el-form>
        <el-form-item>
          <h3 style="color: #ed4014;">确定要删除以下数据吗</h3>
        </el-form-item>

        <el-form-item label="删除数据" label-width="80px">
          <el-card style="height: 300px;overflow-y: auto;" :body-style="{padding: '5px 10px'}">
            <div v-for="item in selectIndex" :key="item" style="font-size: 14px;">
              <span style="color: #ed4014;">*</span>
              <span>{{ item }}</span>
            </div>
          </el-card>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteCancelHandle">取 消</el-button>
        <el-button type="danger" @click="deleteConfirmHandle">确定删除</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {appMutation} from "/src/store/mutation-types";
import RightToggleBar from "/src/components/RightToggleBar/RightToggleBar";

/*
	模式：$Vue文件声明API接口内容替换$
	替换方式：取模块名，直接拼接语句，小驼峰替换
*/
import {blogSortApi} from '/src/api/blogSort'

export default {
/*
	模式：$Vue文件组件名称占位符替换$
	替换方式：取模块名，大驼峰格式
*/
  name: "BlogSort",
  props: {},
  components: {
    RightToggleBar,
  },
  data() {
    return {

      tableData: [],

      filterContainerHeight: 40, // 筛选框的高度
      featureBtnsHeight: 25, // 功能按钮的高度
      paginationBoxHeight: 50, // 分页栏的高度

      isUpdate: true, // 控制编辑框是用来删除的还是用来修改的
      dialogFormVisible: false, //控制增加（编辑）数据弹出框
      batchDeleteDialogVisible: false, //控制批量删除提示弹出框
        
/*
	模式：$Vue文件form内容数据占位符替换$
	替换方式：排除uid、create_time、update_time，小驼峰
*/
      form: {
        sortName: null,
        intro: null,
        order: null
      },
 /*
	模式：$Vue文件searchParam内容数据占位符替换$
	替换方式：排除uid、create_time、update_time，小驼峰，有默认值且，默认值不为空的字段
*/
      searchParam: {
        sortName: null,
        currentPage: 1, // 当前页
        pageSize: 30, // 列表总条数
      },
      total: null, // 列表总条数
      selectIds: [], // 等待删除数据的id
      selectIndex: [], // 等待删除数据的索引

    }
  },
  methods: {
    // 条件搜索
    handleFind() {
      this.getList()
      console.log('handleFind')
    },
    // 刷新表格数据
    resetTableList() {
      this.getList()
      console.log('resetTableList')
    },
    selectHandle(rows) {
      this.selectIds = rows.map(item => {
        return item.uid
      })
      let tempIndex = []
      this.tableData.map((item, index) => {
        if (this.selectIds.includes(item.uid)) {
          tempIndex.push(index + 1)
        }
      })
      this.selectIndex = tempIndex
    },
    // 添加
    handleAdd() {
      this.isUpdate = false
      this.form = {
        sortName: null,
        intro: null,
        order: null
      }

      this.dialogFormVisible = true
      console.log('handleAdd')
    },
    // 编辑
    handleEdit(row) {
      this.isUpdate = true
/*
	模式：$Vue文件编辑方法form内容数据占位符替换$
	替换方式：排除uid、create_time、update_time，小驼峰，后面row中的参数取原值
*/      
      this.form = {
        sortName: row.sort_name,
        intro: row.intro,
        order: row.order_num,
        uid: row.uid
      }
      this.dialogFormVisible = true
      console.log(row, 'handleEdit')
    },
    // 单个删除
    handleSingleDelete(row, index) {
      this.selectIndex.push(index)
      this.selectIds.push(row.uid)
      this.batchDeleteDialogVisible = true
      console.log(row, index, 'handleSingleDelete')
    },
    deleteBeforeClose(done) {
      console.log('关闭弹出层前，清空数据')
      this.selectIndex = []
      this.selectIds = []
      this.$refs.table.clearSelection()
      done()
    },
    deleteCancelHandle() {
      this.selectIndex = []
      this.selectIds = []
      this.$refs.table.clearSelection()
      this.batchDeleteDialogVisible = false
    },
    // 删除选中
    handleDeleteSelected() {
      if (this.selectIds.length === 0) {
        this.$message({
          type: 'warning',
          message: '至少选择一项',
          duration: 1500
        })
      } else {
        this.batchDeleteDialogVisible = true
        console.log('handleDeleteSelected')
      }

    },
      
/*
	模式：$Vue文件确认删除方法占位符替换$
	替换方式：替换为模块名，大小驼峰替换
*/       
    // 确认删除
    async deleteConfirmHandle() {
      let {data} = await blogSortApi.deleteBlogSortByUid(this.selectIds)
      if (data.code === 1) {
        this.$message({
          message: '删除成功',
          type: 'success',
          duration: 1500,
        })
        await this.getList()
        this.selectIds = []
        this.selectIndex = []
        this.batchDeleteDialogVisible = false
      } else {
        this.$message({
          message: data.extendInfo ? data.extendInfo : data.msg,
          type: 'error',
          duration: 1500,
        })
      }
    },
    // 切换搜索框显示隐藏
    toggleSearchStatus() {
      this.$store.commit(appMutation.TOGGLE_SEARCHBAR)
    },
    // 分页 pageSize 改变时触发
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.searchParam.pageSize = val
      this.searchParam.currentPage = 1
      this.getList()

    },
    // 分页 currentPage 改变时触发
    handleCurrentPageChange(val) {
      console.log(`当前页 ${val}`);
      this.searchParam.currentPage = val
      this.getList()
    },
      
/*
	模式：$Vue文件提交方法占位符替换$
	替换方式：替换为模块名，大小驼峰替换
*/   
    // 提交  
    async submitForm() {
      let data;
      if (!this.isUpdate) { //若果是新增
        data = await blogSortApi.saveBlogSort(this.form)
      } else { // 如果是编辑
        data = await blogSortApi.updateBlogSortByUid(this.form)
      }
      console.log(data, 'data')
      if (data.data.code === 1) {
        this.$message({
          message: this.isUpdate ? '修改成功' : '添加成功',
          type: 'success',
          duration: 1500,
        })
        this.dialogFormVisible = false
        await this.getList()
      } else {
        this.$message({
          message: data.data.extendInfo ? data.data.extendInfo : data.data.msg,
          type: 'error',
          duration: 1500,
        })
      }
    },

/*
	模式：$Vue文件获取数据列表方法占位符替换$
	替换方式：替换为模块名，大小驼峰
*/       
    async getList() {
      let {data} = await blogSortApi.queryBlogSortPage(this.searchParam)
      this.tableData = data.data.result
      this.total = data.data.total
    },
  },
  computed: {
    // 是否隐藏搜索框
    isHideSearch() {
      return this.$store.state.app.isHiddenSearch
    },
    // 表格的默认减去的高度
    calcTableHeight() {
      if (this.$store.state.app.isHiddenSearch) {
        return this.featureBtnsHeight + this.paginationBoxHeight
      } else {
        return this.filterContainerHeight + this.featureBtnsHeight + this.paginationBoxHeight
      }
    }
  },
  watch: {},
  mounted() {
    this.getList()
  }
}
</script>


<style scoped lang="scss">
@import "BlogSort";
/*
	模式：$Vue文件样式文件引入占位符替换$
	替换方式：替换为模块名，大驼峰
*/     
</style>
```

#### `BlogSort.scss`

```scss
/*
	模式 $Scss文件class类名占位符替换$
	替换方式：模块名变为连字符类型
		blogSort -> blog-sort
*/
.blog-container {
  background-color: #fff;
  padding: 5px 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .filter-container {
    margin-bottom: 10px;
  }
  .feature-btns {
    margin-bottom: 10px;

    .el-button {
      padding: 5px 10px !important;
    }
  }
  .pagination-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .table-container {
    width: 100%;
  }
}

```



















































