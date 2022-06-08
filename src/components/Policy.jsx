import React from 'react'
import Grid from './Grid'
import ShoppingBag from '../assets/images/bxs-shopping-bag.svg'
import Diamond from '../assets/images/bx-diamond.svg'
import CreditCard from '../assets/images/bxs-credit-card.svg'
import Heart from '../assets/images/bx-heart.svg'
import PolicyCard from './PolicyCard';
const policyData = [
     {
          name: "Miễn phí giao hàng",
          desc: "Miễn phí ship với đơn hàng > 239k",
          icon: ShoppingBag
     },
     {
          name: "Thanh toán COD",
          desc: "Thanh toán khi nhận hàng (COD)",
          icon: CreditCard
     },
     {
          name: "Khách hàng VIP",
          desc: "Ưu đãi dành cho khách hàng VIP",
          icon: Diamond
     },
     {
          name: "Hỗ trợ bảo hành",
          desc: "Đổi, sửa đồ tại tất cả store",
          icon: Heart
     }
]
export default function Policy() {
     return (
          <Grid col={4} smCol={3} mdCol={2} gap={20}>
               {
                    policyData.map((item, index) => (
                         <PolicyCard 
                              key={index} 
                              name={item.name} 
                              desc={item.desc} 
                              icon={item.icon}
                         />
                    ))
               }
          </Grid>
     )
}
