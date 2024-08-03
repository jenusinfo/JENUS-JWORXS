import { useRouter } from "next/router"
import { useDocuments } from "providers/documents/DocumentsProvider"
import Text from "shared/core/ui/Text"
import { GiOpenFolder } from "react-icons/gi";

const DataPanel = () => {

	const { push } = useRouter()
	const { documentCabinets } = useDocuments()

	return (
		<div className="grid grid-cols-3 gap-[18px] mt-7">
			{
				documentCabinets.map((each: any, index: number) => (
					<div key={index} className="p-6 flex flex-col justify-between h-[155px] bg-white rounded border border-[#eef0fe] hover:bg-blue-100 transition-all duration-300 ease-in-out" onClick={() => push(each.link)}>
                        <div className="flex items-center gap-3">
                            <GiOpenFolder color="#2454de" />
    						<Text text={each.Name} size={16} weight="700" />
                        </div>
						<Text text={each.description} size={14} />
                        <div className="text-right">
                            <Text text="OPEN" size={16} weight="700" color="#2454de" className="hover:cursor-pointer" />
                        </div>
					</div>
				))
			}
		</div>
	)
}

export default DataPanel