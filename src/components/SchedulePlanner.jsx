import { useState } from 'react'

function createPlanId() {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function SchedulePlanner({
  notificationStatus,
  onBack,
  onEnableNotifications,
  onScheduleChange,
  schedule,
  storageMessage,
}) {
  const [description, setDescription] = useState('')
  const [time, setTime] = useState('')

  const addPlan = (event) => {
    event?.preventDefault()
    const trimmedDescription = description.trim()
    if (!trimmedDescription || !time) return

    onScheduleChange([
      ...schedule,
      {
        id: createPlanId(),
        description: trimmedDescription,
        time,
      },
    ])
    setDescription('')
    setTime('')
  }

  const removePlan = (id) => {
    onScheduleChange(schedule.filter((plan) => plan.id !== id))
  }

  const orderedSchedule = [...schedule].sort((first, second) => first.time.localeCompare(second.time))
  const notificationLabel = {
    granted: 'Browser notifications are on',
    denied: 'Browser notifications are off in your browser settings',
    unsupported: 'This browser does not support notifications',
  }[notificationStatus]

  return (
    <section className="planner-screen schedule-screen" aria-labelledby="schedule-heading">
      <header className="planner-header">
        <button className="text-button" type="button" onClick={onBack}>
          ← Your plan
        </button>
        <p className="brand-mark">CHRONA</p>
      </header>

      <div className="planner-layout">
        <div className="planner-intro">
          <p className="eyebrow">Make space for what matters</p>
          <h1 id="schedule-heading">Plan your time with intention.</h1>
          <p>Add a short description and choose when it should happen. Your plans stay in this browser for next time.</p>
        </div>

        <div className="schedule-workspace">
          <form className="plan-form" onSubmit={addPlan}>
            <label>
              What is your plan?
              <input
                autoComplete="off"
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Morning workout"
                required
                value={description}
              />
            </label>
            <label>
              What time?
              <input onChange={(event) => setTime(event.target.value)} required type="time" value={time} />
            </label>
            <button className="primary-button" onClick={() => addPlan()} type="button">
              Add to my day <span aria-hidden="true">+</span>
            </button>
          </form>

          <div className="notification-bar">
            <div>
              <strong>Open-page alerts</strong>
              <p>Chrona will always show an alert while this page is open.</p>
            </div>
            {notificationStatus === 'default' ? (
              <button className="secondary-button" type="button" onClick={onEnableNotifications}>
                Enable notifications
              </button>
            ) : (
              <span className="notification-status">{notificationLabel}</span>
            )}
          </div>

          {storageMessage && <p className="storage-warning">{storageMessage}</p>}

          <section aria-labelledby="today-heading" className="schedule-list">
            <div className="section-heading">
              <p className="eyebrow">Your day</p>
              <h2 id="today-heading">Today’s plans</h2>
            </div>
            {orderedSchedule.length ? (
              <ul>
                {orderedSchedule.map((plan) => (
                  <li key={plan.id}>
                    <time dateTime={plan.time}>{plan.time}</time>
                    <span>{plan.description}</span>
                    <button aria-label={`Remove ${plan.description}`} onClick={() => removePlan(plan.id)} type="button">
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-state">Your day is open. Add your first plan when you are ready.</p>
            )}
          </section>
        </div>
      </div>
    </section>
  )
}

export default SchedulePlanner
