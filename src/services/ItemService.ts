import axios from "axios";
import type { Item } from "@/interfaces/item"
import { API_URL } from '../config.js'
const requestOptions = {
    headers: { 'Content-Type': 'application/json' }
}
export class ItemService {
    addItem(payload: Item) {

        return axios.post(`${API_URL}/items`, payload, requestOptions)
    }

    updateItem(payload: Item) {
        return axios.patch(`${API_URL}/items/${payload.id}`, payload, requestOptions)
    }

    deleteItem(id: number) {
        return axios.delete(`${API_URL}/items/${id}`)
    }

    getAllItems(): Promise<Item> {
        return axios.get(`${API_URL}/items`, requestOptions)
    }

    getItemById(id: number): Promise<Item> {
        return axios.get(`${API_URL}/items/${id}`, requestOptions)
    }
}