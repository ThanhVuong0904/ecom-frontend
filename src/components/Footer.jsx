import React from 'react'
import Grid from './Grid'
import FacebookIcon from '../assets/images/bxl-facebook.svg'
import InstagramIcon from '../assets/images/bxl-instagram.svg'
import TwitterIcon from '../assets/images/bxl-twitter.svg'
export default function Footer() {
     return (
          <footer className="footer">
               <div className="container">
                    <Grid col="4">
                         <div className="footer-item">
                              <div className="footer-logo">
                                   <img src="https://res.cloudinary.com/debkio0dv/image/upload/v1637129993/test/logotv_kqpjpa.png" alt="" />
                              </div>
                              <div className="footer-social">
                                   <div className="footer-social-item">
                                        <img src={FacebookIcon}/>
                                   </div>
                                   <div className="footer-social-item">
                                        <img src={InstagramIcon}/>
                                   </div>
                                   <div className="footer-social-item">
                                        <img src={TwitterIcon}/>
                                   </div>
                              </div>
                         </div>
                         <div className="footer-item">
                              <div className="footer-title">Tổng đài đặt hàng</div>
                              <div className="footer-content">
                              <p>
                                   Liên hệ đặt hàng <strong>0123456789</strong>
                              </p>
                              <p>
                                   Thắc mắc đơn hàng <strong>0123456789</strong>
                              </p>
                              <p>
                                   Góp ý, khiếu nại <strong>0123456789</strong>
                              </p>
                              </div>
                         </div>
                         <div className="footer-item">
                              <div className="footer-title">Chăm sóc khách hàng</div>
                              <div className="footer-content">
                                   <p>Chính sách đổi trả</p>
                                   <p>Chính sách bảo hành</p>
                                   <p>Chính sách hoàn tiền</p>
                              </div>
                         </div>
                         <div className="footer-item">
                              <div className="footer-title">Địa chỉ liên hệ</div>
                              <div className="footer-content">
                                   <p>624 Âu Cơ, phường 10, Tân Bình, TP.Hồ Chí Minh</p>
                                   <p>613 Âu Cơ, phường 10, Tân Bình, TP.Hồ Chí Minh</p>
                                   <p>Email: <strong>hltv090420@gmail.com</strong> </p>
                              </div>
                         </div>
                    </Grid>
               </div>
          </footer>
     )
}
