import React, { useMemo, useState } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"
import {
  toJalaali,
  toGregorian,
  jalaaliMonthLength,
  isLeapJalaaliYear,
} from "jalaali-js"

import occasionsJson from "../../content/occasions.json"

const PERSIAN_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
]

// Week starts on Saturday in Iran.
const WEEKDAYS = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سهشنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
]

const toPersianDigits = (value) =>
  String(value).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])

const pad2 = (n) => String(n).padStart(2, "0")

const formatJalaliDate = ({ jy, jm, jd }) =>
  `${toPersianDigits(jy)}/${toPersianDigits(pad2(jm))}/${toPersianDigits(pad2(jd))}`

const repeatLabel = (occasion) => {
  if (!occasion) return ""
  if (occasion.repeat === "yearly") return "سالانه"
  if (occasion.repeat === "monthly") return "ماهانه"
  if (occasion.repeat === "weekly") return "هفتگی"
  if (occasion.repeat === "none") return "یکبار"
  return ""
}

const ALLOWED_OCCASION_COLORS = new Set([
  "primary",
  "blue",
  "indigo",
  "purple",
  "red",
  "green",
  "gray",
  "secondary",
])

const defaultColorForRepeat = (repeat) => {
  // Intentionally avoid defaulting to secondary (orange/yellow).
  if (repeat === "yearly") return "primary"
  if (repeat === "monthly") return "blue"
  if (repeat === "weekly") return "purple"
  if (repeat === "none") return "gray"
  return "primary"
}

const OCCASION_COLOR_STYLES = {
  primary: { dot: "bg-primary-500", ring: "ring-primary-300" },
  blue: { dot: "bg-blue-500", ring: "ring-blue-300" },
  indigo: { dot: "bg-indigo-500", ring: "ring-indigo-300" },
  purple: { dot: "bg-purple-500", ring: "ring-purple-300" },
  red: { dot: "bg-red-500", ring: "ring-red-300" },
  green: { dot: "bg-green-500", ring: "ring-green-300" },
  gray: { dot: "bg-gray-500", ring: "ring-gray-300" },
  secondary: { dot: "bg-secondary-500", ring: "ring-secondary-300" },
}

const dotClassForOccasion = (occasion, isOnToday) => {
  const key = occasion?.color || defaultColorForRepeat(occasion?.repeat)
  const style = OCCASION_COLOR_STYLES[key] || OCCASION_COLOR_STYLES.primary
  return isOnToday
    ? `bg-white ring-2 ${style.ring}`
    : `${style.dot}`
}

const jalaliKey = (jy, jm, jd) => jy * 10000 + jm * 100 + jd

