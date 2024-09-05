import { useRouter } from "next/router"
import { useEventItem } from "providers/settings/Events/EventItemProvider"
import Text from "shared/core/ui/Text"

const HeaderPanel = () => {

	const { push } = useRouter()
	const { eventItem } = useEventItem()

	return (
		<div className="flex flex-col gap-8">
			<div className="flex items-center gap-1">
				<div onClick={() => push("/settings/parameters")}>
					<Text text="Global Params" size={14} weight="500" color="#2B8BE9" className="hover:cursor-pointer" />
				</div>
				<Text text=">>" size={14} weight="600" color="#2B8BE9" />
				<Text text={eventItem && eventItem.Name} size={14} weight="500" color="#275E93" />
			</div>
		</div>
	)
}

export default HeaderPanel