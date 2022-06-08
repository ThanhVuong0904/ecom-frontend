import React, {useRef, useEffect, useContext, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BiCart, BiUser} from "react-icons/bi";
import { Badge, Toast } from 'react-bootstrap';
import { AuthContext } from '../contexts/authContext';

const mainNav = [
     {
          display: "Trang chủ",
          path: "/"
     },
     {
          display: "Sản phẩm",
          path: "/product"
     },
     {
          display: "Giới thiệu",
          path: "/about"
     },
     {
          display: "Liên hệ",
          path: "/contact"
     }
]
export default function Header() {
     const {authState, setShowAuth, logoutUser, cart} = useContext(AuthContext)
     const {user} = authState
     const {pathname} = useLocation()
     const active = mainNav.findIndex(nav => nav.path === pathname)
     
     const headerRef = useRef(null)
     const dropdownRef = useRef(null)

     useEffect(() => {
          const handleScroll = () => {
               if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                    headerRef.current.classList.add('shrink')
               } else {
                    headerRef.current.classList.remove('shrink')
               }
          }
          window.addEventListener("scroll", handleScroll)
          return () => {
               window.removeEventListener("scroll", handleScroll)
          };
     }, []);

     const showAction = () => {
          dropdownRef.current.classList.toggle('active')
     }
     return (
          <header className="header" ref={headerRef}>
               <div className="container">
                    <div className="header-logo">
                         <img src="https://res.cloudinary.com/debkio0dv/image/upload/v1637129993/test/logotv_kqpjpa.png" alt="logo" />
                    </div>
                    <ul className="header-menu">
                         {
                              mainNav.map((item, index) => (
                                   <li className="header-item" key={index}>
                                        <Link to={item.path} className={`header-link ${index === active ? 'active' : ''}`}>
                                             {item.display}
                                        </Link>
                                   </li>
                              ))
                         }
                    </ul>
                    <div className="header-action">
                         <Link to="/cart">
                              <div className="header-cart">
                                   <Badge bg="danger">{cart.length}</Badge>
                                   <BiCart className="header-cart-icon"/>
                              </div>
                         </Link>
                         {
                              user !== null 
                              ? 
                              <Link to='#' className="header-action-item">
                                   <div className="header-user"  onClick={showAction}>
                                        <BiUser />
                                        <span>{user !== null && user.username}</span>
                                   </div>
                                   <div className="header-user-dropdown" ref={dropdownRef}>
                                        <p>Thông tin</p>
                                        <p onClick={logoutUser}>Thoát</p>
                                   </div>
                              </Link>
                              :
                              <Link to='/login' onClick={() => setShowAuth(true)} className="header-action-item">
                                   <div className="header-user">
                                        <BiUser />
                                   </div>
                              </Link>
                         }
                    </div>
               </div> 
          </header>
     )
}
