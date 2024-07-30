import DataPanel from "components/Settings/Events/DataPanel"
import EventsHeader from "components/Settings/Events/Header"
import EventsProvider from "providers/settings/EventsProvider"

const EventsPage = () => {
    return (
        <div className="py-8">
            <EventsProvider>
                <div className="space-y-6">
                    <EventsHeader />
                    <DataPanel />
                </div>
            </EventsProvider>
        </div>
    )
}

export default EventsPage