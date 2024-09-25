import Logo from './logos.jsx'
import { useState, useContext } from 'react'
import { ProductContext } from './ProductContext.jsx'
import axios from 'axios'

export default function Header(){
    const [dataSearch, setDataSearch] = useState('')
    const { setPostCompleted } = useContext(ProductContext)
    const [isLoading, setIsloading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsloading(true)

        async function retryPostRequest(url, data, attempts = 3) {

            for (let attempt = 1; attempt <= attempts; attempt++) {
                try {
                    const response = await axios.post(url, data)
                    console.log(`${url} Respuesta (intento ${attempt})`, response.data)
                    return response
                } catch (error) {
                    console.warn(`Error en ${url} (intento ${attempt}):`, error)
                    if (attempt < attempts) {
                    await new Promise((resolve) => setTimeout(resolve, 1000))
                    } else {
                        console.error(`Máximo de reintentos excedido para ${url}:`, error)
                        throw error
                    }
                }
            }
        }
        try {
            // 1. Obtener Productos Amazon
            const getProductsResponse = await retryPostRequest(import.meta.env.VITE_URL_API + '/api/getProducts', { dataSearch });
            console.log('Productos:', getProductsResponse.data)
            setPostCompleted(true) // Actualizar estado solo si esta petición es exitosa
        } catch (error) {
            console.error('Error al obtener productos:', error)
        }

        try {
            // 2. Obtener Productos de Mercado
            const getProductsMercadoResponse = await retryPostRequest(import.meta.env.VITE_URL_API + '/api/getProductsMercado', { dataSearch });
            console.log('Productos de Mercado:', getProductsMercadoResponse.data)
            setPostCompleted(true) // Actualizar estado solo si esta petición es exitosa
        } catch (error) {
            console.error('Error al obtener productos de Mercado:', error)
        }

        try {
            // 3. Obtener Productos de AliExpress
            const getProductsAlieResponse = await retryPostRequest(import.meta.env.VITE_URL_API + '/api/getProductsAlie', { dataSearch });
            console.log('Productos de AliExpress:', getProductsAlieResponse.data)
            setPostCompleted(true) // Actualizar estado solo si es exitosa
        } catch (error) {
            console.error('Error al obtener productos de AliExpress:', error)
        } finally {
            setDataSearch('') // Limpiar dataSearch al final de todas las peticiones
            setIsloading(false) // Actualizar estado de carga al final
        }
    }

    return(
            <header className='bg-slate-950 py-5 flex flex-wrap sm:gap-x-10
            sm:py-5 sm:flex-nowrap md:flex-row sm:items-center sm:justify-between sm:gap-20'>

                <div className='sm:basis-1/4 sm:mx-20 m-1'>
                    <Logo></Logo>
                </div>

                <form className='sm:basis-3/4 lg:mx-60 flex gap-5 m-1 md:w-full flex-col sm:flex-row' onSubmit={handleSubmit}>
                    <input required type="text" placeholder='Ingrese el nombre del producto' value={dataSearch} onChange = {(e) =>  setDataSearch(e.target.value)}
                    className='sm:w-full
                    px-2 py-1 rounded bg-zinc-800 border border-zinc-800 transition-all duration-500
                    hover:border hover:border-zinc-400 hover:transition-all hover:duration-500 
                    focus:transition-all focus:duration-500' />

                    <button className={`bg-neutral-900 hover:bg-neutral-800 border text-white text-sm font-semibold py-1 px-10 rounded transition-all duration-500 
                        ${isLoading ? 'opacity-50 cursor-not-allowed border-transparent' : ''}`} disabled={isLoading}  >
                        {isLoading ? 'Buscando...' : 'Buscar'}
                    </button>
                </form>
            </header>
    )
}

//'bg-transparent rounded border border-zinc-200 px-6 transition-all duration-500
//                    hover:border hover:border-slate-500 hover:transition-all hover:duration-500'