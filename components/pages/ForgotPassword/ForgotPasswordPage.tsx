import BackRouter from "components/Forgot-Password/Back-Router"
import ForgotPasswordPanel from "components/Forgot-Password/Forgot-Password-Panel"
import Guide from "components/Forgot-Password/Guide"
import ReservedPart from "components/LogIn/ReservedPart"

const ForgotPasswordPage = () => {
    return (
        <div className={`
            w-[57%]
            flex flex-col justify-center items-center
            relative
        `}>
            <BackRouter />
            <Guide />
            <ForgotPasswordPanel />
            <ReservedPart />
        </div>
    )
}

export default ForgotPasswordPage