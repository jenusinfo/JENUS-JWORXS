import { useHookAuditLogs } from "hooks/Settings/AuditLogsHook";
import { createContext, useContext, useMemo, useState } from "react";

const AuditLogsContext: any = createContext(null)

export interface IAuditLogs {
}

const AuditLogsProvider = ({ children }: any) => {

    const { auditLogs } = useHookAuditLogs()
    const [curPageNumber, setCurPageNumber] = useState(1)

    const value = useMemo(
        () => ({
            auditLogs,
            curPageNumber,
            setCurPageNumber
        }),
        [
            auditLogs,
            curPageNumber,
            setCurPageNumber
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