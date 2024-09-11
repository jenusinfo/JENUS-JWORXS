import { useEffect, useState } from "react"
import { GetHashTags } from "lib/hashtag"
import { useApp } from "providers/AppProvider"

export const useHookHashTag = () => {

    const { loading, setLoading } = useApp()
    const [hashTags, setHashTags] = useState<any[]>([])

    const getHashTags = async () => {
        setLoading(true)
        const data = await GetHashTags()

        if (data)
            setHashTags(data.Data)
        setLoading(false)
    }

    useEffect(() => {
        getHashTags()
    }, [])

    return {
        hashTags, setHashTags, loading, getHashTags
    }
}
