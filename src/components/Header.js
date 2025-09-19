import React from "react"
import { Link } from "gatsby"
import CustomNavbar from "./CustomNavbar"

const Header = ({ siteTitle }) => {
  return (
    <header className="gradient-bg shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Site Title */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-bold text-white hover:text-green-100 transition-colors duration-200"
            >
              {siteTitle}
            </Link>
          </div>

          {/* Custom Navbar */}
          <CustomNavbar />
        </div>
      </div>
    </header>
  )
}

export default Header
