import { Outlet } from 'react-router-dom'

import Header from './Header.jsx'
import Footer from './Footer.jsx'

function SiteLayout() {
  return (
    <>
      <Header />

      <main className="site-page-content">
        <Outlet />
      </main>

      <Footer />
    </>
  )
}

export default SiteLayout
