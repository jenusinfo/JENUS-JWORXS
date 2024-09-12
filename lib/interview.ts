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

// Rule Set

export const CreateRuleSet = async (params: any) => {
    const res = await http.post(`/Interview/RuleSet`, params)

    if (res?.status)
        return res.data
}

export const GetInterviewRuleSet = async (id: any) => {
    const res = await http.get(`/Interview/RuleSet/GetByInterviewFormId/${id}`)

    if (res?.status)
        return res.data
}

export const UpdateRuleSet = async (id: any, params: any) => {
    const res = await http.put(`/Interview/RuleSet/${id}`, params)

    if (res?.status)
        return res.data
}

export const DeleteRuleSet = async (id: any) => {
    const res = await http.delete(`/Interview/RuleSet/${id}`)

    if (res?.status)
        return res?.data
}

// Rule Set End

export const GetInterviewFormFullInfo = async (id: any) => {
    const res = await http.get(`/Interviews/Forms/GetInterviewFormFullInfo/${id}`)

    if (res?.status)
        return res.data
}

// Rule

export const CreateRule = async (params: any) => {
    const res = await http.post(`/Interview/Rules`, params)

    if (res?.status)
        return res.data
}

export const GetRules = async (id: any) => {
    const res = await http.get(`/Interview/Rules/GetByInterviewFormId/${id}`)

    if (res?.status)
        return res.data
}

export const UpdateRule = async (id: any, params: any) => {
    const res = await http.put(`/Interview/Rules/${id}`, params)

    if (res?.status)
        return res.data
}

export const DeleteRule = async (id: any) => {
    const res = await http.delete(`/Interview/Rules/${id}`)

    if (res?.status)
        return res?.data
}

// Rule End

// Interview Questions
export const CreateInterviewQuestion = async (params: any) => {
    const res = await http.post(`/Interview/Questions`, params)

    if (res?.status)
        return res?.data
}

export const UpdateInterviewQuestion = async (id: any, params: any) => {
    const res = await http.put(`/Interview/Questions/${id}`, params)

    if (res?.status)
        return res.data
}

export const DeleteInterviewQuestion = async (id: any) => {
    const res = await http.delete(`/Interview/Questions/${id}`)

    if (res?.status)
        return res?.data
}
// Interview Questions End

// Interview Sections
export const CreateInterviewSection = async (params: any) => {
    const res = await http.post(`/Interview/Sections`, params)

    if (res?.status)
        return res?.data
}

export const GetInterviewSection = async (id: any) => {
    const res = await http.get(`/Interview/Sections/GetByInterviewFormId/${id}`)

    if (res?.status)
        return res.data
}

export const UpdateInterviewSection = async (id: any, params: any) => {
    const res = await http.put(`/Interview/Sections/${id}`, params)

    if (res?.status)
        return res.data
}

export const DeleteInterviewSection = async (id: any) => {
    const res = await http.delete(`/Interview/Sections/${id}`)

    if (res?.status)
        return res?.data
}
// Interview Sections End

export const submitInterview = async (payload: any) => {
    const res = await http.post(`/Interviews/Sessions`, payload)

    if (res?.status)
        return res.data
}

// Document Configuration Sections
export const CreateDocumentConfiguration = async (params: any) => {
    const res = await http.post(`/Interviews/EfsConfiguration`, params)

    if (res?.status)
        return res?.data
}

export const GetDocumentConfigurations = async (id: any) => {
    const res = await http.get(`/Interviews/EfsConfiguration/GetByInterviewFormId/${id}`)

    if (res?.status)
        return res.data
}

export const UpdateDocumentConfiguration = async (id: any, params: any) => {
    const res = await http.put(`/Interviews/EfsConfiguration/${id}`, params)

    if (res?.status)
        return res.data
}

export const DeleteDocumentConfiguration = async (id: any) => {
    const res = await http.delete(`/Interviews/EfsConfiguration/${id}`)

    if (res?.status)
        return res?.data
}
// Document Configuration End

export const CopyInterviewForm = async (id: any) => {
    const res = await http.post(`/Interviews/Forms/Copy/${id}`, {})

    if (res?.status)
        return res?.data
}