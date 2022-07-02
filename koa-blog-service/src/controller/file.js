const fileService = require('../service/file')
const {
    uploadFileValidator,
    deleteFileByUidValidator,
    updateFileSortByUidValidator,
} = require('../validation/file')
const resCode = require('../constant/resCode')
const {FILE, APP} = require('../constant/resCodeVariable')

const uploadFile = async ctx => {
    /**
     * 1、参数校验
     *  上传的文件不能为空
     */
    let {file} = ctx.request.files
    let fileExtraData = ctx.request.body


    console.log(ctx.request.body,'ctx.request.body')

    let files = [];

    if (file) { // 如果有上传的文件
        if (Array.isArray(file)) { // 如果是数组，说明上传的是多个文件
            files = file
        } else { // 如果不是，说明是单个文件 转为数组
            files.push(file)
        }
    }

    const {errorMsg, isValid} = uploadFileValidator(files)

    if (!isValid) {
        ctx.fail(resCode.get(FILE.FILE_UPLOAD_ERROR), errorMsg)
    } else {
        let result = await fileService.uploadFile(files, fileExtraData)
        ctx.success(result)
    }


}

const queryAllFileSort = async ctx => {
    let result = await fileService.queryAllFileSort()
    ctx.success(result)
}

const queryAllFilePage = async ctx => {
    let {currentPage, pageSize, fileSortId, createTime} = ctx.request.body
    if (!createTime) { // 模糊查询，如果没有，就传个空字符串
        createTime = ''
    }
    console.log(ctx.request.body, 'ctx.request.body')
    let result = await fileService.queryAllFilePage(+currentPage, +pageSize, fileSortId, createTime)
    let {total} = await fileService.queryAllFileCount(fileSortId, createTime)
    let newResult = {
        result,
        total,
        currentPage,
        pageSize,
    }
    ctx.success(newResult)
}

const queryAllFile = async ctx => {
    let {fileSortId, createTime} = ctx.request.body

    fileSortId = fileSortId ? fileSortId : ''
    createTime = createTime ? createTime : ''


    console.log(ctx.request.body, 'ctx.request.body')

    let result = await fileService.queryAllFile(fileSortId, createTime)

    ctx.success(result)
}


const deleteFileByUid = async ctx => {
    /**
     * 1、接收参数
     * 2、校验参数
     *    校验通过：保存成功
     *    校验不通过：返回错误信息
     */
    let uids = ctx.request.body
    console.log(uids, 'uids')
    const {errorMsg, isValid} = deleteFileByUidValidator(uids)
    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let result = await fileService.deleteFileByUid(uids)
        if (result) {
            ctx.success()
        }
    }
}

const updateFileSortByUid = async ctx => {
    /**
     * 1、接收参数
     * 2、校验参数
     *    校验通过：保存成功
     *    校验不通过：返回错误信息
     */
    let {fileIds, sortId} = ctx.request.body
    console.log(ctx.request.body, 'ctx.request.body')
    const {errorMsg, isValid} = updateFileSortByUidValidator(fileIds, sortId)
    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        // 根据uid修改这条记录
        let result = await fileService.updateFileSortByUid(fileIds, sortId)
        if (result) {
            ctx.success()
        }
    }

}

module.exports = {
    uploadFile,
    queryAllFileSort,
    queryAllFilePage,
    deleteFileByUid,
    updateFileSortByUid,
    queryAllFile,
}
