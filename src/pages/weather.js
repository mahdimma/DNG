import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"

const WeatherPage = () => {
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 22,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    pressure: 1013,
    visibility: 10,
    uvIndex: 5,
    icon: "⛅"
  })

  const [forecast, setForecast] = useState([
    { day: "Today", high: 24, low: 18, condition: "Partly Cloudy", icon: "⛅" },
    { day: "Tomorrow", high: 26, low: 19, condition: "Sunny", icon: "☀️" },
    { day: "Wednesday", high: 23, low: 17, condition: "Cloudy", icon: "☁️" },
    { day: "Thursday", high: 21, low: 15, condition: "Rain", icon: "🌧️" },
    { day: "Friday", high: 25, low: 18, condition: "Sunny", icon: "☀️" },
    { day: "Saturday", high: 27, low: 20, condition: "Sunny", icon: "☀️" },
    { day: "Sunday", high: 24, low: 17, condition: "Partly Cloudy", icon: "⛅" }
  ])

  const [alerts, setAlerts] = useState([
    {
      type: "advisory",
      title: "High UV Index Expected",
      message: "UV index will reach 8 tomorrow. Please take sun protection measures.",
      icon: "☀️"
    }
  ])

  // In a real app, this would fetch data from a weather API
  useEffect(() => {
    // Simulate API call
    const fetchWeatherData = () => {
      // This would be replaced with actual API calls
      console.log("Fetching weather data...")
    }
    
    fetchWeatherData()
    
    // Set up periodic updates
    const interval = setInterval(fetchWeatherData, 300000) // Update every 5 minutes
    
    return () => clearInterval(interval)
  }, [])

  const getBackgroundGradient = (condition) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)"
      case "cloudy":
        return "linear-gradient(135deg, #636e72 0%, #2d3436 100%)"
      case "rain":
        return "linear-gradient(135deg, #636e72 0%, #2d3436 100%)"
      default:
        return "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)"
    }
  }

  const getUVIndexColor = (uvIndex) => {
    if (uvIndex <= 2) return "#22c55e" // Green - Low
    if (uvIndex <= 5) return "#eab308" // Yellow - Moderate
    if (uvIndex <= 7) return "#f97316" // Orange - High
    if (uvIndex <= 10) return "#dc2626" // Red - Very High
    return "#7c3aed" // Purple - Extreme
  }

  const getUVIndexLabel = (uvIndex) => {
    if (uvIndex <= 2) return "Low"
    if (uvIndex <= 5) return "Moderate"
    if (uvIndex <= 7) return "High"
    if (uvIndex <= 10) return "Very High"
    return "Extreme"
  }

  return (
    <Layout title="Weather" description="Current weather conditions and forecast for Dangepia Village">
      <div style={{ maxWidth: 1200, margin: `0 auto`, padding: `2rem 1rem` }}>
        <h1>Dangepia Village Weather</h1>
        <p style={{ fontSize: `1.1rem`, marginBottom: `3rem` }}>
          Stay informed about current weather conditions and upcoming forecasts for our village.
          Updated every 5 minutes from local weather stations.
        </p>

        {/* Weather Alerts */}
        {alerts.length > 0 && (
          <section style={{ marginBottom: `2rem` }}>
            {alerts.map((alert, index) => (
              <div key={index} style={{
                background: alert.type === "warning" ? "#fed7d7" : "#bee3f8",
                border: `1px solid ${alert.type === "warning" ? "#feb2b2" : "#90cdf4"}`,
                borderRadius: `8px`,
                padding: `1rem`,
                marginBottom: `1rem`,
              }}>
                <div style={{ display: `flex`, alignItems: `center`, gap: `0.5rem` }}>
                  <span style={{ fontSize: `1.2rem` }}>{alert.icon}</span>
                  <strong style={{ 
                    color: alert.type === "warning" ? "#c53030" : "#2b6cb0" 
                  }}>
                    {alert.title}
                  </strong>
                </div>
                <p style={{ 
                  margin: `0.5rem 0 0 0`,
                  color: alert.type === "warning" ? "#744210" : "#2c5282"
                }}>
                  {alert.message}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Current Weather */}
        <section style={{
          background: getBackgroundGradient(currentWeather.condition),
          color: `white`,
          borderRadius: `12px`,
          padding: `2rem`,
          marginBottom: `3rem`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.1)`,
        }}>
          <div style={{
            display: `grid`,
            gridTemplateColumns: `1fr auto`,
            gap: `2rem`,
            alignItems: `center`,
          }}>
            <div>
              <h2 style={{ margin: `0 0 0.5rem 0`, fontSize: `2rem` }}>
                Current Weather
              </h2>
              <p style={{ margin: `0 0 1rem 0`, opacity: 0.9 }}>
                Last updated: {new Date().toLocaleTimeString()}
              </p>
              <div style={{
                display: `flex`,
                alignItems: `center`,
                gap: `1rem`,
                marginBottom: `1rem`,
              }}>
                <span style={{ fontSize: `4rem` }}>{currentWeather.icon}</span>
                <div>
                  <div style={{ fontSize: `3rem`, fontWeight: `bold` }}>
                    {currentWeather.temperature}°C
                  </div>
                  <div style={{ fontSize: `1.2rem`, opacity: 0.9 }}>
                    {currentWeather.condition}
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{
              display: `grid`,
              gridTemplateColumns: `repeat(2, 1fr)`,
              gap: `1rem`,
              minWidth: `300px`,
            }}>
              <div style={{
                background: `rgba(255,255,255,0.2)`,
                padding: `1rem`,
                borderRadius: `8px`,
                textAlign: `center`,
              }}>
                <div style={{ fontSize: `0.9rem`, opacity: 0.8 }}>Humidity</div>
                <div style={{ fontSize: `1.5rem`, fontWeight: `bold` }}>
                  {currentWeather.humidity}%
                </div>
              </div>
              
              <div style={{
                background: `rgba(255,255,255,0.2)`,
                padding: `1rem`,
                borderRadius: `8px`,
                textAlign: `center`,
              }}>
                <div style={{ fontSize: `0.9rem`, opacity: 0.8 }}>Wind Speed</div>
                <div style={{ fontSize: `1.5rem`, fontWeight: `bold` }}>
                  {currentWeather.windSpeed} km/h
                </div>
              </div>
              
              <div style={{
                background: `rgba(255,255,255,0.2)`,
                padding: `1rem`,
                borderRadius: `8px`,
                textAlign: `center`,
              }}>
                <div style={{ fontSize: `0.9rem`, opacity: 0.8 }}>Pressure</div>
                <div style={{ fontSize: `1.5rem`, fontWeight: `bold` }}>
                  {currentWeather.pressure} hPa
                </div>
              </div>
              
              <div style={{
                background: `rgba(255,255,255,0.2)`,
                padding: `1rem`,
                borderRadius: `8px`,
                textAlign: `center`,
              }}>
                <div style={{ fontSize: `0.9rem`, opacity: 0.8 }}>UV Index</div>
                <div style={{ 
                  fontSize: `1.5rem`, 
                  fontWeight: `bold`,
                  color: getUVIndexColor(currentWeather.uvIndex),
                }}>
                  {currentWeather.uvIndex} - {getUVIndexLabel(currentWeather.uvIndex)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7-Day Forecast */}
        <section style={{ marginBottom: `3rem` }}>
          <h2 style={{ marginBottom: `1.5rem` }}>7-Day Forecast</h2>
          <div style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fit, minmax(150px, 1fr))`,
            gap: `1rem`,
          }}>
            {forecast.map((day, index) => (
              <div key={index} style={{
                background: `white`,
                border: `1px solid #e2e8f0`,
                borderRadius: `8px`,
                padding: `1.5rem`,
                textAlign: `center`,
                boxShadow: `0 2px 4px rgba(0,0,0,0.1)`,
                transition: `transform 0.2s, box-shadow 0.2s`,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
              }}
              >
                <div style={{ 
                  fontWeight: `bold`,
                  marginBottom: `0.5rem`,
                  color: index === 0 ? "#667eea" : "#2d3748",
                }}>
                  {day.day}
                </div>
                <div style={{ 
                  fontSize: `2rem`,
                  marginBottom: `0.5rem`,
                }}>
                  {day.icon}
                </div>
                <div style={{ 
                  fontSize: `0.9rem`,
                  marginBottom: `0.5rem`,
                  color: `#4a5568`,
                }}>
                  {day.condition}
                </div>
                <div style={{ display: `flex`, justifyContent: `space-between` }}>
                  <span style={{ fontWeight: `bold` }}>{day.high}°</span>
                  <span style={{ color: `#666` }}>{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weather Information */}
        <div style={{
          display: `grid`,
          gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
          gap: `2rem`,
        }}>
          {/* Climate Information */}
          <section style={{
            background: `#f7fafc`,
            padding: `2rem`,
            borderRadius: `8px`,
            border: `1px solid #e2e8f0`,
          }}>
            <h3>Climate Information</h3>
            <div style={{ marginTop: `1rem` }}>
              <h4>Seasonal Overview</h4>
              <ul style={{ color: `#4a5568`, lineHeight: `1.6` }}>
                <li><strong>Spring:</strong> Mild temperatures, occasional rain</li>
                <li><strong>Summer:</strong> Warm and dry, temperatures 25-35°C</li>
                <li><strong>Autumn:</strong> Cool and pleasant, 15-25°C</li>
                <li><strong>Winter:</strong> Cold with occasional snow, 0-15°C</li>
              </ul>
            </div>
          </section>

          {/* Weather Tips */}
          <section style={{
            background: `#f7fafc`,
            padding: `2rem`,
            borderRadius: `8px`,
            border: `1px solid #e2e8f0`,
          }}>
            <h3>Weather Tips</h3>
            <div style={{ marginTop: `1rem` }}>
              <h4>Stay Prepared</h4>
              <ul style={{ color: `#4a5568`, lineHeight: `1.6` }}>
                <li>Check weather forecast before outdoor activities</li>
                <li>Carry umbrella during rainy season</li>
                <li>Use sun protection during high UV days</li>
                <li>Dress in layers during temperature changes</li>
                <li>Stay hydrated, especially during summer</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Data Sources */}
        <section style={{
          background: `white`,
          padding: `1.5rem`,
          borderRadius: `8px`,
          border: `1px solid #e2e8f0`,
          marginTop: `2rem`,
          textAlign: `center`,
        }}>
          <p style={{ 
            margin: 0,
            color: `#666`,
            fontSize: `0.9rem`,
          }}>
            Weather data provided by local meteorological stations and updated every 5 minutes. 
            For emergency weather warnings, please monitor local news and official channels.
          </p>
        </section>
      </div>
    </Layout>
  )
}

export default WeatherPage
