import { IoMdClose } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import Text from "shared/core/ui/Text";
import { useInterview } from "providers/dashboard/InterviewProvider";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useState } from "react";
import SubmitModal from "components/Workitems/Interview/SubmissionRequirement/SubmitModal";
import { useRouter } from "next/router";
import { useApp } from "providers/AppProvider";

const BaseHeader = () => {

	const { push } = useRouter()
	const { fromInterview } = useApp()
	const { step, setStep, formSubmitHandler } = useInterview()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="flex items-center justify-between px-10 py-4 w-full border-b border-gray-200">
			<div className="flex items-center gap-2 hover:cursor-pointer" onClick={
				step == 1 
					? () => push("/workitems") 
					: step == 2 
						? () => {
							if (fromInterview == "/from-step1") {
								setStep(1)
							} else {
								push(fromInterview)
							}
						} 
						: step == 4 
							? () => {
								if (fromInterview == "/from-step3") {
									setStep(3)
								} else {
									push(fromInterview)
								}
							}
						: () => setStep(step - 1)
			}>
				<IoMdClose />
				<Text text="Close" size={16} weight="500" />
			</div>
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-2">
					<Text text="Eng" />
					<FaAngleDown />
				</div>
				{
					step == 2 &&
					<>
						<button className="text-[#2454de] bg-[#eef0fe] rounded-[4px] px-6 py-2.5 h-fit text-sm">Back To Edit</button>
						<button 
							className="text-white bg-[#2454de] rounded-[4px] px-5 py-2.5 h-fit text-sm" 
							onClick={async () => {
								await formSubmitHandler()
								await setStep(step + 1)
							}}
						>Next</button>
					</>
				}
				{
					step == 4 &&
					<>
						<button className="text-[#2454de] bg-[#eef0fe] rounded-[4px] px-4 py-2.5 h-fit text-sm">
							<FaEllipsisVertical />
						</button>
						<button className="text-white bg-[#2454de] rounded-[4px] px-5 py-2.5 h-fit text-sm" onClick={() => setIsOpen(true)}>Submit?</button>
					</>
				}
			</div>
			<SubmitModal isOpen={isOpen} handleClose={() => setIsOpen(false)} />
		</div>
	)
}

export default BaseHeader