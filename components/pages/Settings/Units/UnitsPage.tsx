import DataPanel from "components/Settings/Units/DataPanel"
import UnitsHeader from "components/Settings/Units/Header"
import UnitsProvider from "providers/settings/UnitsProvider"

const UnitsPage = () => {
    return (
        <div className="py-8">
            <UnitsProvider>
                <div className="space-y-6">
                    <UnitsHeader />
                    <DataPanel />
                </div>
            </UnitsProvider>
        </div>
    )
}

export default UnitsPage