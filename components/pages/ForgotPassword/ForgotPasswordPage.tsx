import BackRouter from "components/Forgot-Password/Back-Router"
import ForgotPasswordPanel from "components/Forgot-Password/Forgot-Password-Panel"
import Guide from "components/Forgot-Password/Guide"
import ReservedPart from "components/LogIn/ReservedPart"
import useWindowSize from "shared/hooks/useWindowSize"

const ForgotPasswordPage = () => {

    const width = useWindowSize().width

    return (
        <div className={"flex flex-col justify-center items-center relative " + (width > 870 ? 'w-[53%]' : 'w-full mt-4')}>
            <BackRouter />
            <Guide />
            <ForgotPasswordPanel />
            <ReservedPart />
        </div>
    )
}

export default ForgotPasswordPage