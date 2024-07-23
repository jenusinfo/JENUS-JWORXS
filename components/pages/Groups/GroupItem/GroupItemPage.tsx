import DataPanel from "components/GroupItem/DataPanel"
import GroupItemHeader from "components/GroupItem/Header"
import { Middleware } from "components/GroupItem/Middleware"
import GroupItemProvider from "providers/groups/GroupItemProvider"

const GroupItemPage = () => {

	return (
		<div className="py-8">
			<GroupItemProvider>
				<GroupItemHeader />
				<div className="mt-8">
					<Middleware />
					<DataPanel />
				</div>
			</GroupItemProvider>
		</div>
	)
}

export default GroupItemPage