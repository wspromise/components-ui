import axios from 'axios'
import { message } from 'ant-design-vue'
const apiBaseURL = '/api/'

axios.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    (response) => {
        if (response.data.code === 200) {
            return response.data.data
        } else {
            return false
        }

    },
    (error) => {
        if (error.message) {
            message.error({
                content: error.message,
                duration: 5,
            })
        }

        return Promise.reject(error)
    }
)

export default {
    get (url, data, timeout = 100000) {
        return axios.get(
            apiBaseURL + url,
            {
                params: data,
            },
            { timeout }
        )
    },
    post (url, data, timeout = 70000) {
        return axios.post(apiBaseURL + url, data, { timeout })
    },
}