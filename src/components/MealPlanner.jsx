import WellnessTip from './WellnessTip.jsx'

const mealDetails = [
  { key: 'breakfast', label: 'Breakfast', prompt: 'What will help you start well?' },
  { key: 'lunch', label: 'Lunch', prompt: 'What will keep you going?' },
  { key: 'dinner', label: 'Dinner', prompt: 'How will you wind down?' },
]

function MealPlanner({ meals, onBack, onMealsChange, storageMessage }) {
  const updateMeal = (mealKey, field, value) => {
    onMealsChange({
      ...meals,
      [mealKey]: {
        ...meals[mealKey],
        [field]: value,
      },
    })
  }

  return (
    <section className="planner-screen meal-screen" aria-labelledby="meals-heading">
      <header className="planner-header">
        <button className="text-button" type="button" onClick={onBack}>
          ← Your plan
        </button>
        <p className="brand-mark">CHRONA</p>
      </header>

      <div className="meal-layout">
        <div className="planner-intro">
          <p className="eyebrow">Nourish your day</p>
          <h1 id="meals-heading">Plan the meals that will carry you through.</h1>
          <p>Add what sounds right for you today. Calories are optional and are never used as medical or dietary advice.</p>
        </div>

        <div className="meal-workspace">
          <WellnessTip />

          <section aria-label="Daily meal plan" className="meal-cards">
            {mealDetails.map((meal) => (
              <article className="meal-card" key={meal.key}>
                <div>
                  <p className="eyebrow">{meal.label}</p>
                  <p>{meal.prompt}</p>
                </div>
                <label>
                  Your plan
                  <input
                    onChange={(event) => updateMeal(meal.key, 'text', event.target.value)}
                    placeholder={`Plan ${meal.label.toLowerCase()}`}
                    value={meals[meal.key].text}
                  />
                </label>
                <label className="calorie-label">
                  Calories <span>(optional)</span>
                  <input
                    inputMode="numeric"
                    min="0"
                    onChange={(event) => updateMeal(meal.key, 'calories', event.target.value)}
                    placeholder="e.g. 450"
                    type="number"
                    value={meals[meal.key].calories}
                  />
                </label>
              </article>
            ))}
          </section>

          {storageMessage && <p className="storage-warning">{storageMessage}</p>}
          <p className="meal-note">Your plans are saved only in this browser. This is general meal planning—not medical advice.</p>
        </div>
      </div>
    </section>
  )
}

export default MealPlanner
