import { GetParentBank, GetUnits } from "lib/settings/units"
import { useApp } from "providers/AppProvider"
import { useEffect, useState } from "react"

export const useHookUnits = () => {
    const {setLoading} = useApp()
    const [units, setUnits] = useState<any[]>([])
    const [parentBankList, setParentBankList] = useState<any[]>([])

    const getUnits = async () => {
        setLoading(true)
        const data = await GetUnits()

        if (data)
            setUnits(data.Data)
        setLoading(false)
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
        units, setUnits, getUnits,
        parentBankList, setParentBankList
    }
}
