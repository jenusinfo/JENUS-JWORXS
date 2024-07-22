import http from "services/http-common"

export const GetInbox = async () => {
    const res = await http.get(`/Interviews/Sessions/Inbox`)

    if (res?.status)
        return res.data
}