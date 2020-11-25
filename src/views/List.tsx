import React, { useState, useEffect, useCallback } from 'react'
import NavBar from '../components/layout/NavBar'
import heros from '../assets/heros.json'
import style from '../assets/styles/module/list.module.scss'

interface CampType {
  WEI: string
  SHU: string
  WU: string
  QUN: string
  [key: string]: string
}

function List () {
  // 将领阵营
  const CAMPS_CN: CampType = {
    WEI: '魏',
    SHU: '蜀',
    WU: '吴',
    QUN: '群'
  }
  // 将领阵营，当前选中的阵营
  const [camps, setCamps] = useState(Object.keys(CAMPS_CN))
  const updateCamp = useCallback(camp => {
    const i = camps.indexOf(camp)
    if (i === -1) {
      camps.push(camp)
    } else {
      camps.splice(i, 1)
    }
    setCamps([...camps])
  }, [camps])

  // 将领能力值
  const [abilities, setAbilities] = useState([
    { text: '统', code: 'command', value: 0 },
    { text: '率', code: 'led', value: 0 },
    { text: '勇', code: 'valor', value: 0 },
    { text: '武', code: 'force', value: 0 },
    { text: '谋', code: 'tactic', value: 0 },
    { text: '略', code: 'strategy', value: 0 }
  ])
  const updateAbility = useCallback(i => {
    abilities.forEach((v, j) => {
      if (j === i) {
        abilities[j].value++
      } else {
        abilities[j].value = 0
      }
    })
    setAbilities([...abilities])
  }, [abilities])

  const [heroList, setHeroList] = useState(heros)
  useEffect(() => {
    const list: HeroType[] = heros.filter(v => camps.indexOf(v.camp) > -1)
    const sort = abilities.findIndex(v => v.value % 3 !== 0)
    if (sort !== -1) {
      const { code, value } = abilities[sort]
      list.sort((a, b) => {
        const diff = Math.abs(a[code]) - Math.abs(b[code])
        return value % 3 === 1 ? -diff : diff
      })
    }
    setHeroList(list)
  }, [camps, abilities])

  return (
    <>
      <NavBar title="列表" />

      <div className={[style.filter, 'flex', 'cross-items-center'].join(' ')}>
        {Object.keys(CAMPS_CN).map((v, k) => (
          <label
            key={k}
            className={[style['filter-item'], camps.indexOf(v) > -1 ? style[v.toLowerCase()] : '', 'text-sm', 'text-center'].join(' ')}
            onClick={() => updateCamp(v)}
          >{CAMPS_CN[v]}</label>
        ))}
      </div>

      <div className={style.hero}>
        <div className={[style['hero-grid'], style.sticky].join(' ')}>
          <span>姓名</span>
          {abilities.map((v, k) => (
            <span key={k} onClick={() => updateAbility(k)}>
              {v.text}<svg className={style['sgicon-svg']} aria-hidden="true"><use xlinkHref={'#sgicon-' + ['sort', 'desc', 'asc'][v.value % 3]}></use></svg>
            </span>
          ))}
        </div>
        {heroList.map((v, k) => (
          <div key={k} className={style['hero-grid']}>
            <div className="flex cross-items-center">
              <span className={[style['hero-camp'], style[v.camp.toLowerCase()], 'text-center'].join(' ')}>{CAMPS_CN[v.camp]}</span>
              <span>{v.lastName}{v.firstName}</span>
            </div>
            <span>{v.command}</span>
            <span>{v.led}</span>
            <span>{v.valor}</span>
            <span>{v.force}</span>
            <span>{v.tactic}</span>
            <span>{v.strategy}</span>
          </div>
        ))}
        {heroList.length === 0 && <div className={[style['hero-empty'], 'text-sm', 'text-center'].join(' ')}>空空如也</div>}
      </div>
    </>
  )
}

export default List