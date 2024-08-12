import { useEffect, useState } from "react"
import { GetHashTags } from "lib/hashtag"

export const useHookHashTag = () => {
    const [hashTags, setHashTags] = useState<any[]>([])

    const getHashTags = async () => {
        const data = await GetHashTags()

        if (data)
            setHashTags(data.Data)
    }

    useEffect(() => {
        getHashTags()
    }, [])

    return {
        hashTags, setHashTags
    }
}
