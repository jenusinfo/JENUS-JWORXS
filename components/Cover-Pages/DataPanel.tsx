import { useCoverPages } from "providers/cover-pages/CoverPagesProvider"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { IoEllipsisVerticalSharp, IoRefresh } from "react-icons/io5"
import Text from "shared/core/ui/Text"
import { HiOutlineDocumentText } from "react-icons/hi";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { Icon } from "shared/icons";

const DataPanel = () => {
  const { coverPages, curPageNumber, setCurPageNumber, totalCount, WIDTH, Headers } = useCoverPages()

  return (
    <div className="mt-4">
      <div className="pl-6 pr-3 py-3 flex items-center justify-between border-b border-gray-200 bg-white">
        <IoRefresh />
        <div className="flex items-center gap-2">
          <Text text={`${(curPageNumber - 1) * 10 + 1}-${curPageNumber * 10} of ${totalCount}`} />
          <IoIosArrowBack className="hover:cursor-pointer" onClick={curPageNumber > 1 ? () => setCurPageNumber(curPageNumber - 1) : () => { }} />
          <IoIosArrowForward className="hover:cursor-pointer" onClick={() => setCurPageNumber(curPageNumber + 1)} />
        </div>
      </div>

      <div className="flex bg-white">
        {
          Headers.map((header: string, index: number) => (
            <div className="px-2 py-3.5" style={{ width: WIDTH[index] }}>
              <Text text={header} color="#84858C" weight="700" size={11} />
            </div>
          ))
        }
      </div>
      <GroupPanel data={coverPages.UnboxedList} type='unbox' />
      {
        coverPages.BoxedList.map((data: any, index: number) => (
          <GroupPanel key={index} data={data} type='box' rowIndex={index} />
        ))
      }
    </div>
  )
}

const GroupPanel = ({ data, type, rowIndex }: { data: any, type: string, rowIndex?: number }) => {

  const { WIDTH, coverPages, setCoverPages, handleCheck } = useCoverPages()

  const handleOpen = () => {
    let temp = {...coverPages}
    if (type == 'unbox') {
      temp.UnboxedList.isOpen = !temp.UnboxedList.isOpen
      setCoverPages(temp)
    } else if (rowIndex != undefined) {
      temp.BoxedList[rowIndex].isOpen = !temp.BoxedList[rowIndex].isOpen
      setCoverPages(temp)
    }
  }

  return (
    <div>
      <div className="flex items-center">
        <div className="px-2 py-6" style={{ width: WIDTH[0] }}> <IoEllipsisVerticalSharp /> </div>
        <div className="px-2 py-6" style={{ width: WIDTH[1] }}> <input type="checkbox" /> </div>
        <div className="px-2 py-6 flex items-center gap-2 hover:cursor-pointer" style={{ width: WIDTH[2] }} onClick={handleOpen}>
          {data.isOpen ? <FaAngleDown size={12} /> : <FaAngleRight size={12} />}
          {type == 'unbox' ? <HiOutlineDocumentText size={20} color={data.isOpen ? "#2454DE" : "#202124"} /> : <Icon type="box" fill={data.isOpen ? "#2454DE" : "#202124"} />}
          <Text text={`${data.title} (${data.count})`} size={14} weight="500" />
        </div>
        <div className="px-2 py-6" style={{ width: WIDTH[3] }}></div>
        <div className="px-2 py-6" style={{ width: WIDTH[4] }}></div>
        <div className="px-2 py-6" style={{ width: WIDTH[5] }}></div>
        <div className="px-2 py-6" style={{ width: WIDTH[6] }}></div>
        <div className="px-2 py-6" style={{ width: WIDTH[7] }}>
          <Text text={`${data.createdBy}`} size={14} weight="500" />
        </div>
        <div className="px-2 py-6" style={{ width: WIDTH[8] }}>
          <Text text={`${data.lastUpdated}`} size={14} weight="500" />
        </div>
      </div>
      {
        data.isOpen &&
        data.data.map((each: any, index: number) => (
          <div className={"flex items-center bg-white " + (index == 0 ? '' : 'border-t border-[#eeeeef]')}>
            <div className="px-2 py-3.5" style={{ width: WIDTH[0] }}> <IoEllipsisVerticalSharp /> </div>
            <div className="px-2 py-3.5" style={{ width: WIDTH[1] }}> <input type="checkbox" onChange={(e) => handleCheck(e.target.checked, each.id)} /> </div>
            <div className="px-2 py-3.5 flex flex-col" style={{ width: WIDTH[2] }}>
              <Text text={`${each.title}`} size={14} weight="700" />
              <Text text={`${each.subtitle}`} size={14} weight="500" />
            </div>
            <div className="px-2 py-3.5" style={{ width: WIDTH[3] }}>
              <Text text={`${each.boxBarcode}`} size={14} weight="500" />
            </div>
            <div className="px-2 py-3.5" style={{ width: WIDTH[4] }}>
              <Text text={`${each.batchBarcode}`} size={14} weight="500" />
            </div>
            <div className="px-2 py-3.5" style={{ width: WIDTH[5] }}>
              <Text text={`${each.type}`} size={14} weight="500" />
            </div>
            <div className="px-2 py-3.5" style={{ width: WIDTH[6] }}>
              <Text text={`${each.unit}`} size={14} weight="500" />
            </div>
            <div className="px-2 py-3.5" style={{ width: WIDTH[7] }}>
              <Text text={`${each.createdBy}`} size={14} weight="500" />
            </div>
            <div className="px-2 py-3.5" style={{ width: WIDTH[8] }}>
              <Text text={`${each.lastUpdated}`} size={14} weight="500" />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default DataPanel