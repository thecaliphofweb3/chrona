import { useEffect, useRef } from 'react'
import CompletionPanel from './CompletionPanel.jsx'
import MannequinPreview from './MannequinPreview.jsx'

const clothingCategories = [
  { key: 'headwear', label: 'Headwear', detail: 'Hat, scarf, or other head piece' },
  { key: 'eyewear', label: 'Eyewear', detail: 'Glasses or sunglasses' },
  { key: 'top', label: 'Top', detail: 'Shirt, blouse, or jacket' },
  { key: 'bottom', label: 'Bottom', detail: 'Trousers, skirt, or gown' },
  { key: 'footwear', label: 'Footwear', detail: 'Shoes or sandals' },
]

const bodyShapes = [
  { value: 'standard', label: 'Standard' },
  { value: 'slim', label: 'Slim' },
  { value: 'plus-size', label: 'Plus-size' },
]

function OutfitPlanner({
  bodyShape,
  meals,
  onBack,
  onBodyShapeChange,
  onOutfitImagesChange,
  outfitImages,
  schedule,
  storageMessage,
}) {
  const imageUrls = useRef(new Set())
  const outfitCount = Object.values(outfitImages).filter(Boolean).length
  const mealCount = Object.values(meals).filter((meal) => meal.text.trim()).length
  const showCompletion = Boolean(schedule.length && mealCount && outfitCount)

  useEffect(
    () => () => {
      imageUrls.current.forEach((url) => URL.revokeObjectURL(url))
    },
    [],
  )

  const chooseImage = (category, file) => {
    if (!file?.type.startsWith('image/')) return

    const oldUrl = outfitImages[category]
    if (oldUrl?.startsWith('blob:')) URL.revokeObjectURL(oldUrl)

    const nextUrl = URL.createObjectURL(file)
    imageUrls.current.add(nextUrl)
    onOutfitImagesChange({ ...outfitImages, [category]: nextUrl })
  }

  return (
    <section className="planner-screen outfit-screen" aria-labelledby="outfit-heading">
      <header className="planner-header">
        <button className="text-button" type="button" onClick={onBack}>
          ← Your plan
        </button>
        <p className="brand-mark">CHRONA</p>
      </header>

      <div className="outfit-layout">
        <div className="planner-intro">
          <p className="eyebrow">Dress for the day ahead</p>
          <h1 id="outfit-heading">Build a look that feels like you.</h1>
          <p>Add pieces from your wardrobe and see them together on a simple mannequin. Your images stay only in this open page.</p>
        </div>

        <div className="outfit-workspace">
          <section aria-label="Mannequin shape" className="shape-selector">
            <p className="eyebrow">Choose a mannequin shape</p>
            <div>
              {bodyShapes.map((shape) => (
                <button
                  aria-pressed={bodyShape === shape.value}
                  className={bodyShape === shape.value ? 'shape-button selected' : 'shape-button'}
                  key={shape.value}
                  onClick={() => onBodyShapeChange(shape.value)}
                  type="button"
                >
                  {shape.label}
                </button>
              ))}
            </div>
          </section>

          <MannequinPreview bodyShape={bodyShape} outfitImages={outfitImages} />

          <section aria-labelledby="wardrobe-heading" className="wardrobe-section">
            <div className="section-heading">
              <p className="eyebrow">Your wardrobe</p>
              <h2 id="wardrobe-heading">Add the pieces you have</h2>
            </div>
            <div className="wardrobe-grid">
              {clothingCategories.map((category) => (
                <label className={outfitImages[category.key] ? 'wardrobe-card has-image' : 'wardrobe-card'} key={category.key}>
                  <input
                    accept="image/*"
                    aria-label={`Add ${category.label}`}
                    onChange={(event) => chooseImage(category.key, event.target.files?.[0])}
                    type="file"
                  />
                  {outfitImages[category.key] ? (
                    <img alt={`${category.label} selected`} src={outfitImages[category.key]} />
                  ) : (
                    <span className="upload-symbol" aria-hidden="true">+</span>
                  )}
                  <span>
                    <strong>{category.label}</strong>
                    <small>{outfitImages[category.key] ? 'Change image' : category.detail}</small>
                  </span>
                </label>
              ))}
            </div>
          </section>

          {storageMessage && <p className="storage-warning">{storageMessage}</p>}
          {showCompletion && <CompletionPanel onReviewPlan={onBack} />}
        </div>
      </div>
    </section>
  )
}

export default OutfitPlanner
