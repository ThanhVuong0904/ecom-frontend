import React, { useContext } from 'react'
import Login from './Login'
import Register from './Register'
import { Modal } from 'react-bootstrap'
import { AuthContext } from '../../contexts/authContext'
import {useHistory} from 'react-router-dom'
export default function Auth({authRoute}) {
     let history = useHistory() 
     const {setShowAuth, showAuth} = useContext(AuthContext)
     const closeDialog = () => {
          setShowAuth(false)
          history.push('/')
     }
     return (
          <Modal show={true} size="lg" onHide={closeDialog}>
               <Modal.Body>
               <div className="auth">
                    <div className="auth-img">
                         <img src="https://res.cloudinary.com/debkio0dv/image/upload/v1637934910/test/xnsg9ghzjhdgmmnvts6c.jpg" alt="" />
                    </div>
                    {authRoute === "login" && <Login />}
                    {authRoute === "register" && <Register />}
               </div>
               </Modal.Body>
          </Modal>
     )
}
