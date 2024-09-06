import Alert from "components/Check-Email/Alert"
import BackRouter from "components/Forgot-Password/Back-Router"
import useWindowSize from "shared/hooks/useWindowSize"

const CheckEmailPage = () => {

    const width = useWindowSize().width
    
    return (
        <div className={"flex flex-col justify-center items-center relative " + (width > 870 ? 'w-[53%]' : 'w-full mt-4')}>
            <BackRouter />
            <Alert />
        </div>
    )
}

export default CheckEmailPage