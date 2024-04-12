import { Button, message } from 'antd'
import { signOut } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from 'src/config/firebase'
import { useLayoutContext } from 'src/context/app.context'

function LogoutButton() {
  const { setIsAuthenticated } = useLayoutContext()
  const navigate = useNavigate()
  const logout = async () => {
    try {
      await signOut(auth)
      setIsAuthenticated(false)

      navigate('/login')
    } catch (e) {
      message.error(String(e))
    }
  }
  return (
    <Button type='primary' onClick={logout} htmlType='button'>
      logout
    </Button>
  )
}

export default LogoutButton
