import { useEffect, useState } from "react"
import { GetEmailTemplates } from "lib/settings/email-templates"

export const useHookEmailTemplates = () => {
    const [emailTemplates, setEmailTemplates] = useState<any[]>([])

    const getEmailTemplates = async () => {
        const data = await GetEmailTemplates()

        if (data)
            setEmailTemplates(data.Data)
    }

    useEffect(() => {
        getEmailTemplates()
    }, [])

    return {
        emailTemplates, setEmailTemplates
    }
}
