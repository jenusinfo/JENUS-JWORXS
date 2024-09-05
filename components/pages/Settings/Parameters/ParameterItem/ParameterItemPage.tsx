import HeaderPanel from "components/Settings/Parameters/Item/HeaderPanel"
import OptionParamsDataPanel from "components/Settings/Parameters/Item/OptionParam/DataPanel"
import { useRouter } from "next/router"
import OptionParamProvider from "providers/settings/Parameter/Item/OptionParamProvider"
import ParameterItemProvider from "providers/settings/Parameter/ParameterItemProvider"

const ParameterItemPage = () => {

	const { id } = useRouter().query

	return (
		<div className="py-8">
			<ParameterItemProvider>
				<HeaderPanel />
				<OptionParamProvider>
					<OptionParamsDataPanel />
				</OptionParamProvider>
			</ParameterItemProvider>
		</div>
	)
}

export default ParameterItemPage