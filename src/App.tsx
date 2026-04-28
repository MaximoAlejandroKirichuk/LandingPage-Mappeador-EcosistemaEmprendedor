import './App.css'
import { LandingBackground } from './components/LandingBackground'
import { HeroSection } from './components/sections/HeroSection'
import { ProblemsSection } from './components/sections/ProblemsSection'
import { ApproachSection } from './components/sections/ApproachSection'
import { StateSection } from './components/sections/StateSection'
import { FindingsSection } from './components/sections/FindingsSection'
import { AudienceSection } from './components/sections/AudienceSection'
import { ValidationSection } from './components/sections/ValidationSection'
import { ClosingSection } from './components/sections/ClosingSection'
import { useParallax } from './hooks/useParallax'
import { useRevealOnScroll } from './hooks/useRevealOnScroll'
import {
  approach,
  audienceContent,
  categories,
  closingContent,
  findings,
  heroContent,
  interestTypes,
  organizationTypes,
  problems,
  stateContent,
  validationContent,
} from './content/landingContent'

function App() {
  useRevealOnScroll()
  useParallax()

  return (
    <main>
      <LandingBackground />
      <HeroSection content={heroContent} categories={categories} />
      <ProblemsSection items={problems} />
      <ApproachSection items={approach} />
      <StateSection {...stateContent} />
      <FindingsSection items={findings} />
      <AudienceSection {...audienceContent} />
      <ValidationSection
        content={validationContent}
        organizationTypes={organizationTypes}
        interestTypes={interestTypes}
      />
      <ClosingSection {...closingContent} />
    </main>
  )
}

export default App
