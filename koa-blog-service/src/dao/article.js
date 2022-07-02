const {
    saveArticleSql,
    deleteArticleByUidSql,
    deleteArticleTagByArticleUidSql,
    updateArticleByUidSql,
    queryArticlePageSql,
    queryArticlePageSql2,
    queryAllCountArticleSql,
    saveArticleTagSql,
    queryArticleByBlogTitleSql,
    queryArticleByUidSql,
    queryArticleTagIdsByArticleUidSql,
    queryArticleByRecommendLevelSql,
    queryArticleAllSql,
    queryRecommendArticleByRecommendLevelSql,
    queryHotArticlePageSql,
    queryArticleAll2Sql,
    queryAllArticleCreateTimeListSql,
    queryAllArticleCreateTimeListSql2,
    queryArticleByUidSql2,
    updateArticleClicksByUidSql,
} = require('../sql/article')
const query = require('../utils/db')
const dayjs = require('dayjs')

const saveArticle = async (params) => {
    let {
        uid, blogTitle, blogSummary,originAddress, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, order, isOpenComment, isPrivate, blogStatus,
        coverUrl, blogContent, createTime, updateTime
    } = params

    await query(
        saveArticleSql,
        [uid, blogTitle, blogSummary,originAddress, blogAuthorId, isOriginal, blogSortId,
            recommendLevel, order, isOpenComment, isPrivate, blogStatus,
            coverUrl, blogContent, createTime, updateTime]
    )
}

const saveArticleTag = async (blogId, blogTagId, createTime) => {
    await query(saveArticleTagSql, [blogId, blogTagId, createTime, createTime])
}

const queryArticlePage = async (params) => {
    let {
        currentPage, pageSize,
        blogTitle, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, isOpenComment, isPrivate, blogStatus, createTime, blogTag
    } = params

    let _currentPage = (currentPage - 1) * pageSize

    // 使用不同的sql
    if (blogTag) {
        // int类型的数据不带%，因为需要精准查
        // varchar类型的数据带%，因为需要模糊查
        // 在controller层赋值时，int类型没有值时，就赋值为%，有值时就取自己的值
        return await query(
            queryArticlePageSql2,
            [
                `%${blogTitle}%`,
                `${blogAuthorId}`,
                `${isOriginal}`,
                `${blogSortId}`,
                `${recommendLevel}`,
                `${isOpenComment}`,
                `${isPrivate}`,
                `${blogStatus}`,
                `%${createTime}%`,
                `${blogTag}`,
                _currentPage,
                pageSize,

            ])
    } else {
        // int类型的数据不带%，因为需要精准查
        // varchar类型的数据带%，因为需要模糊查
        // 在controller层赋值时，int类型没有值时，就赋值为%，有值时就取自己的值
        return await query(
            queryArticlePageSql,
            [
                `%${blogTitle}%`,
                `${blogAuthorId}`,
                `${isOriginal}`,
                `${blogSortId}`,
                `${recommendLevel}`,
                `${isOpenComment}`,
                `${isPrivate}`,
                `${blogStatus}`,
                `%${createTime}%`,
                _currentPage,
                pageSize
            ])
    }


}

const queryAllCountArticle = async (params) => {
    let {
        blogTitle, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, isOpenComment, isPrivate, blogStatus, createTime
    } = params

    return await query(
        queryAllCountArticleSql,
        [
            `%${blogTitle}%`,
            `${blogAuthorId}`,
            `${isOriginal}`,
            `${blogSortId}`,
            `${recommendLevel}`,
            `${isOpenComment}`,
            `${isPrivate}`,
            `${blogStatus}`,
            `%${createTime}%`,
        ])
}
const queryArticleByUid2 = async (uid) => {
    return await query(
        queryArticleByUidSql2,
        [uid])
}


