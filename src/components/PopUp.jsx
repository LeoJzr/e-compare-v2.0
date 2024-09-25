/* eslint-disable react/prop-types */
import { AddToCartIcon } from './incons'
import star from '../assets/star.svg'

const PopUp = ({ product, onClose, borderColor }) => {
  
  const borderPopUp = `bg-zinc-900 p-8 rounded-md max-w-6xl w-full grid grid-rows-2 grid-flow-col gap-2 border ${borderColor}`
  const borderImg = `aspect-auto rounded border border-spacing-5 shadow-lg ${borderColor}`
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 -z-0">
      <div className='flex'>
        
        <div className={borderPopUp}>

          <div className="row-span-3 items-center flex">
            <img src={product.imagen} alt={product.titulo} className={borderImg} />
          </div>

          <div className='col-span-3 row-span-2 gap-2 flex flex-col mx-3' >

            <h1 className='text-md font-bold' >{product.titulo}</h1>

            <ul className=" list-disc mx-3">
              {product.acerca.map((descripcion, index) => (
                <li className="text-sm" key={index}>{descripcion}</li>
              ))}
            </ul>

            <h2 className="text-lg font-semibold ">{product.precio} Envío: <span className="text-sm text-green-400">{product.envio}</span></h2>
            
            <h1 className='flex gap-1'><img src={star} className='w-5' alt="" />{product.valoracion}</h1>

            <a target='_blank' href={product.url} className="border border-solid border-zinc-200 bg-transparent py-1 px-4 rounded text-zinc-200 font-semibold justify-center items-center flex transition-all duration-300
            hover:bg-neutral-800 hover:transition-all hover:duration-300"> <AddToCartIcon /> </a>
          </div>

        </div>
        <button onClick={onClose} className='bg-gray-700 rounded-full w-7 h-7 z-10 -mx-8 mt-2 border border-transparent items-center justify-center place-items-center transition-all duration-500
        hover:border-neutral-200 hover:transition-all hover:duration-500'>X</button>
      </div>
    </div>
  )
}
export default PopUp