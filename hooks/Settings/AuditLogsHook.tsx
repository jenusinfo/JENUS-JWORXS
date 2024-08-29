import { useEffect, useState } from "react"
import { GetAuditLogs } from "lib/settings/audit-logs"
import { useApp } from "providers/AppProvider"

export const useHookAuditLogs = () => {
    const {setLoading} = useApp()
    const [auditLogs, setAuditLogs] = useState<any[]>([])

    const getAuditLogs = async () => {
        setLoading(true)
        const data = await GetAuditLogs()

        if (data)
            setAuditLogs(data.Records)
        setLoading(false)
    }

    useEffect(() => {
        getAuditLogs()
    }, [])

    return {
        auditLogs, setAuditLogs
    }
}
