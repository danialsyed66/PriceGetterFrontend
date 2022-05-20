import React, { useState } from 'react';
import * as Yup from 'yup';
import { Button, FormControl } from '@mui/material';
import { Field, Form, Formik } from 'formik';

import './Login.css';
import axios from '../../../utils/axios';
import priceGetter from '../../../assets/PriceGetter.svg';
import vector from '../../../assets/Vectors.svg';
import { InputText } from './InputText';

const SignupPage = () => {
  const [logo, setLogo] = useState('');
  const [logoPreview, setlogoPreview] = useState('/default_avatar.jpg');

  const handleLOgoUpload = e => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState !== 2) return;
      if (!reader.result) return;

      setLogo(reader.result);
      setlogoPreview(reader.result);
    };

    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = ({ name, url, user }) => {
    try {
      const formData = new FormData();

      formData.set('name', name);
      formData.set('url', url);
      formData.set('user', user);
      if (logo) formData.set('logo', logo);

      const create = async userData => {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };

        await axios.post('/api/v1/seller', userData, config);
      };
      create(formData);
    } catch (err) {
      console.log(err);
    }
  };

  const CreateSchema = Yup.object().shape({
    name: Yup.string().required('Please enter the name'),
  });

  return (
    <div
      className="main_div"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <img src={priceGetter} alt="logo" />
        <h2 className="LOGIN_PAGE_TEXT">SignUp</h2>
      </div>

      <div>
        <Formik
          initialValues={{
            name: '',
            url: '',
            user: '',
          }}
          validationSchema={CreateSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="d-flex flex-column justify-content-center align-content-center mb-2">
                <FormControl sx={{ m: 0.5, width: '40ch' }}>
                  <Field
                    placeholder="User Name"
                    name="name"
                    label="name"
                    component={InputText}
                  />
                </FormControl>
                <div style={{ height: '15px' }}>
                  {errors.name && touched.name ? (
                    <div
                      style={{ width: '100%', textAlign: 'center' }}
                      className="errorText mb-1"
                    >
                      {errors.name}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="d-flex flex-column justify-content-center align-content-center mb-2">
                <FormControl sx={{ m: 0.5, width: '40ch' }}>
                  <Field
                    placeholder="url"
                    name="url"
                    label="url"
                    component={InputText}
                  />
                </FormControl>
                <div style={{ height: '15px' }}>
                  {errors.url && touched.url ? (
                    <div
                      style={{ width: '100%', textAlign: 'center' }}
                      className="errorText"
                    >
                      {errors.url}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="d-flex flex-column justify-content-center align-content-center mb-2">
                <FormControl sx={{ m: 0.5, width: '40ch' }}>
                  <Field
                    placeholder="user"
                    name="user"
                    label="user"
                    component={InputText}
                  />
                </FormControl>
                <div style={{ height: '15px' }}>
                  {errors.user && touched.user ? (
                    <div
                      style={{ width: '100%', textAlign: 'center' }}
                      className="errorText"
                    >
                      {errors.user}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="avatar_upload">Logo</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={logoPreview}
                        className="rounded-circle"
                        alt="Avatar Preview"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      accept="images/*"
                      onChange={handleLOgoUpload}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Logo
                    </label>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  style={{
                    zIndex: '100',
                    margin: 'auto',
                    background: ' #3EE18F',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)',
                    borderRadius: '10px',
                    width: '100%',
                  }}
                  variant="contained"
                  type="submit"
                >
                  Create
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <img className="LOGIN_PAGE_IMG" src={vector} alt="LOGIN_PAGE_IMG" />
    </div>
  );
};

export default SignupPage;
