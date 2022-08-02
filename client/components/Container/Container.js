import React from 'react'

const Container = ({ children }) => {
  return <div className="w-full h-[calc(100vh_-_56px)] overflow-auto">{children}</div>
}

export default Container
