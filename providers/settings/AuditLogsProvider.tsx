import { useHookAuditLogs } from "hooks/Settings/AuditLogsHook";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuditLogsContext: any = createContext(null)

export interface IAuditLogs {
    ResourceId: number
    ResourceName: string
    ChangeFrom: string
    ChangeTo: string
    Action: string
    ActionBy: string
    ActionPerformedById: number
    ActionOn: string
    Comments: null | string
}

const AuditLogsProvider = ({ children }: any) => {

    const { auditLogs } = useHookAuditLogs()
    const [curPageNumber, setCurPageNumber] = useState(1)
    const [search, setSearch] = useState("")
    const [data, setData] = useState<any>([])

    useEffect(() => {
		if (search) {
			const filteredData = auditLogs.filter((item: IAuditLogs) =>
				item.ResourceName.toLowerCase().includes(search.toLowerCase()) ||
				item.ChangeFrom?.toLowerCase().includes(search.toLowerCase()) ||
				item.ChangeTo?.toLowerCase().includes(search.toLowerCase()) ||
				item.Comments?.toLowerCase().includes(search.toLowerCase())
			);
			setData(filteredData);
		} else {
			setData(auditLogs)
		}
	}, [search])

	useEffect(() => { setData(auditLogs) }, [auditLogs])

    const value = useMemo(
        () => ({
            auditLogs,
            curPageNumber,
            setCurPageNumber,
            search,
            setSearch,
            data,
            setData
        }),
        [
            auditLogs,
            curPageNumber,
            setCurPageNumber,
            search,
            setSearch,
            data,
            setData
        ]
    )

    return <AuditLogsContext.Provider value={value}>{children}</AuditLogsContext.Provider>
}

export const useAuditLogs = () => {
    const context: any = useContext(AuditLogsContext)
    if (!context) {
        throw new Error("useAuditLogs must be used within AuditLogsProvider")
    }
    return context
}

export default AuditLogsProvider