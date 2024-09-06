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

const Modal = ({ children, isOpen, handleClose, width, anchorY, anchorX, isOuterClick }: IModal) => {
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
            {isOpen && <div className={'flex ' + (anchorX == 0 ? 'justify-center items-center' : '')} style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 101 }} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
                <div
                    className='relative bg-white dark:bg-[#121418] rounded-[10px] overflow-y-auto h-fit'
                    style={{ width: width, marginLeft: anchorX, height: 'fit-content' }}
                    ref={dropdownRef}
                >
                    <IoMdClose className='absolute hover:cursor-pointer' style={{ right: 16, top: 16 }} onClick={handleClose} />
                    {children}
                </div>
            </div>}
        </>
    )
}

Modal.defaultProps = {
    width: '50%',
    anchorY: 300,
    anchorX: 0,
    isOuterClick: true
}

export default Modal