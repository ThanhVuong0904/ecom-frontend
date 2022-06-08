import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../contexts/productContext'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import Helmet from '../components/Helmet'

export default function Product() {
	const {productState} = useContext(ProductContext)
	const {products} = productState
	
	return (
		<Helmet title="Sản phẩm">
			<Grid col={4} gap={20}>
				{products.map(product => <ProductCard key={product._id} data={product}/>)}
			</Grid>
		</Helmet>
	)
}
