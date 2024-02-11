import { useRouter } from 'next/router'
import React from 'react'

export default function Corcho() {
    const router = useRouter()
    console.log(router.query)
    return (
        <div>Corcho</div>
    )
}
