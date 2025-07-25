/**
 * Formats seconds into minutes:seconds format
 * 
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string (e.g., "2:45")
 */
export const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Determine if the media is a video based on type or URL
 * 
 * @param {object} media - Media object 
 * @returns {boolean} True if media is a video
 */
export const isMediaVideo = (media) => {
  if (!media) return false;
  
  return media.type === 'video' || 
    (media.url && (
      media.url.includes('.mp4') || 
      media.url.includes('.webm') || 
      media.url.includes('.mov') || 
      media.url.includes('.avi') ||
      media.url.includes('.ogv')
    ));
};
