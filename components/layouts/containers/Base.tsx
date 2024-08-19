import * as React from 'react'
import Head from 'next/head'
import { ILayout } from 'types/layout'

const BaseLayout = ({ children, pageTitle, showMeta }: ILayout) => {

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className='bg-white w-screen h-screen flex'>
        <div className='flex items-center justify-center w-[43%] h-full bg-[#f4f5fa]'>
          <img src='/assets/login-img.png' width={450} />
        </div>
        {children}
      </div>
    </div>
  )
}

export default BaseLayout