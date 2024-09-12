import axios from "axios"
import http from "services/http-common"

export const GetHashTags = async () => {
    const res = await http.get(`/HashTags`)

    if (res?.status)
        return res.data
}

export const GetHasTagDetail = async () => {
    const res = await http.get(`/HashTags/Detail`)

    if (res?.status)
        return res.data
}

export const CreateHashTag = async (info: any) => {
    const res = await http.post(`/HashTags`, info)

    if (res?.status)
        return res.data
}

export const UpdateHashTag = async (id: any, info: any) => {
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/HashTags/${id}`, info)

    if (res?.status)
        return res.data
}

export const DeleteHashTag = async (id: any) => {
    const res = await http.delete(`/HashTags/${id}`)

    if (res?.status)
        return res.data
}