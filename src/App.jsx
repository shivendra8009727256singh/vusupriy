
import VasupriyCursor from './components/common/VasupriyCursor.jsx'
import ProductDetail from './pages/ProductDetail/ProductDetail'

import { Navigate, Route, Routes } from 'react-router-dom'

import RouteLoader from './components/common/RouteLoader.jsx'
import SiteLayout from './components/layout/SiteLayout.jsx'

import Home from './pages/Home/Home.jsx'
import About from './pages/About/About.jsx'
import InteriorServices from './pages/InteriorServices/InteriorServices.jsx'
import ServiceDetail from './pages/InteriorServices/ServiceDetail.jsx'
import { DropServicingLanding, DropServicingDetail } from './pages/InteriorServices/DropServicingExperience.jsx'
import SpaceMakeoverLanding from './pages/InteriorServices/SpaceMakeoverLanding.jsx'
import CustomThemeLanding from './pages/InteriorServices/CustomThemeLanding.jsx'
import InteriorProducts from './pages/InteriorProducts/InteriorProducts.jsx'
import Projects from './pages/Projects/Projects.jsx'
import Gallery from './pages/Gallery/Gallery.jsx'
import Blog from './pages/Blog/Blog.jsx'
import BlogDetail from './pages/Blog/BlogDetail.jsx'
import Contact from './pages/Contact/Contact.jsx'

function App() {
  return (
    <>
      <RouteLoader />
      <VasupriyCursor />

      <Routes>
        {/* Existing individual product detail pages */}
        <Route
          path="/products/:category/:slug"
          element={<ProductDetail />}
        />

        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />

          <Route path="about" element={<About />} />

          {/* Main Services landing page */}
          <Route
            path="interior-services"
            element={<InteriorServices />}
          />

          {/* Individual Services */}
          <Route
            path="services/space-designing-makeover"
            element={<SpaceMakeoverLanding />}
          />

          <Route
            path="services/drop-servicing-installation"
            element={<DropServicingLanding />}
          />
          <Route
            path="services/drop-servicing-installation/:serviceSlug"
            element={<DropServicingDetail />}
          />

          <Route path="services/customized-theme-products" element={<CustomThemeLanding />} />

          {/* All Products: existing complete landing page */}
          <Route
            path="interior-products"
            element={<InteriorProducts />}
          />

          {/* Dedicated product category pages */}
          <Route
            path="interior-products/:category"
            element={<InteriorProducts />}
          />

          <Route path="projects" element={<Projects />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
