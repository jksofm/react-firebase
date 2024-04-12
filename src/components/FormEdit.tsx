import { Form, Input, Button, message } from 'antd'
import { addDoc, doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { db } from 'src/config/firebase'
interface FieldType {
  name: string
  price: number
  des: string
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FormEdit({ getProductList, collection, product, setEditMode }: any) {
  const [form] = Form.useForm()

  const onFinish = async (values: FieldType) => {
    try {
      const productDoc = doc(db, 'products', product.id)
      await updateDoc(productDoc, values as any)
      form.resetFields()
      message.success('Edit product success')
      setEditMode(false)
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
      <h1>Edit Product</h1>
      <Form.Item<FieldType> label='name' name='name' rules={[{ required: true, message: 'Please input your name!' }]}>
        <Input defaultValue={product.name} />
      </Form.Item>
      <Form.Item<FieldType>
        label='price'
        name='price'
        rules={[{ required: true, message: 'Please input your price!' }]}
      >
        <Input type='number' defaultValue={product.price} />
      </Form.Item>

      <Form.Item<FieldType> label='des' name='des' rules={[{ required: true, message: 'Please input your des!' }]}>
        <Input defaultValue={product.des} />
      </Form.Item>

      <Button type='primary' htmlType='submit'>
        Submit
      </Button>
    </Form>
  )
}

export default FormEdit
