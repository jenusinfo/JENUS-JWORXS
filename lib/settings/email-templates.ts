import http from "services/http-common"

export const GetEmailTemplates = async () => {
    const res = await http.get(`/Setting/EmailTemplate`)

    if (res?.status)
        return res.data
}