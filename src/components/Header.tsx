import { NavHeader } from '@/constants'

import { Button } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <ul style={{display:"flex"}}>
      {NavHeader.map((item) => (
        <li key={item.id}>
          {/* {item.title} */}
          <Link to={item.path}>{item.title}</Link>
        </li>
      ))}
    </ul>
  )
}
export default Header
