import DataPanel from "components/Settings/DataPanel"
import SettingsProvider from "providers/settings/SettingsProvider"
import Text from "shared/core/ui/Text"

const SettingsPage = () => {
    return (
        <div className="py-8">
            <SettingsProvider>
                <div className="border-b-2 border-[#f0f1f1] pb-[42px]">
                    <Text text="Settings" size={28} weight="700" />
                </div>
                <DataPanel />
            </SettingsProvider>
        </div>
    )
}

export default SettingsPage