import React from "react";
import { FastField, Form, Formik } from "formik";
import InputField from "../form/InputField";

export default function ContactInformationForm() {
     const initialValues = {
          email: '',
          phoneNumber: '',
     };
     return (
     <Formik initialValues={initialValues}>
          {(formikProps) => {
          // do something here ...
          const { values, errors, touched } = formikProps;
          // console.log({ values, errors, touched });
          return (
               <Form>
                    <FastField
                         name="email"
                         component={InputField}
                         label="EMAIL XÁC NHẬN ĐƠN HÀNG"
                         placeholder="Nhập email của bạn"
                    />
                    <FastField
                         name="phoneNumber"
                         component={InputField}
                         label="ĐIỆN THOẠI (DI ĐỘNG)"
                         placeholder="Nhập sdt của bạn"
                    />
               </Form>
          );
          }}
     </Formik>
     );
}
