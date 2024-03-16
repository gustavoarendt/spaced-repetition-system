import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import './Form.component.scss';

interface FormData {
  fieldName: string;
  value: string;
  type: string;
  isRequired?: boolean;
}

export interface FormResult {
  [key: string]: string;
}

export const Form = ({
  formName,
  props,
  onSubmit,
  linkUrl,
  linkDescription,
}: {
  formName: string;
  props: FormData[];
  onSubmit: (result: FormResult) => void;
  linkUrl?: string;
  linkDescription?: string;
}) => {
  const [formValues, setFormValues] = useState<FormResult>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(formValues);
    } else {
      console.error('No onSubmit handler provided for Form component.');
    }
  };

  return (
    <form className='Form' onSubmit={handleSubmit}>
      <h2>{formName}</h2>
      {props.map((field: FormData) => (
        <div className='form-group' key={field.fieldName}>
          <label htmlFor={field.value}>{field.fieldName}</label>
          <input
            type={field.type}
            id={field.value}
            name={field.value}
            required={field.isRequired || false}
            onChange={handleChange}
          />
        </div>
      ))}
      <div className='form-group--submit'>
        <button type='submit'>Submit</button>
      </div>
      {linkUrl && linkDescription && (
        <div className='form-group--link'>
          <Link to={linkUrl}>{linkDescription}</Link>
        </div>
      )}
    </form>
  );
};
