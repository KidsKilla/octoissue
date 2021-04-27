import { AppProvider } from './AppProvider'
import { Navigation } from './Navigation'
import { AppHeader } from './AppHeader'

function App() {
  return (
    <AppProvider>
      <AppHeader />
      <Navigation />
    </AppProvider>
  )
}

export { App }
