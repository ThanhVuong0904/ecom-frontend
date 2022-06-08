import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import {ProductContext} from '../contexts/productContext'
import {AuthContext} from '../contexts/authContext'
import Section from '../components/Section'
import ProductCard from './ProductCard';
import {SectionBody, SectionTitle} from '../components/Section'
import Grid from './Grid';
import AlertMessage from '../components/AlertMessage'
export default function ProductDetail() {
     let {id} = useParams()
     const {productState, getSimilar} = useContext(ProductContext)
     const {authState, addCart, cart} = useContext(AuthContext)
     const {products, similar} = productState
     const [productDetail, setProductDetail] = useState([])
     const [qty, setQty] = useState(1)
     const [size, setSize] = useState(null)
     const [alert, setAlert] = useState({
          type: null,
          message: null
     })
     const handleChangeQuantily = (e) => {
          //Convert string to number
          setQty(Number(e.target.value))
     }
     const increase = (id) => {
          setQty(qty + 1)
     }
     const decrease = (id) => {
          setQty(qty - 1)
     }
     useEffect(() => {
          if(id) {
               products.map(product => {
                    if(product._id === id) {
                         setProductDetail(product)
                         getSimilar(product.category.name)
                    }
               })
          }
     },[id, products])
     
     const handleAddToCart = async (e) => {
          e.preventDefault()
          if(size !== null) {
               const res = await addCart(
                    {
                         product_id: productDetail._id,
                         name: productDetail.name,
                         price: productDetail.price,
                         images: productDetail.images.url,
                         size: {
                              name: size,
                              qty: qty,
                         },
                    }
               )
               if(res.success) {
                    setAlert({type: null, message: null})
                    toast.success('🦄 Thêm vào giỏ hàng thành công', {
                         position: "top-right",
                         autoClose: 5000,
                    });
               }
          }
          else {
               setAlert({ type: 'danger', message: 'Vui lòng chọn size' })
          }
     }
     if(productDetail.length === 0) return null
     return (
          <Section>
               <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
               />
               <SectionBody>
                    <div className="product-detail">
                         <div className="product-detail-image">
                              <img src={productDetail.images.url} alt="" />
                         </div>
                         <div className="product-detail-content">
                              <p className="product-detail-name">{productDetail.name}</p>
                              <p className="product-detail-price">
                                   {productDetail.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                              </p>
                              <p className="product-detail-title">Kích cỡ</p>
                              <div className="product-detail-size">
                                   {productDetail.size.map((item, index) => (
                                        <p 
                                             key={item.name} 
                                             className={`${item.name === size ? 'active': ''}`} 
                                             onClick={() => setSize(item.name)}
                                        >
                                             {item.name}
                                        </p>
                                   ))}
                              </div>
                              <AlertMessage info={alert}></AlertMessage>
                              <p className="product-detail-title">Thông tin sản phẩm</p>
                              <p className="product-detail-desc">{productDetail.description}</p>

                              <p className="product-detail-title">Số lượng</p>
                              <div className="amount">
                                   <button className="minus" onClick={() => decrease(productDetail._id)}>-</button>
                                   <input 
                                        type="number" 
                                        value={qty} 
                                        onChange={handleChangeQuantily} 
                                        min="1"
                                        max="99"
                                   />
                                   <button className="plus" onClick={() => increase(productDetail._id)}>+</button>
                              </div>
                              <div className="product-detail-action">
                                   <Button onClick={handleAddToCart}>Thêm vào giỏ hàng</Button>
                              </div>
                         </div>
                    </div>
               </SectionBody>
               <SectionBody>
                    <SectionTitle title="Sản phẩm tương tự"/>
                    <div className="product-similar">
                         <Grid col={4} gap={20}>
                              {
                                   similar.map(product => <ProductCard key={product._id} data={product}/>)
                              }
                         </Grid>
                    </div>
               </SectionBody>
          </Section>
     )
}
