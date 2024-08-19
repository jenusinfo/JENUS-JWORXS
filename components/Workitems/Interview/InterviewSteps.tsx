import { useInterview } from "providers/dashboard/InterviewProvider"
import InterviewForms from "./Forms"
import InterviewAccount from "./Account"
import WorkitemCreated from "./WorkitemCreated/WorkitemCreated"
import SubmissionRequirement from "./SubmissionRequirement"
import WorkitemSubmited from "./WorkitemSubmited"

const InterviewSteps = () => {

    const { step } = useInterview()

    return (
        <div>
            {step == 1 && <InterviewForms />}
            {step == 2 && <InterviewAccount />}
            {step == 3 && <WorkitemCreated />}
            {step == 4 && <SubmissionRequirement />}
            {step == 5 && <WorkitemSubmited />}
        </div>
    )
}

export default InterviewSteps