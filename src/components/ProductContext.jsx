/* eslint-disable react/prop-types */

import { createContext, useState } from 'react'

const ProductContext = createContext({
  postCompleted: false,
  setPostCompleted: () => {}
})

const ProductProvider = ({ children }) => {
  const [postCompleted, setPostCompleted] = useState(false)

  return (
    <ProductContext.Provider value={{ postCompleted, setPostCompleted }}>
      {children}
    </ProductContext.Provider>
  )
}

export { ProductContext, ProductProvider }