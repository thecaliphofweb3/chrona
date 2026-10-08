const storageKey = 'chrona-day-plan'

export function createEmptyPlan() {
  return {
    schedule: [],
    meals: {
      breakfast: { text: '', calories: '' },
      lunch: { text: '', calories: '' },
      dinner: { text: '', calories: '' },
    },
    bodyShape: 'standard',
  }
}

export function loadDayPlan() {
  try {
    const savedPlan = window.localStorage.getItem(storageKey)
    if (!savedPlan) return createEmptyPlan()

    const parsedPlan = JSON.parse(savedPlan)
    return {
      ...createEmptyPlan(),
      ...parsedPlan,
      meals: { ...createEmptyPlan().meals, ...parsedPlan.meals },
      schedule: Array.isArray(parsedPlan.schedule) ? parsedPlan.schedule : [],
    }
  } catch {
    return createEmptyPlan()
  }
}

export function saveDayPlan(dayPlan) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(dayPlan))
    return true
  } catch {
    return false
  }
}
