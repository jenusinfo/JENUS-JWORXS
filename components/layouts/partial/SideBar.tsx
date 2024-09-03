import Logo from "./SideBar/Logo";
import Account from "./SideBar/Account";
import Menu from "./SideBar/Menu";
import { useState } from "react";
import { useApp } from "providers/AppProvider";

const SideBar = () => {

  const { isMinimize } = useApp()

  return (
    <div className={'bg-white px-2 py-8 flex flex-col items-center relative transition-all duration-500 ' + (!isMinimize ? 'w-[200px]' : 'w-[104px]')}>
      <Logo />
      <Menu />
      <Account />
    </div>
  )
}

export default SideBar