import React, { useContext} from 'react'
import {FormFeedback} from 'reactstrap'
import {Form,  Button} from 'react-bootstrap'
import Facebook from '../../assets/images/bxl-facebook.svg'
import Twitter from '../../assets/images/bxl-twitter.svg'
import Apple from '../../assets/images/bxl-apple.svg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'
import AlertMessage from '../AlertMessage'
import { Formik, ErrorMessage, useFormik } from 'formik'
import * as yup from 'yup'
export default function Register() {
     const schema = yup.object().shape({
          username: yup.string().required('Trường này là bắt buộc'),
          password: yup.string().required('Trường này là bắt buộc').min(4).max(10),
          email: yup.string().required('Trường này là bắt buộc').matches(
               /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
               "Please enter a valid email address"
          ),
     });
     const {register} = useContext(AuthContext)

     const user = {
          username: '',
          email: '',
          password: '',
     }
    
     return (
          <Formik
               initialValues={user}
               validationSchema={schema}
               onSubmit={values => register(values)}
          >
               {({handleSubmit, handleChange, values, errors}) => {
                    console.log("errors", errors);
                    return (
                         <Form className="auth-form register" onSubmit={handleSubmit}>
                              <h3>Đăng ký để mua hàng ♥</h3>
                              <Form.Group className="form-group">
                                   <Form.Label>Tên đăng nhập</Form.Label>
                                   <Form.Control 
                                        type="text" 
                                        value={values.username} 
                                        name="username" 
                                        onChange={handleChange} 
                                        isInvalid={errors.username}
                                   />
                                   {
                                        
                                        errors.username && (
                                             <FormFeedback>
                                                  {errors.username}
                                             </FormFeedback>
                                        )
                                   }
                              </Form.Group>
                              <Form.Group className="form-group">
                                   <Form.Label>Gmail</Form.Label>
                                   <Form.Control 
                                        type="email" 
                                        name="email" 
                                        value={values.email} 
                                        onChange={handleChange}
                                        isInvalid={errors.email}
                                   />
                                   {
                                        errors.email && (
                                             <FormFeedback>
                                                  {errors.email}
                                             </FormFeedback>
                                        )
                                   }
                              </Form.Group>
                              <Form.Group className="form-group">
                                   <Form.Label>Mật khẩu</Form.Label>
                                   <Form.Control 
                                        type="password" 
                                        name="password" 
                                        value={values.password} 
                                        onChange={handleChange}
                                        isInvalid={errors.password}
                                   />
                                   {
                                        errors.password && (
                                             <FormFeedback>
                                                  {errors.password}
                                             </FormFeedback>
                                        )
                                   }
                              </Form.Group>
                              <Button variant="primary" style={{width: '100%'}} type="submit">Đăng ký</Button>

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
                                   <span>Bạn đã có tài khoản? </span>
                                   <Link to="/login">Đăng nhập</Link>
                              </div>
                         </Form>
                    )
               }
               }
          </Formik>
          
     )
}
