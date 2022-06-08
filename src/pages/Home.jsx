import React, {useContext, useEffect}from 'react'
import Helmet from '../components/Helmet'
import Slider from '../components/Slider'
import Policy from '../components/Policy'
import { SectionBody, SectionTitle} from '../components/Section'
import Section from '../components/Section'
import Banner from '../assets/images/banner.png'
import ProductCard from '../components/ProductCard'
import { ProductContext } from '../contexts/productContext'
import Grid from '../components/Grid'
export default function Home() {
	const {productState} = useContext(ProductContext)
     const {bestSeller} = productState
	return (
		<Helmet title="Trang chủ">
			<Slider/>
			<Section>
				<SectionBody>
					<Policy/>
				</SectionBody>
			</Section>
			<Section>
				<SectionTitle title="Top sản phẩm bán chạy" />
				<SectionBody>
					<Grid col={4} gap={20}>
						{
							bestSeller.map(product => <ProductCard key={product._id} data ={product}/>)
						}
					</Grid>
				</SectionBody>
			</Section>
			<Section>
				<SectionBody>
					<img src={Banner} alt="" style={{margin: '0 auto'}}/>
				</SectionBody>
			</Section>
		</Helmet>
	)
}
