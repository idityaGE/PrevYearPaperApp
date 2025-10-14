import React from 'react'
import { ToastContainer } from 'react-toastify'

function ToastContainerComponent() {
  return (
        <ToastContainer
          position="top-right"
          autoClose={3000} 
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
        />
  )
}

export default ToastContainerComponent