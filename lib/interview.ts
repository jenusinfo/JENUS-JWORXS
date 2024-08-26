import http from "services/http-common"

export const GetFormStructure = async (id: any) => {
    const res = await http.get(`/Interviews/Forms/GetQuestionCountByFormId/${id}`)

    if (res?.status)
        return res.data
}

export const GetInterviewRules = async (id: any) => {
    const res = await http.get(`/Interview/Rules/GetByInterviewFormId/${id}`)

    if (res?.status)
        return res.data
}

export const GetInterviewFormFullInfo = async (id: any) => {
    const res = await http.get(`/Interviews/Forms/GetInterviewFormFullInfo/${id}`)

    if (res?.status)
        return res.data
}

export const GetInterviewSection = async (id: any) => {
    const res = await http.get(`/Interview/Sections/GetByInterviewFormId/${id}`)

    if (res?.status)
        return res.data
}

export const submitInterview = async (payload: any) => {
    const res = await http.post(`/Interviews/Sessions`, payload)

    if (res?.status)
        return res.data
}