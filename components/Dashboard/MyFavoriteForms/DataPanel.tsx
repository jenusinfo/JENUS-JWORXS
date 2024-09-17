import Text from "shared/core/ui/Text"
import { IForm } from "types/dashboard"
import { BsBookmarkCheck } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { useForms } from "providers/dashboard/FormsProvider";
import Loading from 'react-loading'
import { useApp } from "providers/AppProvider";
import { useRouter } from "next/router";

const DataPanel = () => {

	const { push } = useRouter()
	const { setCurForm, setStep } = useApp()
	const { forms, loading } = useForms()

	return (
		<>
			{
				loading
					? <div className="w-full h-[220px] flex justify-center items-center">
						<Loading type="bubbles" color="#0146c5" />
					</div>
					: <div className="flex flex-col gap-2">
						{
							forms &&
							forms.map((group: IForm, index: number) => (
								group.IsFavourite &&
								<div 
									key={index} 
									className="border border-[#DEDFEA] px-6 py-4 rounded-[4px] bg-white flex items-center gap-2 hover:cursor-pointer hover:border-blue-200 hover:bg-blue-100 transition-all duration-500"
									onClick={() => {
										push("/workitems/interview")
										setCurForm(group)
										setStep(2)
									}}
								>
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
			}
		</>
	)
}

export default DataPanel