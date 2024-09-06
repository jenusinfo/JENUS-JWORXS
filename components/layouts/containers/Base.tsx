import * as React from 'react'
import Head from 'next/head'
import { ILayout } from 'types/layout'
import useWindowSize from 'shared/hooks/useWindowSize'

const BaseLayout = ({ children, pageTitle, showMeta }: ILayout) => {

  const width = useWindowSize().width

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className={'bg-white w-screen h-screen flex ' + (width > 870 ? 'flex-row' : 'flex-col justify-center')}>
        {width > 870 && <div className={'flex items-center justify-center h-full bg-[#f4f5fa] ' + (width > 870 ? 'w-[43%]' : 'w-full')}>
          <img src='/assets/login-img.png' width={450} />
        </div>}
        {children}
      </div>
    </div>
  )
}

export default BaseLayout