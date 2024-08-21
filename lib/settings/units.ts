import http from "services/http-common"

export const CreateUnit = async (params: any) => {
    const res = await http.post(`/Org/BankUnits`, params)

    if (res?.status)
        return res?.data
}

export const GetUnits = async () => {
    const res = await http.get(`/Org/BankUnits`)

    if (res?.status)
        return res.data
}

export const UpdateUnit = async (id: any, params: any) => {
    const res = await http.put(`/Org/BankUnits/${id}`, params)

    if (res?.status)
        return res.data
}

export const DeleteUnit = async (id: any) => {
    const res = await http.delete(`/Org/BankUnits/${id}`)

    if (res?.status)
        return res?.data
}

export const GetParentBank = async () => {
    const res = await http.get(`/Org/BankUnits/ParentUnitOptions/null`)

    if (res?.status)
        return res.data
}