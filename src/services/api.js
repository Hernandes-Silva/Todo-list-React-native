import axios from 'axios'
const api = axios.create({
    baseURL: "https://silva-todo-api.herokuapp.com/"
})
export default api