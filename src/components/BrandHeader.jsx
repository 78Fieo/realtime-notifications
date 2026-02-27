import wexLogoRed from '../assets/wex_logo_red.svg'

export default function BrandHeader() {
  return (
    <div className="brand-header" aria-label="WEX brand header">
      <img src={wexLogoRed} alt="WEX" />
    </div>
  )
}