const normalizeOccasions = (input) => {
  const list = input?.occasions
  if (!Array.isArray(list)) return []

  return list
    .map((o, index) => {
      const repeat = String(o.repeat || "none").toLowerCase()
      const on = o.on || {}

      const id = String(o.id || `occasion-${index}`).trim()
      const title = String(o.title || "").trim()
      const description = String(o.description || "").trim()
      const colorCandidate = String(o.color || "").trim().toLowerCase()
      const color = ALLOWED_OCCASION_COLORS.has(colorCandidate)
        ? colorCandidate
        : defaultColorForRepeat(repeat)

      const start = o.start
        ? {
            jy: Number(o.start.jy),
            jm: Number(o.start.jm),
            jd: Number(o.start.jd),
          }
        : null
      const end = o.end
        ? {
            jy: Number(o.end.jy),
            jm: Number(o.end.jm),
            jd: Number(o.end.jd),
          }
        : null

      const normalized = { id, title, description, repeat, on: {}, start, end, color }

      if (repeat === "yearly") {
        normalized.on.jm = Number(on.jm)
        normalized.on.jd = Number(on.jd)
        if (!Number.isFinite(normalized.on.jm) || !Number.isFinite(normalized.on.jd)) return null
        if (normalized.on.jm < 1 || normalized.on.jm > 12) return null
        if (normalized.on.jd < 1 || normalized.on.jd > 31) return null
      } else if (repeat === "monthly") {
        normalized.on.jd = Number(on.jd)
        if (!Number.isFinite(normalized.on.jd)) return null
        if (normalized.on.jd < 1 || normalized.on.jd > 31) return null
      } else if (repeat === "weekly") {
        // 0=Sat .. 6=Fri
        normalized.on.weekday = Number(on.weekday)
        if (!Number.isFinite(normalized.on.weekday)) return null
        if (normalized.on.weekday < 0 || normalized.on.weekday > 6) return null
      } else if (repeat === "none") {
        normalized.on.jy = Number(on.jy)
        normalized.on.jm = Number(on.jm)
        normalized.on.jd = Number(on.jd)
        if (
          !Number.isFinite(normalized.on.jy) ||
          !Number.isFinite(normalized.on.jm) ||
          !Number.isFinite(normalized.on.jd)
        ) {
          return null
        }
        if (normalized.on.jm < 1 || normalized.on.jm > 12) return null
        if (normalized.on.jd < 1 || normalized.on.jd > 31) return null
      } else {
        return null
      }

      if (start) {
        if (!Number.isFinite(start.jy) || !Number.isFinite(start.jm) || !Number.isFinite(start.jd)) return null
      }
      if (end) {
        if (!Number.isFinite(end.jy) || !Number.isFinite(end.jm) || !Number.isFinite(end.jd)) return null
      }

      return normalized
    })
    .filter(Boolean)
}

const startOfJalaliMonthWeekdayIndex = (jy, jm) => {
  const g = toGregorian(jy, jm, 1)
  const jsDate = new Date(g.gy, g.gm - 1, g.gd)

  // JS: 0=Sun..6=Sat. We want 0=Sat..6=Fri.
  const jsDay = jsDate.getDay()
  return (jsDay + 1) % 7
}

const addJalaliMonths = (jy, jm, deltaMonths) => {
  let newYear = jy
  let newMonth = jm + deltaMonths

  while (newMonth > 12) {
    newMonth -= 12
    newYear += 1
  }
  while (newMonth < 1) {
    newMonth += 12
    newYear -= 1
  }

  return { jy: newYear, jm: newMonth }
}

const weekdayIndexForJalaliDate = (jy, jm, jd) => {
  const g = toGregorian(jy, jm, jd)
  const jsDate = new Date(g.gy, g.gm - 1, g.gd)
  const jsDay = jsDate.getDay()
  return (jsDay + 1) % 7
}

const isWithinOptionalRange = (jy, jm, jd, start, end) => {
  const key = jalaliKey(jy, jm, jd)
  if (start) {
    const startKey = jalaliKey(start.jy, start.jm, start.jd)
    if (key < startKey) return false
  }
  if (end) {
    const endKey = jalaliKey(end.jy, end.jm, end.jd)
    if (key > endKey) return false
  }
  return true
}

