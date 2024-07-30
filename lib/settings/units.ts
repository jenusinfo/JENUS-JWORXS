import http from "services/http-common"

export const GetUnits = async () => {
    const res = await http.get(`/Org/BankUnits`)

    if (res?.status)
        return res.data
}