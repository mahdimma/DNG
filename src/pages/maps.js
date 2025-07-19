import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"

const MapsPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null)

  // Points of Interest in the village
  const locations = [
    {
      id: 1,
      name: "Village Office",
      type: "Government",
      description: "Main administrative building",
      coordinates: { lat: 35.6892, lng: 51.3890 },
      address: "Main Street, Dangepia Village",
      hours: "Mon-Fri: 8:00 AM - 4:00 PM",
      phone: "+98-XXX-XXXX"
    },
    {
      id: 2,
      name: "Village Mosque",
      type: "Religious",
      description: "Main mosque of the village",
      coordinates: { lat: 35.6895, lng: 51.3885 },
      address: "Central Square, Dangepia Village",
      hours: "Open for prayers",
      phone: "+98-XXX-XXXX"
    },
    {
      id: 3,
      name: "Primary School",
      type: "Education",
      description: "Village primary and secondary school",
      coordinates: { lat: 35.6888, lng: 51.3895 },
      address: "School Street, Dangepia Village",
      hours: "Mon-Fri: 7:30 AM - 3:30 PM",
      phone: "+98-XXX-XXXX"
    },
    {
      id: 4,
      name: "Health Clinic",
      type: "Healthcare",
      description: "Village medical clinic",
      coordinates: { lat: 35.6890, lng: 51.3888 },
      address: "Health Street, Dangepia Village",
      hours: "Daily: 8:00 AM - 6:00 PM",
      phone: "+98-XXX-XXXX"
    },
    {
      id: 5,
      name: "Cultural Center",
      type: "Cultural",
      description: "Community center and library",
      coordinates: { lat: 35.6893, lng: 51.3892 },
      address: "Culture Street, Dangepia Village",
      hours: "Tue-Sun: 9:00 AM - 8:00 PM",
      phone: "+98-XXX-XXXX"
    },
    {
      id: 6,
      name: "Traditional Bazaar",
      type: "Commercial",
      description: "Local market and shops",
      coordinates: { lat: 35.6891, lng: 51.3887 },
      address: "Bazaar Street, Dangepia Village",
      hours: "Daily: 6:00 AM - 10:00 PM",
      phone: "+98-XXX-XXXX"
    }
  ]

  const locationTypes = [
    { type: "All", color: "#667eea" },
    { type: "Government", color: "#e53e3e" },
    { type: "Religious", color: "#38a169" },
    { type: "Education", color: "#d69e2e" },
    { type: "Healthcare", color: "#3182ce" },
    { type: "Cultural", color: "#805ad5" },
    { type: "Commercial", color: "#dd6b20" }
  ]

  const [filter, setFilter] = useState("All")

  const filteredLocations = filter === "All" 
    ? locations 
    : locations.filter(location => location.type === filter)

  return (
    <Layout title="Village Maps" description="Interactive maps and location guide for Dangepia Village">
      <div style={{ maxWidth: 1200, margin: `0 auto`, padding: `2rem 1rem` }}>
        <h1>Village Maps & Locations</h1>
        <p style={{ fontSize: `1.1rem`, marginBottom: `3rem` }}>
          Explore Dangepia Village with our interactive maps and location guide. 
          Find important buildings, services, and points of interest.
        </p>

        {/* Filter Buttons */}
        <div style={{
          display: `flex`,
          gap: `0.5rem`,
          marginBottom: `2rem`,
          flexWrap: `wrap`,
        }}>
          {locationTypes.map((type, index) => (
            <button
              key={index}
              onClick={() => setFilter(type.type)}
              style={{
                background: filter === type.type ? type.color : `white`,
                color: filter === type.type ? `white` : type.color,
                border: `2px solid ${type.color}`,
                padding: `0.5rem 1rem`,
                borderRadius: `20px`,
                cursor: `pointer`,
                fontWeight: `bold`,
                fontSize: `0.9rem`,
                transition: `all 0.2s`,
              }}
            >
              {type.type}
            </button>
          ))}
        </div>

        <div style={{
          display: `grid`,
          gridTemplateColumns: `2fr 1fr`,
          gap: `2rem`,
          '@media (max-width: 768px)': {
            gridTemplateColumns: `1fr`,
          }
        }}>
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
            }}>
              <div>
                <div style={{ fontSize: `3rem`, marginBottom: `1rem` }}>🗺️</div>
                <h3>Interactive Village Map</h3>
                <p>Map integration would be implemented here</p>
                <p style={{ fontSize: `0.9rem`, marginTop: `1rem` }}>
                  This would typically integrate with services like:
                </p>
                <ul style={{ textAlign: `left`, marginTop: `1rem` }}>
                  <li>Google Maps</li>
                  <li>OpenStreetMap</li>
                  <li>Mapbox</li>
                  <li>Local mapping services</li>
                </ul>
              </div>
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
              <h4 style={{ marginBottom: `1rem` }}>Map Legend</h4>
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
                    <span style={{ fontSize: `0.9rem` }}>{type.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Locations List */}
          <div>
            <h3>Points of Interest</h3>
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
        </div>

        {/* Directions Section */}
        <section style={{
          background: `#f7fafc`,
          padding: `2rem`,
          borderRadius: `8px`,
          marginTop: `3rem`,
        }}>
          <h3>Getting to Dangepia Village</h3>
          <div style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
            gap: `2rem`,
            marginTop: `1.5rem`,
          }}>
            <div>
              <h4>🚗 By Car</h4>
              <p>
                Take Highway [X] from [Nearest City]. Exit at [Exit Name] and follow 
                the signs to Dangepia Village. Total distance: approximately [X] km.
              </p>
            </div>
            <div>
              <h4>🚌 By Public Transportation</h4>
              <p>
                Regular bus service from [Nearest City] to Dangepia Village. 
                Buses run every [X] hours. Journey time: approximately [X] minutes.
              </p>
            </div>
            <div>
              <h4>🚶 Walking Distances</h4>
              <p>
                The village center is compact and walkable. Most locations are within 
                5-10 minutes walking distance from the central square.
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
          <h3 style={{ color: `#c53030` }}>Emergency Locations</h3>
          <div style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
            gap: `1rem`,
            marginTop: `1rem`,
          }}>
            <div>
              <strong>Police Station:</strong><br />
              Main Street, near Village Office<br />
              Emergency: 110
            </div>
            <div>
              <strong>Fire Station:</strong><br />
              Safety Street, west of center<br />
              Emergency: 125
            </div>
            <div>
              <strong>Medical Clinic:</strong><br />
              Health Street, central location<br />
              Emergency: 115
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default MapsPage