const PersianCalendarPage = () => {
  const now = useMemo(() => new Date(), [])
  const todayJ = useMemo(
    () => toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate()),
    [now]
  )

  const [viewYear, setViewYear] = useState(todayJ.jy)
  const [viewMonth, setViewMonth] = useState(todayJ.jm)
  const [selectedDay, setSelectedDay] = useState(null)

  const occasions = useMemo(() => normalizeOccasions(occasionsJson), [])

  const occasionsByDay = useMemo(() => {
    const map = new Map()
    const daysInMonth = jalaaliMonthLength(viewYear, viewMonth)

    for (let day = 1; day <= daysInMonth; day += 1) {
      const items = []
      const weekday = weekdayIndexForJalaliDate(viewYear, viewMonth, day)

      occasions.forEach((o) => {
        if (!isWithinOptionalRange(viewYear, viewMonth, day, o.start, o.end)) return

        if (o.repeat === "none") {
          if (o.on.jy === viewYear && o.on.jm === viewMonth && o.on.jd === day) items.push(o)
          return
        }

        if (o.repeat === "yearly") {
          if (o.on.jm === viewMonth && o.on.jd === day) items.push(o)
          return
        }

        if (o.repeat === "monthly") {
          if (o.on.jd === day) items.push(o)
          return
        }

        if (o.repeat === "weekly") {
          if (o.on.weekday === weekday) items.push(o)
        }
      })

      if (items.length > 0) map.set(`${viewYear}-${viewMonth}-${day}`, items)
    }

    return map
  }, [occasions, viewYear, viewMonth])

  const monthMeta = useMemo(() => {
    const daysInMonth = jalaaliMonthLength(viewYear, viewMonth)
    const offset = startOfJalaliMonthWeekdayIndex(viewYear, viewMonth)
    const monthName = PERSIAN_MONTHS[viewMonth - 1]
    const isLeap = isLeapJalaaliYear(viewYear)

    return { daysInMonth, offset, monthName, isLeap }
  }, [viewYear, viewMonth])

  // Reset selection when switching months.
  // (Keeps UX predictable; selection is always within the visible month.)
  React.useEffect(() => {
    setSelectedDay(null)
  }, [viewYear, viewMonth])

  const cells = useMemo(() => {
    const result = []

    // Leading blanks
    for (let i = 0; i < monthMeta.offset; i += 1) result.push(null)

    // Days
    for (let day = 1; day <= monthMeta.daysInMonth; day += 1) result.push(day)

    // Trailing blanks to fill a 6x7 grid (stable layout)
    while (result.length < 42) result.push(null)

    return result
  }, [monthMeta.daysInMonth, monthMeta.offset])

  const isToday = (day) =>
    day != null &&
    viewYear === todayJ.jy &&
    viewMonth === todayJ.jm &&
    day === todayJ.jd

  const dayOccasions = (day) => {
    if (day == null) return []
    return occasionsByDay.get(`${viewYear}-${viewMonth}-${day}`) || []
  }

  const goPrev = () => {
    const next = addJalaliMonths(viewYear, viewMonth, -1)
    setViewYear(next.jy)
    setViewMonth(next.jm)
  }

  const goNext = () => {
    const next = addJalaliMonths(viewYear, viewMonth, +1)
    setViewYear(next.jy)
    setViewMonth(next.jm)
  }

  const goToday = () => {
    setViewYear(todayJ.jy)
    setViewMonth(todayJ.jm)
    setSelectedDay(todayJ.jd)
  }

  const handleSelectDay = (day) => {
    if (!day) return
    setSelectedDay((prev) => (prev === day ? null : day))
  }

  const todayGregorian = useMemo(
    () => ({
      gy: now.getFullYear(),
      gm: now.getMonth() + 1,
      gd: now.getDate(),
    }),
    [now]
  )

  const firstDayGregorian = useMemo(() => toGregorian(viewYear, viewMonth, 1), [
    viewYear,
    viewMonth,
  ])

  const structuredData = useMemo(() => {
    const occasions = []
    const daysInMonth = monthMeta.daysInMonth
    
    for (let day = 1; day <= daysInMonth; day += 1) {
      const items = dayOccasions(day)
      if (items.length === 0) continue
      
      items.forEach((o) => {
        const g = toGregorian(viewYear, viewMonth, day)
        const dateStr = `${g.gy}-${String(g.gm).padStart(2, '0')}-${String(g.gd).padStart(2, '0')}`
        
        occasions.push({
          "@type": "Event",
          "name": o.title || "مناسبت",
          "description": o.description || "",
          "startDate": dateStr,
          "endDate": dateStr,
          "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
          "eventStatus": "https://schema.org/EventScheduled",
          "location": {
            "@type": "Place",
            "name": "روستای دنگپیا",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "دابودشت",
              "addressRegion": "مازندران",
              "addressCountry": "IR"
            }
          }
        })
      })
    }

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://dangepia.ir/persian-calendar",
          "url": "https://dangepia.ir/persian-calendar",
          "name": "تقویم شمسی روستای دنگپیا",
          "description": "تقویم شمسی هجری با نمایش مناسبت‌ها، رویدادها و یادآورهای مهم روستای دنگپیا",
          "inLanguage": "fa-IR",
          "isPartOf": {
            "@type": "WebSite",
            "@id": "https://dangepia.ir",
            "url": "https://dangepia.ir",
            "name": "روستای دنگپیا"
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "خانه",
                "item": "https://dangepia.ir"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "خدمات",
                "item": "https://dangepia.ir/services"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "تقویم",
                "item": "https://dangepia.ir/persian-calendar"
              }
            ]
          },
          "potentialAction": {
            "@type": "ViewAction",
            "target": "https://dangepia.ir/persian-calendar"
          }
        },
        ...occasions
      ]
    }
  }, [viewYear, viewMonth, monthMeta.daysInMonth, dayOccasions])

  const pageTitle = `تقویم ${monthMeta.monthName} ${viewYear}`
  const pageDescription = `مشاهده تقویم شمسی ${monthMeta.monthName} سال ${viewYear} همراه با مناسبت‌ها و رویدادهای روستای دنگپیا`

  return (
    <Layout
      title={pageTitle}
      description={pageDescription}
      url="https://dangepia.ir/persian-calendar"
    >
      <Helmet>
        {/* Enhanced SEO Meta Tags */}
        <meta name="keywords" content="تقویم شمسی, تقویم فارسی, تقویم هجری, مناسبت‌ها, رویدادها, دنگپیا, تقویم روستا" />
        <meta name="author" content="روستای دنگپیا" />
        <link rel="canonical" href="https://dangepia.ir/persian-calendar" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="روستای دنگپیا" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="revisit-after" content="7 days" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <HeroSection
        title="تقویم شمسی روستا"
        subtitle="مشاهده مناسبت‌ها، رویدادها و یادآورهای مهم به تفکیک روز"
        showButtons={false}
        showScrollIndicator={true}
      />

      <article className="py-16 bg-white" itemScope itemType="https://schema.org/WebPageElement">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 card" itemScope itemType="https://schema.org/Table">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" itemProp="name">
                    {monthMeta.monthName} {toPersianDigits(viewYear)}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    معادل میلادی: {toPersianDigits(firstDayGregorian.gy)}/
                    {toPersianDigits(firstDayGregorian.gm)}/
                    {toPersianDigits(firstDayGregorian.gd)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="btn-outline border-gray-200 text-gray-700 hover:bg-gray-50"
                    onClick={goPrev}
                    aria-label="ماه قبل"
                  >
                    ماه قبل
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={goToday}
                    aria-label="رفتن به امروز"
                  >
                    امروز
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={goNext}
                    aria-label="ماه بعد"
                  >
                    ماه بعد
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2" role="grid" aria-label="تقویم شمسی ماهانه">
                {WEEKDAYS.map((name) => (
                  <div
                    key={name}
                    role="columnheader"
                    className="text-center text-sm font-semibold text-gray-700 py-2 rounded-lg bg-gray-50"
                  >
                    {name}
                  </div>
                ))}

                {cells.map((day, idx) => {
                  const today = isToday(day)
                  const isFriday = idx % 7 === 6
                  const dayItems = dayOccasions(day)
                  const hasOccasion = dayItems.length > 0
                  const isSelected = day != null && selectedDay === day
                  const occasionTitle = hasOccasion
                    ? dayItems
                        .map((r) => r.title)
                        .filter(Boolean)
                        .join(" • ")
                    : undefined

                  const base =
                    "h-12 sm:h-14 rounded-lg flex items-center justify-center text-sm sm:text-base border transition-colors relative"

                  const className = day
                    ? today
                      ? `${base} bg-primary-500 text-white border-primary-500 font-bold`
                      : isFriday
                        ? `${base} bg-red-50 text-red-700 border-red-100`
                        : `${base} bg-white text-gray-900 border-gray-100 hover:bg-gray-50`
                    : `${base} bg-gray-50 text-transparent border-gray-50`

                  const selectedRing = isSelected
                    ? today
                      ? "ring-2 ring-white/80"
                      : "ring-2 ring-primary-300"
                    : ""

                  return day ? (
                    <button
                      key={`${idx}-${day}`}
                      type="button"
                      className={`${className} ${selectedRing} focus:outline-none focus:ring-2 focus:ring-primary-400`}
                      title={occasionTitle}
                      aria-pressed={isSelected}
                      aria-label={
                        hasOccasion
                          ? `روز ${toPersianDigits(day)}، ${dayItems.length} مناسبت`
                          : `روز ${toPersianDigits(day)}`
                      }
                      onClick={() => handleSelectDay(day)}
                    >
                      {toPersianDigits(day)}
                      {hasOccasion && (
                        <div className="absolute bottom-1 left-1 right-1 flex items-center gap-1 flex-wrap justify-center">
                          {dayItems.map((o, dotIndex) => (
                            <span
                              key={`${o.id}-${dotIndex}`}
                              className={`w-2 h-2 rounded-full ${dotClassForOccasion(o, today)} ${
                                today ? "ring-offset-0" : ""
                              }`}
                              title={o.title || undefined}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  ) : (
                    <div key={`${idx}-x`} className={className} aria-hidden="true">
                      -
                    </div>
                  )
                })}
              </div>

              <section className="mt-8 pt-6 border-t border-gray-100" itemScope itemType="https://schema.org/ItemList">
                <h2 className="text-xl font-bold text-gray-900 mb-4" itemProp="name">مناسبت‌ها و رویدادها</h2>
                {(() => {
                  if (selectedDay != null) {
                    const items = dayOccasions(selectedDay)
                    return (
                      <div className="rounded-lg border border-gray-100 bg-white">
                        <div className="p-3 sm:p-4 flex items-center justify-between gap-3 border-b border-gray-100">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {toPersianDigits(selectedDay)} {monthMeta.monthName}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatJalaliDate({ jy: viewYear, jm: viewMonth, jd: selectedDay })}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">
                              {toPersianDigits(items.length)} مورد
                            </span>
                            <button
                              type="button"
                              className="btn-outline border-gray-200 text-gray-700 hover:bg-gray-50"
                              onClick={() => setSelectedDay(null)}
                              aria-label="لغو انتخاب روز"
                            >
                              نمایش همه
                            </button>
                          </div>
                        </div>

                        {items.length === 0 ? (
                          <div className="p-4">
                            <p className="text-gray-600">در این روز هیچ مناسبت یا رویدادی ثبت نشده است.</p>
                          </div>
                        ) : (
                          <div className="p-3 sm:p-4 space-y-2">
                            {items.map((o, i) => (
                              <div
                                key={`${o.id}-${i}`}
                                className="flex items-start gap-3 bg-gray-50 rounded-md px-3 py-2"
                              >
                                <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${dotClassForOccasion(o, false)}`} />
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-start justify-between gap-2">
                                    <p className="font-medium text-gray-900 truncate">
                                      {o.title || "(بدون عنوان)"}
                                    </p>
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                      {repeatLabel(o) && (
                                        <span className="text-[11px] bg-white border border-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                                          {repeatLabel(o)}
                                        </span>
                                      )}
                                      {o.start && (
                                        <span
                                          className="text-[11px] bg-white border border-gray-200 text-gray-700 px-2 py-0.5 rounded-full"
                                          title={`شروع از ${formatJalaliDate(o.start)}`}
                                        >
                                          از {formatJalaliDate(o.start)}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  {o.description && (
                                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                      {o.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  }

                  const daysInMonth = monthMeta.daysInMonth
                  const entries = []
                  for (let day = 1; day <= daysInMonth; day += 1) {
                    const items = dayOccasions(day)
                    if (items.length === 0) continue
                    entries.push({ day, items })
                  }

                  if (entries.length === 0) {
                    return (
                      <p className="text-gray-600">
                        در این ماه هیچ مناسبت یا رویدادی ثبت نشده است.
                      </p>
                    )
                  }

                  return (
                    <div className="rounded-lg border border-gray-100 bg-white">
                      <div className="max-h-96 overflow-auto divide-y divide-gray-100">
                        {entries.map(({ day, items }) => (
                          <div key={`${viewYear}-${viewMonth}-${day}`} className="p-3 sm:p-4">
                            <div className="flex items-center justify-between gap-3">
                              <p className="font-semibold text-gray-900">
                                {toPersianDigits(day)} {monthMeta.monthName}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">
                                  {formatJalaliDate({ jy: viewYear, jm: viewMonth, jd: day })}
                                </span>
                                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">
                                  {toPersianDigits(items.length)} مورد
                                </span>
                              </div>
                            </div>

                            <ul className="mt-2 space-y-2">
                              {items.map((o) => (
                                <li
                                  key={`${o.id}-${viewYear}-${viewMonth}-${day}`}
                                  className="flex items-start gap-3 bg-gray-50 rounded-md px-3 py-2"
                                >
                                  <span
                                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${dotClassForOccasion(o, false)}`}
                                  />
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                      <p className="font-medium text-gray-900 truncate">
                                        {o.title || "(بدون عنوان)"}
                                      </p>
                                      <div className="flex items-center gap-1 flex-shrink-0">
                                        {repeatLabel(o) && (
                                          <span className="text-[11px] bg-white border border-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                                            {repeatLabel(o)}
                                          </span>
                                        )}
                                        {o.start && (
                                          <span
                                            className="text-[11px] bg-white border border-gray-200 text-gray-700 px-2 py-0.5 rounded-full"
                                            title={`شروع از ${formatJalaliDate(o.start)}`}
                                          >
                                            از {formatJalaliDate(o.start)}
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    {o.description && (
                                      <p className="text-xs text-gray-600 mt-1 truncate">{o.description}</p>
                                    )}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })()}
              </section>
            </div>

            <aside className="space-y-6" role="complementary" aria-label="اطلاعات تکمیلی تقویم">
              <section className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">تاریخ امروز</h2>
                <div className="bg-gray-50 rounded-lg p-4 border-r-4 border-primary-500">
                  <p className="text-gray-800 font-semibold mb-2">شمسی (هجری)</p>
                  <p className="text-gray-700">
                    {toPersianDigits(todayJ.jy)}/{toPersianDigits(todayJ.jm)}/
                    {toPersianDigits(todayJ.jd)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border-r-4 border-secondary-500 mt-4">
                  <p className="text-gray-800 font-semibold mb-2">میلادی (مسیحی)</p>
                  <p className="text-gray-700">
                    {toPersianDigits(todayGregorian.gy)}/
                    {toPersianDigits(todayGregorian.gm)}/
                    {toPersianDigits(todayGregorian.gd)}
                  </p>
                </div>
              </section>

              <section className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">راهنمای تقویم</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="w-4 h-4 rounded bg-primary-500 ml-3"></span>
                    <span className="text-gray-700">امروز</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 h-4 rounded bg-red-50 border border-red-100 ml-3"></span>
                    <span className="text-gray-700">جمعه</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 h-4 rounded bg-white border border-gray-100 ml-3"></span>
                    <span className="text-gray-700">روزهای دیگر</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                  برای مشاهده مناسبت‌های یک روز خاص، روی آن روز کلیک کنید.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  سال جاری {monthMeta.isLeap ? "کبیسه است (۳۶۶ روز)" : "عادی است (۳۶۵ روز)"}.
                </p>
              </section>
            </aside>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default PersianCalendarPage
