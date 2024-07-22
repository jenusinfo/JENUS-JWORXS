import { useRouter } from "next/router";
import { FaArrowLeftLong } from "react-icons/fa6";

const BackRouter = () => {

    const { push } = useRouter()

    return (
        <div className="flex items-center gap-2 w-[460px] hover:cursor-pointer" onClick={() => push("/")}>
            <FaArrowLeftLong />
            <p className="font-semibold">Back</p>
        </div>
    )
}

export default BackRouter