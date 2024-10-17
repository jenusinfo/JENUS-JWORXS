import { useInterview } from "providers/dashboard/InterviewProvider"
import Text from "shared/core/ui/Text"

const MenuPanel = () => {

	const { formStructure } = useInterview()

	if (!formStructure) {
		return <></>
	}

	return (
		<div className="flex flex-col gap-12">
			<div className="flex flex-col gap-4">
				<Text text={"general"} size={11} weight="600" className="uppercase" />
				{
					formStructure.QuestionCount.map((menu: any, j: number) => (
						<div key={j} className="flex flex-col pl-2">
							<Text text={menu.SectionName} size={14} weight="600" className="py-2 capitalize" />
						</div>
					))
				}
			</div>
		</div>
	)
}

export default MenuPanel