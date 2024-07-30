import DataPanel from "components/Settings/Targets/DataPanel"
import TargetsHeader from "components/Settings/Targets/Header"
import TargetsProvider from "providers/settings/TargetsProvider"

const TargetsPage = () => {
    return (
        <div className="py-8">
            <TargetsProvider>
                <div className="space-y-6">
                    <TargetsHeader />
                    <DataPanel />
                </div>
            </TargetsProvider>
        </div>
    )
}

export default TargetsPage