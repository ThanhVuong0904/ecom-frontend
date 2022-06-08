import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { BiCart } from "react-icons/bi";
export default function ProductCard({data}) {
     useEffect(() => {
          window.scrollTo(0, 0)
     }, [])
     return (
          <Link to={`/detail/${data._id}`}>
               <div className="product-card">
                    <div className="product-image">
                         <img src={data.images.url} alt={data.name}/>
                    </div>
                    <p className="product-name">{data.name}</p>
                    <p className="product-price">
                         {data.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                    </p>
                    {/* <Button variant="primary" className="product-button">
                         <BiCart className="product-button-icon"/>
                         <span className="product-button-text">Chọn mua</span>
                    </Button> */}
               </div>
          </Link>
     )
}
