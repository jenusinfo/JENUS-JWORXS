import { useHookEmailTemplates } from "hooks/Settings/EmailTemplatesHook";
import { CreateEmailTemplate, DeleteEmailTemplate, UpdateEmailTemplate } from "lib/settings/email-templates";
import { ChangeEvent, createContext, useContext, useEffect, useMemo, useState } from "react";

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

    const { emailTemplates, setEmailTemplates, getEmailTemplates } = useHookEmailTemplates()
    const [curPageNumber, setCurPageNumber] = useState(1)
    const [curIndex, setCurIndex] = useState(-1)
	const [info, setInfo] = useState<any>({})
	const [search, setSearch] = useState("")
	const [data, setData] = useState<any>([])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInfo({
			...info,
			[e.target.name]: e.target.value
		})
	}

	const handleCreate = async () => {
		const res = await CreateEmailTemplate(info)

		getEmailTemplates()
	}

	const handleDelete = async (id: any, index: number) => {
		await DeleteEmailTemplate(id)
		let res = [...emailTemplates]
		res.splice(index, 1)
		setEmailTemplates(res)
	}

	const handleUpdate = async () => {
		const res = await UpdateEmailTemplate(info.Id, info)
		
		await getEmailTemplates()
	}

	useEffect(() => {
		if (search) {
			const filteredData = emailTemplates.filter((item: IEmailTemplates) =>
				item.DocumentDefinition.toLowerCase().includes(search.toLowerCase()) ||
				item.EmailFrom?.toLowerCase().includes(search.toLowerCase()) ||
				item.EmailCC?.toLowerCase().includes(search.toLowerCase()) ||
				item.EmailBCC?.toLowerCase().includes(search.toLowerCase()) ||
				item.EmailSubject?.toLowerCase().includes(search.toLowerCase()) ||
				item.EmailAttachmentName?.toLowerCase().includes(search.toLowerCase())
			);
			setData(filteredData);
		} else {
			setData(emailTemplates)
		}
	}, [search])

	useEffect(() => { setData(emailTemplates) }, [emailTemplates])

    const value = useMemo(
        () => ({
            emailTemplates, data,
            curPageNumber,
            setCurPageNumber,
			info,
			setInfo,
			curIndex,
			setCurIndex,
			handleChange,
			handleCreate,
			handleDelete,
			handleUpdate,
			search, setSearch
        }),
        [
            emailTemplates, data,
            curPageNumber,
            setCurPageNumber,
			info,
			setInfo,
			curIndex,
			setCurIndex,
			handleChange,
			handleCreate,
			handleDelete,
			handleUpdate,
			search, setSearch
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