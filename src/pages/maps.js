import { graphql } from 'gatsby';
import React, { useState, useEffect, Suspense } from "react"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"
import FilterButtons from '../components/maps/FilterButtons';
import LocationsList from '../components/maps/LocationsList';
import MapContainer from '../components/maps/MapContainer';
import Directions from '../components/maps/Directions';
import EmergencyInfo from '../components/maps/EmergencyInfo';

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
        <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">نقشه و موقعیت‌های روستا</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              روستای دانگپیا را با نقشه‌های تعاملی و راهنمای موقعیت مکانی ما کاوش کنید.
              ساختمان‌های مهم، خدمات و نقاط مورد علاقه را پیدا کنید.
            </p>
        </div>
        
        <FilterButtons 
          locationTypes={locationTypes}
          filter={filter}
          setFilter={setFilter}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 order-1 lg:order-2">
            <MapContainer 
              locations={filteredLocations}
              locationTypes={locationTypes}
              selectedLocation={selectedLocation}
              onMarkerClick={setSelectedLocation}
              isClient={isClient}
            />
          </div>

          <div className="lg:col-span-1 order-2 lg:order-1">
            <LocationsList 
              locations={filteredLocations}
              locationTypes={locationTypes}
              selectedLocation={selectedLocation}
              onSelectLocation={setSelectedLocation}
            />
          </div>
        </div>

        <Directions />

        <EmergencyInfo />
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
