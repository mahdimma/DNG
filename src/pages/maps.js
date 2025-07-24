import { graphql } from 'gatsby';
import React, { useState, useEffect, Suspense } from "react"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"

const Map = React.lazy(() => import('../components/Map'));

const MapsPage = ({ data }) => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const locations = data?.allLocationsJson?.nodes || [];
  
  // Points of Interest in the village
  const locationTypes = [
    { type: "All", name: "همه", color: "#667eea" },
    { type: "Government", name: "دولتی", color: "#e53e3e" },
    { type: "Religious", name: "مذهبی", color: "#38a169" },
    { type: "Education", name: "آموزشی", color: "#d69e2e" },
    { type: "Healthcare", name: "بهداشتی", color: "#3182ce" },
    { type: "Cultural", name: "فرهنگی", color: "#805ad5" },
    { type: "Commercial", name: "تجاری", color: "#dd6b20" }
  ]

  const [filter, setFilter] = useState("All")

  const filteredLocations = filter === "All" 
    ? locations 
    : locations.filter(location => location.type === filter)

  return (
    <Layout title="نقشه روستا" description="نقشه تعاملی و راهنمای موقعیت مکانی روستای دانگپیا">
      <HeroSection 
        title="نقشه روستا"
        subtitle="نقشه ای کامل از کل روستا"
        showButtons={false}
        showScrollIndicator={true}
      />
      <div style={{ maxWidth: 1200, margin: `0 auto`, padding: `2rem 1rem`, direction: 'rtl' }}>
        <h1>نقشه و موقعیت‌های روستا</h1>
        <p style={{ fontSize: `1.1rem`, marginBottom: `3rem` }}>
          روستای دانگپیا را با نقشه‌های تعاملی و راهنمای موقعیت مکانی ما کاوش کنید.
          ساختمان‌های مهم، خدمات و نقاط مورد علاقه را پیدا کنید.
        </p>
        
        <div style={{ marginBottom: '2rem' }}>
          {isClient && (
            <Suspense fallback={<div>در حال بارگذاری نقشه...</div>}>
              <Map 
                locations={filteredLocations} 
                locationTypes={locationTypes}
                selectedLocation={selectedLocation}
                onMarkerClick={setSelectedLocation}
              />
            </Suspense>
          )}
        </div>
        
        <div style={{ marginBottom: `2rem`, display: `flex`, justifyContent: `center`, flexWrap: `wrap` }}>
          {locationTypes.map(({ type, name, color }) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={{
                background: filter === type ? color : `white`,
                color: filter === type ? `white` : color,
                border: `2px solid ${color}`,
                padding: `0.5rem 1rem`,
                borderRadius: `20px`,
                cursor: `pointer`,
                fontWeight: `bold`,
                fontSize: `0.9rem`,
                transition: `all 0.2s`,
                margin: `0 0.5rem 0.5rem 0`,
              }}
            >
              {name}
            </button>
          ))}
        </div>

        <div style={{
          display: `grid`,
          gridTemplateColumns: `1fr 2fr`,
          gap: `2rem`,
          '@media (max-width: 768px)': {
            gridTemplateColumns: `1fr`,
          }
        }}>
          {/* Locations List */}
          <div>
            <h3>نقاط مورد علاقه</h3>
            <div style={{ maxHeight: `600px`, overflowY: `auto` }}>
              {filteredLocations.map((location) => {
                const locationTypeData = locationTypes.find(t => t.type === location.type)
                return (
                  <div 
                    key={location.id}
                    style={{
                      background: selectedLocation?.id === location.id ? `#f0fff4` : `white`,
                      border: `1px solid ${selectedLocation?.id === location.id ? locationTypeData?.color : '#e2e8f0'}`,
                      borderRadius: `8px`,
                      padding: `1rem`,
                      marginBottom: `1rem`,
                      cursor: `pointer`,
                      transition: `all 0.2s`,
                      textAlign: 'right'
                    }}
                    onClick={() => setSelectedLocation(location)}
                    onMouseOver={(e) => {
                      if (selectedLocation?.id !== location.id) {
                        e.currentTarget.style.background = '#f7fafc'
                        e.currentTarget.style.borderColor = locationTypeData?.color
                      }
                    }}
                    onMouseOut={(e) => {
                      if (selectedLocation?.id !== location.id) {
                        e.currentTarget.style.background = 'white'
                        e.currentTarget.style.borderColor = '#e2e8f0'
                      }
                    }}
                  >
                    <div style={{ display: `flex`, alignItems: `flex-start`, gap: `0.5rem` }}>
                      <div style={{
                        width: `12px`,
                        height: `12px`,
                        borderRadius: `50%`,
                        background: locationTypeData?.color,
                        marginTop: `0.3rem`,
                        flexShrink: 0,
                      }}></div>
                      <div>
                        <h4 style={{ margin: `0 0 0.5rem 0`, color: `#2d3748` }}>
                          {location.name}
                        </h4>
                        <p style={{ 
                          margin: `0 0 0.5rem 0`, 
                          fontSize: `0.9rem`,
                          color: `#4a5568`,
                        }}>
                          {location.description}
                        </p>
                        <div style={{ fontSize: `0.8rem`, color: `#666` }}>
                          <div style={{ marginBottom: `0.25rem` }}>
                            📍 {location.address}
                          </div>
                          <div style={{ marginBottom: `0.25rem` }}>
                            🕒 {location.hours}
                          </div>
                          <div>
                            📞 {location.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Map Container */}
          <div style={{
            background: `#f7fafc`,
            borderRadius: `8px`,
            padding: `2rem`,
            minHeight: `500px`,
            display: `flex`,
            flexDirection: `column`,
            alignItems: `center`,
            justifyContent: `center`,
            border: `1px solid #e2e8f0`,
          }}>
            <div style={{
              background: `#e2e8f0`,
              width: `100%`,
              height: `400px`,
              borderRadius: `8px`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              color: `#4a5568`,
              textAlign: `center`,
              position: `relative`,
              overflow: 'hidden'
            }}>
              {isClient && (
                <Suspense fallback={<div>در حال بارگذاری نقشه...</div>}>
                  <Map 
                    locations={filteredLocations} 
                    locationTypes={locationTypes}
                    selectedLocation={selectedLocation}
                    onMarkerClick={setSelectedLocation}
                  />
                </Suspense>
              )}
            </div>
            
            {/* Map Legend */}
            <div style={{
              marginTop: `1rem`,
              width: `100%`,
              background: `white`,
              padding: `1rem`,
              borderRadius: `5px`,
              border: `1px solid #e2e8f0`,
            }}>
              <h4 style={{ marginBottom: `1rem` }}>راهنمای نقشه</h4>
              <div style={{
                display: `grid`,
                gridTemplateColumns: `repeat(auto-fit, minmax(150px, 1fr))`,
                gap: `0.5rem`,
              }}>
                {locationTypes.slice(1).map((type, index) => (
                  <div key={index} style={{ display: `flex`, alignItems: `center`, gap: `0.5rem` }}>
                    <div style={{
                      width: `12px`,
                      height: `12px`,
                      borderRadius: `50%`,
                      background: type.color,
                    }}></div>
                    <span style={{ fontSize: `0.9rem` }}>{type.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Directions Section */}
        <section style={{
          background: `#f7fafc`,
          padding: `2rem`,
          borderRadius: `8px`,
          marginTop: `3rem`,
        }}>
          <h3>چگونه به روستای دانگپیا برسیم</h3>
          <div style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
            gap: `2rem`,
            marginTop: `1.5rem`,
          }}>
            <div>
              <h4>🚗 با ماشین</h4>
              <p>
                از [نزدیکترین شهر] وارد بزرگراه [X] شوید. از خروجی [نام خروجی] خارج شده و علائم را به سمت روستای دانگپیا دنبال کنید. فاصله کل: تقریباً [X] کیلومتر.
              </p>
            </div>
            <div>
              <h4>🚌 با حمل و نقل عمومی</h4>
              <p>
                سرویس اتوبوس منظم از [نزدیکترین شهر] به روستای دانگپیا.
                اتوبوس‌ها هر [X] ساعت حرکت می‌کنند. زمان سفر: تقریباً [X] دقیقه.
              </p>
            </div>
            <div>
              <h4>🚶 فاصله پیاده‌روی</h4>
              <p>
                مرکز روستا جمع و جور و قابل پیاده‌روی است. بیشتر مکان‌ها در فاصله ۵-۱۰ دقیقه پیاده‌روی از میدان مرکزی قرار دارند.
              </p>
            </div>
          </div>
        </section>

        {/* Emergency Information */}
        <section style={{
          background: `#fed7d7`,
          padding: `2rem`,
          borderRadius: `8px`,
          marginTop: `2rem`,
          border: `1px solid #feb2b2`,
        }}>
          <h3 style={{ color: `#c53030` }}>مکان‌های اضطراری</h3>
          <div style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
            gap: `1rem`,
            marginTop: `1rem`,
          }}>
            <div>
              <strong>ایستگاه پلیس:</strong><br />
              خیابان اصلی، نزدیک دفتر روستا<br />
              اورژانس: ۱۱۰
            </div>
            <div>
              <strong>ایستگاه آتش‌نشانی:</strong><br />
              خیابان ایمنی، غرب مرکز<br />
              اورژانس: ۱۲۵
            </div>
            <div>
              <strong>درمانگاه:</strong><br />
              خیابان بهداشت، موقعیت مرکزی<br />
              اورژانس: ۱۱۵
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default MapsPage

export const query = graphql`
  query {
    allLocationsJson {
      nodes {
        id
        name
        type
        description
        coordinates {
          lat
          lng
        }
        address
        hours
        phone
      }
    }
  }
`;
