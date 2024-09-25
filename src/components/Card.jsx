/* eslint-disable react/prop-types */

import { useState, useEffect, useContext,useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import { createSlice } from '@reduxjs/toolkit'
import { ProductContext } from './ProductContext'
import { AddToCartIcon } from './incons'
import axios from "axios"
import PopUp from './PopUp'


  const productsSlice = createSlice({
    name: 'products',
    initialState: {
      productsAmz: [],
      productsMl: [],
      productsAlie: [],
    },
    reducers: {
      fetchAmzSuccess: (state, action) => {
        state.productsAmz = action.payload // Actualiza el estado con los nuevos productos de Amazon
      },
      fetchMlSuccess: (state, action) => {
        state.productsMl = action.payload // Actualiza el estado con los nuevos productos de Mercado Libre
      },
      fetchAlieSuccess: (state, action) => {
        state.productsAlie = action.payload // Actualiza el estado con los nuevos productos de Aliexpress
      },
    },
  })
  
  const sortingOptions = [
    {value: 'relevants', label: 'Relevantes'},
    {value: 'priceHighToLow', label:'Precio: Mayor a menor'},
    {value: 'priceLowToHigh', label: 'Precio Menor a mayor'},
  ]

  const forceUpdateReducer = (state) => !state

const Card = ({ apiURL, dataSource, color }) => {
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [sortBy, setSortBy ] = useState('normal')

    const productsAll = useSelector(state => state[`products${dataSource}`])
    const dispatch = useDispatch()
    const { postCompleted, setPostCompleted } = useContext(ProductContext)
    const [ignored] = useReducer(forceUpdateReducer, false)
    
    const handleSortChange = (event) =>{
      setSortBy(event.target.value)
    }
    //const urlNgrokApi = import.meta.env.VITE_NGROK_URL

    useEffect(() => {
      const fetchProducts = async() => {
        console.log(postCompleted)
        
          try{
              //const response = await axios.get(`/api/${apiURL}`)
              const response = await axios.get(import.meta.env.VITE_URL_API + `/api/${apiURL}`)
              //const response = await axios.get(`${urlNgrokApi}/api/${apiURL}`)
              
              await dispatch(
                  productsSlice.actions[`fetch${dataSource}Success`](response.data)
                )
                setPostCompleted(false)
          }catch(error){
              console.error(`Error renderizando ${dataSource}:` , error)
              
          }
        
        console.log(postCompleted)

      }
      fetchProducts()
    },[dispatch, apiURL, dataSource, postCompleted, ignored, setPostCompleted])

    const truncateText = (text, max) => {
      const addSpacesAfterCommas = (str) => {
        return str.replace(/,/g,', ')
      }
      
      return text.length  > max ? `${addSpacesAfterCommas(text.substring(0, max))}...` : addSpacesAfterCommas(text)
    }

    const handleOpenModal = async (id, platform) => {
      try{
        //const response = await axios.get(`${import.meta.env.VITE_NGROK_URL}/api/${platform}/${id}`)
        const response = await axios.get(import.meta.env.VITE_URL_API + `/api/${platform}/${id}`) 
        setSelectedProduct(response.data)
      }catch(error){
        console.log('No se obtuvo el titulo', error)
      }finally{
        setShowModal(true)
      }
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setSelectedProduct(null)
    }

    const colorProp = `text-wrap grid gap-4 sm:gap-2 mb-4 justify-center bg-zinc-950 p-2 rounded-md border ${color}`

    const sortedProducts = () => {
      switch (sortBy){
        case 'priceHighToLow':
          return productsAll.slice().sort((a, b) => {
            const cleanPrice = (price) => {
              // Quitar el signo de dólar y los espacios
              price = price.replace('$', '').trim().replace(',','')
              // Buscar y reemplazar la coma seguida de exactamente 2 dígitos al final
              price = price.replace(/,(\d{2})$/, '.$1')
              return price
            }
            const priceA = cleanPrice(a.precio)
            const priceB = cleanPrice(b.precio)
            console.log(priceA, priceB)
            return priceB - priceA
          });
        case 'priceLowToHigh':
          return productsAll.slice().sort((a, b) => {
            const cleanPrice = (price) => {
              // Quitar el signo de dólar y los espacios
              price = price.replace('$', '').trim().replace(',','')
              // Buscar y reemplazar la coma seguida de exactamente 2 dígitos al final
              price = price.replace(/,(\d{2})$/, '.$1')
              return price;
            }
            const priceA = cleanPrice(a.precio)
            const priceB = cleanPrice(b.precio)
            return priceA - priceB
          })
        default:
          return productsAll
      }
    }
    return(
        <div className='max-w-56'>
          {sortingOptions &&(
            <select value={sortBy} onChange={handleSortChange} className='mb-5'>
              {sortingOptions.map((Option)=>(
                <option key={Option.value} value={Option.value}>
                  {Option.label}
                </option>
              ))}
            </select>
          )}
            {sortedProducts().map(product => (
                <div key={product.id} className={colorProp} >

                    <h1 className='' data-tooltip-content={product.titulo} data-tooltip-id='my-title'>
                        {truncateText(product.titulo, 45)}
                    </h1>
                    <Tooltip id='my-title' place='right' opacity={0.5} className='text-wrap max-w-52 rounded-xl shadow-md' />

                    <figure className='max-w-56'><img src={product.imagen} alt="" className='rounded aspect-video' /></figure>
                    <h2 className='flex justify-end gap-1'>{product.precio} Envío: <span className='text-green-400'>{product.envio}</span></h2>
                    <ul className='mx-4 list-disc'>
                        <li className='text-wrap' key={0}>{truncateText(product.acerca[0], 60)}</li>
                        <li className='list-none text-end text-gray-400 hover:text-gray-300 cursor-pointer' onClick={() => handleOpenModal(product.id, apiURL)}>
                        Ver mas ...
                        </li>
                    </ul>
                    <a href={product.url} target='_blank' className='border border-zinc-300 items-center flex justify-center rounded transition-all duration-300
                    hover:bg-neutral-900  hover:transition-all hover:duration-300'> 
                      <AddToCartIcon />
                    </a>
                    {showModal && <PopUp product={selectedProduct} onClose={handleCloseModal} showModal={showModal} borderColor={color} />}
                </div>
            ))}
        </div>
    )
}


export default Card