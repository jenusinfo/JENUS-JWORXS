import Alert from "components/Check-Email/Alert"
import BackRouter from "components/Forgot-Password/Back-Router"

const CheckEmailPage = () => {
    return (
        <div className={`
            w-[57%]
            flex flex-col justify-center items-center
            relative
        `}>
            <BackRouter />
            <Alert />
        </div>
    )
}

export default CheckEmailPage