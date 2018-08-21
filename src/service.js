const orignList = 'https://cnodejs.org/api/v1/topics';

const detailAPI = 'https://cnodejs.org/api/v1/topic';

// export const getList = (page = 1) => fetch(`${orignList}?page=${page}`).then((response) => response.json());

// export const getDetail = (id) => fetch(`${detailAPI}/${id}`).then((response) => response.json()); 

export const getList = (page = 1) => fetch('http://localhost:3000/').then(d => d.json()).then(data => {
    let aData = data.map(({id, name: title}) => {
        return {id, title}
    })
    return {data: aData}
});

export const getDetail = (id) => fetch('http://localhost:3000/').then(d => d.json()).then(data => {
    let { content } = data.find((val) => {
        return val.id = id;
    });
    return { data: { content } }
})