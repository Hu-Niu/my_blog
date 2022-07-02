import axios from '../lib/request'


export const blogRecommendLevelApi = {
  updateArticleRecommendLevelByUid: (data) => {
    return axios.post(`/articleRecommend/updateArticleRecommendByUid`, data)
  },
}
