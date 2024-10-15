import { IoMdClose } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import Text from "shared/core/ui/Text";
import { useInterview } from "providers/dashboard/InterviewProvider";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useState } from "react";
import SubmitModal from "components/Workitems/Interview/SubmissionRequirement/SubmitModal";
import { useRouter } from "next/router";
import { INTERVIEWSTATUS, useApp } from "providers/AppProvider";
import DraftModal from "components/Workitems/Interview/Account/DraftModal";
import DocumentGenerationRightSide from "components/Workitems/Interview/SubmissionRequirement/DocumentGeneration";
import DropDown from "shared/core/ui/Dropdown";
import { useWorkitem } from "providers/dashboard/WorkitemProvider";
import AssignModal from "components/Workitems/Modals/Assign_Modal";
import DeleteModal from "components/Workitems/Modals/Delete_Modal";

const BaseHeader = () => {

	const { push } = useRouter()
	const {} = useWorkitem()
	const { fromInterview, statusCode, interviewFormStatus, setInterviewFormStatus } = useApp()
	const { step, setStep, formSubmitHandler, isEditMode, setIsEditMode, documentConfigurations, sessionResult } = useInterview()
	const { setCurInterviewForm, handleDuplicateInterview } = useWorkitem()
	const [isOpen, setIsOpen] = useState(false)
	const [isDraftOpen, setIsDraftOpen] = useState(false)
	const [isDocumentGenerateOpen, setIsGenerateDocumentOpen] = useState(false)
	const [isAssignOpen, setIsAssignOpen] = useState(false)
  const [interviewId, setInterviewId] = useState<string>()
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

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
						<button
							className="text-[#2454de] bg-[#eef0fe] rounded-[4px] px-6 py-2.5 h-fit text-sm"
							onClick={async () => {
								if (!isEditMode) {
									setIsEditMode(!isEditMode)
								} else {
									setInterviewFormStatus(INTERVIEWSTATUS.UPDATED)
									await formSubmitHandler()
									await setIsDraftOpen(true)
								}
							}}
						>
							{(interviewFormStatus == INTERVIEWSTATUS.UPDATED && statusCode == "Draft") ? "Save Changes" : !isEditMode ? "Back To Edit" : "Save As Draft"}
						</button>
						<button
							className="text-white bg-[#2454de] rounded-[4px] px-5 py-2.5 h-fit text-sm"
							onClick={async () => {
								if (!isEditMode) {
									if (interviewFormStatus == INTERVIEWSTATUS.CREATED) {
										setInterviewFormStatus(INTERVIEWSTATUS.UPDATED)
										await formSubmitHandler()
									}
									await setStep(step + 2)
								} else {
									setIsEditMode(false)
								}
							}}
						>Next</button>
					</>
				}
				{
					step == 4 &&
					<>
						<DropDown
							target={
								<button className="text-[#2454de] bg-[#eef0fe] rounded-[4px] px-4 py-2.5 h-fit text-sm">
									<FaEllipsisVertical />
								</button>
							}
							left={-104}
						>
							<div className="shadow-lg border-t border-[#2454DE] bg-white w-[150px] pt-2">
								<div className="px-4 py-2.5 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100" onClick={() => { setCurInterviewForm(sessionResult); setIsAssignOpen(true) }}>
									<Text text="Assign" size={14} weight="500" color={"#202124"} />
								</div>
								<div className="px-4 py-2.5 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100" onClick={() => handleDuplicateInterview(sessionResult.Id)}>
									<Text text="Duplicate" size={14} weight="500" />
								</div>
								<div className="px-4 py-2.5 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100" onClick={() => { setIsDeleteOpen(true); setInterviewId(sessionResult.Id) }}>
									<Text text="Delete" size={14} color="#FB5656" weight="500" />
								</div>
							</div>
						</DropDown>

						{documentConfigurations && documentConfigurations.length > 0 && <button className="text-[#2454de] bg-[#eef0fe] rounded-[4px] px-4 py-2.5 h-fit text-sm" onClick={() => setIsGenerateDocumentOpen(true)}>
							Generate Document
						</button>}
						<button className="text-white bg-[#2454de] rounded-[4px] px-5 py-2.5 h-fit text-sm" onClick={() => setIsOpen(true)}>Submit?</button>
					</>
				}
			</div>
			<SubmitModal isOpen={isOpen} handleClose={() => setIsOpen(false)} />
			<DraftModal isOpen={isDraftOpen} handleClose={() => setIsDraftOpen(false)} />
			<DocumentGenerationRightSide isOpen={isDocumentGenerateOpen} handleClose={() => setIsGenerateDocumentOpen(false)} />
			<AssignModal isOpen={isAssignOpen} handleClose={() => setIsAssignOpen(false)} />
			{interviewId && <DeleteModal isOpen={isDeleteOpen} handleClose={() => setIsDeleteOpen(false)} id={interviewId} mode="InterviewForm" />}
		</div>
	)
}

export default BaseHeader