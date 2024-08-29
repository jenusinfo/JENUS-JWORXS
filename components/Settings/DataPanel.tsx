import { useRouter } from "next/router"
import { useSettings } from "providers/settings/SettingsProvider"
import Text from "shared/core/ui/Text"

const DataPanel = () => {

	const { push } = useRouter()
	const { data } = useSettings()

	return (
		<div className="grid grid-cols-3 gap-[18px] mt-7">
			{
				data.map((each: any, index: number) => (
					<div key={index} className="p-6 flex flex-col gap-[22px] h-[155px] bg-white rounded border border-[#eef0fe] hover:cursor-pointer hover:bg-blue-100 hover:scale-[1.05] transition-all duration-800" onClick={() => push(each.link)}>
						<Text text={each.title} size={16} weight="700" />
						<Text text={each.description} size={14} />
					</div>
				))
			}
		</div>
	)
}

export default DataPanel