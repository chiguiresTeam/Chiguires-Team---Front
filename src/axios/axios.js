import axios from "axios"

export default axios.create({
    baseURL: "http://144.202.38.22:8080/api/v1/",
    headers: {
        "Content-Type": "application/json"
    }
});