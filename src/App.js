import React, { useRef, useEffect } from 'react'
import './App.css';

function App() {
  const ref = useRef(null)
  const refLeft = useRef(null)
  const refTop = useRef(null)
  const refRight = useRef(null)
  const refBottom = useRef(null)

  useEffect(() => {
    const resizableElement = ref.current
    const styles = window.getComputedStyle(resizableElement)
    let width = parseInt(styles.width, 10)
    let height = parseInt(styles.height, 10)
    let x = 0;
    let y = 0;

    resizableElement.style.top = '50px'
    resizableElement.style.left = '50px'

    // Right
    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - x
      x = event.clientX
      width = width + dx
      resizableElement.style.width = `${width}px`
    }
    const onMoseUpRightResize = (event) => {
      document.removeEventListener('mousemove', onMouseMoveRightResize)
    }
    const onMouseDownRightResize = (event) => {
      x = event.clientX;
      resizableElement.style.left = styles.left
      resizableElement.style.right = null
      document.addEventListener('mousemove', onMouseMoveRightResize)
      document.addEventListener('mouseup', onMoseUpRightResize)
    }
    // Add mouse down event listener
    const resizerRight = refRight.current
    resizerRight.addEventListener('mousedown', onMouseDownRightResize)
    return () => {
      resizerRight.removeEventListener('mousedown', onMouseDownRightResize)
    }
  })

  return (
    <div className="container">
      <div ref={ref} className='resizable'>
        <div ref={refLeft} className='resizer resizer-l'></div>
        <div ref={refTop} className='resizer resizer-t'></div>
        <div ref={refRight} className='resizer resizer-r'></div>
        <div ref={refBottom} className='resizer resizer-b'></div>
      </div>
    </div>
  );
}

export default App;
