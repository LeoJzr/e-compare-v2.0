import logo from '../img/logo.png'
import AmzLogo from '../img/amazonDarkLogo.png'
import MlLogo from '../img/MLLogo.png'
import EbLogo from '../img/ebayLogo.png'
import AliLogo from '../img/alieLogo.png'
import AbbLogo from '../img/alibabaLogo.png'

export default function Logo () {
  return (
    <div className='cursor-pointer grid grid-cols-2 '>
      <div className='justify-center'>
        <img src={logo} alt='Logo del proyecto' className='h-10 ' />
      </div>
      <div className=''>
        <span className='text-white font-bold text-2xl hidden sm:block text-nowrap'>e-compare</span>
      </div>
    </div>
  )
}
export const MercadoLogo = () => {
  <picture className='w-5 h-5'>
    <img src={MlLogo} alt='Logo de Amazon' className='h-4 w-5' />
  </picture>
}

export function AmazonLogo () {
  return (
    <picture>
      <img src={AmzLogo} alt='Logo de Mercado' className='' />
    </picture>
  )
}

export function EbayLogo () {
  return (
    <img src={EbLogo} alt='Logo de Ebay' className='' />
  )
}

export function AliexpressLogo () {
  return (
    <img src={AliLogo} alt='Logo de Aliexpress' className='h-auto w-auto' />
  )
}

export function AlibabaLogo () {
  return (
    <img src={AbbLogo} alt='Logo de Alibaba' className='' />
  )
}
