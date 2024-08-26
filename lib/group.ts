import http from "services/http-common"

export const GetGroups = async () => {
    const res = await http.get(`/interviews/Forms`)

    if (res?.status)
        return res.data
}

export const GetGroupItemsById = async (id: number) => {
    const res = await http.get(`/interviews/Forms/${id}`)

    if (res?.status)
        return res.data
}