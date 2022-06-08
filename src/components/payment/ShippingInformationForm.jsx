import React,  { useEffect, useState }from 'react'
import axios from 'axios';
import { FastField, Form, Formik } from "formik";
import InputField from "../form/InputField";
import SelectField from '../form/SelectField';

export default function ShippingInformationForm() {
     const [city, setCity] = useState([])
     const [initialValues, setInitialValues] = useState({
          firstName: '',
          lastName: '',
          street: '',
          city: '',
          district: '',
          ward: '',
     })
     useEffect(() => {
          const getCity = async () => {
               const res = await axios.get('http://provinces.open-api.vn/api/?depth=3')
               setInitialValues({...initialValues, city: res.data})
               setCity(res.data)
          }
          getCity()
     }, [])

     return (
          <Formik 
               initialValues={initialValues}
               enableReinitialize={true} // doi api tra ve
          >
               {(formikProps) => {
               const { values, errors, touched } = formikProps;
               // console.log({ values, errors, touched });
               const optionsCity = city.map(city => {
                    return {
                         value: city.name,
                         label: city.name
                    }
               })
               return (
                    <Form>
                         <div className="d-grid grid-col-2 grid-gap-20">
                              <FastField
                                   name="firstName"
                                   component={InputField}
                                   label="TÊN"
                              />
                              <FastField
                                   name="lastName"
                                   component={InputField}
                                   label="HỌ"
                              />
                              <FastField
                                   name="city"
                                   component={SelectField}
                                   label="TỈNH/THÀNH PHỐ"
                                   options={optionsCity}
                              />
                         </div>
                    </Form>
               );
               }}
          </Formik>
     );
}
