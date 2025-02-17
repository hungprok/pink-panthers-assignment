import axios from "axios";
import { API_URL } from '@/configs/config'

const requestOptions = {
    headers: { 'Content-Type': 'formdata/multipart' }
}
export class FileService {
    async upload(payload: FormData) {
        return axios.post(`${API_URL}/upload`, payload, requestOptions)
    }
}