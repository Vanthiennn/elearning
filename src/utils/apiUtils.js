import axios from "axios";

const apiHome = axios.create({
    baseURL: "https://elearningnew.cybersoft.edu.vn/api/"
})

apiHome.interceptors.request.use((config) => {
    config.headers = {
        TokenCyberSoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyMSIsIkhldEhhblN0cmluZyI6IjA1LzEyLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY3MDE5ODQwMDAwMCIsIm5iZiI6MTY0MTkyMDQwMCwiZXhwIjoxNjcwMzQ2MDAwfQ.kdBVHpDWKZ-X7NZhWx-Y-ILozaT3RsvaQQF-Yqk4uV4",
        Authorization: localStorage.getItem("UserHome") ? `Bearer ${JSON.parse(localStorage.getItem("UserHome")).accessToken}` : ""
    }
    return config
})

const apiAdmin = axios.create({
    baseURL: "https://elearningnew.cybersoft.edu.vn/api/"
})

apiAdmin.interceptors.request.use((config) => {
    config.headers = {
        TokenCyberSoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyMSIsIkhldEhhblN0cmluZyI6IjA1LzEyLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY3MDE5ODQwMDAwMCIsIm5iZiI6MTY0MTkyMDQwMCwiZXhwIjoxNjcwMzQ2MDAwfQ.kdBVHpDWKZ-X7NZhWx-Y-ILozaT3RsvaQQF-Yqk4uV4",
        Authorization: localStorage.getItem("UserAdmin") ? `Bearer ${JSON.parse(localStorage.getItem("UserAdmin")).accessToken}` : ""
    }
    return config
})

const groupID = {
    maNhom: "GP05"
}

export { apiHome, apiAdmin, groupID }






