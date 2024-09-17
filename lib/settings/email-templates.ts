import axios from "axios"
import http from "services/http-common"

export const CreateEmailTemplate = async (params: any) => {
    const res = await http.post(`/Setting/EmailTemplate`, params)

    if (res?.status)
        return res?.data
}

export const GetEmailTemplates = async () => {
    const res = await http.get(`/Setting/EmailTemplate`)

    if (res?.status)
        return res.data
}

export const UpdateEmailTemplate = async (id: any, params: any) => {
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Setting/EmailTemplate/${id}`, params)

    if (res?.status)
        return res.data
}

export const DeleteEmailTemplate = async (id: any) => {
    const res = await http.delete(`/Setting/EmailTemplate/${id}`)

    if (res?.status)
        return res?.data
}