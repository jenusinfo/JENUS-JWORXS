import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop, children, status, className }: {
    onDrop: any
    children: any
    status: string
    className: string
}) => {
    const [{ isOver }, drop]: any = useDrop(() => ({
        accept: 'id',
        drop: (id) => {
            onDrop(id, status);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={className}
            style={{ border: isOver ? '0.5px solid green' : '' }}
        >
            {children}
        </div>
    );
};

export default DropZone;
