import React, { useEffect, useRef, useState } from 'react'

const DropDown = ({ children, target, left, top, zIndex = 30 }: any) => {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: any) => {
    const ref: any = dropdownRef.current

    if (ref && !ref.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={"relative"} style={{ zIndex }} ref={dropdownRef}>
      <div onClick={toggleDropdown}>
        {target}
      </div>
      {isOpen && (
        <div className='absolute' style={{ left, top }}>
          {children}
        </div>
      )}
    </div>
  )
}

export default DropDown