import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ProductProvider } from './components/ProductContext.jsx'
import App from './App.jsx'
import Header from './components/Header.jsx'
import store from './logic/actions.js'
import Footer from './components/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider> 
      <>
        <Header></Header>
        <Provider store={store}>
          <App />
        </Provider>
        <Footer />
      </>
    </ProductProvider>
  </StrictMode>
)
