import React, { useState } from 'react'
import Logo from '../Logo/Logo'
import Image from 'next/image'
import { useRouter } from 'next/router'
import AvatarDefault from '../../assets/images/slide/843017.jpg'

const NAV_LINKS = [
  {
    name: 'Trang chủ',
    url: '/home',
  },
  {
    name: 'Giới thiệu',
    url: '/intro',
  },
  {
    name: 'Sản phẩm',
    url: '/products',
  },
  {
    name: 'Hãng sản xuất',
    url: '/manufacturers',
  },
  {
    name: 'Liên hệ',
    url: '/contact',
  },
]

const Navbar = () => {
  const [isActive, setIsActive] = useState(false)
  const [userInfo, setUserInfo] = useState({
    fullName: 'Admin',
    avatar: AvatarDefault,
  })

  const router = useRouter()

  return (
    <div className="w-full h-14 flex items-center justify-between px-6 shadow-lg relative">
      <Logo />

      <div className="flex items-center gap-x-4">
        {userInfo ? (
          <div className="flex items-center gap-x-2">
            <div className="cursor-pointer hover:fill-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="M10.8 20.85H6.575q-2.625 0-4.488-1.8-1.862-1.8-1.862-4.4 0-2.2 1.213-3.962Q2.65 8.925 4.725 8.45 5.5 6.05 7.5 4.6q2-1.45 4.5-1.45 3.05 0 5.25 2.062 2.2 2.063 2.475 5.088 1.8.475 2.925 1.937 1.125 1.463 1.125 3.338 0 2.2-1.537 3.737Q20.7 20.85 18.5 20.85h-5.3v-6.775l1.775 1.775 1.675-1.65L12 9.525 7.35 14.2l1.675 1.65 1.775-1.775Z" />
              </svg>
            </div>
            <div className="flex items-center gap-x-2 py-1 px-2 cursor-pointer rounded-xl hover:bg-primary transition-colors">
              <div>{userInfo.fullName}</div>
              <div className="relative w-8 h-8">
                <Image
                  className="object-cover object-center rounded-full"
                  src={userInfo.avatar}
                  layout="fill"
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <a className="hover:text-primary transition-colors" href="/sign-in">
              Đăng nhập
            </a>
            <span className="text-primary font-bold transition-colors">/</span>
            <a className="hover:text-primary" href="/sign-in">
              Đăng ký
            </a>
          </div>
        )}

        <div
          className="cursor-pointer hover:fill-primary transition-colors lg:hidden"
          onClick={() => setIsActive(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path d="M4.25 21.15q-1.425 0-2.412-1-.988-1-.988-2.4V6.25q0-1.4.988-2.4.987-1 2.412-1h15.5q1.425 0 2.413 1 .987 1 .987 2.4v11.5q0 1.4-.987 2.4-.988 1-2.413 1ZM12 14.3l7.75-5V6.25L12 11.3 4.25 6.25V9.3Z" />
          </svg>
        </div>
      </div>

      <div
        className={`absolute top-0 w-full h-screen bg-white z-20 transition-all ${
          isActive ? 'left-0' : '-left-full'
        }
        lg:top-0 lg:left-1/2 lg:-translate-x-1/2 lg:h-full lg:w-[calc(100%_-_400px)] xl:w-[calc(100%_-_800px)]`}
      >
        <div
          className="cursor-pointer hover:fill-primary transition-colors absolute top-6 right-6 lg:hidden"
          onClick={() => setIsActive(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path d="M4.25 21.15q-1.425 0-2.412-1-.988-1-.988-2.4V6.25q0-1.4.988-2.4.987-1 2.412-1h15.5q1.425 0 2.413 1 .987 1 .987 2.4v11.5q0 1.4-.987 2.4-.988 1-2.413 1ZM12 14.3l7.75-5V6.25L12 11.3 4.25 6.25V9.3Z" />
          </svg>
        </div>
        <ul className="w-full h-full flex flex-col justify-center lg:flex-row lg:items-center lg:gap-x-3 xl:gap-x-12">
          {NAV_LINKS.map((navLink, idx) => {
            let className =
              'h-10 px-2 text-2xl text-center flex items-center justify-center font-medium hover:text-primary transition-colors lg:text-base lg:h-full'
            if (router.pathname.includes(navLink.url)) {
              className =
                'h-10 px-2 text-2xl text-center flex items-center justify-center text-primary font-medium hover:text-primary transition-colors lg:text-base lg:h-full'
            }
            return (
              <li className="flex justify-center my-4 lg:my-0" key={idx}>
                <a className={className} href={navLink.url}>
                  {navLink.name}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
