import { useRouter } from "next/router"
import { useApp } from "providers/AppProvider"
import { useInterview } from "providers/dashboard/InterviewProvider"
import Text from "shared/core/ui/Text"

const WorkitemCreated = () => {

    const { push } = useRouter()
    const { setFromInterview, sessionResult, interviewId } = useApp()
    const { step, setStep } = useInterview()

    return (
        <div className="w-screen h-[calc(100vh-57px)] flex justify-center items-center">
            <div className="w-[480px] flex flex-col gap-4">
                <Text text="Workitem Created" size={28} weight="700" className="text-center" />
                <Text text={`Workitem ID ${sessionResult.Id || interviewId} was successfully created. You can continue setting up the workitem or close and return to the list of all workitems`} className="text-center" size={16} color="#606168" />
                <div className="flex justify-center gap-4">
                    <button className="text-[#2454de] bg-[#eef0fe] rounded-[4px] px-6 py-2.5 h-fit text-sm" onClick={() => push("/workitems")}>Go To List</button>
                    <button className="text-white bg-[#2454de] rounded-[4px] px-5 py-2.5 h-fit text-sm" onClick={() => {setStep(step + 1); setFromInterview("/from-step3")}}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default WorkitemCreated