import { useEffect, useState } from "react"
import { GetEmailTemplates } from "lib/settings/email-templates"
import { useApp } from "providers/AppProvider"

export const useHookEmailTemplates = () => {
    const {setLoading} = useApp()
    const [emailTemplates, setEmailTemplates] = useState<any[]>([])

    const getEmailTemplates = async () => {
        setLoading(true)
        const data = await GetEmailTemplates()

        if (data)
            setEmailTemplates(data)
        setLoading(false)
    }

    useEffect(() => {
        getEmailTemplates()
    }, [])

    return {
        emailTemplates, setEmailTemplates, getEmailTemplates
    }
}
