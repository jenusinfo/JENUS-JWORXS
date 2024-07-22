import * as React from 'react'
import Head from 'next/head'
import { ILayout } from 'types/layout'
import SideBar from '../partial/SideBar'
import Header from '../partial/Header'

const MainLayout = ({ children, pageTitle, showMeta }: ILayout) => {
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className='bg-[#f6f6f6] w-screen h-screen flex'>
        <SideBar />
        <div className='flex-1 px-6 overflow-y-auto'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainLayout