import { createContext, useEffect, useReducer, useState } from "react";
import axios from 'axios'
import {apiUrl, LOCAL_STORAGE_TOKEN_NAME} from './constanst'
import { authReducer } from "../reducers/authReducer";
import setAuthToken from '../ultis/setAuthToken'

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
     const [authState, dispatch] = useReducer(authReducer, {
          isAuthenticated: false,
          user: '',
     })
     const [showAuth, setShowAuth] = useState(false)
     const [showAddCartSuccess, setShowAddCartSuccess] = useState(false)
     const [showModalSuccessfulProduct, setShowModalSuccessfulProduct] = useState(false)
     const [cart, setCart] = useState([])
     const loadUser = async () => {
          if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
			setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
		}
          try {
               const res = await axios.get(`${apiUrl}/user`)
               if(res.data.success) {
                    dispatch({
					type: 'SET_AUTH',
					payload: { 
                              isAuthenticated: true, 
                              user: res.data.user,
                         }
				})
                    setCart(res.data.user.cart)
               }
          } catch (error) {
               localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
			setAuthToken(null)
			dispatch({
				type: 'SET_AUTH',
				payload: { isAuthenticated: false, user: null }
			})
          }
     }
     useEffect(() => {
          loadUser()
     }, [])
     const login = async (form) => {
          try {
               const res = await axios.post(`${apiUrl}/user/login`, form)
               if(res.data.success) {
                    localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					res.data.accessToken
				)
               }
               await loadUser()
               return res.data
          } catch (error) {
               if (error.response.data) return error.response.data
               else return { success: false, message: error.message }
          }
     }
     const register = async (form) => {
          try {
               const res = await axios.post(`${apiUrl}/user/register`, form)
               if(res.data.success) {
                    localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					res.data.accessToken
				)
               }
               await loadUser()
               return res.data

          } catch (error) {
               if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
          }
     }
     const logoutUser = () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
		dispatch({
			type: 'SET_AUTH',
			payload: { isAuthenticated: false, user: null }
		})
	}
     const addCart = async (product) => {
          cart.map(item => console.log(item))
          setCart([...cart, {...product}])
          const res = await axios.patch(`${apiUrl}/user`, {
               cart: [...cart, {...product}]
          })
          return res.data
     }
     const createPayment = async (payment) => {
          const res = await axios.post(`${apiUrl}/payment`, payment)
          return res.data
     }
     const state = {
          authState, 
          login, 
          showAuth, 
          setShowAuth,
          logoutUser, 
          register,
          addCart, cart, setCart,
          showAddCartSuccess, setShowAddCartSuccess,
          createPayment,
          showModalSuccessfulProduct, setShowModalSuccessfulProduct,
     }
     return (
          <AuthContext.Provider value={state}>
               {children}
          </AuthContext.Provider>
     )
}
export default AuthContextProvider