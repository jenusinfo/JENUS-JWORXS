import http from "services/http-common"

export const GetInbox = async (assignedTo?: string) => {
    const res = await http.get(`/Interviews/Sessions/Inbox?interviewFilteredOn=${assignedTo}`)

    if (res?.status)
        return res.data
}