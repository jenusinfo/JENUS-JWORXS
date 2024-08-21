import DataPanel from "components/Settings/AuditLogs/DataPanel"
import AuditLogsHeader from "components/Settings/AuditLogs/Header"
import AuditLogsProvider from "providers/settings/AuditLogsProvider"

const AuditLogsPage = () => {
    return (
        <div className="py-8">
            <AuditLogsProvider>
                <div className="space-y-6">
                    <AuditLogsHeader />
                    <DataPanel />
                </div>
            </AuditLogsProvider>
        </div>
    )
}

export default AuditLogsPage