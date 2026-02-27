import { createContext, useContext } from 'react'
import wexLogoRed from '../assets/wex_logo_red.svg'
import bankOfAmericaLogo from '../assets/Bank_of_America_logo.svg'
import kpLogo from '../assets/kp-logo.png'

export const BRANDS = {
  wex: {
    key: 'wex',
    label: 'WEX',
    logo: wexLogoRed,
    logoAlt: 'WEX',
    senderName: 'WEX Benefits',
    smsLabel: 'WEX Health',
    domain: 'wexbenefits.com',
  },
  boa: {
    key: 'boa',
    label: 'Bank of America',
    logo: bankOfAmericaLogo,
    logoAlt: 'Bank of America',
    senderName: 'Bank of America',
    smsLabel: 'Bank of America Health',
    domain: 'bankofamerica.com',
  },
  kp: {
    key: 'kp',
    label: 'Kaiser Permanente',
    logo: kpLogo,
    logoAlt: 'Kaiser Permanente',
    senderName: 'Kaiser Permanente',
    smsLabel: 'KP Health',
    domain: 'kp.org',
  },
}

const BrandContext = createContext({
  brandKey: 'wex',
  setBrandKey: () => {},
  brand: BRANDS.wex,
})

export function BrandProvider({ value, children }) {
  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>
}

export function useBrand() {
  return useContext(BrandContext)
}
