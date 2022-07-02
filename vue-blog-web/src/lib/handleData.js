/**
 * 处理后台传过来的数据
 */
/*================= 评论数据分页处理 start =====================*/
let arrTest = [
    {
        "uid": "bdf66fe1-1789-11ec-9d4c-b06ebf5f2d71",
        "comment_content": "五级评论10 cheny",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "to_comment_id": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
        "root_comment_id": "aaa",
        "comment_layer": 5,
        "order_num": 0,
        "create_time": "2021-09-17 15:34:48",
        "update_time": "2021-09-17 15:34:48",
        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg"
    },
    {
        "uid": "ba35bf7d-1789-11ec-9d4c-b06ebf5f2d71",
        "comment_content": "五级评论9 cheny",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "to_comment_id": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
        "root_comment_id": "aaa",
        "comment_layer": 5,
        "order_num": 0,
        "create_time": "2021-09-17 15:34:41",
        "update_time": "2021-09-17 15:34:41",
        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg"
    },
    {
        "uid": "b0fb355e-1789-11ec-9d4c-b06ebf5f2d71",
        "comment_content": "五级评论8 cheny",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "to_comment_id": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
        "root_comment_id": "aaa",
        "comment_layer": 5,
        "order_num": 0,
        "create_time": "2021-09-17 15:34:26",
        "update_time": "2021-09-17 15:34:26",
        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg"
    },
    {
        "uid": "ad212e03-1789-11ec-9d4c-b06ebf5f2d71",
        "comment_content": "五级评论7 cheny",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "to_comment_id": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
        "root_comment_id": "aaa",
        "comment_layer": 5,
        "order_num": 0,
        "create_time": "2021-09-17 15:34:19",
        "update_time": "2021-09-17 15:34:19",
        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg"
    },
    {
        "uid": "aa157739-1789-11ec-9d4c-b06ebf5f2d71",
        "comment_content": "五级评论6 cheny",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "to_comment_id": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
        "root_comment_id": "aaa",
        "comment_layer": 5,
        "order_num": 0,
        "create_time": "2021-09-17 15:34:14",
        "update_time": "2021-09-17 15:34:14",
        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg"
    },
    {
        "uid": "a5e23450-1789-11ec-9d4c-b06ebf5f2d71",
        "comment_content": "五级评论5 cheny",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "to_comment_id": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
        "root_comment_id": "aaa",
        "comment_layer": 5,
        "order_num": 0,
        "create_time": "2021-09-17 15:34:07",
        "update_time": "2021-09-17 15:34:07",
        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg"
    },
    {
        "uid": "a2e79d22-1789-11ec-9d4c-b06ebf5f2d71",
        "comment_content": "五级评论4 cheny",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "to_comment_id": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
        "root_comment_id": "aaa",
        "comment_layer": 5,
        "order_num": 0,
        "create_time": "2021-09-17 15:34:02",
        "update_time": "2021-09-17 15:34:02",
        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg"
    },
    {
        "uid": "9f38f4e2-1789-11ec-9d4c-b06ebf5f2d71",
        "comment_content": "五级评论3 cheny",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "to_comment_id": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
        "root_comment_id": "aaa",
        "comment_layer": 5,
        "order_num": 0,
        "create_time": "2021-09-17 15:33:56",
        "update_time": "2021-09-17 15:33:56",
        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg"
    },
    {
        "uid": "ddd",
        "comment_content": "一级评论4 xzz",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "commented_person_id": "",
        "to_comment_id": "",
        "root_comment_id": "",
        "comment_layer": 1,
        "order_num": 0,
        "create_time": "2021-09-17 15:32:57",
        "update_time": "2021-09-17 15:32:57",
        "comment_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
        "commented_person_profile": null
    },
    {
        "uid": "ccc",
        "comment_content": "一级评论3 cheny",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "commented_person_id": "",
        "to_comment_id": "",
        "root_comment_id": "",
        "comment_layer": 1,
        "order_num": 0,
        "create_time": "2021-09-17 15:32:53",
        "update_time": "2021-09-17 15:32:53",
        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
        "commented_person_profile": null
    },
    {
        "uid": "4964a86c-1789-11ec-9d4c-b06ebf5f2d71",
        "comment_content": "五级评论2 cheny",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "to_comment_id": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
        "root_comment_id": "aaa",
        "comment_layer": 5,
        "order_num": 0,
        "create_time": "2021-09-17 15:31:32",
        "update_time": "2021-09-17 15:31:32",
        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg"
    },
    {
        "uid": "45c315b3-1789-11ec-9d4c-b06ebf5f2d71",
        "comment_content": "五级评论1 cheny",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "to_comment_id": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
        "root_comment_id": "aaa",
        "comment_layer": 5,
        "order_num": 0,
        "create_time": "2021-09-17 15:31:26",
        "update_time": "2021-09-17 15:31:26",
        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg"
    },
    {
        "uid": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
        "comment_content": "四级评论3 xzz",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "to_comment_id": "eae65ab2-1788-11ec-9d4c-b06ebf5f2d71",
        "root_comment_id": "aaa",
        "comment_layer": 4,
        "order_num": 0,
        "create_time": "2021-09-17 15:29:59",
        "update_time": "2021-09-17 15:29:59",
        "comment_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
        "commented_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png"
    },
    {
        "uid": "0dd93461-1789-11ec-9d4c-b06ebf5f2d71",
        "comment_content": "四级评论2 xzz",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "to_comment_id": "eae65ab2-1788-11ec-9d4c-b06ebf5f2d71",
        "root_comment_id": "aaa",
        "comment_layer": 4,
        "order_num": 0,
        "create_time": "2021-09-17 15:29:52",
        "update_time": "2021-09-17 15:29:52",
        "comment_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
        "commented_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png"
    },
    {
        "uid": "0973cb33-1789-11ec-9d4c-b06ebf5f2d71",
        "comment_content": "四级评论1 xzz",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "to_comment_id": "eae65ab2-1788-11ec-9d4c-b06ebf5f2d71",
        "root_comment_id": "aaa",
        "comment_layer": 4,
        "order_num": 0,
        "create_time": "2021-09-17 15:29:45",
        "update_time": "2021-09-17 15:29:45",
        "comment_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
        "commented_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png"
    },
    {
        "uid": "eae65ab2-1788-11ec-9d4c-b06ebf5f2d71",
        "comment_content": "三级评论2 cheny",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "to_comment_id": "d1eb89be-1788-11ec-9d4c-b06ebf5f2d71",
        "root_comment_id": "aaa",
        "comment_layer": 3,
        "order_num": 0,
        "create_time": "2021-09-17 15:28:54",
        "update_time": "2021-09-17 15:28:54",
        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg"
    },
    {
        "uid": "e7741e2e-1788-11ec-9d4c-b06ebf5f2d71",
        "comment_content": "三级评论1 cheny",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "to_comment_id": "d1eb89be-1788-11ec-9d4c-b06ebf5f2d71",
        "root_comment_id": "aaa",
        "comment_layer": 3,
        "order_num": 0,
        "create_time": "2021-09-17 15:28:48",
        "update_time": "2021-09-17 15:28:48",
        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg"
    },
    {
        "uid": "d1eb89be-1788-11ec-9d4c-b06ebf5f2d71",
        "comment_content": "二级评论3 xzz",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "to_comment_id": "aaa",
        "root_comment_id": "aaa",
        "comment_layer": 2,
        "order_num": 0,
        "create_time": "2021-09-17 15:28:12",
        "update_time": "2021-09-17 15:28:12",
        "comment_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
        "commented_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png"
    },
    {
        "uid": "cb90279e-1788-11ec-9d4c-b06ebf5f2d71",
        "comment_content": "二级评论2 xzz",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "to_comment_id": "aaa",
        "root_comment_id": "aaa",
        "comment_layer": 2,
        "order_num": 0,
        "create_time": "2021-09-17 15:28:01",
        "update_time": "2021-09-17 15:28:01",
        "comment_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
        "commented_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png"
    },
    {
        "uid": "c80cca05-1788-11ec-9d4c-b06ebf5f2d71",
        "comment_content": "二级评论1 xzz",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "to_comment_id": "aaa",
        "root_comment_id": "aaa",
        "comment_layer": 2,
        "order_num": 0,
        "create_time": "2021-09-17 15:27:55",
        "update_time": "2021-09-17 15:27:55",
        "comment_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
        "commented_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png"
    },
    {
        "uid": "bbb",
        "comment_content": "一级评论2 xzz",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "commented_person_id": "",
        "to_comment_id": "",
        "root_comment_id": "",
        "comment_layer": 1,
        "order_num": 0,
        "create_time": "2021-09-17 15:26:52",
        "update_time": "2021-09-17 15:26:52",
        "comment_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
        "commented_person_profile": null
    },
    {
        "uid": "aaa",
        "comment_content": "一级评论1 cheny",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "commented_person_id": "",
        "to_comment_id": "",
        "root_comment_id": "",
        "comment_layer": 1,
        "order_num": 0,
        "create_time": "2021-09-17 15:26:46",
        "update_time": "2021-09-17 15:26:46",
        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
        "commented_person_profile": null
    }
]

