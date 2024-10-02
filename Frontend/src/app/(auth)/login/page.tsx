"use client"
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { login } from '@/app/students/api';
import {toast} from "react-toastify";



type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};


const App: React.FC = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handelLogin = async (event: any) => {
    event.preventDefault()
    
    try {
      const response = await login(email,password);
      if (response) {
        localStorage.setItem("students", JSON.stringify(response));
        window.location.href = "/students";
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