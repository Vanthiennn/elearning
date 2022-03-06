import axios from "axios";

const apiHome = axios.create({
    baseURL:"https://elearningnew.cybersoft.edu.vn/api/"
})

apiHome.interceptors.use((config) => {
    config.headers = {
        TokenCyborSoft:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyMCIsIkhldEhhblN0cmluZyI6IjE3LzA3LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY1ODAxNjAwMDAwMCIsIm5iZiI6MTYyNjcxNDAwMCwiZXhwIjoxNjU4MTYzNjAwfQ.CyAnnc8e2Rp7YmuJCdtEj-Wp7RvlDenB9Dad6NV0R20",
        Authorization:localStorage.getItem("UserHome") ? `Bear ${JSON.parse(localStorage.getItem("UserHome")).accessToken}` : ""
    }
    return config
})

const apiAdmin = axios.create({
    baseURL:"https://elearningnew.cybersoft.edu.vn/api/"
})

apiAdmin.interceptors.use((config) => {
    config.headers = {
        TokenCyborSoft:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyMCIsIkhldEhhblN0cmluZyI6IjE3LzA3LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY1ODAxNjAwMDAwMCIsIm5iZiI6MTYyNjcxNDAwMCwiZXhwIjoxNjU4MTYzNjAwfQ.CyAnnc8e2Rp7YmuJCdtEj-Wp7RvlDenB9Dad6NV0R20",
        Authorization:localStorage.getItem("UserAdmin") ? `Bear ${JSON.parse(localStorage.getItem("UserAdmin")).accessToken}` : ""
    }
    return config
})

export {apiHome,apiAdmin}


