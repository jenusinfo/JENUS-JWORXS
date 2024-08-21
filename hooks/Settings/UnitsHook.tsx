import { GetParentBank, GetUnits } from "lib/settings/units"
import { useEffect, useState } from "react"

export const useHookUnits = () => {
    const [units, setUnits] = useState<any[]>([])
    const [parentBankList, setParentBankList] = useState<any[]>([])

    const getUnits = async () => {
        const data = await GetUnits()

        if (data)
            setUnits(data.Data)
    }
    
    const getParentBank = async () => {
        const data = await GetParentBank()

        if (data)
            setParentBankList(data.Data)
    }

    useEffect(() => {
        getUnits()
        getParentBank()
    }, [])

    return {
        units, setUnits,
        parentBankList, setParentBankList
    }
}
