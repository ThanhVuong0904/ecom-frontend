import React from 'react'

export default function PolicyCard({name, desc, icon}) {
     return (
          <div className="policy-card">
               <div className="policy-card-icon">
                    <img src={icon} alt="" />
               </div>
               <div className="policy-card-infor">
                    <p className="policy-card-infor-name">{name}</p>
                    <p className="policy-card-infor-desc">{desc}</p>
               </div>
          </div>
     )
}
