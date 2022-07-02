import Cookies from 'js-cookie';

const KEYS = {
  IS_COLLAPSE: 'isCollapse',
  IS_HIDDEN_SEARCH_BAR: 'isHiddenSearchBar',
  TOKEN: 'adminToken',
}

/**
 * @description 获取Cookie中的token
 * @return {String}
 */
export const getToken = () => {
  return Cookies.get(KEYS.TOKEN)
}

/**
 * @description 设置token到cookie中
 * @param {String} token
 */
export const setToken = token => {
  return Cookies.set(KEYS.TOKEN, token, {expires: 7})
}
/**
 * @description 清除cookie中的token
 * @param {String} token
 */
export const clearToken = () => {
  return Cookies.remove(KEYS.TOKEN);
}

/**
 * @description 设置侧边栏状态到cookie中 1 隐藏； 0 展开
 * @param {Number} value
 */
export const setSideBarStatus = value => {
  Cookies.set(KEYS.IS_COLLAPSE, value)
}

/**
 * @description 从cookie中获取侧边栏状态
 * @return {Number} 1：隐藏；0：展开
 */
export const getSideBarStatus = () => {
  return +Cookies.get(KEYS.IS_COLLAPSE)
}

/**
 * @description 清除
 */
export const removeSideBarStatus = () => {
    return Cookies.remove(KEYS.IS_COLLAPSE);
}

/**
 * @description 设置搜索栏显示隐藏栏状态到cookie中 1 隐藏； 0 显示
 * @param {Number} value
 */
export const setSearchBarStatus = value => {
  Cookies.set(KEYS.IS_HIDDEN_SEARCH_BAR, value)
}

/**
 * @description 从cookie中获取搜索栏显示隐藏栏状
 * @return {Number} 1：隐藏；0：显示
 */
export const getSearchBarStatus = () => {
  const status = Cookies.get(KEYS.IS_HIDDEN_SEARCH_BAR)
  if (typeof status === 'undefined') {
    return 1; // 首次进来时，尚未设置Cookie，默认返回状态1
  }
  return +status
}

/**
 * @description 清除
 */
export const removeSearchBarStatus = () => {
    return Cookies.remove(KEYS.IS_HIDDEN_SEARCH_BAR);
}

