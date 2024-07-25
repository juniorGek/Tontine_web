import React from 'react'
import SideBar from '../../global/SideBar'

const Client = ({user}) => {
  return (
    <SideBar user={user} >
        <div>Client</div>
    </SideBar>
  )
}

export default Client