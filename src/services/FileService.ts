import axios from "axios";
const requestOptions = {
    headers: { 'Content-Type': 'formdata/multipart' }
}
export class FileService {
    async upload(payload: FormData) {
        return axios.post(`http://localhost:3000/upload`, payload, requestOptions)
    }
}