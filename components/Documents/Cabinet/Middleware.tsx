import Text from "shared/core/ui/Text"
import { FaListUl } from "react-icons/fa";
import { RiTableFill } from "react-icons/ri";

const DocumentCabinetMiddleware = () => {
  return (
    <div className="flex items-center justify-between mt-12">
      <Text text="Uncategorised" size={14} color="#3F4044" />
      <div className="flex items-center gap-2">
        <FaListUl size={18} className="hover:cursor-pointer" />
        <RiTableFill size={20} className="hover:cursor-pointer" />
      </div>
    </div>
  )
}

export default DocumentCabinetMiddleware