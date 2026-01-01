import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"

const CustomNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const mobileMenuRef = useRef(null)
  const dropdownRefs = useRef({})
  const location = useLocation()

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close mobile menu
      if (isMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
      
      // Close dropdowns
      if (openDropdown) {
        const refs = dropdownRefs.current[openDropdown]
        const isInsideDropdown =
          refs?.desktop?.contains(event.target) || refs?.mobile?.contains(event.target)

        if (!isInsideDropdown) setOpenDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen, openDropdown])

  // Close menus on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenDropdown(null)
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  // Close menus when route changes
  useEffect(() => {
    setOpenDropdown(null)
    setIsMenuOpen(false)
  }, [location?.pathname])

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName)
  }

  const pathname = location?.pathname || "/"
  const isPathActive = (path) => {
    if (!path) return false
    if (path === "/") return pathname === "/"
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const navItems = [
    { name: "خانه", path: "/" },
    { name: "درباره ما", path: "/about" },
    {
      name: "محتوا",
      dropdown: [
        { name: "اخبار", path: "/news" },
        { name: "رویدادها", path: "/events" },
        { name: "گزارشات", path: "/letters" },
        { name: "نشریات", path: "/magazines" },
        { name: "گالری تصاویر", path: "/gallery" }
      ]
    },
    {
      name: "خدمات",
      dropdown: [
        { name: "خدمات", path: "/services" },
        { name: "نقشه", path: "/maps" },
        { name: "آب و هوا", path: "/weather" },
        { name: "تقویم فارسی", path: "/persian-calendar" }
      ]
    },
    { name: "تماس با ما", path: "/contact" },
    { name: "شفافیت", path: "/financial"}
  ]

  return (
    <nav className="relative" aria-label="ناوبری اصلی">
      {/* Desktop Navigation */}
      <ul className="hidden md:flex md:items-center md:space-x-reverse md:gap-1">
        {navItems.map((item) => (
          <li key={item.name} className="relative">
            {item.dropdown ? (
              <div
                ref={(el) => {
                  dropdownRefs.current[item.name] = {
                    ...(dropdownRefs.current[item.name] || {}),
                    desktop: el,
                  }
                }}
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
                className="relative"
              >
                <button
                  aria-expanded={openDropdown === item.name}
                  aria-haspopup="true"
                  aria-controls={`desktop-dropdown-${item.name}`}
                  onClick={() => toggleDropdown(item.name)}
                  className={`relative text-white/90 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-1.5 hover:text-white hover:bg-white/15 hover:shadow-lg hover:shadow-black/10 ${focusRing} ${item.dropdown.some((sub) => isPathActive(sub.path)) ? "bg-white/20 text-white shadow-lg shadow-black/10" : ""}`}
                >
                  {item.name}
                  <svg 
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${openDropdown === item.name ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div
                  id={`desktop-dropdown-${item.name}`}
                  className={`absolute right-0 top-full pt-3 z-50 transition-all duration-300 ${openDropdown === item.name ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                  aria-label={item.name}
                >
                  <ul className="w-56 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 py-2">
                    {item.dropdown.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          to={subItem.path}
                          className={`group flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-all duration-200 hover:bg-primary-50 hover:text-primary-700 mx-2 rounded-xl ${focusRing} ${isPathActive(subItem.path) ? "bg-primary-50 text-primary-700 font-semibold" : ""}`}
                          activeClassName="bg-primary-50 text-primary-700 font-semibold"
                          partiallyActive
                          onClick={() => setOpenDropdown(null)}
                        >
                          <span className={`w-2 h-2 rounded-full transition-all duration-200 ${isPathActive(subItem.path) ? 'bg-primary-500' : 'bg-gray-300 group-hover:bg-primary-400'}`}></span>
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                to={item.path}
                className={`relative text-white/90 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:text-white hover:bg-white/15 hover:shadow-lg hover:shadow-black/10 block ${focusRing} ${isPathActive(item.path) ? "bg-white/20 text-white shadow-lg shadow-black/10" : ""}`}
                activeClassName="bg-white/20 text-white"
                partiallyActive={item.path !== "/"}
                aria-current={isPathActive(item.path) ? "page" : undefined}
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`relative w-11 h-11 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 ${isMenuOpen ? 'bg-white/30' : ''}`}
        >
          <div className="w-5 h-4 flex flex-col justify-between items-center">
            <span className={`block h-0.5 w-5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block h-0.5 w-5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : ''}`}></span>
            <span className={`block h-0.5 w-5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <button
        type="button"
        className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
        aria-label="بستن منو"
      />
      
      {/* Mobile Navigation */}
      <div 
        ref={mobileMenuRef}
        id="mobile-navigation"
        dir="rtl"
        className={`md:hidden fixed inset-y-0 left-0 w-80 max-w-[85vw] z-50 bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Mobile Menu Header */}
        <div className="bg-gradient-to-l from-primary-600 via-primary-500 to-primary-600 px-6 py-5 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
              aria-label="بستن منو"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-white">روستای دنگپیا</span>
              <div className="w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center shadow-lg p-1.5">
                <img src="/logo.png" alt="Dangepia Logo" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Items */}
        <div className="flex-1 min-h-0 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item, index) => (
              <li key={item.name} style={{ animationDelay: `${index * 50}ms` }} className={`${isMenuOpen ? 'animate-fade-in' : ''}`}>
                {item.dropdown ? (
                  <div
                    ref={(el) => {
                      dropdownRefs.current[item.name] = {
                        ...(dropdownRefs.current[item.name] || {}),
                        mobile: el,
                      }
                    }}
                  >
                    <button
                      aria-expanded={openDropdown === item.name}
                      aria-controls={`mobile-dropdown-${item.name}`}
                      className={`text-gray-800 hover:text-primary-700 w-full px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 flex items-center justify-between ${openDropdown === item.name ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}`}
                      onClick={() => toggleDropdown(item.name)}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${item.dropdown.some((sub) => isPathActive(sub.path)) ? 'bg-primary-500' : 'bg-gray-300'}`}></span>
                        {item.name}
                      </span>
                      <svg 
                        className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${openDropdown === item.name ? 'rotate-180 text-primary-600' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ${openDropdown === item.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <ul id={`mobile-dropdown-${item.name}`} className="mt-1 space-y-1 mr-6 pr-4 border-r-2 border-primary-100">
                        {item.dropdown.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              to={subItem.path}
                              className={`flex items-center gap-2 text-gray-600 hover:text-primary-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-primary-50 ${isPathActive(subItem.path) ? "bg-primary-50 text-primary-700 font-semibold" : ""}`}
                              partiallyActive
                              onClick={() => {
                                setOpenDropdown(null)
                                setIsMenuOpen(false)
                              }}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${isPathActive(subItem.path) ? 'bg-primary-500' : 'bg-gray-300'}`}></span>
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 text-gray-800 hover:text-primary-700 px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 ${isPathActive(item.path) ? "bg-primary-50 text-primary-700" : "hover:bg-gray-50"}`}
                    partiallyActive={item.path !== "/"}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className={`w-2 h-2 rounded-full ${isPathActive(item.path) ? 'bg-primary-500' : 'bg-gray-300'}`}></span>
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default CustomNavbar