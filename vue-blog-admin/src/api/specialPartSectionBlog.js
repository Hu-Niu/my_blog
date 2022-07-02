import axios from '../lib/request'
/*
	模式 $API文件占位符替换$
	替换方式：模块名大小驼峰替换
*/
export const specialPartSectionBlogApi = {
    saveSpecialPartSectionBlog: (data) => {
        return axios.post(`/specialPartSectionBlog/saveSpecialPartSectionBlog`, data)
    },
    deleteSpecialPartSectionBlogByUid: (data) => {
        return axios.post(`/specialPartSectionBlog/deleteSpecialPartSectionBlogByUid`, data)
    },
    querySpecialPartSectionBlogPage: (data) => {
        return axios.post(`/specialPartSectionBlog/querySpecialPartSectionBlogPage`, data)
    },
    querySpecialPartSectionBlogAll: () => {
        return axios.post(`/specialPartSectionBlog/querySpecialPartSectionBlogAll`)
    },
    updateSpecialPartSectionBlogByUid: (data) => {
        return axios.post(`/specialPartSectionBlog/updateSpecialPartSectionBlogByUid`, data)
    },
}
