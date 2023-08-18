import React, { useRef, useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { mergeRefs } from "react-merge-refs"
import './index.css';

export function Dragme({}) {
  const refDrag = useRef(null)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "component",
    item: () => {
      return refDrag
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [])

  return (
    <div ref={mergeRefs([refDrag, drag])} className='resize-me'>Resize me</div>
  );
}

export default Dragme;
