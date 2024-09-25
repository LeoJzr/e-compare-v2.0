import { useState } from 'react'
import logoAmazon from './img/amzDark.png'
import logoMeLib from './img/MLLogo.png'
import logoAlie from './img/alieLogo.png'
import Card from './components/Card'

function App() {
  const [showAmazon, setShowAmazon] = useState(true)
  const [showMercadoLibre, setShowMercadoLibre] = useState(true)
  const [showAliexpress, setShowAliexpress] = useState(true) 
  
  return (
    <div className='m-5 sm:grid-none sm:justify-normal grid justify-center'>

      <div className='flex justify-around sm:flex-row flex-col'>

        <div className='flex flex-col gap-5 sm:min-w-56 max-w-56 mb-8'>
          <div className='min-w-56'>
            <label htmlFor='checkAmz' className='flex bg-black bg-opacity-45 rounded-lg px-2 justify-center min-h-16'>
              <input
                id='checkAmz'
                type="checkbox"
                checked={showAmazon}
                onChange={() => setShowAmazon(!showAmazon)}
                className=''
              />
              <img src={logoAmazon} alt="" className='max-w-24' />
            </label>
          </div>
          {showAmazon && <Card apiURL={'amz'} dataSource={'Amz'} color={'border-amber-700'} />}
        </div>

        <div className='flex flex-col gap-5 sm:min-w-56 max-w-56 mb-8'>
          <div className='min-w-56'>
            <label htmlFor='checkMl' className='flex bg-black bg-opacity-45 rounded-lg pl-2 pr-5 gap-1 justify-center min-h-16'>
              <input
                className=''
                id='checkMl'
                type="checkbox"
                checked={showMercadoLibre}
                onChange={() => setShowMercadoLibre(!showMercadoLibre)}
              />
              <img src={logoMeLib} alt="" className='max-w-16' />
            </label>
          </div>
          {showMercadoLibre && <Card apiURL={'melib'} dataSource={'Ml'} color={'border-yellow-500'} />}
        </div>

        <div>

        <div className='flex flex-col gap-5 sm:min-w-56 max-w-56 mb-8'>
          <div className='min-w-56'>
            <label htmlFor='checkAlie' className='flex bg-black bg-opacity-45 rounded-lg gap-1 px-2 justify-center min-h-16'>
              <input
                id='checkAlie'
                type="checkbox"
                checked={showAliexpress}
                onChange={() => setShowAliexpress(!showAliexpress)}
              />
              <img src={logoAlie} alt="" className='max-w-24' />
            </label>
          </div>
          {showAliexpress && <Card apiURL={'alie'} dataSource={'Alie'} color={'border-red-800'} />}

        </div>

        </div>
      </div>

    </div>
  )
}

export default App
