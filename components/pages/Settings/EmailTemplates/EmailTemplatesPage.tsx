import DataPanel from "components/Settings/EmailTemplates/DataPanel"
import EmailTemplatesHeader from "components/Settings/EmailTemplates/Header"
import EmailTemplatesProvider from "providers/settings/EmailTemplatesProvider"

const EmailTemplatesPage = () => {
    return (
        <div className="py-8">
            <EmailTemplatesProvider>
                <div className="space-y-6">
                    <EmailTemplatesHeader />
                    <DataPanel />
                </div>
            </EmailTemplatesProvider>
        </div>
    )
}

export default EmailTemplatesPage