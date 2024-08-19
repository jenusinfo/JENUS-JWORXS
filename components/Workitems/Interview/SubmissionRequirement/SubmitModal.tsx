import { useInterview } from "providers/dashboard/InterviewProvider"
import Modal from "shared/core/ui/Modal"
import Text from "shared/core/ui/Text"

const SubmitModal = ({isOpen, handleClose}: {
    isOpen: boolean
    handleClose: () => void
}) => {

    const {step, setStep} = useInterview()

    return (
        <Modal isOpen={isOpen} handleClose={handleClose} width={695}>
            <div className="py-[60px]">
                <Text text="This will submit the workitem to the next activity in the flow." className="text-center" size={16} weight="#606168" />
                <Text text="Press 'Submit' to move workitem to next activity" className="text-center" size={16} weight="#606168" />
                <Text text="or 'Save and Close'" className="text-center" size={16} weight="#606168" />
                <div className="flex justify-center gap-2 mt-10">
                    <button className="text-[#2454de] bg-[#eef0fe] rounded-[4px] px-6 py-2.5 h-fit text-sm">Save & Close</button>
                    <button className="text-white bg-[#2454de] rounded-[4px] px-10 py-2.5 h-fit text-sm" onClick={() => {setStep(step+1); handleClose();}}>Submit</button>
                </div>
            </div>
        </Modal>
    )
}

export default SubmitModal