const resultArrTest = [
    {
        "uid": "ddd",
        "comment_content": "一级评论4 xzz",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "commented_person_id": "",
        "to_comment_id": "",
        "root_comment_id": "",
        "comment_layer": 1,
        "order_num": 0,
        "create_time": "2021-09-17 15:32:57",
        "update_time": "2021-09-17 15:32:57",
        "comment_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
        "commented_person_profile": null,
        "children": []
    },
    {
        "uid": "ccc",
        "comment_content": "一级评论3 cheny",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "commented_person_id": "",
        "to_comment_id": "",
        "root_comment_id": "",
        "comment_layer": 1,
        "order_num": 0,
        "create_time": "2021-09-17 15:32:53",
        "update_time": "2021-09-17 15:32:53",
        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
        "commented_person_profile": null,
        "children": []
    },
    {
        "uid": "bbb",
        "comment_content": "一级评论2 xzz",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
        "commented_person_id": "",
        "to_comment_id": "",
        "root_comment_id": "",
        "comment_layer": 1,
        "order_num": 0,
        "create_time": "2021-09-17 15:26:52",
        "update_time": "2021-09-17 15:26:52",
        "comment_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
        "commented_person_profile": null,
        "children": []
    },
    {
        "uid": "aaa",
        "comment_content": "一级评论1 cheny",
        "comment_source": 1,
        "source_id": "-1",
        "comment_status": 1,
        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
        "commented_person_id": "",
        "to_comment_id": "",
        "root_comment_id": "",
        "comment_layer": 1,
        "order_num": 0,
        "create_time": "2021-09-17 15:26:46",
        "update_time": "2021-09-17 15:26:46",
        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
        "commented_person_profile": null,
        "children": [
            {
                "uid": "d1eb89be-1788-11ec-9d4c-b06ebf5f2d71",
                "comment_content": "二级评论3 xzz",
                "comment_source": 1,
                "source_id": "-1",
                "comment_status": 1,
                "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
                "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
                "to_comment_id": "aaa",
                "root_comment_id": "aaa",
                "comment_layer": 2,
                "order_num": 0,
                "create_time": "2021-09-17 15:28:12",
                "update_time": "2021-09-17 15:28:12",
                "comment_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
                "commented_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
                "children": [
                    {
                        "uid": "eae65ab2-1788-11ec-9d4c-b06ebf5f2d71",
                        "comment_content": "三级评论2 cheny",
                        "comment_source": 1,
                        "source_id": "-1",
                        "comment_status": 1,
                        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
                        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
                        "to_comment_id": "d1eb89be-1788-11ec-9d4c-b06ebf5f2d71",
                        "root_comment_id": "aaa",
                        "comment_layer": 3,
                        "order_num": 0,
                        "create_time": "2021-09-17 15:28:54",
                        "update_time": "2021-09-17 15:28:54",
                        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
                        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
                        "children": [
                            {
                                "uid": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
                                "comment_content": "四级评论3 xzz",
                                "comment_source": 1,
                                "source_id": "-1",
                                "comment_status": 1,
                                "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
                                "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
                                "to_comment_id": "eae65ab2-1788-11ec-9d4c-b06ebf5f2d71",
                                "root_comment_id": "aaa",
                                "comment_layer": 4,
                                "order_num": 0,
                                "create_time": "2021-09-17 15:29:59",
                                "update_time": "2021-09-17 15:29:59",
                                "comment_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
                                "commented_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
                                "children": [
                                    {
                                        "uid": "bdf66fe1-1789-11ec-9d4c-b06ebf5f2d71",
                                        "comment_content": "五级评论10 cheny",
                                        "comment_source": 1,
                                        "source_id": "-1",
                                        "comment_status": 1,
                                        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
                                        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
                                        "to_comment_id": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
                                        "root_comment_id": "aaa",
                                        "comment_layer": 5,
                                        "order_num": 0,
                                        "create_time": "2021-09-17 15:34:48",
                                        "update_time": "2021-09-17 15:34:48",
                                        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
                                        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
                                        "children": []
                                    },
                                    {
                                        "uid": "ba35bf7d-1789-11ec-9d4c-b06ebf5f2d71",
                                        "comment_content": "五级评论9 cheny",
                                        "comment_source": 1,
                                        "source_id": "-1",
                                        "comment_status": 1,
                                        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
                                        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
                                        "to_comment_id": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
                                        "root_comment_id": "aaa",
                                        "comment_layer": 5,
                                        "order_num": 0,
                                        "create_time": "2021-09-17 15:34:41",
                                        "update_time": "2021-09-17 15:34:41",
                                        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
                                        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
                                        "children": []
                                    },
                                    {
                                        "uid": "b0fb355e-1789-11ec-9d4c-b06ebf5f2d71",
                                        "comment_content": "五级评论8 cheny",
                                        "comment_source": 1,
                                        "source_id": "-1",
                                        "comment_status": 1,
                                        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
                                        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
                                        "to_comment_id": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
                                        "root_comment_id": "aaa",
                                        "comment_layer": 5,
                                        "order_num": 0,
                                        "create_time": "2021-09-17 15:34:26",
                                        "update_time": "2021-09-17 15:34:26",
                                        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
                                        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
                                        "children": []
                                    },
                                    {
                                        "uid": "ad212e03-1789-11ec-9d4c-b06ebf5f2d71",
                                        "comment_content": "五级评论7 cheny",
                                        "comment_source": 1,
                                        "source_id": "-1",
                                        "comment_status": 1,
                                        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
                                        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
                                        "to_comment_id": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
                                        "root_comment_id": "aaa",
                                        "comment_layer": 5,
                                        "order_num": 0,
                                        "create_time": "2021-09-17 15:34:19",
                                        "update_time": "2021-09-17 15:34:19",
                                        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
                                        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
                                        "children": []
                                    },
                                    {
                                        "uid": "aa157739-1789-11ec-9d4c-b06ebf5f2d71",
                                        "comment_content": "五级评论6 cheny",
                                        "comment_source": 1,
                                        "source_id": "-1",
                                        "comment_status": 1,
                                        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
                                        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
                                        "to_comment_id": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
                                        "root_comment_id": "aaa",
                                        "comment_layer": 5,
                                        "order_num": 0,
                                        "create_time": "2021-09-17 15:34:14",
                                        "update_time": "2021-09-17 15:34:14",
                                        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
                                        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
                                        "children": []
                                    },
                                    {
                                        "uid": "a5e23450-1789-11ec-9d4c-b06ebf5f2d71",
                                        "comment_content": "五级评论5 cheny",
                                        "comment_source": 1,
                                        "source_id": "-1",
                                        "comment_status": 1,
                                        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
                                        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
                                        "to_comment_id": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
                                        "root_comment_id": "aaa",
                                        "comment_layer": 5,
                                        "order_num": 0,
                                        "create_time": "2021-09-17 15:34:07",
                                        "update_time": "2021-09-17 15:34:07",
                                        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
                                        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
                                        "children": []
                                    },
                                    {
                                        "uid": "a2e79d22-1789-11ec-9d4c-b06ebf5f2d71",
                                        "comment_content": "五级评论4 cheny",
                                        "comment_source": 1,
                                        "source_id": "-1",
                                        "comment_status": 1,
                                        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
                                        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
                                        "to_comment_id": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
                                        "root_comment_id": "aaa",
                                        "comment_layer": 5,
                                        "order_num": 0,
                                        "create_time": "2021-09-17 15:34:02",
                                        "update_time": "2021-09-17 15:34:02",
                                        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
                                        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
                                        "children": []
                                    },
                                    {
                                        "uid": "9f38f4e2-1789-11ec-9d4c-b06ebf5f2d71",
                                        "comment_content": "五级评论3 cheny",
                                        "comment_source": 1,
                                        "source_id": "-1",
                                        "comment_status": 1,
                                        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
                                        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
                                        "to_comment_id": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
                                        "root_comment_id": "aaa",
                                        "comment_layer": 5,
                                        "order_num": 0,
                                        "create_time": "2021-09-17 15:33:56",
                                        "update_time": "2021-09-17 15:33:56",
                                        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
                                        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
                                        "children": []
                                    },
                                    {
                                        "uid": "4964a86c-1789-11ec-9d4c-b06ebf5f2d71",
                                        "comment_content": "五级评论2 cheny",
                                        "comment_source": 1,
                                        "source_id": "-1",
                                        "comment_status": 1,
                                        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
                                        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
                                        "to_comment_id": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
                                        "root_comment_id": "aaa",
                                        "comment_layer": 5,
                                        "order_num": 0,
                                        "create_time": "2021-09-17 15:31:32",
                                        "update_time": "2021-09-17 15:31:32",
                                        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
                                        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
                                        "children": []
                                    },
                                    {
                                        "uid": "45c315b3-1789-11ec-9d4c-b06ebf5f2d71",
                                        "comment_content": "五级评论1 cheny",
                                        "comment_source": 1,
                                        "source_id": "-1",
                                        "comment_status": 1,
                                        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
                                        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
                                        "to_comment_id": "1201d5f1-1789-11ec-9d4c-b06ebf5f2d71",
                                        "root_comment_id": "aaa",
                                        "comment_layer": 5,
                                        "order_num": 0,
                                        "create_time": "2021-09-17 15:31:26",
                                        "update_time": "2021-09-17 15:31:26",
                                        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
                                        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "uid": "0dd93461-1789-11ec-9d4c-b06ebf5f2d71",
                                "comment_content": "四级评论2 xzz",
                                "comment_source": 1,
                                "source_id": "-1",
                                "comment_status": 1,
                                "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
                                "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
                                "to_comment_id": "eae65ab2-1788-11ec-9d4c-b06ebf5f2d71",
                                "root_comment_id": "aaa",
                                "comment_layer": 4,
                                "order_num": 0,
                                "create_time": "2021-09-17 15:29:52",
                                "update_time": "2021-09-17 15:29:52",
                                "comment_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
                                "commented_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
                                "children": []
                            },
                            {
                                "uid": "0973cb33-1789-11ec-9d4c-b06ebf5f2d71",
                                "comment_content": "四级评论1 xzz",
                                "comment_source": 1,
                                "source_id": "-1",
                                "comment_status": 1,
                                "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
                                "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
                                "to_comment_id": "eae65ab2-1788-11ec-9d4c-b06ebf5f2d71",
                                "root_comment_id": "aaa",
                                "comment_layer": 4,
                                "order_num": 0,
                                "create_time": "2021-09-17 15:29:45",
                                "update_time": "2021-09-17 15:29:45",
                                "comment_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
                                "commented_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
                                "children": []
                            }
                        ]
                    },
                    {
                        "uid": "e7741e2e-1788-11ec-9d4c-b06ebf5f2d71",
                        "comment_content": "三级评论1 cheny",
                        "comment_source": 1,
                        "source_id": "-1",
                        "comment_status": 1,
                        "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
                        "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
                        "to_comment_id": "d1eb89be-1788-11ec-9d4c-b06ebf5f2d71",
                        "root_comment_id": "aaa",
                        "comment_layer": 3,
                        "order_num": 0,
                        "create_time": "2021-09-17 15:28:48",
                        "update_time": "2021-09-17 15:28:48",
                        "comment_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
                        "commented_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
                        "children": []
                    }
                ]
            },
            {
                "uid": "cb90279e-1788-11ec-9d4c-b06ebf5f2d71",
                "comment_content": "二级评论2 xzz",
                "comment_source": 1,
                "source_id": "-1",
                "comment_status": 1,
                "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
                "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
                "to_comment_id": "aaa",
                "root_comment_id": "aaa",
                "comment_layer": 2,
                "order_num": 0,
                "create_time": "2021-09-17 15:28:01",
                "update_time": "2021-09-17 15:28:01",
                "comment_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
                "commented_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
                "children": []
            },
            {
                "uid": "c80cca05-1788-11ec-9d4c-b06ebf5f2d71",
                "comment_content": "二级评论1 xzz",
                "comment_source": 1,
                "source_id": "-1",
                "comment_status": 1,
                "comment_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3b",
                "commented_person_id": "99304890-146a-11ec-8f9c-d7eddd69ac3a",
                "to_comment_id": "aaa",
                "root_comment_id": "aaa",
                "comment_layer": 2,
                "order_num": 0,
                "create_time": "2021-09-17 15:27:55",
                "update_time": "2021-09-17 15:27:55",
                "comment_person_profile": "http://picture.moguit.cn//blog/admin/jpg/2021/5/24/1621842227679.jpg",
                "commented_person_profile": "https://portrait.gitee.com/uploads/avatars/user/517/1553068_hrbust_cheny_1617868573.png",
                "children": []
            }
        ]
    }
]

/**
 * @description 获取各个层级的评论数据，保存在map中
 * @param {Array} allComments 所有评论数据
 * @return {Map<number, *[]>} levelDataMap 处理后的结果map
 */
function getEveryLevelData(allComments) {
    const levelDataMap = new Map([
        [1, []],
        [2, []],
        [3, []],
        [4, []],
        [5, []]
    ])

    allComments.map(item => {
        switch (item.comment_layer) {
            case 1:
                levelDataMap.get(1).push(item)
                break
            case 2:
                levelDataMap.get(2).push(item)
                break
            case 3:
                levelDataMap.get(3).push(item)
                break
            case 4:
                levelDataMap.get(4).push(item)
                break
            case 5:
                levelDataMap.get(5).push(item)
                break
        }
    })

    return levelDataMap
}

/**
 * @description 将数据son转换为map，key是数组father的uid
 * @param {Array} parent 待转换的数组
 * @param {Array} son 待转换的数组
 * @return {Map<any, any>} tempMap 返回的map
 */
function convertToMap(parent, son) {

    // 获取所有key
    const keys = parent.map(item => item.uid)
    // 声明map
    let tempMap = new Map()
    // 初始化map
    for (const key of keys) {
        tempMap.set(key, [])
    }
    // 往map里塞数据
    son.map(item => {
        if (keys.includes(item.to_comment_id)) {

            tempMap.get(item.to_comment_id).push({
                ...item,
                children: []
            })
        }
    })

    return tempMap
}


/**
 * @description 将所有子集评论塞到父级评论下，一共有五层数据
 * @param {Map<any, any>} everyLevelCommentsMap
 * @return {Array} resultArr 转换为树形结构的评论列表
 */
function convertCommentListToTree(everyLevelCommentsMap) {
    const resultArr = []

    const level2Map = convertToMap(everyLevelCommentsMap.get(1), everyLevelCommentsMap.get(2))
    const level3Map = convertToMap(everyLevelCommentsMap.get(2), everyLevelCommentsMap.get(3))
    const level4Map = convertToMap(everyLevelCommentsMap.get(3), everyLevelCommentsMap.get(4))
    const level5Map = convertToMap(everyLevelCommentsMap.get(4), everyLevelCommentsMap.get(5))

    // 1层
    everyLevelCommentsMap.get(1).map(item => {
        let leve1Obj = {
            ...item,
            children: [],
        }
        if (level2Map.has(item.uid)) {
            // 2层
            leve1Obj.children = level2Map.get(item.uid)

            leve1Obj.children.map(item => {
                if (level3Map.has(item.uid)) {
                    // 3层
                    item.children = level3Map.get(item.uid)

                    item.children.map(item => {
                        if (level4Map.has(item.uid)) {
                            // 4层
                            item.children = level4Map.get(item.uid)

                            item.children.map(item => {
                                if (level5Map.has(item.uid)) {
                                    // 5层
                                    item.children = level5Map.get(item.uid)

                                }
                            })

                        }
                    })
                }
            })
        }

        resultArr.push(leve1Obj)

    })

    return resultArr

}

/**
 * @description 扁平化树形评论，为了分页展示
 * @param {Array} commentArr 树形评论，共有5层
 * @param {Array} resultArr 递归传入的当前结果值，最终遍历结束返回出去
 * @return {Array} resultArr 扁平化后的评论列表
 */
function flatCommentArr(commentArr, resultArr = []) {

    commentArr.map(item => {
        let tempObj = {}
        // push除了children的所有字段
        Object.keys(item).map(key => {
            if (key !== 'children') {
                tempObj[key] = item[key]
            }
        })
        resultArr.push(tempObj)

        // 递归push数据，扁平化
        if (item.children.length > 0) {
            flatCommentArr(item.children, resultArr)
        }

    })

    return resultArr
}


/**
 * @description 对评论数据list重新排序
 * @param {Array} list 数据库请求过来的所有评论列表，已经按照时间降序排好序了
 * @return {Array} 重新排序的评论列表，可以达到gitee的效果
 *
 * 仿写的gitee的评论列表，每次分页加载的数据条数包括子评论，
 * 那么我就把数据库的所有评论先转换为对应的树形结构，
 * 然后再扁平化，这样每次分页取数据就直接从扁平化后的列表中取即可，
 * 然后将取除的列表再转换为树形结构，就达到了gitee的效果
 *
 * 1、先找到各层级的评论
 *      1.1、    1层数据 comment_layer = 1
 *      1.2、    2层数据 comment_layer = 2
 *      1.3、    3层数据 comment_layer = 3
 *      1.4、    4层数据 comment_layer = 4
 *      1.5、    5层数据 comment_layer = 5
 * 2、将子集评论塞到父级评论下
 * 3、再将树形结构扁平化，变成列表结构，这样就可以根据这个列表进行分页了
 */

export const groupCommentList = function (list) {
    // 1、找到各层级的评论
    const everyLevelCommentsMap = getEveryLevelData(list)
    // 2、将子集评论递归塞到父级评论下
    const commentTree = convertCommentListToTree(everyLevelCommentsMap)
    // 3、扁平化数组 变成一维
    return flatCommentArr(commentTree)
}


/**
 * @description 将扁平化后的数据转换为树形结构
 * @param {Array} list 扁平化完的评论列表，已经满足要求了
 * @return {Array} 最终渲染到前台的树形结构评论
 *
 */
export const flatCommentListToTree = (list) => {
    // 1、找到各层级的评论
    const everyLevelCommentsMap = getEveryLevelData(list)
    // 2、将子集评论递归塞到父级评论下
    return convertCommentListToTree(everyLevelCommentsMap)
}

/*================= 评论数据分页处理 end =====================*/

