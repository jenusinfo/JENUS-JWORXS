import Text from "shared/core/ui/Text"
import { CiSearch } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { CiBookmarkCheck } from "react-icons/ci";
import { useInterview } from "providers/dashboard/InterviewProvider";

const InterviewForms = () => {

	const { setStep } = useInterview()
	const classes = {
		input: "border border-blue-100 rounded-[2px] pl-8 py-2 focus:outline-none text-sm w-[440px]"
	}
	const forms = [
		{ isActive: true, text: "Incomplete CIF", },
		{ isActive: true, text: "Legal Entities Onboarding Documents", },
		{ isActive: true, text: "Corporate Account Opening", },
		{ isActive: false, text: "Trust Account Management", },
		{ isActive: false, text: "Non-Profit Organization", },
		{ isActive: false, text: "Business Account Review", },
		{ isActive: false, text: "High Net Worth Onboarding", }
	]

	return (
		<div className="py-12 gap-8 flex justify-center">
			<div className="flex flex-col gap-8">
				<Text text="Search and Initiatiate an Interview Form" weight="500" />
				<Text text="Accessible Interviews Forms" size={28} weight="700" />
				<div className="relative">
					<input className={classes.input} placeholder="Search" />
					<CiSearch className="absolute top-2 left-2" size={24} />
				</div>
				<div className="flex flex-col">
					{
						forms.map((form: any, index) => (
							<div key={index} className="px-2 py-3 flex items-center gap-3 hover:cursor-pointer hover:bg-blue-100 rounded-[4px] w-[440px]" onClick={() => setStep(2)}>
								{
									form.isActive
									? <CiBookmarkCheck color="#2454DE" size={24} />
									: <CiBookmark color="#84858C" size={24} />
								}
								<Text text={form.text} size={16} weight="500" />
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