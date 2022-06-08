import React from 'react'

export default function Helmet({children,title}) {
     document.title = 'Thanh Vương - ' + title
     return (
          <div className="helmet">
               {children}
          </div>
     )
}
