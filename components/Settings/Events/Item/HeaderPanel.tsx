import { useRouter } from "next/router"
import { useParameterItem } from "providers/settings/Parameter/ParameterItemProvider"
import Text from "shared/core/ui/Text"

const HeaderPanel = () => {

	const { push } = useRouter()
	const { parameterItem } = useParameterItem()

	return (
		<div className="flex flex-col gap-8">
			<div className="flex items-center gap-1">
				<div onClick={() => push("/settings/parameters")}>
					<Text text="Global Params" size={14} weight="500" color="#2B8BE9" className="hover:cursor-pointer" />
				</div>
				<Text text=">>" size={14} weight="600" color="#2B8BE9" />
				<Text text={parameterItem && parameterItem.Name} size={14} weight="500" color="#275E93" />
			</div>
		</div>
	)
}

export default HeaderPanel