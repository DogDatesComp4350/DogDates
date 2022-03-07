import React, { useState, useContext } from 'react';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import './Signup.css'
import TextInput from '../../shared/components/FormElements/TextInput';
import Select from '../../shared/components/FormElements/Select';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import { AuthContext } from "../../shared/context/auth-context";


const Signup = ( ) => {

  const auth = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  console.log(showError);

  //handle signup form submit event
  const signupSubmitHandler = async (values) => {
    //console.log(JSON.stringify(values, null, 6));

    setShowError(false);
    

    //Call backend API
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('ownerName', values.ownerName);
    formData.append('dogName', values.dogName);
    formData.append('city', values.city);
    formData.append('description', values.description);
    formData.append('pictures', values.image);
    
    axios.post(
      //send post request to backend
      'http://localhost:5000/api/signup', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then((response) => {
  
      //save token and redirect to user's home page upon signup successfully
      if (response) {
        auth.login(response.data.uid, response.data.token);
        //redirect to account page
        window.location = "/account";
      }

    }).catch((error) =>{
      //error handling
      setShowError(true);
      setErrorMessage(error.response.data.error);
    });

  };

  return (
    <React.Fragment>
      <div className="formHolder">
        <Formik
        //form data schema
          initialValues={{
            email:'',
            password:'',
            ownerName:'',
            dogName:'',
            city:'',
            description:'',
            image:''
          }} 

          //input validation
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
            ownerName: Yup.string().required('Required'),
            dogName: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            image: Yup.mixed().test(
              "File Size", 
              "File is too large", 
              (value) => { return (value&&value.size <= 1048576);}
            )
          })}
          onSubmit={signupSubmitHandler} 
        >
          {({ errors, touched, setFieldValue }) => (
            //sign up form
            <Form className="form">
              <h1 className="title">Sign up</h1>
              <TextInput name="email" label="Email" type="text"/>
              <TextInput name="password" label="Password" type="password"/>
              <TextInput name="ownerName" label="My Name" type="text"/>
              <TextInput name="dogName" label="My Puppy's Name" type="text"/>
              <Select name="city" label="City">
                <option value="">Select A City</option>
                <option value="Winnipeg">Winnipeg</option>
                <option value="Toronto">Toronto</option>
              </Select>
              <TextInput name="description" label="About Me And My Puppy" type="text"/>
              <ImageUpload 
                name="image"
                id="image" 
                label="Upload A Picture Of You With Your Puppy"
                onInput={
                  (id, pickedFile, fileIsValid) => {setFieldValue("image", pickedFile);}
                }
                errorText=" "
              />
              {touched.image && errors.image ? (<div className="errorMessage">{errors.image}</div>) : null}
              <div className="errorMessage" style={showError ? {display:"block"} : {display:"none"}}> {errorMessage} </div>
              <input type="submit" className="signupBtn" value="Sign up"/>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default Signup; 
