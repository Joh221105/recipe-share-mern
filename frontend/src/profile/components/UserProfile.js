import React from 'react'
import userData from '../../userData'

const UserProfile = () => {
  return (
    <div>
      <img src= {userData[0].profileImage} />
      <h1>{userData[0].displayName}</h1>
      <img src ={userData[0].coverImg} />
      <p>{userData[0].email}</p>
      <p>{userData[0].bio}</p>
    </div>
  )
}

export default UserProfile