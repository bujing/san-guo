import React, { useState, useEffect, useRef } from 'react'
import NavBar from '../components/layout/NavBar'
import heros from '../assets/heros.json'
import style from '../assets/styles/module/home.module.scss'

function Home () {
  const heroList = heros
  // 将领球体排列
  const count = 12
  const xRotate = [0, 30, 60, 90, 120, 150]
  const yRotate = Array(count).fill(1).map((v, i) => 360 / count * i)
  const rotates: [number, number][] = []
  xRotate.forEach((x, i) => {
    yRotate.forEach((y, j) => {
      const cross = [3, 9]
      const side = [2, 4, 8, 10]
      if (
        !i ||
        (cross.indexOf(j) === -1 && (i % 2 === 0 || side.indexOf(j) === -1))
      ) {
        rotates.push([x, y])
      }
    })
  })
  // 补全将领空缺
  if (rotates.length > heroList.length) {
    heroList.push(...heroList.slice(0, rotates.length - heroList.length))
  }

  // 轴转角
  const [deg, setDeg] = useState({ x: 0, y: 0 })
  /* eslint-disable */
  const [step, setStep] = useState({ x: 1, y: 1 })
  /* eslint-disable */
  const intervalRef = useRef(0)

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setDeg(deg => ({
        x: deg.x + step.x,
        y: deg.y + step.y
      }))
    }, 30)

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
      }
    }
  }, [step])

  return (
    <>
      <NavBar title="首页" />
      
      <div className={style.wrap}>
        <div
          className={[style.box, 'text-center'].join(' ')}
          style={{
            transform: `rotateX(${deg.x}deg) rotateY(${deg.y}deg)`
          }}
        >
          {rotates.map(([x, y], k) => (
            <div
              key={k}
              className={[style.hero, style[heroList[k].camp.toLowerCase()], 'flex', 'main-content-center', 'cross-items-center'].join(' ')}
              style={{
                transform: `rotateX(${x}deg) rotateY(${y}deg) translateZ(150px)`
              }}
            >
              <span className={style['first-name']}>{heroList[k].firstName}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home 