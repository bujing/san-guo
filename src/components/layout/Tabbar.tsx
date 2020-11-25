import React from 'react'
import { NavLink } from 'react-router-dom'

function Tabbar () {
  const list = [
    { name: '首页', icon: 'home', url: '/' },
    { name: '列表', icon: 'list', url: '/list' }
  ]

  return (
    <>
      <div className="tabbar-placeholder"></div>
      <div className="tabbar flex main-content-evenly text-xs text-center">
        {list.map((v, k) => (
          <NavLink to={v.url} key={k} exact className="tabbar-item flex flex-column main-content-evenly">
            <i className={[`sgicon-${v.icon}`, 'tabbar-item__icon', 'sgicon'].join(' ')}></i>
            <div className="tabbar-item__text">{v.name}</div>
          </NavLink>
        ))}
      </div>
    </>
  )
}

export default Tabbar