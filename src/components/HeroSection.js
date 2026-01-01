import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

const HeroSection = ({ 
  title, 
  subtitle, 
  showButtons = false, 
  primaryButton = null, 
  secondaryButton = null,
  showScrollIndicator = true 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (!showScrollIndicator) return;

    let timeoutId;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Hide indicator after scrolling more than 10% of viewport
      if (scrollPosition > viewportHeight * 0.1) {
        setIsVisible(false);
        setHasInteracted(true);
      } else if (!hasInteracted) {
        setIsVisible(true);
      }
    };

    const handleMouseMove = () => {
      if (!hasInteracted) {
        // Show indicator on mouse activity
        setIsVisible(true);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (!hasInteracted && window.scrollY === 0) {
            setIsVisible(true);
          }
        }, 3000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [showScrollIndicator, hasInteracted]);

  const handleScrollDown = () => {
    setHasInteracted(true);
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
      
      {/* Mobile-Optimized Scroll Indicator - Positioned to avoid button conflicts */}
      {showScrollIndicator && (
        <div 
          className={`absolute left-1/2 transform -translate-x-1/2 z-10
                     ${showButtons && (primaryButton || secondaryButton) 
                       ? 'bottom-1 xs:bottom-2 sm:bottom-2 md:bottom-2 lg:bottom-3' 
                       : 'bottom-4 xs:bottom-5 sm:bottom-6 md:bottom-8 lg:bottom-10'}
                     transition-all duration-500 ease-out
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}
        >
          <div 
            className="flex flex-col items-center text-white cursor-pointer group 
                       active:scale-90 transition-transform duration-200 
                       p-3 xs:p-4 sm:p-5 rounded-2xl 
                       touch-manipulation select-none
                       bg-black/40 sm:bg-black/30 md:bg-white/10
                       hover:bg-black/50 sm:hover:bg-black/40 md:hover:bg-white/20
                       active:bg-black/60 sm:active:bg-black/50 md:active:bg-white/30
                       focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-0
                       shadow-lg sm:shadow-xl"
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
            title="برای مشاهده محتوا کلیک کنید"
          >
            {/* Simple text - hidden on very small screens */}
            <span className="hidden xs:block text-[10px] sm:text-xs md:text-sm 
                           mb-2 sm:mb-3 
                           font-semibold tracking-wider text-center 
                           leading-tight
                           text-white drop-shadow-md">
              به پایین بکشید
            </span>
            
            {/* Simplified mouse icon - larger and clearer on mobile */}
            <div className="relative mb-2 sm:mb-3 
                          group-hover:scale-105 group-active:scale-95 
                          transition-transform duration-200">
              <div className="w-5 h-8 xs:w-6 xs:h-9 sm:w-6 sm:h-10 md:w-7 md:h-11 
                           border-2 sm:border-[2.5px] border-white rounded-full 
                           flex justify-center relative overflow-hidden 
                           bg-white/20 sm:bg-white/15 md:bg-white/10
                           group-hover:border-white group-hover:bg-white/25
                           transition-all duration-200
                           shadow-md sm:shadow-lg">
                {/* Animated scroll dot - simpler on mobile */}
                <div className="w-1 xs:w-1 sm:w-1.5 
                             h-1.5 xs:h-2 sm:h-2.5 
                             bg-white rounded-full 
                             mt-1.5 xs:mt-2 sm:mt-2.5 
                             animate-scroll-wheel
                             shadow-sm"></div>
              </div>
            </div>
            
            {/* Down arrow - larger and bolder on mobile */}
            <div className="animate-gentle-bounce">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 sm:w-6 sm:h-6 md:w-7 md:h-7
                           transition-all duration-200 
                           drop-shadow-lg
                           stroke-[2.5] sm:stroke-[3]" 
                   fill="none" 
                   stroke="currentColor" 
                   viewBox="0 0 24 24"
                   aria-hidden="true">
                <path strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default HeroSection
