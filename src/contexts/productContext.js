import { createContext, useEffect, useReducer, useState } from "react";
import axios from 'axios'
import {apiUrl} from './constanst'
import { productReducer } from "../reducers/productReducer";
export const ProductContext = createContext()

const ProductContextProvider = ({children}) => {
     const [productState, dispatch] = useReducer(productReducer, {
          products: [],
          bestSeller: [],
          similar: [],
     })
     const getProduct = async () => {
          const res = await axios.get(`${apiUrl}/product`)
          if(res.data.success) {
               dispatch({
                    type: 'GET_PRODUCT',
                    payload: res.data.products
               })
          }
     }
     const getBestSeller = async () => {
          const res = await axios.get(`${apiUrl}/product?sold[gte]=50`)
          if(res.data.success) {
               dispatch({
                    type: 'GET_BEST_SELLER',
                    payload: res.data.products
               })
          }
     }
     const getSimilar = async (category) => {
          const res = await axios.get(`${apiUrl}/product?category.name=${category}&limit=8`)
          if(res.data.success) {
               dispatch({
                    type: 'GET_SIMILAR',
                    payload: res.data.products
               })
          }
     }
     useEffect(() => {
          getProduct()
          getBestSeller()
     }, [])
     const state = {productState, getProduct, getSimilar}
     return (
          <ProductContext.Provider value={state}>
               {children}
          </ProductContext.Provider>
     )
}

export default ProductContextProvider