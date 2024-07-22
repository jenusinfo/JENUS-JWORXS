import Logo from "./SideBar/Logo";
import Account from "./SideBar/Account";
import Menu from "./SideBar/Menu";

const SideBar = () => {

  return (
    <div className='w-[200px] bg-white px-2 py-8 flex flex-col items-center relative'>
      <Logo />
      <Menu />
      <Account />
    </div>
  )
}

export default SideBar