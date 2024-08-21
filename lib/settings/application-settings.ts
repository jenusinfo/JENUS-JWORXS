import http from "services/http-common"

export const GetAppSettings = async () => {
    const res = await http.get(`/Setting/AppSetting`)

    if (res?.status)
        return res.data
}