import React from 'react'

export default function Grid({children, col, mdCol, smCol, gap}) {
     const gridCol = col ? `grid-col-${col}` : ''
     const gridMdCol = col ? `grid-col-${mdCol}` : ''
     const gridSmCol = col ? `grid-col-${smCol}` : ''
     return (
          <div className={`grid ${gridCol} ${gridMdCol} ${gridSmCol}`} style={{gap: gap}}>
               {children}
          </div>
     )
}
