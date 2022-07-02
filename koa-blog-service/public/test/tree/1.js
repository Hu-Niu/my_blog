const specialSortList = [
    {
        uid: '4b42fbb0-00be-11ec-8298-35977d300a7f',
        special_sort_name: '前端',
        order_num: 1,
        create_time: '2021-08-19 15:23:04',
        update_time: '2021-08-19 15:23:04'
    },
    {
        uid: '4ee9bc90-00be-11ec-8298-35977d300a7f',
        special_sort_name: '后端',
        order_num: 2,
        create_time: '2021-08-19 15:23:10',
        update_time: '2021-08-19 15:23:10'
    },
    {
        uid: '51d23680-00be-11ec-8298-35977d300a7f',
        special_sort_name: '大数据',
        order_num: 3,
        create_time: '2021-08-19 15:23:15',
        update_time: '2021-08-19 15:23:15'
    }
]

const specialList = [
    {
        uid: '7c894580-00be-11ec-8298-35977d300a7f',
        special_name: '现代 JavaScript 教程',
        special_summary: '以最新的 JavaScript 标准为基准。通过简单但足够详细的内容，为你讲解从基础到高阶的 JavaScript 相关知识。',
        cover_url: 'http://localhost:20517/upload/jpeg/2021-08-11/751a2e20-fa80-11eb-a6d9-4d1728b0fe77.jpeg',
        special_sort_id: '4b42fbb0-00be-11ec-8298-35977d300a7f',
        clicks: 0,
        order_num: 1,
        create_time: '2021-08-19 15:24:27',
        update_time: '2021-08-19 15:24:27'
    },
    {
        uid: 'a767b2a0-00be-11ec-8298-35977d300a7f',
        special_name: 'CSS大汇总',
        special_summary: '所有css的相关技术整理',
        cover_url: 'http://localhost:20517/upload/jpeg/2021-08-09/ce5b7a80-f8db-11eb-b47b-474559742541.jpeg',
        special_sort_id: '4b42fbb0-00be-11ec-8298-35977d300a7f',
        clicks: 0,
        order_num: 2,
        create_time: '2021-08-19 15:25:39',
        update_time: '2021-08-19 15:25:39'
    },
    {
        uid: 'aaa',
        special_name: 'JVM',
        special_summary: '以最新的 JavaScript 标准为基准。通过简单但足够详细的内容，为你讲解从基础到高阶的 JavaScript 相关知识。',
        cover_url: 'http://localhost:20517/upload/jpeg/2021-08-11/751a2e20-fa80-11eb-a6d9-4d1728b0fe77.jpeg',
        special_sort_id: '4ee9bc90-00be-11ec-8298-35977d300a7f',
        clicks: 0,
        order_num: 1,
        create_time: '2021-08-19 15:24:27',
        update_time: '2021-08-19 15:24:27'
    },
    {
        uid: 'bbb',
        special_name: 'JAVA',
        special_summary: '所有css的相关技术整理',
        cover_url: 'http://localhost:20517/upload/jpeg/2021-08-09/ce5b7a80-f8db-11eb-b47b-474559742541.jpeg',
        special_sort_id: '4ee9bc90-00be-11ec-8298-35977d300a7f',
        clicks: 0,
        order_num: 2,
        create_time: '2021-08-19 15:25:39',
        update_time: '2021-08-19 15:25:39'
    }
]

const specialPartList = [
    {
        uid: 'c09773a0-00be-11ec-8298-35977d300a7f',
        part_name: '第一部分',
        part_title: 'JavaScript 编程语言',
        part_summary: '在这儿我们将从头开始学习 JavaScript，也会学习 OOP 等相关高级概念。  本教程专注于语言本身，我们默认使用最小环境。',
        special_id: '7c894580-00be-11ec-8298-35977d300a7f',
        order_num: 1,
        create_time: '2021-08-19 15:26:21',
        update_time: '2021-08-19 15:26:21',
        special_name: '现代 JavaScript 教程'
    },
    {
        uid: 'd7403ba0-00be-11ec-8298-35977d300a7f',
        part_name: '第二部分',
        part_title: '浏览器：文档，事件，接口',
        part_summary: '学习如何管理浏览器页面：添加元素，操纵元素的大小和位置，动态创建接口并与访问者互动。',
        special_id: '7c894580-00be-11ec-8298-35977d300a7f',
        order_num: 2,
        create_time: '2021-08-19 15:26:59',
        update_time: '2021-08-19 15:26:59',
        special_name: '现代 JavaScript 教程'
    },
    {
        uid: 'e92f4c20-00be-11ec-8298-35977d300a7f',
        part_name: '第三部分',
        part_title: '其他文章',
        part_summary: '教程的前两部分未涉及的其他主题的内容列表。此处没有明确的层次结构，你可以按你需要的顺序阅读文章。',
        special_id: '7c894580-00be-11ec-8298-35977d300a7f',
        order_num: 3,
        create_time: '2021-08-19 15:27:29',
        update_time: '2021-08-19 15:27:29',
        special_name: '现代 JavaScript 教程'
    }
]

