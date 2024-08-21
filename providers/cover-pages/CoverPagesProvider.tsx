import { useHookCoverpages } from "hooks/CoverPagesHook";
import { useApp } from "providers/AppProvider";
import { createContext, useContext, useMemo, useState } from "react";
import { COVERPAGES } from "shared/static/COVERPAGES";

const CoverPagesContext: any = createContext(null)

const CoverPagesProvider = ({ children }: any) => {

  const WIDTH = ["4%", "3%", "25%", "11%", "13%", "9%", "9%", "15%", "11%"]
  const Headers = ["", "", "PAGE NAME", "BOX BARCODE", "BATCH BARCODE", "TYPE", "UNIT", "CREATED BY", "LAST UPDATE"]
  const CoverPagesStatuses = ["all", "Boxed", "Unboxed"]
  const optionList = ["TESTERS", "First Level"]
  const assignedList = ["Assigned to All", "Assigned to Me", "Assigned On My Unit", "Assigned To Other"]
  // const { coverPages } = useHookCoverpages()
  const [coverPages, setCoverPages] = useState(COVERPAGES)
  const [curStatus, setCurStatus] = useState("all")
  const [curPageNumber, setCurPageNumber] = useState(1)
  const getTotalCountFunc = () => {
    let sum = 0;
    COVERPAGES.BoxedList.forEach(item => sum += item.data.length)

    return COVERPAGES.UnboxedList.data.length + sum
  }
  const totalCount = getTotalCountFunc()
  const [checkedList, setCheckedList] = useState<Array<number>>([])

  const handleCheck = (value: boolean, id: number) => {
    let temp = [...checkedList]
    if (value) {
      temp = [...checkedList, id]
    } else {
      temp = checkedList.filter(item => item != id)
    }

    setCheckedList(temp)
  }

  const value = useMemo(
    () => ({
      coverPages, setCoverPages,
      CoverPagesStatuses,
      optionList,
      assignedList,
      curStatus,
      setCurStatus,
      curPageNumber,
      setCurPageNumber,
      totalCount,
      WIDTH,
      Headers,
      handleCheck
    }),
    [
      coverPages, setCoverPages,
      CoverPagesStatuses,
      optionList,
      assignedList,
      curStatus,
      setCurStatus,
      curPageNumber,
      setCurPageNumber,
      totalCount,
      WIDTH,
      Headers,
      handleCheck
    ]
  )

  return <CoverPagesContext.Provider value={value}>{children}</CoverPagesContext.Provider>
}

export const useCoverPages = () => {
  const context: any = useContext(CoverPagesContext)
  if (!context) {
    throw new Error("useCoverPages must be used within CoverPagesProvider")
  }
  return context
}

export default CoverPagesProvider