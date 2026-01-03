/**
 * Generate and download an .ics (iCalendar) file for an event
 * @param {Object} event - The event data
 */
export const exportToICS = (event) => {
  const { title, eventDate, eventTime, location, organizer } = event.frontmatter
  
  // Parse dates
  const startDate = new Date(eventDate)
  
  // Handle time if provided
  let startDateTime = startDate
  let endDateTime = new Date(startDate)
  endDateTime.setHours(startDate.getHours() + 2) // Default 2 hour duration
  
  if (eventTime) {
    const times = eventTime.split(' - ')
    if (times[0]) {
      const [hours, minutes] = times[0].split(':')
      startDateTime = new Date(startDate)
      startDateTime.setHours(parseInt(hours) || 0, parseInt(minutes) || 0, 0, 0)
    }
    if (times[1]) {
      const [hours, minutes] = times[1].split(':')
      endDateTime = new Date(startDate)
      endDateTime.setHours(parseInt(hours) || 0, parseInt(minutes) || 0, 0, 0)
    }
  }
  
  // Format dates to iCalendar format (YYYYMMDDTHHMMSS)
  const formatICSDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${year}${month}${day}T${hours}${minutes}${seconds}`
  }
  
  const now = new Date()
  const dtstamp = formatICSDate(now)
  const dtstart = formatICSDate(startDateTime)
  const dtend = formatICSDate(endDateTime)
  
  // Generate UID
  const uid = `${dtstart}-${title.replace(/\s+/g, '-')}@dangepia.ir`
  
  // Build ICS content
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dangepia//Events//FA',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${title}`,
    location ? `LOCATION:${location}` : '',
    event.excerpt ? `DESCRIPTION:${event.excerpt.replace(/\n/g, '\\n')}` : '',
    organizer ? `ORGANIZER;CN=${organizer}:mailto:info@dangepia.ir` : '',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${title}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(line => line).join('\r\n')
  
  // Create blob and download
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${title.replace(/\s+/g, '-')}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}

/**
 * Add event to Google Calendar
 * @param {Object} event - The event data
 * @returns {string} - Google Calendar URL
 */
export const addToGoogleCalendar = (event) => {
  const { title, eventDate, eventTime, location } = event.frontmatter
  
  const startDate = new Date(eventDate)
  let dates = startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  
  if (eventTime) {
    const times = eventTime.split(' - ')
    if (times[0]) {
      const [hours, minutes] = times[0].split(':')
      startDate.setHours(parseInt(hours) || 0, parseInt(minutes) || 0, 0, 0)
    }
    dates = startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    
    if (times[1]) {
      const endDate = new Date(eventDate)
      const [hours, minutes] = times[1].split(':')
      endDate.setHours(parseInt(hours) || 0, parseInt(minutes) || 0, 0, 0)
      dates += '/' + endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }
  }
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: dates,
    details: event.excerpt || '',
    location: location || 'روستای دنگپیا'
  })
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

/**
 * Share event URL
 * @param {Object} event - The event data
 * @param {string} url - Current page URL
 */
export const shareEvent = async (event, url) => {
  const { title, eventDate } = event.frontmatter
  const shareData = {
    title: title,
    text: `به رویداد ${title} در تاریخ ${new Date(eventDate).toLocaleDateString('fa-IR')} بپیوندید`,
    url: url
  }
  
  if (navigator.share) {
    try {
      await navigator.share(shareData)
      return { success: true }
    } catch (error) {
      // User cancelled or error occurred
      return { success: false, error: error.message }
    }
  } else {
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(url)
      return { success: true, fallback: 'clipboard' }
    } catch (error) {
      return { success: false, error: 'Unable to share or copy' }
    }
  }
}
