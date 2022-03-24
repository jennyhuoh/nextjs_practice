import axios from 'axios'

const instance = axios.create({ // 定義baseURL
    baseURL:'https://api.github.com'
})

instance.interceptors.request.use( // catch request得到的錯誤
    function(config){
        return config
    },
    function(error){
        console.log('request error')
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    function(response){
        return response;
    },
    function(error){
        if(error.response){
            switch(error.response.status){ // 定義不同response狀態碼需要反映的動作
                case 404:
                    console.log('頁面不存在')
                    alert('查無此使用者，請重新輸入～')
                    window.location.reload()
                    break
                case 500:
                    console.log('程式發生問題')
                    break
                default:
                    console.log('other error')
            }
        }
        return Promise.reject(error);
    }
)

// 所有api在這裏export
export const getUserRepos = (id, data) => instance.get(`/users/${id}/repos?per_page=100`, data)
export const getUserDetail = (id, data) => instance.get(`/users/${id}`, data)