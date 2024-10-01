import { useRouter } from "next/router"
import { INTERVIEWSTATUS, useApp } from "providers/AppProvider"
import { useInterview } from "providers/dashboard/InterviewProvider"
import Modal from "shared/core/ui/Modal"
import Text from "shared/core/ui/Text"

const DraftModal = ({ isOpen, handleClose }: {
    isOpen: boolean
    handleClose: () => void
}) => {

    const { push } = useRouter()
    const { setInterviewFormStatus, setInterviewId } = useApp()
    const { step, setStep, sessionResult } = useInterview()

    return (
        <Modal isOpen={isOpen} handleClose={handleClose} width={440}>
            <div className="px-10 py-12">
                <div className="flex justify-center w-[274px] mx-auto pb-4">
                    <Text text="Are you sure you want to save workitem as draft?" className="text-center" size={16} weight="700" color="#202124" />
                </div>
                <Text text={`Your workitem will be created with ID ${sessionResult.Id}`} className="text-center" size={14} color="#000" />
                <Text text="and saved as a Draft." className="text-center" size={14} color="#000" />
                <Text text="You can continue editing it by clicking 'Continue'." className="text-center" size={14} color="#000" />
                <div className="flex justify-center gap-2 mt-6">
                    <button className="text-[#2454de] bg-[#eef0fe] rounded-[4px] px-6 py-2.5 h-fit text-sm" onClick={() => { handleClose(); push("/workitems") }}>Go To List</button>
                    <button className="text-white bg-[#2454de] rounded-[4px] px-5 py-2.5 h-fit text-sm" onClick={() => { handleClose(); setInterviewFormStatus(INTERVIEWSTATUS.UPDATED); setInterviewId(sessionResult.Id);  }}>Continue</button>
                </div>
            </div>
        </Modal>
    )
}

export default DraftModal