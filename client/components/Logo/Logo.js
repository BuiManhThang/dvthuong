import React from 'react'

const Logo = ({ className }) => {
  return (
    <a className={`flex items-center ${className}`} href="/home">
      <div className="h-[30px] w-[30px] rounded-full bg-primary mr-3" />
      <div className="text-xl font-bold">Mua ô tô</div>
    </a>
  )
}

export default Logo
