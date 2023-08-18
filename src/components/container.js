import React, { useRef, useEffect, useState } from 'react'
import { useDrop, useDrag } from 'react-dnd'
import './index.css';
import { mergeRefs } from "react-merge-refs"
import Dragme from './dragme'

export function Container() {
  const ref = useRef(null)
  const refLeft = useRef(null)
  const refTop = useRef(null)
  const refRight = useRef(null)
  const refBottom = useRef(null)
  const refContainer = useRef(null)
  const refDontPush = useRef(null)
  const refDontOverlap1 = useRef(null)
  const refDontOverlap2 = useRef(null)
  const refDontOverlap3 = useRef(null)
  const refDontOverlap4 = useRef(null)
  const refDontOverlap5 = useRef(null)
  const refDontOverlap6 = useRef(null)
  const refDontOverlap7 = useRef(null)
  const refDontOverlap8 = useRef(null)
  const refDontOverlap9 = useRef(null)
  const barriers = [refDontPush, refDontOverlap1, refDontOverlap2, refDontOverlap3, refDontOverlap4, refDontOverlap5, refDontOverlap6, refDontOverlap7, refDontOverlap8, refDontOverlap9]
  const [, drop] = useDrop(() => ({
    accept: 'component',
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        return
      }
      const elementStyle = window.getComputedStyle(item.current)
      const sourceClientOffSet = monitor.getSourceClientOffset()
      const left = sourceClientOffSet.x
      const top = sourceClientOffSet.y
      const right = sourceClientOffSet.x + parseInt(elementStyle.width, 10)
      const bottom = sourceClientOffSet.y + parseInt(elementStyle.height, 10)
      let shouldDrop = true
      barriers.forEach(e => {
        const element = e.current
        const elementStyle = window.getComputedStyle(element)
        const leftDontPush = parseInt(elementStyle.left) - parseInt(elementStyle.border)
        const rightDontPush = leftDontPush + parseInt(elementStyle.width) + 2 * parseInt(elementStyle.border)
        const topDontPush = parseInt(elementStyle.top) - parseInt(elementStyle.border)
        const bottomDontPush = topDontPush + parseInt(elementStyle.height) + 2 * parseInt(elementStyle.border)

        if (!(left < leftDontPush && right < leftDontPush) && !(top < topDontPush && bottom < topDontPush) && (right > rightDontPush && left < rightDontPush) && (bottom > bottomDontPush && top > bottomDontPush)) {
          shouldDrop = false
        }
      })

      if (shouldDrop) {
        console.info('i ran', left, top, bottom, right)
        // item.style.left = `${left}px`
        // item.style.right = `${right}px`
        // item.style.top = `${top}px`
        // item.style.bottom = `${bottom}px`
        item.current.style.left = `76px`
        item.current.style.right = `176px`
        item.current.style.top = `131px`
        item.current.style.bottom = `231px`
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }))

  const getPositionsByRefs = (refs) => {
    const positions = []
    refs.forEach(item => {
      const element = item.current
      const elementStyle = window.getComputedStyle(element)
      const leftDontPush = parseInt(elementStyle.left) - parseInt(elementStyle.border)
      const rightDontPush = leftDontPush + parseInt(elementStyle.width) + 2 * parseInt(elementStyle.border)
      const topDontPush = parseInt(elementStyle.top) - parseInt(elementStyle.border)
      const bottomDontPush = topDontPush + parseInt(elementStyle.height) + 2 * parseInt(elementStyle.border)
      // Top left: TL(left, top)
      // Bottom right: BR (right, bottom)

      positions.push({
        leftDontPush,
        rightDontPush,
        topDontPush,
        bottomDontPush
      })
    })
    return positions
  }

  useEffect(() => {
    const container = refContainer.current
    const containerStyle = window.getComputedStyle(container)
    const positions = getPositionsByRefs(barriers)
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
      let shouldStopResize = false

      // is current resizing component between dont push (0y)
      positions.every(item => {
        if ((topResizable >= item.topDontPush && topResizable <= item.bottomDontPush) || (bottomResizable >= item.topDontPush && bottomResizable <= item.bottomDontPush) || (bottomResizable >= item.bottomDontPush && topResizable <= item.topDontPush)) {
          if (x < item.leftDontPush && event.clientX >= item.leftDontPush && event.clientX > x) {
            shouldStopResize = true
            return false
          }
        }
        return true
      })

      if (shouldStopResize) return

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
      if (event.clientY < 5) {
        return
      }
      const resizableElement = ref.current
      const resizableStyles = window.getComputedStyle(resizableElement)
      const leftResizable = parseInt(resizableStyles.left) - parseInt(resizableStyles.border)
      const rightResizable = leftResizable + parseInt(resizableStyles.width) + 2 * parseInt(resizableStyles.border)
      let shouldStopResize = false
      positions.every(item => {
        if ((leftResizable >= item.leftDontPush && leftResizable <= item.rightDontPush) || (rightResizable >= item.leftDontPush && rightResizable <= item.rightDontPush) || (leftResizable <= item.leftDontPush && rightResizable >= item.rightDontPush)) {
          if (y > item.bottomDontPush && event.clientY <= item.bottomDontPush && event.clientY < y) {
            shouldStopResize = true
            return false
          }
        }
        return true
      })
      if (shouldStopResize) return
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
      if (event.clientY >= parseInt(containerStyle.height, 10) - 5) {
        return
      }
      const resizableElement = ref.current
      const resizableStyles = window.getComputedStyle(resizableElement)
      const leftResizable = parseInt(resizableStyles.left) - parseInt(resizableStyles.border)
      const rightResizable = leftResizable + parseInt(resizableStyles.width) + 2 * parseInt(resizableStyles.border)
      let shouldStopResize = false
      positions.every(item => {
        if ((leftResizable >= item.leftDontPush && leftResizable <= item.rightDontPush) || (rightResizable >= item.leftDontPush && rightResizable <= item.rightDontPush) || (leftResizable <= item.leftDontPush && rightResizable >= item.rightDontPush)) {
          if (y < item.topDontPush && event.clientY >= item.topDontPush && event.clientY > y) {
            shouldStopResize = true
            return false
          }
        }
        return true
      })
      if (shouldStopResize) return
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

      let shouldStopResize = false
      positions.every(item => {
        if ((topResizable >= item.topDontPush && topResizable <= item.bottomDontPush) || (bottomResizable >= item.topDontPush && bottomResizable <= item.bottomDontPush) || (bottomResizable >= item.bottomDontPush && topResizable <= item.topDontPush)) {
          if (x > item.rightDontPush && event.clientX <= item.rightDontPush && event.clientX < x) {
            shouldStopResize = true
            return false
          }
        }
        return true
      })
      if (shouldStopResize) return
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
    <div className="container" ref={mergeRefs([refContainer, drop])}>
      <div ref={ref} className='resizable'>
        <Dragme />
        <div ref={refLeft} className='resizer resizer-l'></div>
        <div ref={refTop} className='resizer resizer-t'></div>
        <div ref={refRight} className='resizer resizer-r'></div>
        <div ref={refBottom} className='resizer resizer-b'></div>
      </div>
      <div ref={refDontPush} className='barrier dont-push'>Dont push</div>
      <div ref={refDontOverlap1} className='barrier dont-overlap1'>Dont overlap</div>
      <div ref={refDontOverlap2} className='barrier dont-overlap2'>Dont overlap</div>
      <div ref={refDontOverlap3} className='barrier dont-overlap3'>Dont overlap</div>
      <div ref={refDontOverlap4} className='barrier dont-overlap4'>Dont overlap</div>
      <div ref={refDontOverlap5} className='barrier dont-overlap5'>Dont overlap</div>
      <div ref={refDontOverlap6} className='barrier dont-overlap6'>Dont overlap</div>
      <div ref={refDontOverlap7} className='barrier dont-overlap7'>Dont overlap</div>
      <div ref={refDontOverlap8} className='barrier dont-overlap8'>Dont overlap</div>
      <div ref={refDontOverlap9} className='barrier dont-overlap9'>Dont overlap</div>
    </div>
  );
}

export default Container;
