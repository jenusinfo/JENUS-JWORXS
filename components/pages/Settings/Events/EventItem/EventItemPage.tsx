import EventAttributesDataPanel from "components/Settings/Events/Item/Attributes/DataPanel"
import HeaderPanel from "components/Settings/Events/Item/HeaderPanel"
import EventServicesDataPanel from "components/Settings/Events/Item/Services/DataPanel"
import { useRouter } from "next/router"
import EventItemProvider from "providers/settings/Events/EventItemProvider"
import AttributeProvider from "providers/settings/Events/Item/AttributeProvider"
import ServiceProvider from "providers/settings/Events/Item/ServiceProvider"

const EventItemPage = () => {

	const { id } = useRouter().query

	return (
		<div className="py-8">
			<EventItemProvider>
				<HeaderPanel />
				<AttributeProvider>
					<EventAttributesDataPanel />
				</AttributeProvider>
				<ServiceProvider>
					<EventServicesDataPanel />
				</ServiceProvider>
			</EventItemProvider>
		</div>
	)
}

export default EventItemPage