import { useQuickActions } from "providers/dashboard/QuickActionsProvider"
import Text from "shared/core/ui/Text"
import { IQuickAction } from "types/dashboard"
import { MdElectricBolt } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";

const DataPanel = () => {

	const { push } = useRouter()
	const { quickActions } = useQuickActions()

	return (
		<div className="flex flex-col gap-2">
			{
				quickActions &&
				quickActions.map((group: IQuickAction, index: number) => (
					<div
						key={index}
						className="border border-[#DEDFEA] px-6 py-4 rounded-[4px] bg-white flex items-center gap-2 hover:cursor-pointer hover:border-blue-200 hover:bg-blue-100 transition-all duration-500"
						onClick={() => push(group.link)}
					>
						<MdElectricBolt color="#2454DE" />
						<Text text={group.name} />
						<IoIosArrowForward className="ml-auto" />
					</div>
				))
			}
		</div>
	)
}

export default DataPanel