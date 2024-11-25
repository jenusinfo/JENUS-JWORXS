import React, { useEffect, useRef, useState } from 'react';

const Tooltip = ({ children, component }: any) => {

  const [isHover, setIsHover] = useState(false);
  const IconRef = useRef(null)
  const [dx, setDx] = useState(0)
  const [dy, setDy] = useState(0)

  useEffect(() => {
    const ref: any = IconRef.current
    if (ref) {
      const rect = ref.getBoundingClientRect();
      const x = rect.left + window.scrollX;
      const y = rect.top + window.scrollY;
      setDx(x)
      setDy(y)
    }
  }, [IconRef])

  return (
    <>
      <div style={{ zIndex: 101 }} onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)}>
        <div ref={IconRef}>{component}</div>
        {isHover && <div className='fixed' style={{ left: dx+100, top: dy+2 }}>
          {children}
        </div>}
      </div>
    </>
  )
}

export default Tooltip