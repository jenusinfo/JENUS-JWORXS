import Text from "shared/core/ui/Text"

export const Header = () => {
    return (
        <div className="flex justify-between items-center pb-[10px]">
            <Text text="My Groups" size={16} weight="600" />
            <Text text="View all" color="#0146C5" className="hover:cursor-pointer" />
        </div>
    )
}