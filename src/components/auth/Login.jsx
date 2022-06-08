import React, { useContext, useState } from 'react'
import { Form, Button, Alert} from 'react-bootstrap'
import { Link, useHistory} from 'react-router-dom'
import Facebook from '../../assets/images/bxl-facebook.svg'
import Twitter from '../../assets/images/bxl-twitter.svg'
import Apple from '../../assets/images/bxl-apple.svg'
import { AuthContext } from '../../contexts/authContext'
import AlertMessage from '../AlertMessage'
export default function Login() {
     const {login} = useContext(AuthContext)
     const [alert, setAlert] = useState({
          type: null,
          message: null
     })
     const [user, setUser] = useState({
          username: '',
          password: ''
     })
     const handleChangeInput = (e) => {
          const {name, value} = e.target
          setUser({...user, [name]: value})
          setAlert({type: null, message: null})
     }
     let history = useHistory()
     const handleSubmit = async (e) => {
          e.preventDefault()
          try {
               const res = await login(user)
               if(!res.success) {
                    setAlert({ type: 'danger', message: res.message })
               }
               if(res.success) {
                    history.push('/')
               }
               
          } catch (error) {
               console.log(error);
          }
     }
     return (
          <Form className="auth-form login" onSubmit={handleSubmit}>
               <h3>Đăng nhập để mua hàng ♥</h3>
               <AlertMessage info={alert}/>
               <Form.Group className="form-group">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control type="text" name="username" value={user.username} onChange={handleChangeInput}/>
               </Form.Group>
               <Form.Group className="form-group">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" name="password" value={user.password} onChange={handleChangeInput}/>
               </Form.Group>
               <Button variant="primary" type="submit" style={{width: '100%'}}>Đăng nhập</Button>

               <div className="auth-divider">
                    <div className="auth-divider-left"></div>
                    <span>Hoặc</span>
                    <div className="auth-divider-right"></div>
               </div>

               <div className="auth-social">
                    <div className="auth-facebook">
                         <img src={Facebook} alt="" />
                         <span>Facebook</span>
                    </div>
                    <div className="auth-twitter">
                         <img src={Twitter} alt="" />
                         <span>Twitter</span>
                    </div>
                    <div className="auth-apple">
                         <img src={Apple} alt="" />
                         <span>Apple</span>
                    </div>
               </div>

               <div className="auth-ask">
                    <span>Bạn mới biết đến Thanh Vương? </span>
                    <Link to="/register">Đăng ký</Link>
               </div>
          </Form>
     )
}
