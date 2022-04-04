const sortByAZ = (items) => {
    const newItems = items
    newItems.sort((a, b) => {
        const nameCourseA = a.tenKhoaHoc.toUpperCase();
        const nameCourseB = b.tenKhoaHoc.toUpperCase();
        return nameCourseA > nameCourseB ? 1: -1;
    });
    return newItems
}

const sortByPrice = (items, desc = false) => {
    const newItems = items
    newItems.sort((a, b) => {
        if(desc) {
            return a.fee < b.fee ? 1: -1;
        }
        return a.fee > b.fee ? 1: -1;
    })
    
    return newItems
}


export {
    sortByAZ,
    sortByPrice
}