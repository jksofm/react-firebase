import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useLayoutContextValues } from 'src/context/app.context'

function AuthenticatedContainer() {
  const navigate = useNavigate()
  const layoutContextValues = useLayoutContextValues()

  const { isAuthenticated } = layoutContextValues

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/login')
  //   }
  // }, [isAuthenticated])
  return (
    <div>
      <Outlet context={layoutContextValues} />
    </div>
  )
}

export default AuthenticatedContainer
