import React from 'react'
import SideBar from '../../global/SideBar'

function Zone({user}) {
  return (
    <>
        <SideBar user={user} >
            <div>
                <h1>Zone</h1>
            </div>
        </SideBar>
    </>
  )
}

export default Zone
