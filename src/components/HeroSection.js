import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"

const HeroSection = ({ 
  title, 
  subtitle, 
  showButtons = false, 
  primaryButton = null, 
  secondaryButton = null,
  showScrollIndicator = true,
  backgroundImage = null,
  overlayOpacity = 0.5,
  enableParallax = true,
  enableTypingEffect = false
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [typingComplete, setTypingComplete] = useState(!enableTypingEffect);
  const heroRef = useRef(null);

  // Typing animation effect
  useEffect(() => {
    if (!enableTypingEffect || !title) {
      setDisplayedTitle(title);
      return;
    }

    let currentIndex = 0;
    const typingSpeed = 80; // milliseconds per character

    const typingInterval = setInterval(() => {
      if (currentIndex <= title.length) {
        setDisplayedTitle(title.slice(0, currentIndex));
        currentIndex++;
      } else {
        setTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [title, enableTypingEffect]);

  // Parallax scroll effect
  useEffect(() => {
    if (!enableParallax) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enableParallax]);

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
    <section 
      ref={heroRef}
      className="relative gradient-bg text-white flex items-center overflow-hidden" 
      style={{ height: 'calc(100vh - 4rem)' }}
      role="banner"
      aria-label="Hero section"
    >
      {/* Background Image with Parallax */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-100 ease-out"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            transform: enableParallax ? `translateY(${scrollY * 0.5}px)` : 'none',
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Overlay with custom opacity */}
      <div 
        className="absolute inset-0 bg-black transition-opacity duration-300"
        style={{ opacity: overlayOpacity }}
        aria-hidden="true"
      ></div>
      
      {/* Animated gradient overlay for depth */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"
        aria-hidden="true"
      ></div>

      <div 
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center"
        style={{
          transform: enableParallax ? `translateY(${scrollY * 0.3}px)` : 'none',
          opacity: enableParallax ? Math.max(0, 1 - scrollY / 400) : 1,
        }}
      >
        <h1 
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-slide-in"
          style={{ 
            animationDelay: enableTypingEffect ? '0s' : '0.2s',
          }}
        >
          {enableTypingEffect ? (
            <>
              {displayedTitle}
              {!typingComplete && <span className="animate-pulse">|</span>}
            </>
          ) : (
            title
          )}
        </h1>
        {subtitle && (
          <p 
            className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-4 xs:mb-6 sm:mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed animate-fade-in"
            style={{ 
              animationDelay: enableTypingEffect ? (typingComplete ? '0.3s' : '99s') : '0.4s',
              opacity: enableTypingEffect && !typingComplete ? 0 : undefined,
            }}
          >
            {subtitle}
          </p>
        )}
        
        {showButtons && (primaryButton || secondaryButton) && (
          <div 
            className="flex flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4 justify-center mb-4 xs:mb-6 sm:mb-0 animate-fade-in"
            style={{ 
              animationDelay: enableTypingEffect ? (typingComplete ? '0.6s' : '99s') : '0.6s',
              opacity: enableTypingEffect && !typingComplete ? 0 : undefined,
            }}
          >
            {primaryButton && (
              <Link 
                to={primaryButton.to} 
                className="btn-secondary inline-flex items-center px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 text-sm xs:text-base sm:text-lg font-semibold 
                          transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                          focus:outline-none focus:ring-4 focus:ring-white/50 active:scale-95"
                aria-label={primaryButton.text}
              >
                {primaryButton.text}
                {primaryButton.icon && (
                  <svg className="mr-2 w-4 h-4 xs:w-5 xs:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={primaryButton.icon} />
                  </svg>
                )}
              </Link>
            )}
            {secondaryButton && (
              <Link 
                to={secondaryButton.to} 
                className="btn-outline inline-flex items-center px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 text-sm xs:text-base sm:text-lg font-semibold border-white text-white 
                          hover:bg-white hover:text-primary-600 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                          focus:outline-none focus:ring-4 focus:ring-white/50 active:scale-95"
                aria-label={secondaryButton.text}
              >
                {secondaryButton.text}
                {secondaryButton.icon && (
                  <svg className="mr-2 w-4 h-4 xs:w-5 xs:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={secondaryButton.icon} />
                  </svg>
                )}
              </Link>
            )}
          </div>
        )}
      </div>
      
      {/* Enhanced Scroll Indicator with improved UX */}
      {showScrollIndicator && (
        <div 
          className={`absolute left-1/2 transform -translate-x-1/2 z-10
                     ${showButtons && (primaryButton || secondaryButton) 
                       ? 'bottom-1 xs:bottom-2 sm:bottom-2 md:bottom-2 lg:bottom-3' 
                       : 'bottom-4 xs:bottom-5 sm:bottom-6 md:bottom-8 lg:bottom-10'}
                     transition-all duration-500 ease-out
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}
          style={{
            animation: isVisible ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'
          }}
        >
          <div 
            className="flex flex-col items-center text-white cursor-pointer group 
                       active:scale-90 transition-all duration-300 
                       p-3 xs:p-4 sm:p-5 rounded-2xl 
                       touch-manipulation select-none
                       bg-gradient-to-b from-black/50 to-black/30 backdrop-blur-sm
                       hover:from-black/60 hover:to-black/40
                       active:from-black/70 active:to-black/50
                       focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-0
                       shadow-2xl hover:shadow-3xl border border-white/20"
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
            {/* Text label with better visibility */}
            <span className="hidden xs:block text-[10px] sm:text-xs md:text-sm 
                           mb-2 sm:mb-3 
                           font-bold tracking-wider text-center 
                           leading-tight
                           text-white drop-shadow-lg
                           group-hover:text-green-200 transition-colors duration-300">
              به پایین بکشید
            </span>
            
            {/* Enhanced mouse icon with better animations */}
            <div className="relative mb-2 sm:mb-3 
                          group-hover:scale-110 group-active:scale-95 
                          transition-transform duration-300">
              <div className="w-5 h-8 xs:w-6 xs:h-9 sm:w-6 sm:h-10 md:w-7 md:h-11 
                           border-2 sm:border-[2.5px] border-white rounded-full 
                           flex justify-center relative overflow-hidden 
                           bg-gradient-to-b from-white/20 to-white/10
                           group-hover:border-green-200 group-hover:from-white/30 group-hover:to-white/20
                           transition-all duration-300
                           shadow-lg">
                {/* Animated scroll dot with enhanced animation */}
                <div className="w-1.5 xs:w-2 sm:w-2 
                             h-2 xs:h-2.5 sm:h-3 
                             bg-white rounded-full 
                             mt-1.5 xs:mt-2 sm:mt-2.5 
                             animate-scroll-wheel
                             shadow-lg group-hover:bg-green-200"></div>
              </div>
            </div>
            
            {/* Enhanced down arrow with pulse effect */}
            <div className="animate-gentle-bounce group-hover:animate-none">
              <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-7 sm:h-7 md:w-8 md:h-8
                           transition-all duration-300 
                           drop-shadow-2xl
                           stroke-[3] sm:stroke-[3.5]
                           group-hover:stroke-green-200 group-hover:translate-y-1" 
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
