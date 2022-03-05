import axios from 'axios'
// this.axios('/Estado/get_estado/', 'get', {
//     callback: ({status, lista}) => {
//         this.id = lista
//     }
// })
export default{
    methods: 
    {
        axios(url, method, options = {}) 
        {
            const request = axios.create({
                baseURL: 'http://localhost:3000/',
                // headers: {
                //     Authorization: 'token'
                // }
            })
            request({
                method,
                url,
                ...options
            })
            .then((response) => 
            {
                if (options.callback) {
                    options.callback(response.data)
                }
            })
            // .catch((retorno) => 
            // {
            // })
            // .finally((retorno) => 
            // {
            // })
        }
    }
}