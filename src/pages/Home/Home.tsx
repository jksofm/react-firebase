/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { FormCreate, FormEdit, LogoutButton } from 'src/components'
import { db, storage } from '../../config/firebase'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore'
import { Button, Input, message } from 'antd'
import { ref, uploadBytes } from 'firebase/storage'

interface ProductType {
  name: string
  price: number
  des: string
}
function Home() {
  const [productList, setProductList] = useState<any[]>([])
  const productCollection = collection(db, 'products')
  const [editMode, setEditMode] = useState(false)
  const [fileData, setFileData] = useState<File | null>(null)
  const [productEdit, setProductEdit] = useState<ProductType>({
    name: '',
    price: 0,
    des: ''
  })

  const handleUpload = async () => {
    if (!fileData) return
    const fileFolder = ref(storage, `ProductData/${fileData.name}`)
    await uploadBytes(fileFolder, fileData)
  }

  const getProductList = async () => {
    try {
      const data = await getDocs(productCollection)
      const filteredData = data.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id
        }
      })
      setProductList(filteredData)
      console.log(filteredData)
    } catch (e) {
      message.error(String(e))
    }
  }
  useEffect(() => {
    getProductList()
  }, [])

  const handleDelete = async (id: string) => {
    const productDoc = doc(db, 'products', id)
    try {
      await deleteDoc(productDoc)
      getProductList()
      message.success('Delete product success')
    } catch (e) {
      message.error(String(e))
    }
  }

  return (
    <div className='flex flex-col justify-center items-center pt-20'>
      {editMode ? (
        <FormEdit
          setEditMode={setEditMode}
          collection={productCollection}
          getProductList={getProductList}
          product={productEdit}
        />
      ) : (
        <FormCreate collection={productCollection} getProductList={getProductList} />
      )}
      <ul>
        {productList.map((product) => (
          <li className='p-4 bg-primary-500 mb-4' key={product.id}>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <Button htmlType='button' onClick={() => handleDelete(product.id)} type='primary'>
              Delete
            </Button>
            <Button
              onClick={() => {
                setEditMode(true)
                setProductEdit(product)
              }}
              htmlType='button'
              type='primary'
            >
              Edit{' '}
            </Button>
          </li>
        ))}
      </ul>
      <LogoutButton />
      <Input type='file' onChange={(e) => setFileData(e.target.files[0])} />
      <Button type='primary' htmlType='button' onClick={handleUpload}>
        Upload
      </Button>
    </div>
  )
}

export default Home
