import axios from "axios";
import type { Item } from "@/interfaces/item"
const requestOptions = {
    headers: { 'Content-Type': 'application/json' }
}
export class ItemService {
    addItem(payload: Item) {

        return axios.post(`http://localhost:3000/items`, payload, requestOptions)
    }

    updateItem(payload: Item) {
        return axios.patch(`http://localhost:3000/items/${payload.id}`, payload, requestOptions)
    }

    deleteItem(id: number) {
        return axios.delete(`http://localhost:3000/items/${id}`)
    }

    getAllItems(): Promise<Item> {
        return axios.get(`http://localhost:3000/items`, requestOptions)
    }

    getItemById(id: number): Promise<Item> {
        return axios.get(`http://localhost:3000/items/${id}`, requestOptions)
    }
}