import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import Footer from './Footer.jsx'
import DemoScenarioSwitcher from './DemoScenarioSwitcher.jsx'
import useHideChromeOnScroll from '../../hooks/useHideChromeOnScroll.js'

export default function AppLayout() {
  useHideChromeOnScroll()
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header />
      <div className="layout">
        <Sidebar />
        <main className="main" id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
      <Footer />
      <DemoScenarioSwitcher />
    </>
  )
}
