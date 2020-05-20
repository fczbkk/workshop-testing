window.userName = 'John Doe'

// NO
export function getUserName (firstName, lastName) {
  window.userName = `${firstName} ${lastName}`
  return window.userName
}

// YES
export function getUserNamePure (firstName, lastName) {
  return `${firstName} ${lastName}`
}
// userName = getFullNamePure('Riki', 'Fridrich')

// NO
export function getNameChunks () {
  return window.userName.split(' ')
}

// YES
export function getNameChunksPure (name = userName) {
  return name.split(' ')
}

// NO
export function getTomorrowTimestamp () {
  return Date.now() + (60 * 60 * 24)
}

// YES
export function getTomorrowTimestampPure (now = Date.now()) {
  return now + (60 * 60 * 24)
}
