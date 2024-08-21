import Text from "shared/core/ui/Text"

const ExtraDataPanel = () => {
    return (
        <div className="w-[200px] space-y-3">
            <div className="border-b border-gray-100 pb-2">
                <Text text="Initiated Date" size={14} color="#84858C" />
                <Text text="16 Apr, 2024" size={14} weight="600" />
            </div>
            <div className="border-b border-gray-100 pb-2">
                <Text text="Initiated By" size={14} color="#84858C" />
                <Text text="Terry Moody" size={14} weight="600" />
            </div>
            <div className="border-b border-gray-100 pb-2">
                <Text text="Assigne" size={14} color="#84858C" />
                <Text text="Amelia Marsh" size={14} weight="600" />
            </div>
            <div className="border-b border-gray-100 pb-2">
                <Text text="Unit" size={14} color="#84858C" />
                <Text text="Large Corporates Unit" size={14} weight="600" />
            </div>
            <div className="border-b border-gray-100 pb-2">
                <Text text="Associated Flow" size={14} color="#84858C" />
                <Text text="Customer Onboarding" size={14} weight="600" />
            </div>
            <div className="border-b border-gray-100 pb-2">
                <Text text="Group" size={14} color="#84858C" />
                <Text text="Corporate Group" size={14} weight="600" />
            </div>
            <div>
                <Text text="Search Tags" size={14} color="#84858C" />
                <div className="mt-2 flex gap-1">
                    <div className="px-2 py-1 bg-[#EBECEF]"><Text text="Corporate" size={13} weight="500" color="#818694" /></div>
                    <div className="px-2 py-1 bg-[#EBECEF]"><Text text="Onboarding" size={13} weight="500" color="#818694" /></div>
                </div>
            </div>
        </div>
    )
}

export default ExtraDataPanel