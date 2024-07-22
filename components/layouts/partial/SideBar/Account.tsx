import { FaCaretDown } from "react-icons/fa";
import Text from "shared/core/ui/Text";

export default function Account() {
  return (
    <div className="mt-4 flex items-center absolute bottom-10">
      <div className="flex items-center gap-4">
        <div>
          <div className="w-10 h-10 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center">
            <Text text="AJ" size={12} color="#FF7B93" />
          </div>
        </div>
        <div>
          <p className="text-primary text-sm">Hi, <span className="font-semibold">Admin JDocs</span></p>
        </div>
      </div>
    </div>
  )
}