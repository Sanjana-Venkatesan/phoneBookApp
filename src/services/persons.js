import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/persons'

const getAll =()=> {
    const request=axios.get(baseUrl)
    return request.then(response =>response.data)
}

const create =newObj=>{
    const request=axios.post(baseUrl,newObj)
    return request.then(response=>response.data)
}

const deleteRec = (id)=>{
    const request= axios.delete(`${baseUrl}/${id}`)
    return request.then(response=>response.data)
}

export default {getAll,create,deleteRec}