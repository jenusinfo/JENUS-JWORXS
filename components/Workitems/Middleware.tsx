import { useWorkitem } from "providers/dashboard/WorkitemProvider"
import { useEffect, useRef, useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import Text from "shared/core/ui/Text"
import { LuSearch, LuX } from "react-icons/lu";

export const Middleware = () => {

  const classes = {
    input: "border border-gray-300 rounded-[4px] pl-8 py-2 focus:outline-none text-sm"
  }
  const { WorkitemStatuses, curStatus, setCurStatus, 
    assignedList, optionList, 
    curHashTag, setCurHashTag, handleSelect, 
    optionSearch, setOptionSearch, setSearchHashTag, 
    curAssigned, setCurAssigned 
  } = useWorkitem()
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: any) => {
    const ref: any = dropdownRef.current

    if (ref && !ref.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-8">
        {
          WorkitemStatuses.map((status: string, index: number) => (
            <div key={index} className={"pb-2 hover:cursor-pointer " + (curStatus == status ? "border-b border-[#0146C5]" : "")} onClick={() => setCurStatus(status)}>
              <Text text={status == null ? 'Cancelled' : status} className="capitalize" color={curStatus == status ? "#0146C5" : "#1F2933"} weight="500" />
            </div>
          ))
        }
      </div>
      <div className="flex gap-2">
        {/* <select className="px-4 py-2 border border-gray-200 rounded-[5px] focus:outline-blue-100" value={curHashTag} onChange={e => setCurHashTag(e.target.value)}>
          <option value="All">All</option>
          {
            optionList.map((item: any, index: number) => (
              <option key={index} value={item}>{item}</option>
            ))
          }
        </select> */}
        <div className={"relative"} ref={dropdownRef}>
          <div onClick={toggleDropdown}>
            <div className={"px-4 py-2 border border-gray-200 rounded-[5px] foucs:outline-blue-100 w-[177px] flex items-center justify-between bg-white " + (Array.isArray(curHashTag) && curHashTag.length > 0 ? "!border-red-300" : "")}>
              <Text text={`Group: ${Array.isArray(curHashTag) ? `${curHashTag.length} Selected` : curHashTag}`} />
              <IoIosArrowDown />
            </div>
          </div>
          {isOpen && (
            <div className='absolute right-0'>
              <div className="w-[330px] bg-white border border-blue-100 shadow-md rounded-[5px]">
                <div className="relative mt-2">
                  <LuSearch className="absolute top-3 left-4" size={16} />
                  <input type="text" placeholder="Search" className="w-full border-b border-gray-200 px-9 py-2 focus:outline-none" value={optionSearch} onChange={e => setOptionSearch(e.target.value)} />
                  <LuX className="absolute top-3 right-4 hover:cursor-pointer" onClick={() => setOptionSearch("")} />
                </div>
                <div className="h-[400px] rounded-[5px] overflow-y-auto">
                  {
                    optionList
                    .filter((item: any) => optionSearch == "" ? true : item.toLowerCase().includes(optionSearch.toLowerCase()))
                    .map((item: any, index: number) => (
                      <div key={index} className="px-4 py-2 hover:bg-blue-100 flex items-center gap-2 hover:cursor-pointer" onClick={() => handleSelect(item)}>
                        <input type="checkbox" checked={Array.isArray(curHashTag) ? curHashTag.includes(item) : curHashTag == item} readOnly />
                        <Text text={item} />
                      </div>
                    ))
                  }
                </div>
                <div className="border-t border-gray-200 flex items-center justify-between px-4 py-2">
                  <div className="hover:cursor-pointer" onClick={() => setCurHashTag("All")}>
                    <Text text="View All Result" size={12} weight="500" color="#2454DE" />
                  </div>
                  <div className="flex gap-2">
                    <button className="text-[#0146C5] bg-[#EEF0FE] rounded-[5px] px-4 py-2 h-fit text-xs" onClick={() => setIsOpen(false)}>Cancel</button>
                    <button className="text-white bg-[#0146C5] rounded-[5px] px-4 py-2 h-fit text-xs" onClick={() => setSearchHashTag(curHashTag)}>Show</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <select className="px-4 py-2 border border-gray-200 rounded-[5px] focus:outline-none" value={curAssigned} onChange={e => setCurAssigned(e.target.value)}>
          {
            assignedList.map((item: any, index: number) => (
              <option key={index} value={item.value}>{item.name}</option>
            ))
          }
        </select>
      </div>
    </div>
  )
}