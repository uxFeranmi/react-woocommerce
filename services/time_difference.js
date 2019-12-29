/** Calculate difference between a past time and the current time.
 * Returns time in user friendly format e.g "2 hours", "3 years" etc.
 * @param {Date} time The past time as a JS Date object, or as Unix Time (seconds since unix epoch).
 * @param {boolean} isUnixTime Opional. If 'time' is in Unix Time, this should be set to true.
 */
const getTimeDiff = (time, isUnixTime = false)=> {
  let currentTime = Date.now() / 1000; // Get the current Unix Time (in seconds, Date.now returns millis).
  if (!isUnixTime)
    time = time.getTime() / 1000; //Change time to Unix Time.
    
  let rawAge =  currentTime - time; // Get the time difference between current time and upload time.
  let s = 's'; // Used to pluralize the time difference string if necessary.

  // Declare boundaries for all time units in seconds.
  const aMinute = 60, // 60 seconds.
    anHour = aMinute * 60,
    aDay = anHour * 24,
    aWeek = aDay * 7,
    aMonth = aWeek * 4,
    aYear = aMonth * 12;
  //

  // Make sure to evaluate the longest time differences first.
  if (rawAge >= aYear) { // Up to 1 hour
    let age = Math.round(rawAge/aYear);
    if (age === 1) s = '';
    return `${age} year${s}`;
  }

  if (rawAge >= aMonth) { // Up to 1 hour
    let age = Math.round(rawAge/aMonth);
    if (age === 1) s = '';
    return `${age} month${s}`;
  }

  if (rawAge >= aWeek) { // Up to 1 hour
    let age = Math.round(rawAge/aWeek);
    if (age === 1) s = '';
    return `${age} weeks${s}`;
  }

  if (rawAge >= aDay) { // Up to 1 hour
    let age = Math.round(rawAge/aDay);
    if (age === 1) s = '';
    return `${age} day${s}`;
  }

  if (rawAge >= anHour) { // Up to 1 hour
    let age = Math.round(rawAge/anHour);
    if (age === 1) s = '';
    return `${age} hour${s}`;
  }

  if (rawAge >= aMinute) {
    let age = Math.round(rawAge/aMinute);
    if (age === 1) s = '';
    return `${age} minute${s}`;
  }

  if (rawAge < aMinute) {
    let age = rawAge;
    if (age === 1) s = '';
    return `${age} second${s}`;
  }
}

export default getTimeDiff;
