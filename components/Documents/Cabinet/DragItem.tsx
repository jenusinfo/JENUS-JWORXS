import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const DragItem = ({ id, children, className }: {
    id: string
    children: any
    className: string
}) => {
    const [{ isDragging }, drag]: any = useDrag(() => ({
        type: 'id',
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={className}
            style={{ border: isDragging ? '0.5px dashed blue' : '' }}
        >
            {children}
        </div>
    );
};

export default DragItem;
