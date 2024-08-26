import Text from "shared/core/ui/Text"
import { IForm } from "types/dashboard"
import { BsBookmarkCheck } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { useForms } from "providers/dashboard/FormsProvider";

const DataPanel = () => {

	const { forms } = useForms()

	return (
		<div className="flex flex-col gap-2">
			{
				forms &&
				forms.map((group: IForm, index: number) => (
					group.IsFavourite &&
                    <div key={index} className="border border-[#DEDFEA] px-6 py-4 rounded-[4px] bg-white flex items-center gap-2 hover:cursor-pointer hover:border-blue-200 hover:bg-blue-100 transition-all duration-500">
						<div>
							<BsBookmarkCheck color="#2454DE" />
						</div>
						<Text text={group.Name} />
						<div className="ml-auto">
							<IoIosArrowForward />
						</div>
					</div>
				))
			}
		</div>
	)
}

export default DataPanel