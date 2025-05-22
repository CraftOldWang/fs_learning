import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = ()=>{
    const request = axios.get(baseUrl)
    const wrongPerson = {id:100, name: "non-exist-person" , number: "131-313-1"}
    return request.then(response => response.data.concat(wrongPerson))
}

const create = (newPerson) => {
    const request = axios.post(baseUrl,newPerson)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return  request // 似乎没有数据 .data？？ 看看返回什么
}

export default {getAll, create, remove}