import { useEffect, useState } from "react"
import { GetAuditLogs } from "lib/settings/audit-logs"

export const useHookAuditLogs = () => {
    const [auditLogs, setAuditLogs] = useState<any[]>([])

    const getAuditLogs = async () => {
        const data = await GetAuditLogs()

        if (data)
            setAuditLogs(data.Data)
    }

    useEffect(() => {
        getAuditLogs()
    }, [])

    return {
        auditLogs, setAuditLogs
    }
}
