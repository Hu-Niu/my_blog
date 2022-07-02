const {isEmpty} = require('../../utils/toolsFunction')

/**
 * @param files 上传的文件
 *  不能为空
 */
module.exports = (files) => {

    let _files = isEmpty(files) ? '' : files

    let isValid = false // 默认校验不通过

    if (!_files) {
        return {
            errorMsg: '上传文件不能为空',
            isValid,
        }
    }

    for (const file of _files) {
        if(file.size === 0){
            return {
                errorMsg: '上传文件不能为空',
                isValid,
            }
        }
    }

    isValid = true // 当所有的逻辑走完之后，校验通过

    return {
        errorMsg: '校验通过',
        isValid
    }

}
