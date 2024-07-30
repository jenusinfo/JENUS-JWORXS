import DataPanel from "components/Settings/Users/DataPenl"
import UsersHeader from "components/Settings/Users/Header"
import UsersProvider from "providers/settings/UsersProvider"

const UsersPage = () => {
    return (
        <div className="py-8">
            <UsersProvider>
                <div className="space-y-6">
                    <UsersHeader />
                    <DataPanel />
                </div>
            </UsersProvider>
        </div>
    )
}

export default UsersPage