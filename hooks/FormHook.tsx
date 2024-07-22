import { GetForm } from "lib/form"
import { useEffect, useState } from "react"
import { IForm } from "types/dashboard"

export const useHookForm = () => {
    const [forms, setForms] = useState<IForm[]>([])

    const getForms = async () => {
        const data = await GetForm()

        if (data)
            setForms(data.Data)
    }

    useEffect(() => {
        getForms()
    }, [])

    return {
        forms, setForms
    }
}
