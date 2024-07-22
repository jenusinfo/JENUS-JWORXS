import { useRouter } from "next/router"

const ForgotPasswordPanel = () => {

    const classes = {
        input: "py-4 w-[460px] border-b border-gray-300 text-md focus:outline-none"
    }
    const { push } = useRouter()

    return (
        <div className="mt-16 flex flex-col gap-12">
            <input className={classes.input} placeholder="Email address" />
            <button className="bg-[#2454de] text-white w-full rounded-[5px] py-2 text-md font-medium" onClick={() => push("/check-email")}>
                Confirm
            </button>
        </div>
    )
}

export default ForgotPasswordPanel