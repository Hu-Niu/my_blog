import Cookies from 'js-cookie';

const KEYS = {
  TOKEN: 'webToken',
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

