import * as React from 'react'
import Head from 'next/head'
import { ILayout } from 'types/layout'
import BaseHeader from '../partial/Base/Header'

const BlankLayout = ({ children, pageTitle, showMeta }: ILayout) => {

    return (
        <div>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <div className='bg-white w-screen h-screen'>
                <BaseHeader />
                {children}
            </div>
        </div>
    )
}

export default BlankLayout