import { useRouter } from "next/router"
import Text from "shared/core/ui/Text"

export const Header = () => {
    
    const { push } = useRouter()
    
    return (
        <div className="sticky top-[-12px] bg-white flex justify-between items-center pt-3 pb-[10px] z-10">
            <Text text="My Groups" size={16} weight="600" />
            <div onClick={() => push("/groups")}>
                <Text text="View all" color="#0146C5" className="hover:cursor-pointer" />
            </div>
        </div>
    )
}