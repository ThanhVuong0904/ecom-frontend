import React from 'react'
import {FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { ErrorMessage } from 'formik';

export default function InputField(props) {
     const {
          field,
          type, label, placeholder, disabled,
     } = props;
     const { name } = field;
     // console.log("field", field);
     return (
          <FormGroup>
               {label && <Label for={name}>{label}</Label>}
     
               <Input
                    id={name}
                    {...field}
          
                    type={type}
                    disabled={disabled}
                    placeholder={placeholder}
               />
               <ErrorMessage name={name} component={FormFeedback} />
          </FormGroup>
     )
}
