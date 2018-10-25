import axios from 'axios'

let base='http://localhost:3000'
let base1="/api"
export const Login=prams=>{
    
    return axios.post(`${base1}/user/login`,prams).then(res=>res.data)
}


export const checkUser=prams=>{
    
    return axios.post(`${base1}/user/check`,prams).then(res=>res.data)
}

export const setUp=prams=>{
    return axios.post(`${base1}/user/setup`,prams).then(res=>res.data)
}


