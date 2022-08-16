export const GLOBALTYPES = {
    AUTH: 'AUTH',
    COMPANY: 'COMPANY',
    ALERT: 'ALERT',
    STATUS: 'STATUS',
}

export const EditData = (stateList, data) => {
    const newData = stateList.map(item => 
        (item.id === data.id ? data : item)
    )
    return newData;
}

export const DeleteData = (stateList, data) => {
    const newData = stateList.filter(item => item.id !== data)
    return newData;
}