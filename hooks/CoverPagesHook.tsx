import { useEffect, useState } from "react"
import { GetCoverPages } from "lib/coverpages"

export const useHookCoverpages = () => {
    const [coverPages, setCoverPages] = useState([])

    const getCoverPages = async () => {
        const data = await GetCoverPages()

        if (data)
            setCoverPages(data.Data)
    }

    useEffect(() => {
        getCoverPages()
    }, [])

    return {
        coverPages, setCoverPages
    }
}
