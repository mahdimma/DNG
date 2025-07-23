// Import global CSS styles
import './src/styles/global.css'

// Additional Persian/RTL specific configurations
export const onClientEntry = () => {
  // Ensure document direction is set to RTL
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('dir', 'rtl')
    document.documentElement.setAttribute('lang', 'fa')
  }
}
