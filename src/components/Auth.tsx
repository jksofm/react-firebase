import { Button, Checkbox, Form, FormProps, Input, message } from 'antd'
import React from 'react'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from 'src/config/firebase'
import { useNavigate } from 'react-router-dom'
import { useLayoutContext } from 'src/context/app.context'

function Auth() {
  const navigate = useNavigate()
  type FieldType = {
    email?: string
    password?: string
    remember?: string
  }
  const { setIsAuthenticated } = useLayoutContext()
  console.log(auth?.currentUser?.email)
  const [form] = Form.useForm()
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values)

    try {
      await createUserWithEmailAndPassword(auth, values.email as string, values.password as string)
      form.resetFields()
      setIsAuthenticated(true)
      navigate('/home')
    } catch (e) {
      message.error(String(e))
    }
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const handleSignInGoogle = async () => {
    try {
      signInWithPopup(auth, googleProvider)
      setIsAuthenticated(true)

      navigate('/home')
    } catch (e) {
      message.error(String(e))
    }
  }

  return (
    <Form
      form={form}
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item<FieldType>
        label='Email'
        name='email'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType> name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' onClick={handleSignInGoogle} htmlType='button'>
          Sign In With Google
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Auth
