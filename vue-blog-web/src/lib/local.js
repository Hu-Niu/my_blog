const KEYS = {
    USER_INFO: 'webUserInfo',
}

/**
 * @return {Object}
 * @description 从localStorage获取 登录用户信息
 */
export const getUserInfoInLocalStorage = () => {
    let userInfo = localStorage[KEYS.USER_INFO]
    return userInfo ? JSON.parse(userInfo) : ''
}

/**
 * @param {Object} data 登录用户信息
 * @description 设置 登录用户信息 到本地localStorage中
 */
export const setUserInfoInLocalStorage = (data) => {
    localStorage[KEYS.USER_INFO] = JSON.stringify(data)
}

/**
 * @description 清空  localStorage中 的 登录用户信息
 */
export const removeUserInfoInLocalStorage = () => {
    localStorage.removeItem(KEYS.USER_INFO)
}


