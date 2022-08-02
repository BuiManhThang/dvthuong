import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Info = () => {
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    const fetchUserInfo = async (userId) => {
      try {
        const res = await axios.get(`http://localhost:3001/api/v1/users/${userId}`, {
          withCredentials: true,
        })
        setUserInfo(res.data.data)
      } catch (error) {
        console.log(error)
        setUserInfo({})
      }
    }
    fetchUserInfo('62cd7790f570024ddf750070')
  }, [])

  return <div>{JSON.stringify(userInfo)}</div>
}

export default Info
