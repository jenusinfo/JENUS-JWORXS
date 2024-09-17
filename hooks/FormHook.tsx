import { GetForm } from "lib/form"
import { useEffect, useState } from "react"
import { IForm } from "types/dashboard"

export const useHookForm = () => {
    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState<IForm[]>([])

    const getForms = async () => {
        setLoading(true)
        const data = await GetForm()

        if (data)
            setForms(data.Data)
        setLoading(false)
    }

    useEffect(() => {
        getForms()
    }, [])

    return {
        forms, setForms, getForms,
        loading
    }
}
