const imagePositions = {
  headwear: 'preview-headwear',
  eyewear: 'preview-eyewear',
  top: 'preview-top',
  bottom: 'preview-bottom',
  footwear: 'preview-footwear',
}

function MannequinPreview({ bodyShape, outfitImages }) {
  return (
    <div className={`mannequin-preview mannequin-${bodyShape}`}>
      <div className="mannequin-halo" />
      <div className="mannequin-figure" aria-label={`${bodyShape} mannequin outfit preview`} role="img">
        <div className="mannequin-head" />
        <div className="mannequin-neck" />
        <div className="mannequin-body" />
        <div className="mannequin-leg mannequin-leg-left" />
        <div className="mannequin-leg mannequin-leg-right" />
        <div className="mannequin-foot mannequin-foot-left" />
        <div className="mannequin-foot mannequin-foot-right" />
        {Object.entries(outfitImages).map(([category, image]) =>
          image ? (
            <img alt={`${category} preview`} className={`outfit-image ${imagePositions[category]}`} key={category} src={image} />
          ) : null,
        )}
      </div>
      <p>Visual outfit preview only—not a clothing-fit prediction.</p>
    </div>
  )
}

export default MannequinPreview
