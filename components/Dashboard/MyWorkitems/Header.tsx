import { useRouter } from "next/router"
import Text from "shared/core/ui/Text"

export const Header = () => {

    const { push } = useRouter()

    return (
        <div className="flex justify-between items-center pb-[10px]">
            <Text text="My Workitems" size={16} weight="600" />
            <div onClick={() => push("/workitems")}>
                <Text text="View all" color="#0146C5" className="hover:cursor-pointer" />
            </div>
        </div>
    )
}