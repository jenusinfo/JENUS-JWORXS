import { GetFormStructure, GetInterviewFormFullInfo, GetInterviewRules, GetInterviewSection } from "lib/interview"
import { useEffect, useState } from "react"

export const useHookInterview = (props: any) => {

    const [formStructure, setFormStructure] = useState<any>()
    const [interviewRuels, setInterviewRules] = useState()
    const [formFullInfo, setFormFullInfo] = useState<any>()
    const [interviewSection, setInterviewSection] = useState<any>()

    const getFormStructure = async (id: any) => {
        const res = await GetFormStructure(id)

        if (res)
            setFormStructure(res.Data)
    }

    const getInterviewRules = async (id: any) => {
        const res = await GetInterviewRules(id)

        if (res)
            setInterviewRules(res.Data)
    }

    const getInterviewFormFullInfo = async (id: any) => {
        const res = await GetInterviewFormFullInfo(id)

        if (res)
            setFormFullInfo(res.Data)
    }

    const getInterviewSection = async (id: any) => {
        const res = await GetInterviewSection(id)

        if (res)
            setInterviewSection(res.Data)
    }

    useEffect(() => {
        if (props.formId) {
            getFormStructure(props.formId)
            getInterviewRules(props.formId)
            getInterviewFormFullInfo(props.formId)
            getInterviewSection(props.formId)
        }
    }, [props.formId])

    return {
        formStructure,
        interviewRuels,
        formFullInfo,
        interviewSection
    }
}

// https://erbcyjdocs-new.jenusplanet.com/Api/api/Interviews/Forms/GetFormStructure/12