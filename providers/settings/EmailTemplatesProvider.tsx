import { useHookEmailTemplates } from "hooks/Settings/EmailTemplatesHook";
import { createContext, useContext, useMemo, useState } from "react";

const EmailTemplatesContext: any = createContext(null)

export interface IEmailTemplates {
    Id: number
    DocumentDefinition: string
    EmailFrom: null | string
    EmailCC: null | string
    EmailBCC: null | string
    EmailSubject: string
    EmailAttachmentName: string
    EmailBody: string
}

const EmailTemplatesProvider = ({ children }: any) => {

    const { emailTemplates } = useHookEmailTemplates()
    const [curPageNumber, setCurPageNumber] = useState(1)

    const value = useMemo(
        () => ({
            emailTemplates,
            curPageNumber,
            setCurPageNumber
        }),
        [
            emailTemplates,
            curPageNumber,
            setCurPageNumber
        ]
    )

    return <EmailTemplatesContext.Provider value={value}>{children}</EmailTemplatesContext.Provider>
}

export const useEmailTemplates = () => {
    const context: any = useContext(EmailTemplatesContext)
    if (!context) {
        throw new Error("useEmailTemplates must be used within EmailTemplatesProvider")
    }
    return context
}

export default EmailTemplatesProvider