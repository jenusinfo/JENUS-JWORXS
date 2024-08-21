import Text from "shared/core/ui/Text"
import { FaListUl } from "react-icons/fa";
import { RiTableFill } from "react-icons/ri";
import { useCabinet } from "providers/documents/CabinetProvider";

const DocumentCabinetMiddleware = () => {

  const { categoryList, curCategory, setCurCategory, viewMode, setViewMode } = useCabinet()

  return (
    <div className="flex items-center justify-between mt-12">
      <div className="flex items-center gap-4">
        {
          ["ALL", ...categoryList].map((category: string, index: number) => (
            <div key={index} className={"px-2 py-1 hover:cursor-pointer rounded-[4px] " + (curCategory == category ? 'bg-blue-100' : '')} onClick={() => setCurCategory(category)}>
              <Text text={category ? category : 'UNCATEGORISED'} size={14} color="#3F4044" />
            </div>
          ))
        }
      </div>
      <div className="flex items-center gap-2">
        <FaListUl size={18} className="hover:cursor-pointer" color={viewMode == 'LIST' ? "#2454DE" : "#3F4044"} onClick={() => setViewMode("LIST")} />
        <RiTableFill size={20} className="hover:cursor-pointer" color={viewMode == 'KANBAN' ? "#2454DE" : "#3F4044"} onClick={() => setViewMode("KANBAN")} />
      </div>
    </div>
  )
}

export default DocumentCabinetMiddleware