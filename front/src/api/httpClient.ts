import axios from 'axios'

const config = {
    baseURL: 'https://task4-back-indol.vercel.app/',
    crossDomain: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': '*',
    },
    withCredentials: true,
}

export default axios.create(config)
