import React from "react"
import { Link } from "gatsby"

const HeroSection = ({ 
  title, 
  subtitle, 
  showButtons = false, 
  primaryButton = null, 
  secondaryButton = null,
  showScrollIndicator = true 
}) => {
  const handleScrollDown = () => {
    const nextSection = document.querySelector('main > section:nth-child(2), main > div:first-child, .content-section');
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback: scroll down by viewport height
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative gradient-bg text-white flex items-center" style={{ height: 'calc(100vh - 4rem)' }}>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-slide-in">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-4 xs:mb-6 sm:mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        
        {showButtons && (primaryButton || secondaryButton) && (
          <div className="flex flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4 justify-center mb-4 xs:mb-6 sm:mb-0">
            {primaryButton && (
              <Link 
                to={primaryButton.to} 
                className="btn-secondary inline-flex items-center px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 text-sm xs:text-base sm:text-lg font-semibold"
              >
                {primaryButton.text}
                {primaryButton.icon && (
                  <svg className="mr-2 w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={primaryButton.icon} />
                  </svg>
                )}
              </Link>
            )}
            {secondaryButton && (
              <Link 
                to={secondaryButton.to} 
                className="btn-outline inline-flex items-center px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 text-sm xs:text-base sm:text-lg font-semibold border-white text-white hover:bg-white hover:text-primary-600"
              >
                {secondaryButton.text}
                {secondaryButton.icon && (
                  <svg className="mr-2 w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={secondaryButton.icon} />
                  </svg>
                )}
              </Link>
            )}
          </div>
        )}
      </div>
      
      {/* Enhanced Mobile-First Responsive Scroll Indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div 
            className="flex flex-col items-center text-white/90 cursor-pointer group hover:text-white active:scale-95 transition-all duration-300 
                       p-1 xs:p-2 sm:p-3 md:p-4 rounded-xl 
                       touch-manipulation select-none
                       min-h-[50px] xs:min-h-[60px] sm:min-h-[70px] md:min-h-[80px]"
            onClick={handleScrollDown}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleScrollDown();
              }
            }}
            aria-label="اسکرول به پایین برای مشاهده محتوا"
          >
            {/* Text indicator - mobile-optimized with smaller text */}
            <span className="text-[8px] xs:text-[9px] sm:text-xs md:text-sm 
                           mb-1 xs:mb-1.5 sm:mb-2 md:mb-3 
                           animate-pulse font-medium tracking-wide text-center 
                           px-1 xs:px-2 sm:px-3
                           leading-tight
                           max-w-[90px] xs:max-w-[110px] sm:max-w-[130px] md:max-w-none">
              برای مشاهده محتوا به پایین بکشید
            </span>
            
            {/* Mouse scroll indicator - mobile-enhanced */}
            <div className="relative mb-1 xs:mb-1.5 sm:mb-2 md:mb-3 
                          group-hover:scale-110 group-active:scale-105 
                          transition-transform duration-300">
              <div className="w-3 h-5 xs:w-4 xs:h-6 sm:w-5 sm:h-7 md:w-6 md:h-8 lg:w-7 lg:h-10 
                           border-[1.5px] xs:border-2 border-white/70 rounded-full 
                           flex justify-center relative overflow-hidden 
                           bg-white/5 backdrop-blur-sm 
                           group-hover:border-white/90 group-active:border-white 
                           transition-colors duration-300
                           shadow-sm xs:shadow-md">
                <div className="w-0.5 xs:w-0.5 sm:w-1 
                             h-1 xs:h-1.5 sm:h-2 md:h-2.5 
                             bg-white/80 rounded-full 
                             mt-0.5 xs:mt-1 sm:mt-1.5 md:mt-2 
                             animate-flash shadow-sm 
                             group-hover:bg-white group-active:bg-white/90 
                             transition-colors duration-300"></div>
                {/* Enhanced glow effect for mobile */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b 
                             from-white/10 to-transparent 
                             group-hover:from-white/20 group-active:from-white/25 
                             transition-all duration-300"></div>
              </div>
            </div>
            
            {/* Down arrow - mobile-optimized */}
            <div className="animate-bounce">
              <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7
                           opacity-80 group-hover:opacity-100 group-active:opacity-100 
                           transition-all duration-300 drop-shadow-sm
                           stroke-[2] xs:stroke-[2.5] sm:stroke-[2.5]" 
                   fill="none" 
                   stroke="currentColor" 
                   viewBox="0 0 24 24"
                   aria-hidden="true">
                <path strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            
            {/* Mobile-optimized pulse background */}
            <div className="absolute inset-0 rounded-xl bg-white/5 animate-ping 
                         opacity-10 xs:opacity-15 sm:opacity-20 
                         scale-110 xs:scale-125 sm:scale-150 
                         group-hover:opacity-20 xs:group-hover:opacity-25 sm:group-hover:opacity-30 
                         group-active:opacity-30 
                         transition-opacity duration-300"></div>
          </div>
        </div>
      )}
    </section>
  )
}

export default HeroSection
