import { useEffect, useState } from "react"
import { GetAuditLogs } from "lib/settings/audit-logs"
import { useApp } from "providers/AppProvider"

export const useHookAuditLogs = ({searchParam, fromDate, toDate}: {searchParam?: number, fromDate?: string, toDate?: string}) => {
    const {setLoading} = useApp()
    const [auditLogs, setAuditLogs] = useState<any[]>([])

    const getAuditLogs = async () => {
        setLoading(true)
        const data = await GetAuditLogs(searchParam, fromDate, toDate)

        if (data)
            setAuditLogs(data.Records)
        setLoading(false)
    }

    useEffect(() => {
        getAuditLogs()
    }, [])

    return {
        auditLogs, setAuditLogs, getAuditLogs
    }
}
