import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { auth } from 'src/config/firebase'

export const useLayoutContextValues = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    if (auth.currentUser) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [auth.currentUser])
  return {
    isAuthenticated,
    setIsAuthenticated
  }
}
type LayoutContextValues = ReturnType<typeof useLayoutContextValues>

export const useLayoutContext = () => {
  return useOutletContext<LayoutContextValues>()
}
