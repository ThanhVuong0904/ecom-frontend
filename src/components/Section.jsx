import React from 'react'

export default function Section({children}) {
     return (
          <div className="section">
               {children}
          </div>
     )
}
export const SectionBody = ({children}) => {
     return (
          <div className="section-body">
               {children}
          </div>
     )
}
export const SectionTitle = ({title}) => {
     return (
          <p className="section-title">
               {title}
          </p>
     )
}
