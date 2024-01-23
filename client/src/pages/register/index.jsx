import React, { useEffect } from 'react'
import { Form, message } from "antd";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish= async(values)=>{
   try {
    dispatch(ShowLoading());
    const response = await RegisterUser(values);
    dispatch(HideLoading());
    if(response.success){
      message.success(response.message);
      navigate("/login");
    }else{
      message.error(response.message);
    }
    
   } catch (error) {
    dispatch(HideLoading());
    message.error(error.message);
   }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  return (
    <div className="h-screen bg-primary flex items-center justify-center">
    <div className="authentication-form bg-white p-3 rounded" >
    <h1 className="text-secondary text-2xl font-bold mb-1">
          TECH READERS - REGISTER
        </h1>
        <hr />
     <Form
     layout='vertical' onFinish={onFinish}>
      <Form.Item 
      label="Name"
       name="name">
      
       <input type='text' placeholder='Name'/>
      </Form.Item>
      <Form.Item
      label="Email"
      name="email"
      >
      
       <input type='email' placeholder='Email'/>
      </Form.Item>
      <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <input type="number" placeholder="Phone Number" />
          </Form.Item>
      <Form.Item 
       label="Password"
       name="password"
       >
     
       <input type='password' placeholder='Password'/>
      </Form.Item>
      <div className="text-center mt-2 flex flex-col gap-1">
            <Button title="Register" type="submit" />
            <Link to="/login" className="text-primary text-sm underline">
              Already have an account? Click Here To Login
            </Link>
          </div>
     </Form>
      </div>  
    </div>
  )
}

export default Register
