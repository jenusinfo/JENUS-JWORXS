import useWindowSize from '../../shared/hooks/useWindowSize';
const ReservedPart = () => {

  const width = useWindowSize().width

  return (
    <div className={"w-[460px] " + (width > 870 ? 'absolute bottom-10' : ' mt-8')}>
      <p className="text-primary text-sm font-medium text-[#2454DE]">
        Terms of Service | Privacy Policy | Cookies
      </p>
      <p className="text-primary text-sm font-medium text-[#84858C] mt-2">
        Copyright &copy; Jenus Technologies Ltd
      </p>
    </div>
  )
}

export default ReservedPart