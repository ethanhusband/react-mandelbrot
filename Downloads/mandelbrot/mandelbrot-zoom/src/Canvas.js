import React, { useRef, useEffect, useState, memo } from 'react'

const Canvas = (props) => {
    const canvasRef = useRef(null)

    const draw = (cont, frame) => {
        const atom = (x,y,c) => {cont.fillStyle=c; cont.fillRect(x,y,3,3)}
        // Remove the previous render to avoid weird overlaps
        for(var y=1; y<1500; y++){
            for(var x=1; x<1500; x++){
                atom(x,y,"rgb(255,255,255)");
            }
        }

        for(var y=1; y<1500; y++){
            for(var x=1; x<1500; x++){
                // Zoom points:
                // -0.233, -0.655
                // -0.12, -0.82
                // -0.74529, -0.113075
                const dx = (x-750)/(200+5000*(frame*frame*frame))-0.74529
                const dy = (y-250)/(200+5000*(frame*frame*frame))-0.113075
                var a = dx
                var b = dy
                for(var t=1; t<200; t++){
                    var d = (a*a)-(b*b)+dx
                    b = 2*(a*b)+dy
                    a = d
                    const H = d>200
                    if (H) {
                        atom(x,y,"rgb("+ t*3 +","+ t +","+ t*0.5 +")"); 
                        break
                    }
                }
            }
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        var frameCount = 0
        var animationFrameId

        const render = () => {
            frameCount++
            draw(context, frameCount)
            animationFrameId = window.requestAnimationFrame(render)
          }
        render()

        return () => {
        window.cancelAnimationFrame(animationFrameId)
        }
      }, [draw])
  
    return <canvas width={1500} height={1500} ref={canvasRef} {...props}/>
  }

export default Canvas