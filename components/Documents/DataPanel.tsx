import { useRouter } from "next/router"
import { useDocuments } from "providers/documents/DocumentsProvider"
import Text from "shared/core/ui/Text"
import { GiOpenFolder } from "react-icons/gi";
import { convertToTitleCase } from "shared/helper/common";

const DataPanel = () => {

	const { push } = useRouter()
	const { documentCabinets } = useDocuments()

	return (
		<div className="grid grid-cols-3 gap-[18px] mt-7">
			{
				documentCabinets.map((each: any, index: number) => (
					<div key={index} className="p-6 flex flex-col justify-between bg-white rounded border border-[#eef0fe] hover:bg-blue-100 transition-all duration-300 ease-in-out min-h-[200px]" onClick={() => push(`/documents/${each.value}`)}>
                        <div className="flex items-center gap-3">
                            <GiOpenFolder color="#2454de" />
    						<Text text={each.title} size={16} weight="700" />
                        </div>
						<Text text={each.text} size={14} className="mt-2" />
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