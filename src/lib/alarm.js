let audioContext

export function playAlarmTone() {
  try {
    audioContext ??= new AudioContext()
    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()

    oscillator.frequency.setValueAtTime(660, audioContext.currentTime)
    gain.gain.setValueAtTime(0.08, audioContext.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.1)
    oscillator.connect(gain)
    gain.connect(audioContext.destination)
    oscillator.start()
    oscillator.stop(audioContext.currentTime + 1.1)
  } catch {
    // The visible alert remains available if a browser blocks audio playback.
  }
}

export async function requestNotificationPermission() {
  if (!('Notification' in window)) return 'unsupported'
  return Notification.requestPermission()
}

export function sendNotification(plan) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return

  new Notification('Chrona', {
    body: `It’s time for: ${plan.description}`,
  })
}
