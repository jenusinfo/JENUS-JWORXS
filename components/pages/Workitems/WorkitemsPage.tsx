import DataPanel from "components/Workitems/DataPanel"
import WorkitemsHeader from "components/Workitems/Header"
import { Middleware } from "components/Workitems/Middleware"
import WorkitemProvider from "providers/dashboard/WorkitemProvider"

const WorkitemsPage = () => {
    return (
        <div className="py-8">
            <WorkitemProvider>
                <WorkitemsHeader />
                <div className="mt-8">
                    <Middleware />
                    <DataPanel />
                </div>
            </WorkitemProvider>
        </div>
    )
}

export default WorkitemsPage