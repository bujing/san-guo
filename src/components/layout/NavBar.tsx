import React from 'react'

interface Props {
  title: String
}

function NavBar (props: Props) {
  return (
    <div className="nav-bar flex cross-items-center">
      <div className="nav-bar__left"></div>
      <div className="nav-bar__title text-lg text-center">{props.title}</div>
      <div className="nav-bar__right"></div>
    </div>
  )
}

export default NavBar