import React from 'react'
import Select from 'react-select'
import { FormGroup, Label, FormFeedback} from 'reactstrap';
import { ErrorMessage } from 'formik';
export default function SelectField(props) {
     const { field, form, options, label, placeholder, disabled } = props;
     const { name, value } = field;
     const { errors, touched } = form;
     const showError = errors[name] && touched[name];

     console.log({options});
     console.log({name, value});

     const selectedOption = options.find(option => option.name === value);
     console.log({selectedOption});
     const handleSelectedOptionChange = (selectedOption) => {
          const selectedValue = selectedOption ? selectedOption.value : selectedOption;
          console.log("selectedValue", selectedValue);

          const changeEvent = {
               target: {
                    name: name,
                    value: selectedValue
               }
          };
          field.onChange(changeEvent);
     }
     return (
          <FormGroup>
               {label && <Label for={name}>{label}</Label>}
               
               <Select
                    id={name}
                    {...field}
                    value={selectedOption}
                    
                    onChange={handleSelectedOptionChange}

                    // placeholder={placeholder}
                    // isDisabled={disabled}
                    options={options}

                    className={showError ? 'is-invalid' : ''}
               />
               {console.log(selectedOption)}
               <ErrorMessage name={name} component={FormFeedback} />
          </FormGroup>
     )
}
