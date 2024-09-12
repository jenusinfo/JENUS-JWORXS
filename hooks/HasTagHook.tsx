import { useEffect, useState } from "react"
import { GetHashTags, GetHasTagDetail } from "lib/hashtag"
import { useApp } from "providers/AppProvider"

export const useHookHashTag = () => {

    const { loading, setLoading } = useApp()
    const [hashTags, setHashTags] = useState<any[]>([])
    const [workGroups, setWorkGroups] = useState<any[]>([])

    const getHashTags = async () => {
        setLoading(true)
        const data = await GetHashTags()

        if (data)
            setHashTags(data.Data)
        setLoading(false)
    }

    const getHashTagDetail = async () => {
        const data = await GetHasTagDetail()

        if (data)
            setWorkGroups(data.Data)
    }

    useEffect(() => {
        getHashTags()
        getHashTagDetail()
    }, [])

    return {
        hashTags, setHashTags, loading, getHashTags,
        workGroups, setWorkGroups, getHashTagDetail
    }
}
