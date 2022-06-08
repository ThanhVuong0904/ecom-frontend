import React, {useContext, useEffect, useState}from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Helmet from '../components/Helmet'
import Section, { SectionTitle, SectionBody} from '../components/Section'
import { AuthContext } from '../contexts/authContext'
import CloseIcon from '../assets/images/bx-x.svg'
import { apiUrl } from '../contexts/constanst'
export default function Cart() {
     //pass paypal = Ecommerce123
     const {cart, setCart} = useContext(AuthContext)
     const [qty, setQty] = useState(1)
     const [total, setTotal] = useState(0)
     const SHIPPING_FEE = 35000
     //Cập nhập lại số lượng của cart
     const addToCart = async (cart) =>{
          await axios.patch(`${apiUrl}/user`, {cart})
     }
     const handleChangeQuantily = (e) => {
          //Convert string to number
          setQty(Number(e.target.value))
     }
     const increase = (id, sizeName) => {
          cart.forEach(item => {
               if(item.product_id === id && item.size.name === sizeName) {
                    item.size.qty += 1
               }
          })
          //Set lại số lượng cart 
          setCart([...cart])
          //Cập nhập lại cart trong database
          addToCart(cart)
     }
     const decrease = (id, sizeName) => {
          cart.forEach(item => {
               if(item.product_id === id && item.size.name === sizeName) {
                    item.size.qty === 1 ? item.size.qty = 1 : item.size.qty -= 1
               }
          })
          setCart([...cart])
          addToCart(cart)
     }
     
     const removeCart = (id, sizeName) => {
          cart.forEach((item, index) => {
               if(item.product_id === id && item.size.name === sizeName) {
                    cart.splice(index, 1)
               }
          })
          setCart([...cart])
          addToCart(cart)
     }
     const getTotal = () => {
          const total = cart.reduce((prev, item) => {
               return prev + (item.price * item.size.qty)
          }, 0)
          setTotal(total)
     }
     useEffect(() => {
          getTotal()
     }, [cart, qty])

     if(cart.length === 0) 
          return (
               <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h2>Giỏ hàng hiện tại của bạn đang trống trơn ^^</h2>
                    <Link to='/product' className='btn btn-primary'>
                         Đi mua hàng ngay
                    </Link>
               </div>
          )
     return (
          <Helmet title="Giỏ hàng">
               <Section>
                    <SectionTitle title="Giỏ hàng"/>
                    <SectionBody>
                         <div className="cart">
                              <div className="cart-left">
                              {
                              cart.map((item, index) => {
                                   const {product_id, images, name, size, price} = item
                                   return (
                                        <div className="cart-item" key={index}>
                                             <div className="cart-image">
                                                  <img src={images} alt="" />
                                             </div>
                                             <div className="cart-info">
                                                  <p className="cart-name">{name}</p>
                                                  <p className="cart-size">{size.name}</p>
                                                  <p className="cart-price">
                                                       {
                                                       price.toLocaleString('vi', {style : 'currency', currency : 'VND'})
                                                       }
                                                  </p>
                                                  <div className="amount">
                                                       <button className="minus" onClick={() => decrease(product_id, size.name)}>-</button>
                                                       <input 
                                                            type="number" 
                                                            value={size.qty} 
                                                            onChange={handleChangeQuantily} 
                                                            min="1"
                                                            max="99"
                                                       />
                                                       <button 
                                                            className="plus" 
                                                            onClick={() => increase(product_id, size.name)}
                                                       >
                                                            +
                                                       </button>
                                                  </div>
                                             </div>
                                             <div className="cart-destroy" onClick={() => removeCart(product_id, size.name)}>
                                                  <img src={CloseIcon} alt="" />
                                             </div>
                                        </div>     
                                   )
                              })
                              }
                              </div>
                              <div className="cart-right">
                                   <div className="cart-order">
                                        <p className="cart-noti">* Mọi thông tin của quý khách sẽ được bảo mật</p>
                                        <div className="cart-total-sub">
                                             <span>Tạm tính: </span>
                                             <span>{total.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                                        </div>
                                        <div className="cart-ship">
                                             <span>Phí vận chuyển: </span>
                                             <span>{SHIPPING_FEE.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                                        </div>
                                        <div className="cart-total">
                                             <strong><span>Tổng số: </span></strong>
                                             <strong>
                                                  <span>
                                                       {(total + SHIPPING_FEE)
                                                       .toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                                                  </span>
                                             </strong>
                                        </div>
                                   </div>
                                   <div className="cart-action">
                                        <Link to='/checkout' className="cart-checkout">
                                             Tiến hành thanh toán
                                        </Link>
                                        <Link to='/product' className="cart-back">Trở lại mua hàng</Link>
                                   </div>
                              </div>
                         </div>
                    </SectionBody>
               </Section>
          </Helmet>
     )
}
