const wellnessTips = [
  {
    text: 'As you plan today, make space for variety: whole grains, vegetables, fruit, pulses, and protein-rich foods can all play a part in a healthy diet.',
    sourceLabel: 'WHO Healthy diet',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet',
  },
  {
    text: 'A healthy diet can look different from person to person. Choose foods that work with your culture, preferences, and what is available to you.',
    sourceLabel: 'WHO and FAO healthy-diet principles',
    sourceUrl: 'https://www.who.int/publications/i/item/9789240101876',
  },
  {
    text: 'Keep safe drinking water easy to reach as you plan your day—safe and readily available water is important for public health.',
    sourceLabel: 'WHO Drinking-water',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/drinking-water/',
  },
]

export function getDailyWellnessTip(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 0)
  const daysSinceStart = Math.floor((date - startOfYear) / 86_400_000)
  return wellnessTips[daysSinceStart % wellnessTips.length]
}

export { wellnessTips }
