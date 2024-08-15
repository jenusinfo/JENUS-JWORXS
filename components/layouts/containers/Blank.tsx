import * as React from 'react'
import Head from 'next/head'
import { ILayout } from 'types/layout'

const BlankLayout = ({ children, pageTitle, showMeta }: ILayout) => {
    return (
        <div>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            {children}
        </div>
    )
}

export default BlankLayout