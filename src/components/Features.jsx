function Features() {
  const features = [
    {
      icon: '🌿',
      title: 'Fresh Ingredients',
      text: 'Carefully selected quality spices.',
    },
    {
      icon: '❤️',
      title: 'Made With Love',
      text: 'Traditional recipes with a modern touch.',
    },
    {
      icon: '✨',
      title: 'Authentic Flavour',
      text: 'A taste that feels just like home.',
    },
  ]

  return (
    <section className="features">
      {features.map((feature) => (
        <div key={feature.title}>
          <span>{feature.icon}</span>
          <h3>{feature.title}</h3>
          <p>{feature.text}</p>
        </div>
      ))}
    </section>
  )
}

export default Features
