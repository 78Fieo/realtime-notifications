import { useBrand } from '../context/BrandContext'

export default function BrandHeader() {
  const { brand } = useBrand()

  return (
    <div className="brand-header" aria-label={`${brand.logoAlt} brand header`}>
      <img src={brand.logo} alt={brand.logoAlt} />
    </div>
  )
}
