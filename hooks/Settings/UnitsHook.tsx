import { GetUnits } from "lib/settings/units"
import { useEffect, useState } from "react"

export const useHookUnits = () => {
    const [units, setUnits] = useState<any[]>([])

    const getUnits = async () => {
        const data = await GetUnits()

        if (data)
            setUnits(data.Data)
    }

    useEffect(() => {
        getUnits()
    }, [])

    return {
        units, setUnits
    }
}