const specialPartSectionList = [
    {
        uid: '03bc2c20-00bf-11ec-8298-35977d300a7f',
        section_title: '简介',
        special_part_id: 'c09773a0-00be-11ec-8298-35977d300a7f',
        order_num: 1,
        create_time: '2021-08-19 15:28:14',
        update_time: '2021-08-19 15:28:14',
        part_name: '第一部分',
        special_id: '7c894580-00be-11ec-8298-35977d300a7f',
        special_name: '现代 JavaScript 教程'
    },
    {
        uid: '0fa6b5a0-00bf-11ec-8298-35977d300a7f',
        section_title: 'JavaScript 基础知识',
        special_part_id: 'c09773a0-00be-11ec-8298-35977d300a7f',
        order_num: 2,
        create_time: '2021-08-19 15:28:34',
        update_time: '2021-08-19 15:28:34',
        part_name: '第一部分',
        special_id: '7c894580-00be-11ec-8298-35977d300a7f',
        special_name: '现代 JavaScript 教程'
    },
    {
        uid: '1b8ece20-00bf-11ec-8298-35977d300a7f',
        section_title: '代码质量',
        special_part_id: 'c09773a0-00be-11ec-8298-35977d300a7f',
        order_num: 3,
        create_time: '2021-08-19 15:28:54',
        update_time: '2021-08-19 15:28:54',
        part_name: '第一部分',
        special_id: '7c894580-00be-11ec-8298-35977d300a7f',
        special_name: '现代 JavaScript 教程'
    },
    {
        uid: '25815830-00bf-11ec-8298-35977d300a7f',
        section_title: 'Object（对象）：基础知识',
        special_part_id: 'c09773a0-00be-11ec-8298-35977d300a7f',
        order_num: 4,
        create_time: '2021-08-19 15:29:10',
        update_time: '2021-08-19 15:29:10',
        part_name: '第一部分',
        special_id: '7c894580-00be-11ec-8298-35977d300a7f',
        special_name: '现代 JavaScript 教程'
    },
    {
        uid: '35d619a0-00bf-11ec-8298-35977d300a7f',
        section_title: 'Document',
        special_part_id: 'd7403ba0-00be-11ec-8298-35977d300a7f',
        order_num: 1,
        create_time: '2021-08-19 15:29:38',
        update_time: '2021-08-19 15:29:38',
        part_name: '第二部分',
        special_id: '7c894580-00be-11ec-8298-35977d300a7f',
        special_name: '现代 JavaScript 教程'
    },
    {
        uid: '3d38f820-00bf-11ec-8298-35977d300a7f',
        section_title: '事件简介',
        special_part_id: 'd7403ba0-00be-11ec-8298-35977d300a7f',
        order_num: 2,
        create_time: '2021-08-19 15:29:50',
        update_time: '2021-08-19 15:29:50',
        part_name: '第二部分',
        special_id: '7c894580-00be-11ec-8298-35977d300a7f',
        special_name: '现代 JavaScript 教程'
    },
    {
        uid: '455a1d90-00bf-11ec-8298-35977d300a7f',
        section_title: 'UI 事件',
        special_part_id: 'd7403ba0-00be-11ec-8298-35977d300a7f',
        order_num: 3,
        create_time: '2021-08-19 15:30:04',
        update_time: '2021-08-19 15:30:04',
        part_name: '第二部分',
        special_id: '7c894580-00be-11ec-8298-35977d300a7f',
        special_name: '现代 JavaScript 教程'
    },
    {
        uid: '5b754b90-00bf-11ec-8298-35977d300a7f',
        section_title: 'Frame 和 window',
        special_part_id: 'e92f4c20-00be-11ec-8298-35977d300a7f',
        order_num: 1,
        create_time: '2021-08-19 15:30:41',
        update_time: '2021-08-19 15:30:41',
        part_name: '第三部分',
        special_id: '7c894580-00be-11ec-8298-35977d300a7f',
        special_name: '现代 JavaScript 教程'
    },
    {
        uid: '615b4e10-00bf-11ec-8298-35977d300a7f',
        section_title: '二进制数据，文件',
        special_part_id: 'e92f4c20-00be-11ec-8298-35977d300a7f',
        order_num: 2,
        create_time: '2021-08-19 15:30:51',
        update_time: '2021-08-19 15:30:51',
        part_name: '第三部分',
        special_id: '7c894580-00be-11ec-8298-35977d300a7f',
        special_name: '现代 JavaScript 教程'
    }
]

module.exports = {
    specialSortList,
    specialList,
    specialPartList,
    specialPartSectionList,
}

