import { Form, Input, Button, message } from 'antd'
import { addDoc } from 'firebase/firestore'
import React from 'react'
import { auth } from 'src/config/firebase'
interface FieldType {
  name: string
  price: number
  des: string
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FormCreate({ getProductList, collection }: any) {
  const [form] = Form.useForm()

  const onFinish = async (values: FieldType) => {
    try {
      await addDoc(collection, { ...values, userId: auth?.currentUser?.uid })
      form.resetFields()
      message.success('Add product success')
      getProductList()
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
      onFinish={onFinish}
      autoComplete='off'
    >
      <Form.Item<FieldType> label='name' name='name' rules={[{ required: true, message: 'Please input your name!' }]}>
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label='price'
        name='price'
        rules={[{ required: true, message: 'Please input your price!' }]}
      >
        <Input type='number' />
      </Form.Item>

      <Form.Item<FieldType> label='des' name='des' rules={[{ required: true, message: 'Please input your des!' }]}>
        <Input />
      </Form.Item>

      <Button type='primary' htmlType='submit'>
        Submit
      </Button>
    </Form>
  )
}

export default FormCreate