const queryArticleAll2 = async (params) => {
    let {
        blogTitle, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, isOpenComment, isPrivate, blogStatus
    } = params

    // int类型的数据不带%，因为需要精准查
    // varchar类型的数据带%，因为需要模糊查
    // 在controller层赋值时，int类型没有值时，就赋值为%，有值时就取自己的值
    return await query(
        queryArticleAll2Sql,
        [
            `%${blogTitle}%`,
            `${blogAuthorId}`,
            `${isOriginal}`,
            `${blogSortId}`,
            `${recommendLevel}`,
            `${isOpenComment}`,
            `${isPrivate}`,
            `${blogStatus}`,
        ])
}


const queryHotArticlePage = async (params) => {
    let {
        currentPage, pageSize,
        blogTitle, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, isOpenComment, isPrivate, blogStatus
    } = params

    let _currentPage = (currentPage - 1) * pageSize

    // int类型的数据不带%，因为需要精准查
    // varchar类型的数据带%，因为需要模糊查
    // 在controller层赋值时，int类型没有值时，就赋值为%，有值时就取自己的值
    return await query(
        queryHotArticlePageSql,
        [
            `%${blogTitle}%`,
            `${blogAuthorId}`,
            `${isOriginal}`,
            `${blogSortId}`,
            `${recommendLevel}`,
            `${isOpenComment}`,
            `${isPrivate}`,
            `${blogStatus}`,
            _currentPage,
            pageSize
        ])
}


const updateArticleByUid = async (params) => {
    let {
        uid, blogTitle, blogSummary,originAddress, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, order, isOpenComment, isPrivate, blogStatus,
        coverUrl, blogContent, createTime, updateTime
    } = params

    await query(
        updateArticleByUidSql,
        [blogTitle, blogSummary,originAddress, blogAuthorId, isOriginal, blogSortId,
            recommendLevel, order, isOpenComment, isPrivate, blogStatus,
            coverUrl, blogContent, createTime, updateTime, uid]
    )
}
const updateArticleClicksByUid = async (uid) => {

    return await query(
        updateArticleClicksByUidSql,
        [uid]
    )
}


const deleteArticleByUid = async (uid) => {
    return await query(deleteArticleByUidSql, [uid])
}

const queryArticleByRecommendLevel = async (recommendLevel) => {
    return await query(queryArticleByRecommendLevelSql, [recommendLevel])
}

const deleteArticleTagByArticleUid = async (uid) => {
    await query(deleteArticleTagByArticleUidSql, [uid])
}

const queryArticleByBlogTitle = async (blogTitle) => {
    let resultArr = await query(queryArticleByBlogTitleSql, [blogTitle])
    return resultArr[0]
}
const queryArticleByUid = async (uid) => {
    let resultArr = await query(queryArticleByUidSql, [uid])
    return resultArr[0]
}
const queryArticleTagIdsByArticleUid = async (uid) => {
    let resultArr = await query(queryArticleTagIdsByArticleUidSql, [uid])
    return resultArr
}

const queryArticleAll = async () => {
    return await query(queryArticleAllSql, [])
}
const queryRecommendArticleByRecommendLevel = async (levelId) => {
    return await query(queryRecommendArticleByRecommendLevelSql, [levelId])
}
const queryAllArticleCreateTimeList = async (isChenyOrXzz) => {
    // 排除私密文章
    if(isChenyOrXzz){
        return await query(queryAllArticleCreateTimeListSql, [])
    }else {
        return await query(queryAllArticleCreateTimeListSql2, [])
    }
}


module.exports = {
    saveArticle,
    deleteArticleByUid,
    updateArticleByUid,
    queryArticlePage,
    queryAllCountArticle,
    saveArticleTag,
    queryArticleByBlogTitle,
    queryArticleByUid,
    queryArticleTagIdsByArticleUid,
    deleteArticleTagByArticleUid,
    queryArticleByRecommendLevel,
    queryArticleAll,
    queryRecommendArticleByRecommendLevel,
    queryHotArticlePage,
    queryArticleAll2,
    queryAllArticleCreateTimeList,
    queryArticleByUid2,
    updateArticleClicksByUid,
}
