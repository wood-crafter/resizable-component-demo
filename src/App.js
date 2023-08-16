import React, { useRef, useEffect, useState } from 'react'
import './App.css';

function App() {
  const ref = useRef(null)
  const refLeft = useRef(null)
  const refTop = useRef(null)
  const refRight = useRef(null)
  const refBottom = useRef(null)
  const refContainer = useRef(null)
  const refDontPush = useRef(null)

  useEffect(() => {
    const container = refContainer.current
    const containerStyle = window.getComputedStyle(container)
    const dontPush = refDontPush.current
    const dontPushStyle = window.getComputedStyle(dontPush)
    const leftDontPush = parseInt(dontPushStyle.left) - parseInt(dontPushStyle.border)
    const rightDontPush = leftDontPush + parseInt(dontPushStyle.width) + 2 * parseInt(dontPushStyle.border)
    const topDontPush = parseInt(dontPushStyle.top) - parseInt(dontPushStyle.border)
    const bottomDontPush = topDontPush + parseInt(dontPushStyle.height) + 2 * parseInt(dontPushStyle.border)
    const resizableElement = ref.current
    const styles = window.getComputedStyle(resizableElement)
    let width = parseInt(styles.width, 10)
    let height = parseInt(styles.height, 10)
    let x = 0;
    let y = 0;
    resizableElement.style.top = '5px'
    resizableElement.style.left = '5px'

    // Right
    const onMouseMoveRightResize = (event) => {
      if (event.clientX >= parseInt(containerStyle.width, 10) - 5) {
        return
      }
      const resizableElement = ref.current
      const resizableStyles = window.getComputedStyle(resizableElement)
      const topResizable = parseInt(resizableStyles.top) - parseInt(resizableStyles.border)
      const bottomResizable = topResizable + parseInt(resizableStyles.height) + 2 * parseInt(resizableStyles.border)

      // is current resizing component between dont push (0y)
      if ((topResizable >= topDontPush && topResizable <= bottomDontPush) || (bottomResizable >= topDontPush && bottomResizable <= bottomDontPush) || (bottomResizable >= bottomDontPush && topResizable <= topDontPush)) {
        if (x < leftDontPush && event.clientX >= leftDontPush && event.clientX > x) {
          return
        }
      }

      const dx = event.clientX - x
      x = event.clientX
      width = width + dx
      resizableElement.style.width = `${width}px`
    }
    const onMoseUpRightResize = () => {
      document.removeEventListener('mousemove', onMouseMoveRightResize)
    }
    const onMouseDownRightResize = (event) => {
      x = event.clientX;
      resizableElement.style.left = styles.left
      resizableElement.style.right = null
      document.addEventListener('mousemove', onMouseMoveRightResize)
      document.addEventListener('mouseup', onMoseUpRightResize)
    }
    // Top
    const onMouseMoveTopResize = (event) => {
      const resizableElement = ref.current
      const resizableStyles = window.getComputedStyle(resizableElement)
      const leftResizable = parseInt(resizableStyles.left) - parseInt(resizableStyles.border)
      const rightResizable = leftResizable + parseInt(resizableStyles.width) + 2 * parseInt(resizableStyles.border)
      if ((leftResizable >= leftDontPush && leftResizable <= rightDontPush) || (rightResizable >= leftDontPush && rightResizable <= rightDontPush) || (leftResizable <= leftDontPush && rightResizable >= rightDontPush)) {
        if (y > bottomDontPush && event.clientY <= bottomDontPush && event.clientY < y) {
          return
        }
      }
      const dy = event.clientY - y
      height = height - dy
      y = event.clientY
      resizableElement.style.height = `${height}px`
    }
    const onMoseUpTopResize = () => {
      document.removeEventListener('mousemove', onMouseMoveTopResize)
    }
    const onMouseDownTopResize = (event) => {
      y = event.clientY
      resizableElement.style.bottom = styles.bottom
      resizableElement.style.top = null
      document.addEventListener('mousemove', onMouseMoveTopResize)
      document.addEventListener('mouseup', onMoseUpTopResize)
    }
    // Bottom
    const onMouseMoveBottomResize = (event) => {
      const resizableElement = ref.current
      const resizableStyles = window.getComputedStyle(resizableElement)
      const leftResizable = parseInt(resizableStyles.left) - parseInt(resizableStyles.border)
      const rightResizable = leftResizable + parseInt(resizableStyles.width) + 2 * parseInt(resizableStyles.border)
      if ((leftResizable >= leftDontPush && leftResizable <= rightDontPush) || (rightResizable >= leftDontPush && rightResizable <= rightDontPush) || (leftResizable <= leftDontPush && rightResizable >= rightDontPush)) {
        if (y < topDontPush && event.clientY >= topDontPush && event.clientY > y) {
          return
        }
      }
      const dy = event.clientY - y
      height = height + dy
      y = event.clientY
      resizableElement.style.height = `${height}px`
    }
    const onMoseUpBottomResize = () => {
      document.removeEventListener('mousemove', onMouseMoveBottomResize)
    }
    const onMouseDownBottomResize = (event) => {
      y = event.clientY
      resizableElement.style.top = styles.top
      resizableElement.style.bottom = null
      document.addEventListener('mousemove', onMouseMoveBottomResize)
      document.addEventListener('mouseup', onMoseUpBottomResize)
    }
    // Left
    const onMouseMoveLeftResize = (event) => {
      if (event.clientX < 5) {
        return
      }
      const resizableElement = ref.current
      const resizableStyles = window.getComputedStyle(resizableElement)
      const topResizable = parseInt(resizableStyles.top) - parseInt(resizableStyles.border)
      const bottomResizable = topResizable + parseInt(resizableStyles.height) + 2 * parseInt(resizableStyles.border)

      // is current resizing component between dont push (0y)
      if ((topResizable >= topDontPush && topResizable <= bottomDontPush) || (bottomResizable >= topDontPush && bottomResizable <= bottomDontPush) || (bottomResizable >= bottomDontPush && topResizable <= topDontPush)) {
        if (x > rightDontPush && event.clientX <= rightDontPush && event.clientX < x) {
          return
        }
      }
      const dx = event.clientX - x
      x = event.clientX
      width = width - dx
      resizableElement.style.width = `${width}px`
    }
    const onMoseUpLeftResize = () => {
      document.removeEventListener('mousemove', onMouseMoveLeftResize)
    }
    const onMouseDownLeftResize = (event) => {
      x = event.clientX;
      resizableElement.style.right = styles.right
      resizableElement.style.left = null
      document.addEventListener('mousemove', onMouseMoveLeftResize)
      document.addEventListener('mouseup', onMoseUpLeftResize)
    }
    // Add mouse down event listener
    const resizerRight = refRight.current
    resizerRight.addEventListener('mousedown', onMouseDownRightResize)
    const resizerTop = refTop.current
    resizerTop.addEventListener('mousedown', onMouseDownTopResize)
    const resizerBottom = refBottom.current
    resizerBottom.addEventListener('mousedown', onMouseDownBottomResize)
    const resizerLeft = refLeft.current
    resizerLeft.addEventListener('mousedown', onMouseDownLeftResize)

    return () => {
      resizerRight.removeEventListener('mousedown', onMouseDownRightResize)
      resizerTop.removeEventListener('mousedown', onMouseDownTopResize)
      resizerBottom.removeEventListener('mousedown', onMouseDownBottomResize)
      resizerLeft.removeEventListener('mousedown', onMouseDownLeftResize)
    }
  }, [])

  return (
    <div className="container" ref={refContainer}>
      <div ref={ref} className='resizable'>
        <div ref={refLeft} className='resizer resizer-l'></div>
        <div ref={refTop} className='resizer resizer-t'></div>
        <div ref={refRight} className='resizer resizer-r'></div>
        <div ref={refBottom} className='resizer resizer-b'></div>
      </div>
      <div ref={refDontPush} className='dont-push'>Dont push</div>
    </div>
  );
}

export default App;
