import { useEffect, useMemo, useRef, useState } from 'react'
import AlarmPanel from './components/AlarmPanel.jsx'
import MealPlanner from './components/MealPlanner.jsx'
import OutfitPlanner from './components/OutfitPlanner.jsx'
import PlanningHub from './components/PlanningHub.jsx'
import SchedulePlanner from './components/SchedulePlanner.jsx'
import WelcomeScreen from './components/WelcomeScreen.jsx'
import { quotes } from './data/quotes.js'
import { playAlarmTone, requestNotificationPermission, sendNotification } from './lib/alarm.js'
import { loadDayPlan, saveDayPlan } from './lib/storage.js'

function currentTime() {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date())
}

function App() {
  const [screen, setScreen] = useState('welcome')
  const [dayPlan, setDayPlan] = useState(loadDayPlan)
  const [storageMessage, setStorageMessage] = useState('')
  const [alert, setAlert] = useState(null)
  const [outfitImages, setOutfitImages] = useState({
    headwear: null,
    eyewear: null,
    top: null,
    bottom: null,
    footwear: null,
  })
  const [notificationStatus, setNotificationStatus] = useState(() => {
    if (!('Notification' in window)) return 'unsupported'
    return Notification.permission
  })
  const alertedPlanTimes = useRef(new Set())
  const quote = useMemo(() => {
    const dayIndex = new Date().getDate() % quotes.length
    return quotes[dayIndex]
  }, [])

  useEffect(() => {
    const saved = saveDayPlan(dayPlan)
    setStorageMessage(saved ? '' : 'Your plan is visible, but this browser could not save it for later.')
  }, [dayPlan])

  useEffect(() => {
    const checkForDuePlans = () => {
      const now = currentTime()
      const today = new Date().toDateString()
      const duePlan = dayPlan.schedule.find((plan) => {
        const alertKey = `${today}-${plan.id}-${plan.time}`
        return plan.time === now && !alertedPlanTimes.current.has(alertKey)
      })

      if (!duePlan) return

      const alertKey = `${today}-${duePlan.id}-${duePlan.time}`
      alertedPlanTimes.current.add(alertKey)
      setAlert(duePlan)
      playAlarmTone()
      sendNotification(duePlan)
    }

    checkForDuePlans()
    const alarmTimer = window.setInterval(checkForDuePlans, 10_000)
    return () => window.clearInterval(alarmTimer)
  }, [dayPlan.schedule])

  const updateSchedule = (schedule) => {
    setDayPlan((current) => ({ ...current, schedule }))
  }

  const updateMeals = (meals) => {
    setDayPlan((current) => ({ ...current, meals }))
  }

  const updateBodyShape = (bodyShape) => {
    setDayPlan((current) => ({ ...current, bodyShape }))
  }

  const enableNotifications = async () => {
    const status = await requestNotificationPermission()
    setNotificationStatus(status)
  }

  return (
    <main className="app-shell">
      {screen === 'welcome' && (
        <WelcomeScreen quote={quote} onBegin={() => setScreen('planning')} />
      )}
      {screen === 'planning' && (
        <PlanningHub
          onReturnHome={() => setScreen('welcome')}
          onChooseArea={(area) => setScreen(area)}
          mealCount={Object.values(dayPlan.meals).filter((meal) => meal.text.trim()).length}
          outfitCount={Object.values(outfitImages).filter(Boolean).length}
          scheduleCount={dayPlan.schedule.length}
        />
      )}
      {screen === 'schedule' && (
        <SchedulePlanner
          notificationStatus={notificationStatus}
          onBack={() => setScreen('planning')}
          onEnableNotifications={enableNotifications}
          onScheduleChange={updateSchedule}
          schedule={dayPlan.schedule}
          storageMessage={storageMessage}
        />
      )}
      {screen === 'meals' && (
        <MealPlanner
          meals={dayPlan.meals}
          onBack={() => setScreen('planning')}
          onMealsChange={updateMeals}
          storageMessage={storageMessage}
        />
      )}
      {screen === 'outfit' && (
        <OutfitPlanner
          bodyShape={dayPlan.bodyShape}
          meals={dayPlan.meals}
          onBack={() => setScreen('planning')}
          onBodyShapeChange={updateBodyShape}
          onOutfitImagesChange={setOutfitImages}
          outfitImages={outfitImages}
          schedule={dayPlan.schedule}
          storageMessage={storageMessage}
        />
      )}
      {alert && <AlarmPanel plan={alert} onDismiss={() => setAlert(null)} />}
    </main>
  )
}

export default App
