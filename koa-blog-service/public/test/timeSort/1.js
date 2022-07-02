let result = [
    {
        "uid": "111",
        "file_original_name": "1.jpg",
        "file_current_name": "e58bd4b0-e856-11eb-a751-2fe02825aaa2.jpg",
        "file_suffix": "jpg",
        "file_sort_id": "db3401d0-e474-11eb-aadc-85ae7a2278a1",
        "file_sort_name": "生活",
        "create_time": "2021-07-19 14:02:28",
        "update_time": "2021-07-19 14:02:28"
    },
    {
        "uid": "222",
        "file_original_name": "3.jpeg",
        "file_current_name": "e591c820-e856-11eb-a751-2fe02825aaa2.jpeg",
        "file_suffix": "jpeg",
        "file_sort_id": "db3401d0-e474-11eb-aadc-85ae7a2278a1",
        "file_sort_name": "生活",
        "create_time": "2021-07-19 14:02:28",
        "update_time": "2021-07-19 14:02:28"
    },
    {
        "uid": "333",
        "file_original_name": "1.jpeg",
        "file_current_name": "e58b8690-e856-11eb-a751-2fe02825aaa2.jpeg",
        "file_suffix": "jpeg",
        "file_sort_id": "db3401d0-e474-11eb-aadc-85ae7a2278a1",
        "file_sort_name": "生活",
        "create_time": "2021-07-19 14:02:28",
        "update_time": "2021-07-19 14:02:28"
    },
    {
        "uid": "444",
        "file_original_name": "3.jpg",
        "file_current_name": "e5926460-e856-11eb-a751-2fe02825aaa2.jpg",
        "file_suffix": "jpg",
        "file_sort_id": "db3401d0-e474-11eb-aadc-85ae7a2278a1",
        "file_sort_name": "生活",
        "create_time": "2021-07-19 14:02:28",
        "update_time": "2021-07-19 14:02:28"
    },
    {
        "uid": "555",
        "file_original_name": "2.jpg",
        "file_current_name": "e5939ce0-e856-11eb-a751-2fe02825aaa2.jpg",
        "file_suffix": "jpg",
        "file_sort_id": "db3401d0-e474-11eb-aadc-85ae7a2278a1",
        "file_sort_name": "生活",
        "create_time": "2021-07-19 14:02:28",
        "update_time": "2021-07-19 14:02:28"
    },
    {
        "uid": "e59bda40-e856-11eb-a751-2fe02825aaa2",
        "file_original_name": "2.jpeg",
        "file_current_name": "e59bda40-e856-11eb-a751-2fe02825aaa2.jpeg",
        "file_suffix": "jpeg",
        "file_sort_id": "db3401d0-e474-11eb-aadc-85ae7a2278a1",
        "file_sort_name": "生活",
        "create_time": "2021-07-19 14:02:28",
        "update_time": "2021-07-19 14:02:28"
    },
    {
        "uid": "e59f83c0-e856-11eb-a751-2fe02825aaa2",
        "file_original_name": "5.jpeg",
        "file_current_name": "e59f83c0-e856-11eb-a751-2fe02825aaa2.jpeg",
        "file_suffix": "jpeg",
        "file_sort_id": "db3401d0-e474-11eb-aadc-85ae7a2278a1",
        "file_sort_name": "生活",
        "create_time": "2021-07-18 14:02:28",
        "update_time": "2021-07-18 14:02:28"
    },
    {
        "uid": "e5a04710-e856-11eb-a751-2fe02825aaa2",
        "file_original_name": "4.jpeg",
        "file_current_name": "e5a04710-e856-11eb-a751-2fe02825aaa2.jpeg",
        "file_suffix": "jpeg",
        "file_sort_id": "db3401d0-e474-11eb-aadc-85ae7a2278a1",
        "file_sort_name": "生活",
        "create_time": "2021-07-18 14:02:28",
        "update_time": "2021-07-18 14:02:28"
    },
    {
        "uid": "e5a4daf0-e856-11eb-a751-2fe02825aaa2",
        "file_original_name": "7.jpeg",
        "file_current_name": "e5a4daf0-e856-11eb-a751-2fe02825aaa2.jpeg",
        "file_suffix": "jpeg",
        "file_sort_id": "db3401d0-e474-11eb-aadc-85ae7a2278a1",
        "file_sort_name": "生活",
        "create_time": "2021-07-18 14:02:28",
        "update_time": "2021-07-18 14:02:28"
    },
    {
        "uid": "e5a50200-e856-11eb-a751-2fe02825aaa2",
        "file_original_name": "6.jpeg",
        "file_current_name": "e5a50200-e856-11eb-a751-2fe02825aaa2.jpeg",
        "file_suffix": "jpeg",
        "file_sort_id": "db3401d0-e474-11eb-aadc-85ae7a2278a1",
        "file_sort_name": "生活",
        "create_time": "2021-07-18 14:02:28",
        "update_time": "2021-07-18 14:02:28"
    }
]

/*let arr = [
    {
        uploadTime: '2021-07-19',
        files: [
            {
                fileUrl: `http://localhost:20517/upload/png/2021-07-19/900b8e40-e856-11eb-a751-2fe02825aaa2.png`,
                fileName: '',
                fileMarkDown: '',
            },
        ]
    }
]*/
function handleFileData(fileList) {
    let result = fileList.reduce((prev, current) => {

        let file = {
            fileId: current.uid,
            fileUrl: `http://localhost:20517/upload/${current.file_suffix}/${current.create_time.split(' ')[0]}/${current.file_current_name}`,
            fileName: current.file_original_name,
            fileMarkDown: '',
        }

        let findIndex = prev.findIndex(item => item.uploadTime.split(' ')[0] === current.create_time.split(' ')[0])

        // 没找到，说明不是同一天上传的文件，另起炉灶，新push一条数据到数组中
        if (findIndex === -1) {
            let tempObj = {
                uploadTime: current.create_time,
                files: [file]
            }
            prev.push(tempObj)
        }else { // 找到了，说明是同一天的数据，push到当天数据的files字段里
            prev[findIndex].files.push(file)
        }
        return prev

    }, [])

    return result
}
console.log(handleFileData(result),'handleFileData(result)')
