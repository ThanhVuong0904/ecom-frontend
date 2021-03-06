import React, { useContext, useEffect, useState } from 'react'
import { Form} from 'react-bootstrap'
import { FormFeedback } from 'reactstrap'
import axios from 'axios'
import PaypalButton from '../components/PaypalButton'
import Helmet from '../components/Helmet'
import {apiUrl, SHIPPING_FEE} from '../contexts/constanst'
import {AuthContext} from '../contexts/authContext'
import ModalSuccessfulProduct from '../components/ModalSuccessfulProduct'
import { Formik } from 'formik'
import * as yup from 'yup'
import ContactInformationForm from '../components/payment/ContactInformationForm'
import ShippingInformationForm from '../components/payment/ShippingInformationForm'
export default function Payment() {
     const {
          authState, 
          cart, 
          createPayment, 
          setCart, 
          showModalSuccessfulProduct, setShowModalSuccessfulProduct
     } = useContext(AuthContext)
     const [city, setCity] = useState([])
     const [districts, setDistricts] = useState([])
     const [wards, setWards] = useState([])
     const [total, setTotal] = useState(0)
     const [isPaypal, setIsPaypal] = useState(false)
     
     const payment = {
          email: '',
          phoneNumber: '',
          firstName: '',
          lastName: '',
          street: '',
          city: '',
          district: '',
          ward: '',
     }

     useEffect(() => {
          // setPayment({...payment, cart: getCart})
          setShowModalSuccessfulProduct(false)
     }, [cart])
     useEffect(() => {
          const getCity = async () => {
               const res = await axios.get('http://provinces.open-api.vn/api/?depth=3')
               setCity(res.data)
          }
          getCity()
     }, [])
     
     const getDistricts = (districtsOfCity) => {
          city.map(item => {
               return item.name === districtsOfCity ? setDistricts(item.districts) : null
          })
     }
     const getWards = (wardOfDistrict) => {
          districts.map(item => {
               return item.name === wardOfDistrict ? setWards(item.wards) : null
          })
     }
     const clearCart = async (cart) => {
          await axios.patch(`${apiUrl}/user`, {cart})
     }
     const handleChooseMethodPayment = () => {
          const selectMethodPayment = document.getElementById('selectMethodPayment')
          if(selectMethodPayment.value === 'Paypal') {
               setIsPaypal(true)
               // setPayment({...payment, paymentMethod: selectMethodPayment.value})
          }
          if(selectMethodPayment.value === 'Thanh to??n khi nh???n h??ng') {
               setIsPaypal(false)
               // setPayment({...payment, paymentMethod: selectMethodPayment.value})
          }
     } 
     useEffect(() => {
          const total = cart.reduce((prev, item) => {
               return prev + (item.price * item.size.qty)
          }, 0)
          setTotal(total)
          // setPayment({...payment, totalPrice: total})
     }, [cart])
     const tranSuccess = async (paymentRes) => {
          const {paymentID} = paymentRes;
          const res = await axios.post(`${apiUrl}/payment`, {...payment, paypalID: paymentID})
     }
     // const handleSubmit = async (e) => {
     //      e.preventDefault()
     //      const form = e.currentTarget;
     //      // if (form.checkValidity() === false) {
     //      //      e.preventDefault();
     //      //      e.stopPropagation();
     //      // }
     //      const phoneMess = document.getElementById('2')
     //      if(payment.phoneNumber.length < 10) {
     //           console.log(phoneMess);
     //      }
     //      setValidated(true);
     //      // const res = await createPayment(payment)
     //      // if(res.success) {
     //      //      setCart([])
     //      //      clearCart([])
     //      //      setShowModalSuccessfulProduct(true)
     //      // }
     // }
     const schema = yup.object().shape({
          email: yup.string().required('Tr?????ng n??y l?? b???t bu???c').matches(
               /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
               "Please enter a valid email address"
          ),
          phoneNumber: yup.string().required('Tr?????ng n??y l?? b???t bu???c')
          .matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, "Vui l??ng nh???p ????ng s??? ??i???n tho???i"),
          firstName: yup.string().required('Tr?????ng n??y l?? b???t bu???c'),
          lastName: yup.string().required('Tr?????ng n??y l?? b???t bu???c'),
          city: yup.string().required('Vui l??ng ch???n t???nh/th??nh ph???'),
          district: yup.string().required('Vui l??ng ch???n qu???n/huy???n'),
          ward: yup.string().required('Vui l??ng ch???n ph?????ng/x??'),
          street: yup.string().required('Vui l??ng nh???p ?????a ch??? nh??'),
     });

     if(cart === undefined) return null
     return (
          <Helmet title="Thanh to??n">
               <ModalSuccessfulProduct/>
               <div className="payment">
                    <div className="payment-left">
                         <h2>NH???P C??C CHI TI???T V??? VI???C G???I H??NG</h2>
                         <h3>TH??NG TIN LI??N H???</h3>
                         <div className="d-grid grid-col-2 grid-gap-20">
                              <ContactInformationForm />
                         </div>
                         <h3>TH??NG TIN GIAO H??NG</h3>
                         <ShippingInformationForm/>
                    </div>
               </div>
          </Helmet>
     )
     // return (
     //      <Helmet title="Thanh to??n">
     //           <ModalSuccessfulProduct/>
     //           <div className="payment">
     //                <Formik
     //                     initialValues={payment}
     //                     validationSchema={schema}
     //                     onSubmit={async values => {
     //                          const res  = await createPayment(values)
     //                          console.log("res",res);
     //                     }}
     //                >
     //                     {({values, handleChange, handleSubmit, errors}) => {
     //                          console.log("errors",errors);
     //                          console.log("values",values);
     //                          return (
     //                               <Form onSubmit={handleSubmit}>
     //                                    <div className="payment-left">
     //                                         <h2>NH???P C??C CHI TI???T V??? VI???C G???I H??NG</h2>
     //                                         <h3>TH??NG TIN LI??N H???</h3>
     //                                         <div className="form-group">
     //                                              <Form.Group>
     //                                                   <Form.Label>EMAIL X??C NH???N ????N H??NG</Form.Label>
     //                                                   <Form.Control 
     //                                                        type="email"
     //                                                        name='email' 
     //                                                        value={values.email}
     //                                                        onChange={handleChange}
     //                                                        isInvalid={errors.email}
     //                                                   />
     //                                                   {
     //                                                        errors.email && (
     //                                                             <FormFeedback>
     //                                                                  {errors.email}
     //                                                             </FormFeedback>
     //                                                        )
     //                                                   }
     //                                              </Form.Group>
     //                                              <Form.Group>
     //                                                   <Form.Label>??I???N THO???I (DI ?????NG)</Form.Label>
     //                                                   <Form.Control 
     //                                                        type="string"
     //                                                        name='phoneNumber' value={values.phoneNumber}
     //                                                        onChange={handleChange}
     //                                                        isInvalid={errors.phoneNumber}
     //                                                   />
     //                                                   {
     //                                                        errors.phoneNumber && (
     //                                                             <FormFeedback>
     //                                                                  {errors.phoneNumber}
     //                                                             </FormFeedback>
     //                                                        )
     //                                                   }
     //                                              </Form.Group>
     //                                         </div>
     //                                         <h3>TH??NG TIN GIAO H??NG</h3>
     //                                         <div className="form-group">
     //                                              <Form.Group>
     //                                                   <Form.Label>T??N</Form.Label>
     //                                                   <Form.Control 
     //                                                        type="text" 
     //                                                        name='lastName' 
     //                                                        value={values.lastName}
     //                                                        onChange={handleChange}
     //                                                        isInvalid={errors.lastName}
     //                                                   />
     //                                                   {
     //                                                        errors.lastName && (
     //                                                             <FormFeedback>
     //                                                                  {errors.lastName}
     //                                                             </FormFeedback>
     //                                                        )
     //                                                   }
     //                                              </Form.Group>
     //                                              <Form.Group>
     //                                                   <Form.Label>H???</Form.Label>
     //                                                   <Form.Control 
     //                                                        type="text" 
     //                                                        name='firstName' value={values.firstName}
     //                                                        onChange={handleChange}
     //                                                        isInvalid={errors.firstName}
     //                                                   />
     //                                                   {
     //                                                        errors.firstName && (
     //                                                             <FormFeedback>
     //                                                                  {errors.firstName}
     //                                                             </FormFeedback>
     //                                                        )
     //                                                   }
     //                                              </Form.Group>
     //                                              <Form.Group>
     //                                                   <Form.Label>T???NH/TH??NH PH???</Form.Label>
     //                                                   <Form.Select 
     //                                                        value={values.city}
     //                                                        onChange={(city) => {
     //                                                             getDistricts(city.target.value)
     //                                                             handleChange(city)
     //                                                        }}
     //                                                        id="selectCity"
     //                                                        name='city'
     //                                                        isInvalid={errors.city}
     //                                                   >
     //                                                        <option>CH???N TH??NH PH???</option>
     //                                                        {
     //                                                             city.map((item, index) => (
     //                                                                  <option value={item.name} key={index}>
     //                                                                       {item.name}
     //                                                                  </option>
     //                                                             ))
     //                                                        }
     //                                                   </Form.Select>
     //                                                   {
     //                                                        errors.city && (
     //                                                             <FormFeedback>
     //                                                                  {errors.city}
     //                                                             </FormFeedback>
     //                                                        )
     //                                                   }
     //                                              </Form.Group>
     //                                              <Form.Group>
     //                                                   <Form.Label>QU???N/HUY???N</Form.Label>
     //                                                   <Form.Select 
     //                                                        onChange={(district) => {
     //                                                             handleChange(district)
     //                                                             getWards(district.target.value)
     //                                                        }}
     //                                                        value={values.district}
     //                                                        name='district' 
     //                                                        id="selectDistrict"
     //                                                        isInvalid={errors.district}
     //                                                   >
     //                                                        <option>CH???N QU???N HUY???N</option>
     //                                                        {
     //                                                             districts.map((item, index) => (
     //                                                                  <option key={index} value={item.name}>
     //                                                                       {item.name}
     //                                                                  </option>
     //                                                             ))
     //                                                        }
     //                                                   </Form.Select>
     //                                                   {
     //                                                        errors.district && (
     //                                                             <FormFeedback>
     //                                                                  {errors.district}
     //                                                             </FormFeedback>
     //                                                        )
     //                                                   }
     //                                              </Form.Group>
     //                                              <Form.Group>
     //                                                   <Form.Label>PH?????NG/X??</Form.Label>
     //                                                   <Form.Select 
     //                                                        onChange={handleChange} 
     //                                                        value={values.ward}
     //                                                        id="selectWard"
     //                                                        name='ward'
     //                                                        isInvalid={errors.ward}
     //                                                   >
     //                                                        <option>CH???N PH?????NG X??</option>
     //                                                        {
     //                                                             wards.map((item, index) => (
     //                                                                  <option key={index} value={item.name}>
     //                                                                       {item.name}
     //                                                                  </option>
     //                                                             ))
     //                                                        }
     //                                                   </Form.Select>
     //                                                   {
     //                                                        errors.ward && (
     //                                                             <FormFeedback>
     //                                                                  {errors.ward}
     //                                                             </FormFeedback>
     //                                                        )
     //                                                   }
     //                                              </Form.Group>
     //                                              <Form.Group>
     //                                                   <Form.Label>?????A CH??? GIAO H??NG</Form.Label>
     //                                                   <Form.Control 
     //                                                        type="text" 
     //                                                        name="street"
     //                                                        value={values.street}
     //                                                        onChange={handleChange}
     //                                                        isInvalid={errors.street}
     //                                                   />
     //                                                   {
     //                                                        errors.street && (
     //                                                             <FormFeedback>
     //                                                                  {errors.street}
     //                                                             </FormFeedback>
     //                                                        )
     //                                                   }
     //                                              </Form.Group>
     //                                         </div>

     //                                         <h3>PH????NG TH???C GIAO H??NG</h3>
     //                                         <div className="form-group">
     //                                              <div className="payment-shipping-method">
     //                                                   <input type="radio" checked readOnly/>
     //                                                   <div className="payment-shipping-method-info">
     //                                                        <p>GIAO H??NG TI???T KI???M</p>
     //                                                        <p>GIAO H??NG TI???T KI???M</p>
     //                                                   </div>
     //                                                   <div className="payment-shipping-method-price">
     //                                                   <span>{SHIPPING_FEE.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
     //                                                   </div>
     //                                              </div>
     //                                         </div>
     //                                    </div>
     //                                    <div className="payment-right">
     //                                         <div className="payment-title">
     //                                              <h3>Chi ti???t gi??? h??ng</h3>
     //                                         </div>
     //                                         <div className="payment-item">
     //                                              {
     //                                                   cart.map((item, index) => {
     //                                                        return (
     //                                                             <div className="payment-detail" key={index}>
     //                                                                  <div className="payment-image">
     //                                                                       <img src={item.images} alt=""/>
     //                                                                  </div>
     //                                                                  <div className="payment-qty">
     //                                                                       <span>{item.size.qty}</span>
     //                                                                  </div>
     //                                                                  <div className="payment-info">
     //                                                                       <p className="payment-product-name">{item.name}</p>
     //                                                                       <p className="payment-product-size">{item.size.name}</p>
     //                                                                       <p className="payment-product-price">
     //                                                                            {
     //                                                                            (item.price * item.size.qty).toLocaleString('vi', {style : 'currency', currency : 'VND'})
     //                                                                            }
     //                                                                       </p>
     //                                                                  </div>
     //                                                             </div>
     //                                                        )
     //                                                   })
     //                                              }
     //                                         </div>
     //                                         <div className="payment-discount">
     //                                              <input type="text" placeholder="NH???P M?? GI???M GI??" className="form-control"/>
     //                                              <button className="btn">??P D???NG</button>
     //                                         </div>
     //                                         <div className="payment-total-sub">
     //                                              <span>T???m t??nh: </span>
     //                                              <span>{total.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
     //                                         </div>
     //                                         <div className="payment-shipping">
     //                                              <span>Ph?? v???n chuy???n: </span>
     //                                              <span>{SHIPPING_FEE.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
     //                                         </div>
     //                                         <div className="payment-total">
     //                                              <span>T???ng s???: </span>
     //                                              <span>
     //                                                   {(total + SHIPPING_FEE).toLocaleString('vi', {style : 'currency', currency : 'VND'})}
     //                                              </span>
     //                                         </div>
     //                                         <div className="payment-method">
     //                                              <Form.Select 
     //                                                   onChange={handleChooseMethodPayment} 
     //                                                   value={values.paymentMethod}
     //                                                   name='paymentMethod'
     //                                                   id="selectMethodPayment"
     //                                              >
     //                                                   <option>CH???N PH????NG TH???C THANH TO??N</option>
     //                                                   <option value="Paypal">Paypal</option>
     //                                                   <option value="Thanh to??n khi nh???n h??ng">Thanh to??n khi nh???n h??ng</option>
     //                                              </Form.Select>
     //                                              <div className="payment-method-item">
     //                                                   {
     //                                                        isPaypal 
     //                                                        ? 
     //                                                        <PaypalButton 
     //                                                             total={(total + SHIPPING_FEE)}
     //                                                             tranSuccess={tranSuccess}
     //                                                        /> 
     //                                                        :
     //                                                        <button className="btn" type="submit">MUA H??NG</button>
     //                                                   }
     //                                              </div>
     //                                         </div>
     //                                    </div>
     //                               </Form>
     //                          )
     //                     }}
     //                </Formik>
     //           </div>
     //      </Helmet>
     // )
}
