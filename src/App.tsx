import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Header } from './components/layout'
import { Hero, About, Portfolio, Contact } from './components/sections'
import { ScrollProgressIndicator } from './components/ui'

function App() {

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <ScrollProgressIndicator />
      <Header />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Analytics />
      <SpeedInsights />
    </div>
  )
}

export default App