import React, { useRef, ReactNode, useState } from 'react'
import { IoMdClose } from "react-icons/io";

interface IModal {
  children?: ReactNode
  isOpen: boolean
  handleClose: () => void
  width: string | number
  anchorY: string | number
  anchorX: string | number
  isOuterClick: boolean
}

const RightSide = ({ children, isOpen, handleClose, width, anchorY, anchorX, isOuterClick }: IModal) => {
  const dropdownRef = useRef(null);
  const [isOut, setIsOut] = useState(false);

  const handleMouseDown = (event: any) => {
    const ref: any = dropdownRef.current;
    if (ref) {
      setIsOut(ref.contains(event.target))
    }
  }

  const handleMouseUp = (event: any) => {
    const ref: any = dropdownRef.current
    if (isOuterClick)
      if (ref && !ref.contains(event.target) && !isOut) {
        handleClose();
      }
  }

  return (
    <>
      <div
        className={'bg-white dark:bg-[#121418] rounded-[15px] overflow-y-auto h-screen'}
        style={{ position: 'fixed', width: width, right: isOpen ? 0 : -540, zIndex: 50, top: 0, transition: 'all', transitionDuration: '500ms' }}
        ref={dropdownRef}
      >
        <IoMdClose className='absolute hover:cursor-pointer' style={{ right: 16, top: 16 }} onClick={handleClose} />
        {children}
      </div>
      <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 49, display: isOpen ? 'block' : 'none' }} onClick={handleClose}>
      </div>
    </>
  )
}

RightSide.defaultProps = {
  width: '50%',
  anchorY: 100,
  anchorX: 0,
  isOuterClick: true
}

export default RightSide