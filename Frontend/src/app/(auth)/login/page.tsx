"use client"
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { login2 } from '@/app/students/api';
import {toast} from "react-toastify";



type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};


const App: React.FC = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);

  // const handelLogin = async (event: any) => {
  //   event.preventDefault()
    
  //   try {
  //     const response = await login2(email,password);
  //     setToken(response.data.token);
  //     if (response) {
  //       // localStorage.setItem("students", JSON.stringify(response));
  //       // window.location.href = "/students";
  //       console.log(token);
  //     }
  //   } catch (error: any) {
  //     toast.error(error.message);
  //     console.error(error);
  //   }
  // };

  const handelLogin = async (event: any) => {
    event.preventDefault();
    
    try {
        const response = await login2(email, password);
        console.log(response); // Log the entire response
        if (response && response.token) {
            setToken(response.token); // Access token directly
            localStorage.setItem("students", JSON.stringify(response.token));
            window.location.href = "/students";
        } else {
            throw new Error("Token not found in response");
        }
    } catch (error: any) {
        toast.error(error.message);
        console.error(error);
    }
  };
  
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onSubmitCapture={handelLogin}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email"  />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" onClick={() => handelLogin(event)}>
            Submit
        </Button>
      </Form.Item>

      {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
    </Form>
  );
};

export default App;