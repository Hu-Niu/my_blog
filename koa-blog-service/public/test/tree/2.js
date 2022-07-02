const {
    specialSortList,
    specialList,
    specialPartList,
    specialPartSectionList,
} = require('./1')

let resultArr = [] // 存放最终的结果

// 1
specialSortList.map((sort, sortIndex) => {
    let sortObj = {
        id: sort.uid,
        label: sort.special_sort_name,
        order: sort.order_num,
        isSpecialSort: true,
        children: []
    }
    // 2
    specialList.map((special, specialIndex) => {
        let specialObj = {
            id: special.uid,
            label: special.special_name,
            order: special.order_num,
            isSpecial: true,
            children: []
        }
        if (special.special_sort_id === sortObj.id) {
            sortObj.children.push(specialObj)
        }

        // 3
        specialPartList.map((part, partIndex) => {
            let partObj = {
                id: part.uid,
                label: part.part_name,
                order: part.order_num,
                isSpecialPart: true,
                children: []
            }
            if (part.special_id === specialObj.id) {
                specialObj.children.push(partObj)
            }

            // 4
            specialPartSectionList.map((section, sectionIndex) => {
                let sectionObj = {
                    id: section.uid,
                    label: section.section_title,
                    order: section.order_num,
                    isSpecialSection: true,
                    children: []
                }
                if (section.special_part_id === partObj.id) {
                    partObj.children.push(sectionObj)
                }
            })
        })
    })

    resultArr.push(sortObj)
})

console.log(JSON.stringify(resultArr, null, 4))


