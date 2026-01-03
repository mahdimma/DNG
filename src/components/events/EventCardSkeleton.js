import React from "react"

const EventCardSkeleton = () => {
  return (
    <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-56 bg-gray-200"></div>
      
      <div className="relative z-10 p-8">
        {/* Category & Date Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          <div className="h-5 w-24 bg-gray-200 rounded"></div>
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>

        {/* Excerpt Skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>

        {/* Details Grid Skeleton */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="h-5 bg-gray-200 rounded"></div>
          <div className="h-5 bg-gray-200 rounded"></div>
        </div>

        {/* Button Skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-12 bg-gray-200 rounded-xl w-2/3"></div>
          <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export default EventCardSkeleton
