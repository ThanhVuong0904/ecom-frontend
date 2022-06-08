import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {Modal} from 'react-bootstrap'
import SuccessIcon from '../assets/images/bxs-check-circle.svg'
import { AuthContext } from '../contexts/authContext'
import { useHistory } from 'react-router-dom'
export default function ModalSuccessfulProduct() {
     const history = useHistory()
     const {showModalSuccessfulProduct, setShowModalSuccessfulProduct} = useContext(AuthContext)
     const backToHomePage = () => {
          setShowModalSuccessfulProduct(false)
          history.push('/')
     }
     return (
          <Modal show={showModalSuccessfulProduct} onHide={backToHomePage}>
               <Modal.Body>
                    <div className="modal-success">
                         <img src={SuccessIcon} alt="" />
                         <p>Đặt hàng thành công</p>
                         <p>Cảm ơn quý khách đã tin dùng sản phẩm</p>
                         <Link to='product'>Khám phá thêm</Link>
                    </div>
               </Modal.Body>
          </Modal>
     )
}
