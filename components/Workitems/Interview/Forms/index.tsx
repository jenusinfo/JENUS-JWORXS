import Text from "shared/core/ui/Text"
import { CiSearch } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { CiBookmarkCheck } from "react-icons/ci";
import { useInterview } from "providers/dashboard/InterviewProvider";
import { IForm } from "types/dashboard";

const InterviewForms = () => {

	const { setStep, setCurForm, forms } = useInterview()
	const classes = {
		input: "border border-blue-100 rounded-[2px] pl-8 py-2 focus:outline-none text-sm w-[440px]"
	}

	return (
		<div className="py-12 gap-8 flex justify-center">
			<div className="flex flex-col gap-8">
				<Text text="Search and Initiatiate an Interview Form" weight="500" />
				<Text text="Accessible Interviews Forms" size={28} weight="700" />
				<div className="relative">
					<input className={classes.input} placeholder="Search" />
					<CiSearch className="absolute top-2 left-2" size={24} />
				</div>
				<div className="flex flex-col overflow-y-auto h-[calc(100vh-400px)]">
					{
						forms.map((form: IForm, index: number) => (
							<div key={index} className="px-2 py-3 flex items-center gap-3 hover:cursor-pointer hover:bg-blue-100 rounded-[4px] w-[440px]" onClick={() => {setCurForm(form); setStep(2)}}>
								{
									form.IsFavourite
									? <CiBookmarkCheck color="#2454DE" size={24} />
									: <CiBookmark color="#84858C" size={24} />
								}
								<Text text={form.Name} size={16} weight="500" className="truncate w-[300px]" />
								<FaChevronRight className="ml-auto" size={12} />
							</div>
						))
					}
				</div>
			</div>
		</div>
	)
}

export default InterviewForms