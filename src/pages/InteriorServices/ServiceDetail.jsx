import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './ServicePdfContent.css'

const serviceData = {
  'space-designing-makeover': {
    title: 'Space Designing & Makeover Services',
    subtitle: 'Transform Your Space with Expert Design & Makeovers',
    description:
      'Revamp your existing spaces with expert spatial planning, aesthetic styling, and seamless makeovers.',
    items: [
      {
        title: 'Complete Room Transformation',
        description: 'Redefine your bedroom, living room, or any area from scratch without heavy structural changes.',
      },
      {
        title: 'Space Planning & Layout Optimization',
        description: 'Make every square inch count to ensure rooms feel open, airy, and functional.',
      },
      {
        title: 'Aesthetic Designs & Theme Styling',
        description: 'Curate color palettes, fabrics, and decor elements matching your preferred vibe.',
      },
      {
        title: 'Space Enhancement & Surface Upgrades',
        description: 'Wall textures, wallpapers, premium lighting, and furnishings bringing sophistication to every corner.',
      },
    ],
  },

  'drop-servicing-installation': {
    title: 'Drop Servicing & Installation',
    subtitle: 'Professional Interior Installation Solutions',
    description:
      'Explore our specialized installation and execution services for residential and commercial interiors.',
    items: [
      { title: 'Architectural & Civil Work' },
      { title: 'Professional 2D, 3D & GRFC Drawings' },
      { title: 'Mirror & Glazing Styling' },
      { title: 'Doors & Windows Installation' },
      { title: 'Centralized AC & Electrical Fitting' },
      { title: 'Natural Garden Setup' },
      { title: '3D Epoxy Flooring' },
      { title: 'Indian Artistry on Walls & Ceilings' },
      { title: 'Curtains & Blinds Installation' },
      { title: 'Nano Coating Protection' },
      { title: 'Lift Installation' },
    ],
  },

  'customized-theme-products': {
    title: 'Customize & Theme-Based Products',
    subtitle: 'Bring Your Vision to Life with Customized Products and Styling',
    description: 'Why settle for mass-produced decor when you can have a space tailored exclusively to your taste?',
    items: [
      { title: 'Epoxy flooring', description: 'Tailor-made for theme and durability.' },
      { title: 'Wall Panels & Wallpapers', description: 'Bespoke designs for your specific dimensions.' },
      { title: 'Rugs & Wall Hangings', description: 'Texture and art tailored to your room.' },
      { title: 'Complete Furnishings', description: 'Curtains, cushions, and throws matched to your theme.' },
      { title: 'Garden & Greenery', description: 'Custom indoor/outdoor greenery integration.' },
    ],
  },
}
/* Existing Vasupriy assets — Vite resolves the actual image URLs. */
const availableImages = import.meta.glob(
  '../../assets/images/**/*.{png,jpg,jpeg,webp,avif}',
  { eager: true, query: '?url', import: 'default' }
)

function findImage(filename) {
  const match = Object.entries(availableImages).find(([path]) =>
    path.endsWith('/' + filename)
  )
  return match?.[1] || null
}

const serviceImages = {
  'space-designing-makeover': {
    hero: 'space-designing-makeover.png',
    items: [
      ['space-makeover.png', 'elegant-living-room-13.jpg', 'modern-bedroom-interior-27.jpg'],
      ['space-planning.png', 'floor-plan-01.png', 'interior-3d-floor-plan.png'],
      ['contemporary-interior-52.jpg', 'cafe-wall-art-19.jpg', 'elegant-living-room-14.jpg'],
      ['premium-wall-panels-51.jpg', 'living-room-feature-wall-45.jpg', 'bedroom-wall-paneling-29.jpg'],
    ],
  },
  'drop-servicing-installation': {
    hero: 'architectural-civil.png',
    items: [
      ['architectural-civil.png', 'interior-renovation-in-progress-06.jpg'],
      ['design-visualization.png', 'floor-plan-02.png'],
      ['mirror-glazing.png', 'residential-interior-details-46.jpg'],
      ['doors-windows.png', 'interior-left.jpg'],
      ['commercial-ceiling-lighting-08.jpg', 'living-room-ceiling-lighting-44.jpg'],
      ['cafe-seating-and-plants-04.jpg', 'cafe-green-accent-wall-16.jpg'],
      ['restaurant-checkered-floor-61.jpg', 'cafe-interior-checkered-floor-01.jpg'],
      ['restaurant-wall-decor-40.jpg', 'designer-ceiling-50.jpg'],
      ['curtains-blinds.png', 'elegant-living-room-15.jpg'],
      ['premium-wall-panels-55.jpg'],
      ['interior-staircase-design-23.jpg'],
    ],
  },
  'customized-theme-products': {
    hero: 'customized-products.png',
    items: [
      ['restaurant-checkered-floor-65.jpg', 'cafe-interior-checkered-floor-09.jpg'],
      ['premium-wall-panels-51.jpg', 'cafe-wooden-wall-panels-07.jpg'],
      ['cafe-wall-art-23.jpg', 'restaurant-wall-decor-44.jpg'],
      ['custom-furniture.jpg', 'elegant-living-room-16.jpg'],
      ['cafe-seating-and-plants-12.jpg', 'cafe-green-accent-wall-19.jpg'],
    ],
  },
}

const dropPdfDetails = [
  [
    {
      "type": "paragraph",
      "text": "Complete Solutions to build and beautify your dream space! A beautiful home has a lot more to it than just a pretty decoration. The structures and fittings need to be solid, safe, and reliable. We at Vasupriy Interiovilla take up the job of making your dream space a technically sound, secure and comfortable abode. Our comprehensive Design & Fitting Work ensures that you get all technical aspects done with full responsibility and ease of mind."
    },
    {
      "type": "heading",
      "text": "Our Core Services"
    },
    {
      "type": "heading",
      "text": "1. WIRING & ELECTRICAL WORK"
    },
    {
      "type": "paragraph",
      "text": "A good electrical circuit is the lifeline of your home. We ensure proper laying of all circuits to avoid any inconvenience that may arise due to faulty electrical installation. The fittings are done in a way to meet all modern day requirements and needs while ensuring complete safety."
    },
    {
      "type": "bullet",
      "text": "Neat and safe concealed wiring installation."
    },
    {
      "type": "bullet",
      "text": "Proper installation of MCB Boards, circuits and switches."
    },
    {
      "type": "bullet",
      "text": "Well planned switch boards and points with provision for all contemporary gadgets and appliances."
    },
    {
      "type": "bullet",
      "text": "Good quality modern ceiling lights, LED strips, chandeliers etc mounted."
    },
    {
      "type": "heading",
      "text": "2. PLUMBING WORK"
    },
    {
      "type": "paragraph",
      "text": "It is always necessary to leave the kitchen and bathroom plumbing work to the professionals because only they can do justice to the exact requirements of water supply and drainage needed. We offer a complete set of plumbing solutions using all heavy duty copper or other metal pipes and fittings to provide you with the best water supply."
    },
    {
      "type": "bullet",
      "text": "Hot and cold water supply and proper drainage of kitchen and bathrooms."
    },
    {
      "type": "bullet",
      "text": "Reliable installation for geyser fittings, wash basins, commodes, and shower bath panels."
    },
    {
      "type": "bullet",
      "text": "Installation of all water pipelines with high pressure leak proof joints."
    },
    {
      "type": "heading",
      "text": "3. CEILING WORK (FALSE CEILING)"
    },
    {
      "type": "paragraph",
      "text": "The ceiling work is a crucial part of the entire home interiors since it decides the extent of lighting and structural elegance. We design and develop false ceilings that would meet your individual requirements and budgets."
    },
    {
      "type": "bullet",
      "text": "Gypsum and POP false ceiling work."
    },
    {
      "type": "bullet",
      "text": "Cove lighting arrangement."
    },
    {
      "type": "bullet",
      "text": "Proper finishing with well planned structural design."
    },
    {
      "type": "heading",
      "text": "OUR EXPERTISE"
    },
    {
      "type": "bullet",
      "text": "End to end solutions from simple wiring to complicated plumbing and top class false ceiling designs."
    },
    {
      "type": "bullet",
      "text": "Team of well trained professionals and skilled technicians."
    },
    {
      "type": "bullet",
      "text": "On time completion of all projects without compromising on the quality."
    },
    {
      "type": "bullet",
      "text": "All materials and fittings used are of heavy duty and long lasting. Give your space a perfect finishing! While building a new house or renovating an existing one, our Design & Fitting Work solutions are an essential aspect to consider that will fulfill all your modern-day requirements."
    },
    {
      "type": "cta",
      "text": "> Give us a call and start planning your interiors!"
    },
    {
      "type": "paragraph",
      "text": "Vasupriy Interiovilla - crafting your dream spaces with precision."
    }
  ],
  [
    {
      "type": "paragraph",
      "text": "Visualize Your Dream Home Before It Comes to Life Building or renovating a home is a massive emotional and financial investment, and you deserve to see the final result before a single brick is laid. At Vasupriy Interiovilla, our Professional 2D, 3D & GRFC Drawings service bridges the gap between your imagination and reality. We provide a complete visual blueprint and realistic previews so you can experience your future home long before construction is complete."
    },
    {
      "type": "heading",
      "text": "Our Core Drawing & Visualization Services"
    },
    {
      "type": "heading",
      "text": "1. 2D FLOOR PLANS & LAYOUT DRAWINGS"
    },
    {
      "type": "paragraph",
      "text": "A well-optimized layout is the foundation of a functional home. Our 2D drawings give you a technical and structural overview of your space utilization."
    },
    {
      "type": "bullet",
      "text": "Precise spatial planning, room dimensions, and furniture placement layouts."
    },
    {
      "type": "bullet",
      "text": "Clear mapping of doors, windows, and structural pathways for optimal ventilation and movement."
    },
    {
      "type": "bullet",
      "text": "Practical blueprints that guide civil and electrical teams seamlessly."
    },
    {
      "type": "heading",
      "text": "2. 3D ELEVATION & INTERIOR/EXTERIOR RENDERING"
    },
    {
      "type": "paragraph",
      "text": "Want to know how your living room, kitchen, or front facade will actually look? Our lifelike 3D designs show you the exact color schemes, textures, and lighting effects."
    },
    {
      "type": "bullet",
      "text": "Key Highlights:"
    },
    {
      "type": "bullet",
      "text": "Photorealistic 3D views of your interiors and building exteriors."
    },
    {
      "type": "bullet",
      "text": "Accurate preview of materials, wall finishes, flooring, and false ceilings."
    },
    {
      "type": "bullet",
      "text": "The flexibility to make changes and experiment with designs before actual execution begins."
    },
    {
      "type": "heading",
      "text": "3. GRFC (GLASSFIBRE REINFORCED CONCRETE) DRAWINGS & DETAILING"
    },
    {
      "type": "paragraph",
      "text": "For clients looking to add stunning architectural grandeur, intricate facades, or durable decorative elements to their exteriors, we specialize in comprehensive GRFC designs and layouts."
    },
    {
      "type": "bullet",
      "text": "Custom facade and cladding details."
    },
    {
      "type": "bullet",
      "text": "Structural precision for lightweight, highly durable architectural elements."
    },
    {
      "type": "bullet",
      "text": "Enhancing the exterior curb appeal with unique textures and royal aesthetics."
    },
    {
      "type": "heading",
      "text": "WHY CHOOSE OUR DESIGN SERVICES?"
    },
    {
      "type": "bullet",
      "text": "Zero Surprises: Eliminate guesswork by seeing an exact digital preview of your dream house."
    },
    {
      "type": "bullet",
      "text": "Better Decision Making: Easily test different color palettes, layouts, and materials before spending on actual execution."
    },
    {
      "type": "bullet",
      "text": "Clear Communication: Detailed technical drawings ensure that contractors, civil engineers, and laborers stay on the exact same page."
    },
    {
      "type": "bullet",
      "text": "Tailored to Your Vision: Every layout is customized carefully to match your lifestyle, aesthetic preference, and budget. Don't just imagine your dream house—see it, review it, and perfect it with our expert 2D, 3D, and GRFC drawing solutions."
    },
    {
      "type": "cta",
      "text": "> Get in touch with us today to bring your architectural vision to blueprint and brilliance!"
    }
  ],
  [
    {
      "type": "paragraph",
      "text": "Elevating Interiors with Elegance, Glass, and Natural Light Transforming a space requires the right blend of reflection, transparency, and natural illumination. At Vasupriy Interiovilla, our Mirror & Glazing Style service brings modern sophistication to your home through exquisite glass partitions, stylish doors, premium sunroofs, and breathtaking skylight ceilings."
    },
    {
      "type": "heading",
      "text": "1. MIRROR PARTITIONS & WALLS"
    },
    {
      "type": "paragraph",
      "text": "Create an illusion of expansive space and unmatched luxury with our custom-designed mirror partitions and feature walls, tailored to elevate your living rooms, dressing areas, and hallways."
    },
    {
      "type": "heading",
      "text": "2. GLASS DOORS & ENCLOSURES"
    },
    {
      "type": "paragraph",
      "text": "Add a sleek, contemporary touch to your interiors with our seamless glass doors and elegant room dividers that offer privacy while maintaining an open, airy feel."
    },
    {
      "type": "heading",
      "text": "3. SUNROOF & SKYLIGHT CEILING WORK"
    },
    {
      "type": "paragraph",
      "text": "Invite the beauty of the outdoors inside. We specialize in designing and installing modern sunroofs and skylight ceilings that maximize natural daylight and add an architectural statement to your home."
    },
    {
      "type": "heading",
      "text": "Key Highlights"
    },
    {
      "type": "bullet",
      "text": "Custom mirror partitions and feature walls designed to amplify light and spatial elegance."
    },
    {
      "type": "bullet",
      "text": "Sleek, durable glass doors and chic dividers for modern room layouts."
    },
    {
      "type": "bullet",
      "text": "Premium sunroof installations for seamless indoor-outdoor aesthetic blending."
    },
    {
      "type": "bullet",
      "text": "Breathtaking skylight ceilings that brighten your interiors with natural sunlight."
    },
    {
      "type": "heading",
      "text": "Our Expertise"
    },
    {
      "type": "bullet",
      "text": "Sophisticated Craftsmanship: Precision-cut glass, flawless mirror alignment, and secure structural glazing."
    },
    {
      "type": "bullet",
      "text": "Aesthetic & Functional Harmony: Designs that enhance both ventilation, daylight, and interior beauty."
    },
    {
      "type": "bullet",
      "text": "Customized Solutions: Tailored glass and mirror installations to match your specific interior theme."
    },
    {
      "type": "bullet",
      "text": "Quality Materials: Use of toughened glass, premium mirrors, and weather-sealed frames for lasting durability."
    },
    {
      "type": "paragraph",
      "text": "Bring Light and Luxury Into Your Home! Redefine your spaces with the timeless grace of glass and mirrors. Trust Vasupriy Interiovilla to bring brilliance and openness to every corner of your house."
    },
    {
      "type": "cta",
      "text": "> Get in touch with us today to upgrade your interiors with stunning glazing and mirror"
    },
    {
      "type": "paragraph",
      "text": "styles! Vasupriy Interiovilla – Reflecting Elegance, Illuminating Spaces."
    }
  ],
  [
    {
      "type": "paragraph",
      "text": "Enhancing Security and Style with Premium Doors and Windows Doors and windows are the gateway to your home’s character, offering security, ventilation, and style. At Vasupriy Interiovilla, our expert door and window installation services bring durability, safety, and elegance to your spaces."
    },
    {
      "type": "heading",
      "text": "1. UPVC DOORS"
    },
    {
      "type": "paragraph",
      "text": "Modern, highly durable, and moisture-resistant uPVC doors designed for seamless functionality, making them perfect for modern homes, balconies, and high-utility areas."
    },
    {
      "type": "heading",
      "text": "2. PVC DOORS"
    },
    {
      "type": "paragraph",
      "text": "Lightweight, cost-effective, and water-resistant PVC doors that offer excellent longevity and low maintenance, ideal for bathrooms and interior utility spaces."
    },
    {
      "type": "heading",
      "text": "3. WOODEN DOORS"
    },
    {
      "type": "paragraph",
      "text": "Crafted with precision, our stylish and sturdy wooden doors add a touch of timeless warmth, rich texture, and royal aesthetics to your main entrance and bedrooms."
    },
    {
      "type": "heading",
      "text": "4. GLASS WINDOWS"
    },
    {
      "type": "paragraph",
      "text": "Sleek, transparent, and elegant glass windows designed to maximize natural daylight, offering an open, modern, and breathable feel to your rooms."
    },
    {
      "type": "heading",
      "text": "5. WOODEN WINDOWS"
    },
    {
      "type": "paragraph",
      "text": "Traditional yet timeless wooden windows that provide structural strength, classic charm, and excellent thermal insulation for your living spaces."
    },
    {
      "type": "heading",
      "text": "6. ACRYLIC WINDOWS"
    },
    {
      "type": "paragraph",
      "text": "Impact-resistant, durable, and safe acrylic windows that combine clarity with robust strength, perfect for specialized modern architectural requirements."
    },
    {
      "type": "heading",
      "text": "Key Highlights"
    },
    {
      "type": "bullet",
      "text": "Diverse range of durable uPVC, waterproof PVC, and premium-crafted wooden doors."
    },
    {
      "type": "bullet",
      "text": "High-quality glass, traditional wooden, and impact-resistant acrylic windows."
    },
    {
      "type": "bullet",
      "text": "Seamless installation ensuring proper sound insulation, smooth operation, and weather sealing."
    },
    {
      "type": "bullet",
      "text": "Custom-fit designs tailored to match your specific interior and exterior architecture."
    },
    {
      "type": "heading",
      "text": "Our Expertise"
    },
    {
      "type": "bullet",
      "text": "Superior Craftsmanship: Precision fitting and alignment for all types of doors and windows."
    },
    {
      "type": "bullet",
      "text": "Premium Materials: Use of certified uPVC, treated wood, high-grade glass, and sturdy acrylic."
    },
    {
      "type": "bullet",
      "text": "Aesthetic Appeal: Designs that perfectly complement your overall interior decor."
    },
    {
      "type": "bullet",
      "text": "Flawless Execution: Professional installation with attention to detail and zero structural damage. Give Your Home a Grand Entrance! Upgrade your living spaces with high-quality doors and windows that combine beauty with unmatched safety. Trust Vasupriy Interiovilla for a flawless installation experience."
    },
    {
      "type": "cta",
      "text": "> Get in touch with us today to upgrade your doors and windows!"
    },
    {
      "type": "paragraph",
      "text": "Vasupriy Interiovilla – Framing Beauty, Securing Spaces."
    }
  ],
  [
    {
      "type": "paragraph",
      "text": "Seamless Climate Control and Advanced Electronic Integration Modern homes require sophisticated climate control and hassle-free appliance setups to ensure total comfort. At Vasupriy Interiovilla, our centralized AC fitting and electronic installation services bring efficiency, safety, and modern convenience directly to your living spaces."
    },
    {
      "type": "heading",
      "text": "1. CENTRALIZED AC FITTING & DUCTING"
    },
    {
      "type": "paragraph",
      "text": "Expert installation of centralized and ducted air conditioning systems, ensuring uniform cooling, neat ductwork, and maximum energy efficiency across your entire home."
    },
    {
      "type": "heading",
      "text": "2. HEAVY ELECTRICAL & ELECTRONIC FITTING"
    },
    {
      "type": "paragraph",
      "text": "Professional setup and mounting for heavy-duty electrical equipment, distribution panels, and sophisticated home automation gadgets with strict safety compliance."
    },
    {
      "type": "heading",
      "text": "3. APPLIANCE & FIXTURE INSTALLATION"
    },
    {
      "type": "paragraph",
      "text": "Precise installation of modern electronic appliances, entertainment systems, smart home devices, and decorative light fixtures for a clutter-free, functional environment."
    },
    {
      "type": "heading",
      "text": "Key Highlights"
    },
    {
      "type": "bullet",
      "text": "Advanced centralized AC fitting and ductwork for uniform, whisper-quiet cooling."
    },
    {
      "type": "bullet",
      "text": "Professional installation of heavy electrical appliances and home automation electronics."
    },
    {
      "type": "bullet",
      "text": "Concealed and safe wiring integration to prevent electrical hazards and clutter."
    },
    {
      "type": "bullet",
      "text": "Precision mounting and setup for modern entertainment systems and smart devices."
    },
    {
      "type": "heading",
      "text": "Our Expertise"
    },
    {
      "type": "bullet",
      "text": "Technical Precision: Skilled engineers ensuring accurate tonnage calculation, duct balancing, and safe appliance mounting."
    },
    {
      "type": "bullet",
      "text": "Safety Compliance: Adherence to strict electrical safety standards to protect your home and expensive gadgets."
    },
    {
      "type": "bullet",
      "text": "Clutter-Free Execution: Clean and hidden wiring pathways that preserve the aesthetic look of your interiors."
    },
    {
      "type": "bullet",
      "text": "Reliable Support: End-to-end testing and quality checks for flawless performance from day one."
    },
    {
      "type": "paragraph",
      "text": "Upgrade Your Home to Ultimate Comfort! Experience the perfect climate and effortless appliance operation with our expert technical services. Trust Vasupriy Interiovilla for advanced comfort solutions."
    },
    {
      "type": "cta",
      "text": "> Get in touch with us today to install your centralized AC and electronic systems!"
    },
    {
      "type": "paragraph",
      "text": "Vasupriy Interiovilla – Smart Climate Control, Seamless Living."
    }
  ],
  [
    {
      "type": "paragraph",
      "text": "Transforming Open Spaces into Lush, Green Landscapes Nature has a unique way of bringing life, tranquility, and elegance to any environment. At Vasupriy Interiovilla, our Natural Garden Setup service is designed to convert large open areas, commercial landscapes, and residential campuses into breathtaking, sustainable green sanctuaries."
    },
    {
      "type": "heading",
      "text": "1. CORPORATE & OFFICE CAMPUSES"
    },
    {
      "type": "paragraph",
      "text": "Designing professional yet inviting green landscapes for office exteriors, tech parks, and business headquarters to enhance aesthetic appeal and employee well-being."
    },
    {
      "type": "heading",
      "text": "2. AIRPORT & PUBLIC EXTERIOR SPACES"
    },
    {
      "type": "paragraph",
      "text": "Executing large-scale landscaping projects for high-traffic zones like airports, commercial avenues, and public outer areas to create a refreshing first impression."
    },
    {
      "type": "heading",
      "text": "3. HOSPITALS & HEALTHCARE FACILITIES"
    },
    {
      "type": "paragraph",
      "text": "Creating soothing, therapeutic garden environments around hospitals and medical centers to promote healing, peace, and a calming atmosphere for patients and visitors"
    },
    {
      "type": "heading",
      "text": "4. RESIDENTIAL APARTMENTS & SOCIETIES"
    },
    {
      "type": "paragraph",
      "text": "Developing lush green lawns, pathways, and plantation layouts on ground floors and open campus spaces for apartment complexes to foster close-to-nature community living."
    },
    {
      "type": "heading",
      "text": "Key Highlights"
    },
    {
      "type": "bullet",
      "text": "Comprehensive natural garden setups tailored for corporate, public, and residential spaces."
    },
    {
      "type": "bullet",
      "text": "Professional plantation, turfing, and landscaping designed for long-term sustainability."
    },
    {
      "type": "bullet",
      "text": "Therapeutic and aesthetically pleasing layouts for hospitals and healthcare centers."
    },
    {
      "type": "bullet",
      "text": "Large-scale green space execution for airports, societies, and commercial properties."
    },
    {
      "type": "heading",
      "text": "Our Expertise"
    },
    {
      "type": "bullet",
      "text": "Botanical Knowledge: Selection of climate-appropriate plants, shrubs, and trees that thrive in local weather conditions."
    },
    {
      "type": "bullet",
      "text": "Landscape Planning: Strategic layout design ensuring proper sunlight, soil health, and seamless pathways."
    },
    {
      "type": "bullet",
      "text": "End-to-End Execution: Complete on-site development, from soil preparation and plantation to final finishing."
    },
    {
      "type": "bullet",
      "text": "Sustainable Maintenance Support: Guidance and setup for efficient watering and plant care systems."
    },
    {
      "type": "paragraph",
      "text": "Bring Nature Closer to Your Spaces! Elevate the grandeur and environment of your commercial or residential property with a stunning natural landscape. Trust Vasupriy Interiovilla to bring greenery to life."
    },
    {
      "type": "cta",
      "text": "> Get in touch with us today to design your custom natural garden setup!"
    },
    {
      "type": "paragraph",
      "text": "Vasupriy Interiovilla – Breathing Life Into Spaces Through Natural Greenery."
    }
  ],
  [
    {
      "type": "paragraph",
      "text": "Transforming Ordinary Floors into Breathtaking Visual Masterpieces Floors no longer have to be just a flat surface to walk on; they can be an extraordinary work of art. At Vasupriy Interiovilla, our 3D Epoxy Flooring service combines cutting-edge technology with high-gloss resin to bring depth, realism, and unmatched luxury to your interiors."
    },
    {
      "type": "heading",
      "text": "1. CUSTOM 3D VISUAL DESIGNS"
    },
    {
      "type": "paragraph",
      "text": "Create a stunning optical illusion with high-resolution custom graphics, ranging from serene ocean waves and coral reefs to vibrant floral and abstract patterns tailored to your space."
    },
    {
      "type": "heading",
      "text": "2. SEAMLESS HIGH-GLOSS FINISH"
    },
    {
      "type": "paragraph",
      "text": "Enjoy a completely joint-free, mirror-like glossy surface that reflects light brilliantly, making rooms appear larger, brighter, and exceptionally grand."
    },
    {
      "type": "heading",
      "text": "3. DURABILITY & STRENGTH"
    },
    {
      "type": "paragraph",
      "text": "Built to last, our industrial-grade epoxy layers offer heavy load-bearing capacity, impact resistance, and complete protection against wear and tear."
    },
    {
      "type": "heading",
      "text": "Key Highlights"
    },
    {
      "type": "bullet",
      "text": "Breathtaking 3D visual effects that bring floors to life with depth and realism."
    },
    {
      "type": "bullet",
      "text": "Seamless, joint-free, and mirror-shine glossy finish for high-end aesthetics."
    },
    {
      "type": "bullet",
      "text": "Highly durable, scratch-resistant, and impact-proof surface suitable for heavy footfall."
    },
    {
      "type": "bullet",
      "text": "Waterproof and moisture-resistant layers, making cleaning and maintenance effortless."
    },
    {
      "type": "heading",
      "text": "Our Expertise"
    },
    {
      "type": "bullet",
      "text": "Immaculate Application: Expert layering and leveling techniques to prevent air bubbles and ensure crystal-clear 3D clarity."
    },
    {
      "type": "bullet",
      "text": "Premium Materials: Use of high-grade, non-yellowing epoxy resins and certified graphic prints."
    },
    {
      "type": "bullet",
      "text": "Custom Themes: Tailored flooring designs that match the unique interior theme of living rooms, bedrooms, offices, or showrooms."
    },
    {
      "type": "bullet",
      "text": "Long-Lasting Protection: Protective topcoats that guard against chemical spills, stains, and fading over time."
    },
    {
      "type": "paragraph",
      "text": "Step Into a World of Luxury and Depth! Give your floors a mesmerizing transformation that leaves every visitor in awe. Trust Vasupriy Interiovilla to redefine your interior ground levels."
    },
    {
      "type": "cta",
      "text": "> Get in touch with us today to install stunning 3D epoxy flooring in your space!"
    },
    {
      "type": "paragraph",
      "text": "Vasupriy Interiovilla – Walking on Art, Living in Luxury."
    }
  ],
  [
    {
      "type": "paragraph",
      "text": "Adding Artistic Depth, Embroidery, and Luxury to Your Walls & Roofs Interiors speak a language of luxury when every surface tells a unique artistic story. At Vasupriy Interiovilla, our comprehensive wall and roof styling service goes beyond standard paints, featuring exquisite texture finishes, custom hand paintings, embroidered wallpapers, and handcrafted rugs designed to elevate your spaces."
    },
    {
      "type": "heading",
      "text": "1. MODERN TEXTURE FINISHES"
    },
    {
      "type": "paragraph",
      "text": "Transform flat walls into rich sensory surfaces with our wide range of texture finishes, including metallic sheens, rustic concrete looks, velvet touches, and sand-stone effects."
    },
    {
      "type": "heading",
      "text": "2. CUSTOM WALL HAND PAINTINGS"
    },
    {
      "type": "paragraph",
      "text": "Bring your walls to life with exclusive hand-painted artworks, botanical motifs, abstract themes, and custom murals tailored to match your personal taste and interior decor."
    },
    {
      "type": "heading",
      "text": "3. EMBROIDERED WALLPAPERS"
    },
    {
      "type": "paragraph",
      "text": "Add an extraordinary dimension of luxury with our specialized designer wallpapers featuring intricate embroidery work, blending textile elegance with modern wall coverings."
    },
    {
      "type": "heading",
      "text": "4. HAND-MADE RUGS FOR WALLS & ROOFS"
    },
    {
      "type": "paragraph",
      "text": "Break conventional boundaries with our unique handcrafted rugs and textile art specially styled for walls and roof surfaces, creating a warm, acoustic, and royal aesthetic."
    },
    {
      "type": "heading",
      "text": "Key Highlights"
    },
    {
      "type": "bullet",
      "text": "Premium texture paint finishes adding tactile depth and modern flair."
    },
    {
      "type": "bullet",
      "text": "Custom hand-painted wall art and murals created by skilled artisans."
    },
    {
      "type": "bullet",
      "text": "Sophisticated designer wallpapers enhanced with intricate embroidery work."
    },
    {
      "type": "bullet",
      "text": "Unique, handcrafted rugs and textile panels styled for walls and ceilings/roofs."
    },
    {
      "type": "heading",
      "text": "Our Expertise"
    },
    {
      "type": "bullet",
      "text": "Artistic Precision: Expert application and delicate handling for embroidered materials, textures, and hand-painted details."
    },
    {
      "type": "bullet",
      "text": "Bespoke Designs: Fully customized concepts tailored to match the royal theme of your interior decor."
    },
    {
      "type": "bullet",
      "text": "Premium Materials: Use of high-grade, durable paints, textured fabrics, and fine embroidery threads."
    },
    {
      "type": "bullet",
      "text": "Flawless Execution: Professional surface preparation and clean application with immaculate finishing touches."
    },
    {
      "type": "paragraph",
      "text": "Turn Your Walls and Roofs Into a Canvas of Elegance! Give your interiors a unique personality with artistic textures, embroidery, and handcrafted wall-roof styling. Trust Vasupriy Interiovilla to style your spaces with perfection."
    },
    {
      "type": "cta",
      "text": "> Get in touch with us today to give your walls and ceilings a custom artistic makeover!"
    },
    {
      "type": "paragraph",
      "text": "Vasupriy Interiovilla – Crafting Artistry on Walls, Ceilings, and Roofs."
    }
  ],
  [
    {
      "type": "paragraph",
      "text": "Framing Your Windows with Elegance, Channels, and Fine Fabrics Windows play a vital role in defining the mood, privacy, and lighting of your rooms. At Vasupriy Interiovilla, our Curtains & Blinds Installation service brings together smooth channel systems and exquisite fabrics to give your windows a flawless, sophisticated finish."
    },
    {
      "type": "heading",
      "text": "1. CUSTOM FABRIC CURTAINS"
    },
    {
      "type": "paragraph",
      "text": "Add a layer of warmth, softness, and royalty to your living spaces with our wide selection of premium drapery fabrics, beautifully tailored and neatly pleated to match your interior theme."
    },
    {
      "type": "heading",
      "text": "2. MODERN BLINDS & MECHANISMS"
    },
    {
      "type": "paragraph",
      "text": "Sleek, practical, and contemporary window blinds (including roller, vertical, and zebra blinds) designed for effortless light control, perfect for modern homes and offices."
    },
    {
      "type": "heading",
      "text": "3. CHANNEL & TRACK INSTALLATION"
    },
    {
      "type": "paragraph",
      "text": "Precision-fitted heavy-duty channels, tracks, and motorized mechanisms that ensure whisper-quiet operation, smooth gliding, and long-lasting durability for your curtains and blinds."
    },
    {
      "type": "heading",
      "text": "Key Highlights"
    },
    {
      "type": "bullet",
      "text": "Premium custom-tailored curtains crafted from high-grade, luxurious fabrics."
    },
    {
      "type": "bullet",
      "text": "Modern and functional blinds designed for precise light and privacy control."
    },
    {
      "type": "bullet",
      "text": "Heavy-duty, smooth-sliding channels and tracks for effortless handling."
    },
    {
      "type": "bullet",
      "text": "Professional installation ensuring neat alignment, secure mounting, and a flawless look."
    },
    {
      "type": "heading",
      "text": "Our Expertise"
    },
    {
      "type": "bullet",
      "text": "Precise Measurement & Fitting: Expert installation ensuring proper hanging length, alignment, and secure wall anchoring."
    },
    {
      "type": "bullet",
      "text": "Vast Fabric Selection: A rich variety of textures, opacity levels, and color palettes to complement your decor."
    },
    {
      "type": "bullet",
      "text": "Advanced Mechanics: Seamless setup of manual and motorized channel systems for ultimate convenience."
    },
    {
      "type": "bullet",
      "text": "Immaculate Finishing: Attention to detail in pleating, draping, and hardware placement. Dress Your Windows in Absolute Luxury! Transform the look and feel of your rooms with beautifully styled curtains and modern blinds. Trust Vasupriy Interiovilla to frame your views with elegance."
    },
    {
      "type": "cta",
      "text": "> Get in touch with us today to upgrade your windows with premium curtains and blinds!"
    }
  ],
  [
    {
      "type": "paragraph",
      "text": "Invisible Shielding for Lasting Brilliance and Protection Preserving the pristine condition of high-end interior surfaces requires advanced protection against daily wear, moisture, and stains. At Vasupriy Interiovilla, our Nano Coating service utilizes cutting-edge nanotechnology to create an invisible, ultra-thin protective shield over your surfaces, ensuring lifelong durability and effortless maintenance."
    },
    {
      "type": "heading",
      "text": "1. STONE & MARBLE PROTECTION"
    },
    {
      "type": "paragraph",
      "text": "Shield your expensive marble, granite, and stone countertops against liquid spills, oil stains, etching, and scratches without altering their natural texture or finish."
    },
    {
      "type": "heading",
      "text": "2. GLASS & MIRROR NANO-SHIELDING"
    },
    {
      "type": "paragraph",
      "text": "Prevent water spots, soap scum, and fingerprint smudges on glass partitions, shower enclosures, and mirrors, keeping them crystal clear and easy to clean."
    },
    {
      "type": "heading",
      "text": "3. WOOD & METAL PRESERVATION"
    },
    {
      "type": "paragraph",
      "text": "Protect wooden furniture and metal fixtures from moisture damage, oxidation, rust, and UV fading, ensuring they retain their original luster for years to come."
    },
    {
      "type": "heading",
      "text": "Key Highlights"
    },
    {
      "type": "bullet",
      "text": "Invisible, ultra-thin nano-coating layer that preserves the natural look of surfaces."
    },
    {
      "type": "bullet",
      "text": "Superior hydrophobic and oleophobic properties that repel water, oil, and dust."
    },
    {
      "type": "bullet",
      "text": "High resistance against scratches, chemical stains, UV rays, and daily wear."
    },
    {
      "type": "bullet",
      "text": "Effortless cleaning and maintenance, reducing the need for harsh chemical cleaners."
    },
    {
      "type": "heading",
      "text": "Our Expertise"
    },
    {
      "type": "bullet",
      "text": "Advanced Nanotechnology: Cutting-edge liquid glass solutions that bond molecularly with surfaces for permanent protection."
    },
    {
      "type": "bullet",
      "text": "Multi-Surface Application: Specialized coating techniques tailored for marble, glass, wood, tiles, and metal fixtures."
    },
    {
      "type": "bullet",
      "text": "Professional Execution: Meticulous surface preparation and uniform application by trained specialists."
    },
    {
      "type": "bullet",
      "text": "Long-Term Value: Maximizing the lifespan of your interior investments with minimal upkeep."
    },
    {
      "type": "paragraph",
      "text": "Protect Your Investment with Invisible Armor! Keep your interiors looking brand new, spotless, and radiant for years to come. Trust Vasupriy Interiovilla for state-of-the-art nano-coating protection."
    },
    {
      "type": "cta",
      "text": "> Get in touch with us today to shield your interior surfaces with advanced nano-coating!"
    },
    {
      "type": "paragraph",
      "text": "Vasupriy Interiovilla – Invisible Protection, Enduring Brilliance."
    }
  ],
  [
    {
      "type": "paragraph",
      "text": "Seamless Vertical Mobility and Advanced Safety Solutions Elevating multi-story residential and commercial buildings requires high-end engineering, precision, and uncompromised safety standards. At Vasupriy Interiovilla, our Lift Installation service brings modern vertical mobility solutions designed for smooth operation, structural safety, and long-term durability."
    },
    {
      "type": "heading",
      "text": "1. RESIDENTIAL & COMMERCIAL ELEVATORS"
    },
    {
      "type": "paragraph",
      "text": "We offer professional installation for a wide range of lifts, including luxury home elevators, capsule lifts, hydraulic lifts, and heavy-duty commercial passenger/cargo elevators tailored to your building architecture."
    },
    {
      "type": "heading",
      "text": "2. ADVANCED SAFETY MECHANISMS"
    },
    {
      "type": "paragraph",
      "text": "Equipped with state-of-the-art safety features such as emergency brake systems, automatic rescue devices (ARD), overload sensors, and backup power integration for complete peace of mind."
    },
    {
      "type": "heading",
      "text": "3. STRUCTURAL ALIGNMENT & SHAFT INTEGRATION"
    },
    {
      "type": "paragraph",
      "text": "Expert engineering support for seamless shaft construction, precise alignment, and vibration-free mechanical setup that blends harmoniously with your building design."
    },
    {
      "type": "heading",
      "text": "Key Highlights"
    },
    {
      "type": "bullet",
      "text": "Premium-grade elevators engineered for smooth, silent, and jerk-free vertical movement."
    },
    {
      "type": "bullet",
      "text": "Comprehensive installation for residential bungalows, apartments, hotels, and commercial offices."
    },
    {
      "type": "bullet",
      "text": "Built-in advanced safety protocols including ARD (Automatic Rescue Device) and overload sensors."
    },
    {
      "type": "bullet",
      "text": "Robust mechanical and electrical integration handled by certified elevator installation experts."
    },
    {
      "type": "heading",
      "text": "Our Expertise"
    },
    {
      "type": "bullet",
      "text": "Engineering Precision: Careful load calculation, shaft alignment, and adherence to international safety codes."
    },
    {
      "type": "bullet",
      "text": "Custom Cabins: Stylish interior cabin designs matching the interior theme and aesthetic of your property."
    },
    {
      "type": "bullet",
      "text": "End-to-End Execution: From initial structural planning and pit preparation to final testing and commissioning."
    },
    {
      "type": "bullet",
      "text": "Reliable Performance: Long-lasting durability backed by seamless technical support and maintenance guidelines."
    },
    {
      "type": "paragraph",
      "text": "Elevate Your Buildings With Modern Mobility! Ensure effortless accessibility across all floors with high-performance vertical lift solutions. Trust Vasupriy Interiovilla for safe and sophisticated elevator installations."
    },
    {
      "type": "cta",
      "text": "> Get in touch with us today to discuss your lift installation requirements!"
    },
    {
      "type": "paragraph",
      "text": "Vasupriy Interiovilla – Elevating Standards, Ensuring Safe Mobility."
    }
  ]
]

const serviceEditorial = {
  "Complete Room Transformation": {
    "intro": "A room transformation begins with understanding how the space is used every day. We bring layout, furniture, lighting and finishes together to create a cohesive interior without assuming major structural changes are necessary.",
    "highlights": [
      "Furniture arrangement that supports comfort, movement and conversation",
      "Coordinated lighting, colour and material palettes",
      "Storage, styling and finishing details that feel intentional"
    ],
    "approach": "We review what can be retained, refreshed or replaced, then develop a practical transformation plan around the desired mood and available budget."
  },
  "Space Planning & Layout Optimization": {
    "intro": "Good planning creates a sense of ease long before decorative details are added. We study circulation, furniture scale, functional zones and natural light to make compact and generous rooms work more effectively.",
    "highlights": [
      "Clear circulation routes and thoughtfully defined activity zones",
      "Furniture sizing, placement and ergonomic clearances",
      "Storage opportunities and better use of overlooked corners"
    ],
    "approach": "Our approach starts with measurements and daily routines, followed by layout options that balance openness, privacy and practicality."
  },
  "Aesthetic Designs & Theme Styling": {
    "intro": "A considered theme gives an interior its identity. We coordinate colours, textures, furnishings and decorative accents so the final atmosphere feels personal rather than assembled from unrelated trends.",
    "highlights": [
      "A clear visual direction and cohesive mood board",
      "Complementary fabrics, finishes and decorative accents",
      "Balanced statement pieces and quieter supporting details"
    ],
    "approach": "We explore references and preferences first, then refine a palette and styling direction that can be carried consistently across the room."
  },
  "Space Enhancement & Surface Upgrades": {
    "intro": "Thoughtful upgrades can change how a room feels without rebuilding it. Feature walls, lighting adjustments, refined finishes and decorative treatments introduce depth, warmth and character.",
    "highlights": [
      "Wall finishes, panels and wallpaper combinations",
      "Layered lighting and carefully positioned highlights",
      "Surface treatments chosen for use, maintenance and visual impact"
    ],
    "approach": "We assess existing surfaces and the desired finish, then plan upgrades that complement the architecture and fit the scope of work."
  },
  "Architectural & Civil Work": {
    "intro": "Architectural and civil interventions establish the foundation for a well-functioning interior. Layout modifications, surface preparation and construction details need careful coordination with design intent and site conditions.",
    "highlights": [
      "Space alterations and practical construction sequencing",
      "Coordination of measurements, levels and finishing requirements",
      "Attention to site conditions and applicable approvals"
    ],
    "approach": "We begin with site review and scope definition, coordinating appropriate technical specialists wherever structural or regulated work is involved."
  },
  "Professional 2D, 3D & GRFC Drawings": {
    "intro": "Clear drawings help turn design intent into decisions that clients and execution teams can understand. Plans, visualizations and relevant construction details make proportions, finishes and coordination easier to review.",
    "highlights": [
      "2D layouts for spatial clarity and furniture placement",
      "3D views to explore materials, lighting and atmosphere",
      "Detailed drawings and revisions aligned with the agreed scope"
    ],
    "approach": "We gather dimensions and requirements, develop visual options and refine documentation before execution. Drawing types are selected to suit the project."
  },
  "Mirror & Glazing Styling": {
    "intro": "Mirrors and glazing can make interiors feel lighter, brighter and more spacious. Their impact depends on proportion, placement, edge detailing and appropriate material selection.",
    "highlights": [
      "Decorative mirrors and feature compositions",
      "Glass partitions and glazing details suited to the space",
      "Consideration of safety, cleaning and reflected light"
    ],
    "approach": "We review locations, dimensions and desired aesthetics before coordinating suitable specifications and installation details."
  },
  "Doors & Windows Installation": {
    "intro": "Doors and windows shape privacy, light, ventilation and the visual rhythm of a space. The right selection combines architectural style with reliable everyday performance.",
    "highlights": [
      "Opening styles, proportions and frame finishes",
      "Hardware, access and ease of operation",
      "Alignment, sealing and installation coordination"
    ],
    "approach": "We assess openings and functional needs, then help align product choices and fitting details with the surrounding interiors."
  },
  "Centralized AC & Electrical Fitting": {
    "intro": "Comfort and lighting work best when technical systems are considered early. Thoughtful coordination helps integrate climate control, switches, fixtures and services without compromising the interior design.",
    "highlights": [
      "Placement planning for air distribution and access",
      "Lighting points, controls and fixture coordination",
      "Concealment, maintenance access and safety considerations"
    ],
    "approach": "We coordinate layouts with qualified installation professionals and ensure electrical and HVAC work follows relevant technical requirements."
  },
  "Natural Garden Setup": {
    "intro": "Greenery softens architecture and creates inviting transitions between indoor and outdoor spaces. A successful garden setup considers sunlight, water access, maintenance and the intended atmosphere.",
    "highlights": [
      "Plant selections suited to available light and conditions",
      "Planters, pathways and green focal points",
      "Practical watering and maintenance considerations"
    ],
    "approach": "We review the setting and maintenance preferences, then develop a greenery concept that complements the space rather than overcrowding it."
  },
  "3D Epoxy Flooring": {
    "intro": "Decorative epoxy flooring can create a seamless, expressive surface with a distinctive visual character. The right result depends on substrate condition, finish selection and suitability for the intended use.",
    "highlights": [
      "Finish concepts, colour depth and decorative effects",
      "Substrate preparation and application planning",
      "Slip resistance, cleaning and maintenance needs"
    ],
    "approach": "We evaluate the flooring environment and coordinate product and installation recommendations with experienced applicators."
  },
  "Indian Artistry on Walls & Ceilings": {
    "intro": "Artistic walls and ceilings can celebrate craftsmanship while giving a room a memorable focal point. Patterns, textures and motifs work best when they relate to the architecture and surrounding furnishings.",
    "highlights": [
      "Motif development inspired by the desired cultural language",
      "Accent placement, scale and colour harmony",
      "Material and artisan coordination for detailed finishes"
    ],
    "approach": "We develop references and sample directions before planning execution, allowing craftsmanship to complement rather than overwhelm the space."
  },
  "Curtains & Blinds Installation": {
    "intro": "Window treatments balance daylight, privacy, acoustics and softness. Fabric, opacity, hardware and fit all contribute to the final impression.",
    "highlights": [
      "Fabric and blind selections for light and privacy",
      "Measurements, fall, fullness and mounting details",
      "Hardware finishes coordinated with the interior palette"
    ],
    "approach": "We review window dimensions and usage needs, then plan treatment styles and fitting details for a clean, considered result."
  },
  "Nano Coating Protection": {
    "intro": "Protective surface treatments may help simplify maintenance for suitable materials. Choosing a coating requires understanding the substrate, expected wear and product-specific performance.",
    "highlights": [
      "Surface suitability and desired protection goals",
      "Finish compatibility and visual appearance",
      "Application guidance and realistic maintenance expectations"
    ],
    "approach": "We assess the intended surface and review manufacturer specifications before recommending any coating solution; performance depends on product and conditions."
  },
  "Lift Installation": {
    "intro": "Lift integration requires careful attention to access, circulation and architectural coordination. Beyond appearance, safety, compliance and ongoing serviceability are essential considerations.",
    "highlights": [
      "Space planning around entry, circulation and clearances",
      "Finish coordination with the surrounding interior",
      "Access for maintenance and specialist technical requirements"
    ],
    "approach": "We can assist with design coordination while licensed lift providers and relevant professionals handle technical design, approvals and installation."
  },
  "Epoxy flooring": {
    "intro": "Flooring sets the tone for an entire interior. A tailored selection considers texture, scale, comfort and durability as well as the relationship between adjacent rooms.",
    "highlights": [
      "Material and finish combinations for the intended use",
      "Patterns, transitions and edge details",
      "Cleaning, slip resistance and long-term upkeep"
    ],
    "approach": "We compare practical requirements and aesthetic references before helping define a flooring direction and installation scope."
  },
  "Wall Panels & Wallpapers": {
    "intro": "Wall treatments add texture, rhythm and personality without changing the fundamental layout. The right design can frame a focal point or quietly enrich the entire room.",
    "highlights": [
      "Feature wall compositions and panel proportions",
      "Wallpaper patterns, colour and texture coordination",
      "Surface preparation and maintenance considerations"
    ],
    "approach": "We develop wall concepts around room scale, furniture placement and lighting, then review suitable materials and installation details."
  },
  "Rugs & Wall Hangings": {
    "intro": "Layered textiles make spaces feel warmer and more individual. Rugs and wall hangings introduce colour, tactile contrast and a sense of composition.",
    "highlights": [
      "Rug scale and placement relative to furniture",
      "Textures, motifs and colour relationships",
      "Wall display positioning and care requirements"
    ],
    "approach": "We select accent pieces in context with the overall scheme so each layer adds character without creating visual clutter."
  },
  "Complete Furnishings": {
    "intro": "A well-furnished interior feels cohesive from the largest seating piece to the smallest soft detail. Proportion, comfort and material consistency are central to the result.",
    "highlights": [
      "Furniture selection and practical room arrangements",
      "Upholstery, curtains, cushions and complementary textiles",
      "Finishing accessories and coordinated visual balance"
    ],
    "approach": "We consider room dimensions, daily use and preferred style before curating a furnishing direction that works as a whole."
  },
  "Garden & Greenery": {
    "intro": "Thoughtfully placed greenery can bring calm, texture and life to residential or commercial settings. Planting and decorative elements should suit the space and the care available.",
    "highlights": [
      "Indoor and outdoor greenery concepts",
      "Planter styles and integration with surrounding materials",
      "Light, watering and ongoing care considerations"
    ],
    "approach": "We match the visual concept to environmental conditions and maintenance preferences, creating a practical green layer for the space."
  }
}
/* VASUPRIY_CLIENT_CONTENT_IMAGES_V1: Client-owned photos grouped by real category. */
const clientServicePhotos = {"drop-servicing/indian-artis":["/images/services-client/drop-servicing/indian-artis/019.jpg","/images/services-client/drop-servicing/indian-artis/024.jpg","/images/services-client/drop-servicing/indian-artis/028.jpg","/images/services-client/drop-servicing/indian-artis/032.png","/images/services-client/drop-servicing/indian-artis/039.png","/images/services-client/drop-servicing/indian-artis/040.png","/images/services-client/drop-servicing/indian-artis/072.jpg","/images/services-client/drop-servicing/indian-artis/085.jpg","/images/services-client/drop-servicing/indian-artis/086.jpg","/images/services-client/drop-servicing/indian-artis/091.jpg","/images/services-client/drop-servicing/indian-artis/100.jpg","/images/services-client/drop-servicing/indian-artis/103.jpg","/images/services-client/drop-servicing/indian-artis/104.jpg","/images/services-client/drop-servicing/indian-artis/108.jpg","/images/services-client/drop-servicing/indian-artis/111.png","/images/services-client/drop-servicing/indian-artis/113.jpg","/images/services-client/drop-servicing/indian-artis/114.jpg","/images/services-client/drop-servicing/indian-artis/122.jpg","/images/services-client/drop-servicing/indian-artis/128.jpg","/images/services-client/drop-servicing/indian-artis/137.png","/images/services-client/drop-servicing/indian-artis/141.png","/images/services-client/drop-servicing/indian-artis/145.jpg"],"drop-servicing/curtains-blinds":["/images/services-client/drop-servicing/curtains-blinds/005.jpg","/images/services-client/drop-servicing/curtains-blinds/009.jpg","/images/services-client/drop-servicing/curtains-blinds/041.jpg","/images/services-client/drop-servicing/curtains-blinds/043.jpg","/images/services-client/drop-servicing/curtains-blinds/044.jpg","/images/services-client/drop-servicing/curtains-blinds/045.jpg","/images/services-client/drop-servicing/curtains-blinds/046.jpg","/images/services-client/drop-servicing/curtains-blinds/048.jpg","/images/services-client/drop-servicing/curtains-blinds/050.jpg","/images/services-client/drop-servicing/curtains-blinds/051.jpg","/images/services-client/drop-servicing/curtains-blinds/056.jpg","/images/services-client/drop-servicing/curtains-blinds/112.jpg"],"space-makeover/stairs":["/images/services-client/space-makeover/stairs/129.jpg","/images/services-client/space-makeover/stairs/155.jpg","/images/services-client/space-makeover/stairs/157.jpg","/images/services-client/space-makeover/stairs/160.jpg","/images/services-client/space-makeover/stairs/165.jpg","/images/services-client/space-makeover/stairs/168.jpg","/images/services-client/space-makeover/stairs/169.jpg","/images/services-client/space-makeover/stairs/172.jpg","/images/services-client/space-makeover/stairs/173.jpg","/images/services-client/space-makeover/stairs/174.jpg","/images/services-client/space-makeover/stairs/175.jpg","/images/services-client/space-makeover/stairs/176.jpg","/images/services-client/space-makeover/stairs/177.jpg","/images/services-client/space-makeover/stairs/178.jpg","/images/services-client/space-makeover/stairs/179.jpg","/images/services-client/space-makeover/stairs/182.jpg","/images/services-client/space-makeover/stairs/184.jpg"],"drop-servicing/ac-electrical":["/images/services-client/drop-servicing/ac-electrical/007.jpg","/images/services-client/drop-servicing/ac-electrical/047.jpg","/images/services-client/drop-servicing/ac-electrical/078.png","/images/services-client/drop-servicing/ac-electrical/148.png"],"space-makeover/puja-room":["/images/services-client/space-makeover/puja-room/003.jpg","/images/services-client/space-makeover/puja-room/004.jpg","/images/services-client/space-makeover/puja-room/006.jpg","/images/services-client/space-makeover/puja-room/045.jpg","/images/services-client/space-makeover/puja-room/051.jpg","/images/services-client/space-makeover/puja-room/080.jpg"],"space-makeover/living-room":["/images/services-client/space-makeover/living-room/027.jpg","/images/services-client/space-makeover/living-room/032.jpg","/images/services-client/space-makeover/living-room/036.jpg","/images/services-client/space-makeover/living-room/037.jpg","/images/services-client/space-makeover/living-room/039.jpg","/images/services-client/space-makeover/living-room/040.jpg","/images/services-client/space-makeover/living-room/042.jpg","/images/services-client/space-makeover/living-room/050.jpg","/images/services-client/space-makeover/living-room/059.jpg","/images/services-client/space-makeover/living-room/073.jpg","/images/services-client/space-makeover/living-room/075.png","/images/services-client/space-makeover/living-room/083.jpg","/images/services-client/space-makeover/living-room/088.jpg","/images/services-client/space-makeover/living-room/094.jpg","/images/services-client/space-makeover/living-room/097.jpg","/images/services-client/space-makeover/living-room/101.jpg","/images/services-client/space-makeover/living-room/103.jpg","/images/services-client/space-makeover/living-room/104.jpg","/images/services-client/space-makeover/living-room/105.jpg","/images/services-client/space-makeover/living-room/106.jpg","/images/services-client/space-makeover/living-room/108.jpg","/images/services-client/space-makeover/living-room/113.jpg","/images/services-client/space-makeover/living-room/128.jpg"],"drop-servicing/mirror-glazing/glass-doors":["/images/services-client/drop-servicing/mirror-glazing/glass-doors/036.jpg","/images/services-client/drop-servicing/mirror-glazing/glass-doors/106.jpg","/images/services-client/drop-servicing/mirror-glazing/glass-doors/109.jpg","/images/services-client/drop-servicing/mirror-glazing/glass-doors/120.jpg","/images/services-client/drop-servicing/mirror-glazing/glass-doors/121.jpg","/images/services-client/drop-servicing/mirror-glazing/glass-doors/124.jpg","/images/services-client/drop-servicing/mirror-glazing/glass-doors/125.jpg","/images/services-client/drop-servicing/mirror-glazing/glass-doors/143.jpg"],"drop-servicing/epoxy-flooring":["/images/services-client/drop-servicing/epoxy-flooring/017.png","/images/services-client/drop-servicing/epoxy-flooring/052.png","/images/services-client/drop-servicing/epoxy-flooring/054.png","/images/services-client/drop-servicing/epoxy-flooring/061.png","/images/services-client/drop-servicing/epoxy-flooring/071.png","/images/services-client/drop-servicing/epoxy-flooring/079.png","/images/services-client/drop-servicing/epoxy-flooring/083.png","/images/services-client/drop-servicing/epoxy-flooring/096.png","/images/services-client/drop-servicing/epoxy-flooring/107.png"],"drop-servicing/architectural-civil":["/images/services-client/drop-servicing/architectural-civil/001.jpg","/images/services-client/drop-servicing/architectural-civil/010.jpg","/images/services-client/drop-servicing/architectural-civil/021.png","/images/services-client/drop-servicing/architectural-civil/022.jpg","/images/services-client/drop-servicing/architectural-civil/055.jpg","/images/services-client/drop-servicing/architectural-civil/068.jpg","/images/services-client/drop-servicing/architectural-civil/070.jpg","/images/services-client/drop-servicing/architectural-civil/084.jpg","/images/services-client/drop-servicing/architectural-civil/098.jpg","/images/services-client/drop-servicing/architectural-civil/119.jpg","/images/services-client/drop-servicing/architectural-civil/147.png"],"custom-theme/rugs":["/images/services-client/custom-theme/rugs/021.png","/images/services-client/custom-theme/rugs/023.png","/images/services-client/custom-theme/rugs/026.png","/images/services-client/custom-theme/rugs/027.png","/images/services-client/custom-theme/rugs/028.png","/images/services-client/custom-theme/rugs/029.png","/images/services-client/custom-theme/rugs/034.png","/images/services-client/custom-theme/rugs/036.png","/images/services-client/custom-theme/rugs/037.png","/images/services-client/custom-theme/rugs/038.png","/images/services-client/custom-theme/rugs/042.png","/images/services-client/custom-theme/rugs/044.png"],"drop-servicing/mirror-glazing/sunroofing-skylight":["/images/services-client/drop-servicing/mirror-glazing/sunroofing-skylight/034.jpg","/images/services-client/drop-servicing/mirror-glazing/sunroofing-skylight/035.jpg","/images/services-client/drop-servicing/mirror-glazing/sunroofing-skylight/042.png","/images/services-client/drop-servicing/mirror-glazing/sunroofing-skylight/074.jpg","/images/services-client/drop-servicing/mirror-glazing/sunroofing-skylight/099.png","/images/services-client/drop-servicing/mirror-glazing/sunroofing-skylight/105.png","/images/services-client/drop-servicing/mirror-glazing/sunroofing-skylight/130.png","/images/services-client/drop-servicing/mirror-glazing/sunroofing-skylight/131.png","/images/services-client/drop-servicing/mirror-glazing/sunroofing-skylight/133.png","/images/services-client/drop-servicing/mirror-glazing/sunroofing-skylight/134.png","/images/services-client/drop-servicing/mirror-glazing/sunroofing-skylight/139.png","/images/services-client/drop-servicing/mirror-glazing/sunroofing-skylight/140.png","/images/services-client/drop-servicing/mirror-glazing/sunroofing-skylight/142.png","/images/services-client/drop-servicing/mirror-glazing/sunroofing-skylight/144.png","/images/services-client/drop-servicing/mirror-glazing/sunroofing-skylight/146.png","/images/services-client/drop-servicing/mirror-glazing/sunroofing-skylight/149.png","/images/services-client/drop-servicing/mirror-glazing/sunroofing-skylight/151.png"],"space-makeover/kitchen":["/images/services-client/space-makeover/kitchen/069.jpg","/images/services-client/space-makeover/kitchen/070.jpg","/images/services-client/space-makeover/kitchen/077.jpg","/images/services-client/space-makeover/kitchen/082.jpg","/images/services-client/space-makeover/kitchen/085.jpg","/images/services-client/space-makeover/kitchen/089.jpg","/images/services-client/space-makeover/kitchen/092.jpg","/images/services-client/space-makeover/kitchen/096.png","/images/services-client/space-makeover/kitchen/098.jpg","/images/services-client/space-makeover/kitchen/107.jpg","/images/services-client/space-makeover/kitchen/109.jpg","/images/services-client/space-makeover/kitchen/111.jpg","/images/services-client/space-makeover/kitchen/112.jpg","/images/services-client/space-makeover/kitchen/116.jpg","/images/services-client/space-makeover/kitchen/118.jpg","/images/services-client/space-makeover/kitchen/119.jpg","/images/services-client/space-makeover/kitchen/120.jpg","/images/services-client/space-makeover/kitchen/125.jpg","/images/services-client/space-makeover/kitchen/130.jpg","/images/services-client/space-makeover/kitchen/131.jpg","/images/services-client/space-makeover/kitchen/134.jpg","/images/services-client/space-makeover/kitchen/136.jpg","/images/services-client/space-makeover/kitchen/137.jpg","/images/services-client/space-makeover/kitchen/138.jpg","/images/services-client/space-makeover/kitchen/140.jpg","/images/services-client/space-makeover/kitchen/142.jpg","/images/services-client/space-makeover/kitchen/144.jpg"],"custom-theme/floor":["/images/services-client/custom-theme/floor/031.png","/images/services-client/custom-theme/floor/035.png","/images/services-client/custom-theme/floor/039.png","/images/services-client/custom-theme/floor/040.png","/images/services-client/custom-theme/floor/041.png","/images/services-client/custom-theme/floor/043.png","/images/services-client/custom-theme/floor/045.webp","/images/services-client/custom-theme/floor/046.png","/images/services-client/custom-theme/floor/047.png"],"drop-servicing/lift-installation":["/images/services-client/drop-servicing/lift-installation/008.png","/images/services-client/drop-servicing/lift-installation/059.png","/images/services-client/drop-servicing/lift-installation/089.png","/images/services-client/drop-servicing/lift-installation/092.png","/images/services-client/drop-servicing/lift-installation/135.png"],"drop-servicing/2d-3d-drawing":["/images/services-client/drop-servicing/2d-3d-drawing/004.jpg","/images/services-client/drop-servicing/2d-3d-drawing/016.jpg","/images/services-client/drop-servicing/2d-3d-drawing/023.png","/images/services-client/drop-servicing/2d-3d-drawing/025.png","/images/services-client/drop-servicing/2d-3d-drawing/033.jpg","/images/services-client/drop-servicing/2d-3d-drawing/053.jpg","/images/services-client/drop-servicing/2d-3d-drawing/067.jpg","/images/services-client/drop-servicing/2d-3d-drawing/076.jpg","/images/services-client/drop-servicing/2d-3d-drawing/077.jpg","/images/services-client/drop-servicing/2d-3d-drawing/082.jpg"],"custom-theme/garden":["/images/services-client/custom-theme/garden/008.png","/images/services-client/custom-theme/garden/009.png","/images/services-client/custom-theme/garden/018.png","/images/services-client/custom-theme/garden/019.png","/images/services-client/custom-theme/garden/020.png","/images/services-client/custom-theme/garden/022.png","/images/services-client/custom-theme/garden/024.png","/images/services-client/custom-theme/garden/025.png","/images/services-client/custom-theme/garden/030.png","/images/services-client/custom-theme/garden/032.png","/images/services-client/custom-theme/garden/033.png"],"space-makeover/bedroom":["/images/services-client/space-makeover/bedroom/151.jpg","/images/services-client/space-makeover/bedroom/152.jpg","/images/services-client/space-makeover/bedroom/156.jpg","/images/services-client/space-makeover/bedroom/159.jpg","/images/services-client/space-makeover/bedroom/161.jpg","/images/services-client/space-makeover/bedroom/162.jpg","/images/services-client/space-makeover/bedroom/166.jpg","/images/services-client/space-makeover/bedroom/180.jpg"],"space-makeover/cafe-restaurant-salon":["/images/services-client/space-makeover/cafe-restaurant-salon/001.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/002.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/005.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/008.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/009.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/010.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/013.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/014.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/015.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/016.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/018.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/019.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/020.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/023.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/028.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/029.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/031.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/033.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/035.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/038.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/041.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/044.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/046.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/048.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/049.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/052.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/053.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/054.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/055.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/058.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/060.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/061.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/063.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/064.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/066.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/067.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/068.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/071.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/072.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/074.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/076.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/078.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/079.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/084.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/087.jpg"],"drop-servicing/garden-setup":["/images/services-client/drop-servicing/garden-setup/011.png","/images/services-client/drop-servicing/garden-setup/012.jpg","/images/services-client/drop-servicing/garden-setup/015.png","/images/services-client/drop-servicing/garden-setup/018.png","/images/services-client/drop-servicing/garden-setup/064.png","/images/services-client/drop-servicing/garden-setup/065.png","/images/services-client/drop-servicing/garden-setup/069.png","/images/services-client/drop-servicing/garden-setup/075.png","/images/services-client/drop-servicing/garden-setup/094.png","/images/services-client/drop-servicing/garden-setup/095.png","/images/services-client/drop-servicing/garden-setup/097.png","/images/services-client/drop-servicing/garden-setup/101.png","/images/services-client/drop-servicing/garden-setup/110.png","/images/services-client/drop-servicing/garden-setup/117.png","/images/services-client/drop-servicing/garden-setup/118.png","/images/services-client/drop-servicing/garden-setup/126.png","/images/services-client/drop-servicing/garden-setup/127.png","/images/services-client/drop-servicing/garden-setup/132.png","/images/services-client/drop-servicing/garden-setup/138.png"],"space-makeover/office":["/images/services-client/space-makeover/office/100.jpg","/images/services-client/space-makeover/office/102.jpg","/images/services-client/space-makeover/office/110.jpg","/images/services-client/space-makeover/office/114.jpg","/images/services-client/space-makeover/office/115.jpg","/images/services-client/space-makeover/office/117.jpg","/images/services-client/space-makeover/office/121.jpg","/images/services-client/space-makeover/office/122.jpg","/images/services-client/space-makeover/office/123.jpg","/images/services-client/space-makeover/office/124.jpg","/images/services-client/space-makeover/office/126.jpg","/images/services-client/space-makeover/office/127.jpg","/images/services-client/space-makeover/office/132.jpg","/images/services-client/space-makeover/office/133.jpg","/images/services-client/space-makeover/office/135.jpg","/images/services-client/space-makeover/office/139.jpg","/images/services-client/space-makeover/office/141.jpg","/images/services-client/space-makeover/office/143.jpg","/images/services-client/space-makeover/office/145.jpg","/images/services-client/space-makeover/office/146.jpg","/images/services-client/space-makeover/office/147.jpg","/images/services-client/space-makeover/office/148.jpg","/images/services-client/space-makeover/office/149.jpg","/images/services-client/space-makeover/office/150.jpg","/images/services-client/space-makeover/office/153.jpg","/images/services-client/space-makeover/office/154.jpg","/images/services-client/space-makeover/office/158.jpg","/images/services-client/space-makeover/office/163.jpg","/images/services-client/space-makeover/office/164.jpg","/images/services-client/space-makeover/office/167.jpg","/images/services-client/space-makeover/office/170.jpg","/images/services-client/space-makeover/office/171.jpg","/images/services-client/space-makeover/office/181.png","/images/services-client/space-makeover/office/183.png"],"custom-theme/furnishing":["/images/services-client/custom-theme/furnishing/001.jpg","/images/services-client/custom-theme/furnishing/002.jpg","/images/services-client/custom-theme/furnishing/003.jpg","/images/services-client/custom-theme/furnishing/004.jpg","/images/services-client/custom-theme/furnishing/005.jpg","/images/services-client/custom-theme/furnishing/006.jpg","/images/services-client/custom-theme/furnishing/007.jpg","/images/services-client/custom-theme/furnishing/010.jpg","/images/services-client/custom-theme/furnishing/011.jpg","/images/services-client/custom-theme/furnishing/012.jpg","/images/services-client/custom-theme/furnishing/013.jpg","/images/services-client/custom-theme/furnishing/014.jpg","/images/services-client/custom-theme/furnishing/015.jpg","/images/services-client/custom-theme/furnishing/016.jpg","/images/services-client/custom-theme/furnishing/017.jpg"],"drop-servicing/windows-doors":["/images/services-client/drop-servicing/windows-doors/002.jpg","/images/services-client/drop-servicing/windows-doors/003.jpg","/images/services-client/drop-servicing/windows-doors/006.jpg","/images/services-client/drop-servicing/windows-doors/014.jpg","/images/services-client/drop-servicing/windows-doors/020.jpg","/images/services-client/drop-servicing/windows-doors/026.jpg","/images/services-client/drop-servicing/windows-doors/029.jpg","/images/services-client/drop-servicing/windows-doors/030.jpg","/images/services-client/drop-servicing/windows-doors/031.jpg","/images/services-client/drop-servicing/windows-doors/060.jpg","/images/services-client/drop-servicing/windows-doors/073.jpg","/images/services-client/drop-servicing/windows-doors/080.jpg","/images/services-client/drop-servicing/windows-doors/081.jpg","/images/services-client/drop-servicing/windows-doors/087.jpg","/images/services-client/drop-servicing/windows-doors/088.jpg","/images/services-client/drop-servicing/windows-doors/090.jpg","/images/services-client/drop-servicing/windows-doors/093.jpg","/images/services-client/drop-servicing/windows-doors/102.jpg","/images/services-client/drop-servicing/windows-doors/116.jpg"],"drop-servicing/nano-coating":["/images/services-client/drop-servicing/nano-coating/013.jpg","/images/services-client/drop-servicing/nano-coating/049.jpg","/images/services-client/drop-servicing/nano-coating/057.jpg","/images/services-client/drop-servicing/nano-coating/058.jpg","/images/services-client/drop-servicing/nano-coating/062.jpg","/images/services-client/drop-servicing/nano-coating/063.jpg","/images/services-client/drop-servicing/nano-coating/066.jpg"],"space-makeover/washroom":["/images/services-client/space-makeover/washroom/007.jpg","/images/services-client/space-makeover/washroom/011.jpg","/images/services-client/space-makeover/washroom/012.jpg","/images/services-client/space-makeover/washroom/017.jpg","/images/services-client/space-makeover/washroom/021.jpg","/images/services-client/space-makeover/washroom/022.jpg","/images/services-client/space-makeover/washroom/024.jpg","/images/services-client/space-makeover/washroom/025.jpg","/images/services-client/space-makeover/washroom/026.jpg","/images/services-client/space-makeover/washroom/030.jpg","/images/services-client/space-makeover/washroom/034.jpg","/images/services-client/space-makeover/washroom/043.jpg","/images/services-client/space-makeover/washroom/047.jpg","/images/services-client/space-makeover/washroom/056.jpg","/images/services-client/space-makeover/washroom/057.jpg","/images/services-client/space-makeover/washroom/062.jpg","/images/services-client/space-makeover/washroom/065.jpg","/images/services-client/space-makeover/washroom/081.jpg","/images/services-client/space-makeover/washroom/086.jpg","/images/services-client/space-makeover/washroom/090.jpg","/images/services-client/space-makeover/washroom/091.jpg","/images/services-client/space-makeover/washroom/093.jpg","/images/services-client/space-makeover/washroom/095.jpg","/images/services-client/space-makeover/washroom/099.jpg"],"drop-servicing/mirror-glazing/partitions":["/images/services-client/drop-servicing/mirror-glazing/partitions/027.jpg","/images/services-client/drop-servicing/mirror-glazing/partitions/037.jpg","/images/services-client/drop-servicing/mirror-glazing/partitions/038.jpg","/images/services-client/drop-servicing/mirror-glazing/partitions/115.jpg","/images/services-client/drop-servicing/mirror-glazing/partitions/123.jpg","/images/services-client/drop-servicing/mirror-glazing/partitions/129.jpg","/images/services-client/drop-servicing/mirror-glazing/partitions/136.jpg","/images/services-client/drop-servicing/mirror-glazing/partitions/150.jpg"]}
const clientServiceCategories = {
  'space-designing-makeover': [
    ['space-makeover/bedroom','space-makeover/living-room','space-makeover/kitchen','space-makeover/puja-room','space-makeover/washroom','space-makeover/office','space-makeover/stairs','space-makeover/cafe-restaurant-salon'],
    ['space-makeover/office','space-makeover/stairs','space-makeover/living-room'],
    ['space-makeover/cafe-restaurant-salon','space-makeover/bedroom','space-makeover/puja-room'],
    ['space-makeover/kitchen','space-makeover/washroom','space-makeover/living-room'],
  ],
  'drop-servicing-installation': [
    ['drop-servicing/architectural-civil'],
    ['drop-servicing/2d-3d-drawing'],
    ['drop-servicing/mirror-glazing/glass-doors','drop-servicing/mirror-glazing/partitions','drop-servicing/mirror-glazing/sunroofing-skylight'],
    ['drop-servicing/windows-doors'],
    ['drop-servicing/ac-electrical'],
    ['drop-servicing/garden-setup'],
    ['drop-servicing/epoxy-flooring'],
    ['drop-servicing/indian-artis'],
    ['drop-servicing/curtains-blinds'],
    ['drop-servicing/nano-coating'],
    ['drop-servicing/lift-installation'],
  ],
  'customized-theme-products': [
    ['custom-theme/floor'],
    [], // No wall-panel images supplied; retain the existing, relevant illustrations.
    ['custom-theme/rugs'],
    ['custom-theme/furnishing'],
    ['custom-theme/garden'],
  ],
}
const clientRoomLabels = {
  'bedroom': 'Bedroom', 'cafe-restaurant-salon': 'Cafe, Restaurant & Salon',
  'kitchen': 'Kitchen', 'living-room': 'Living Room', 'office': 'Office',
  'puja-room': 'Puja Room', 'stairs': 'Staircase', 'washroom': 'Washroom',
}


/* VASUPRIY_SPACE_PROCESS_BENEFITS_CLIENT_IMAGES_V1 */
const spaceProcessAndBenefitsPhotos = ["/images/services-client/space-makeover/living-room/027.jpg","/images/services-client/space-makeover/office/100.jpg","/images/services-client/space-makeover/kitchen/069.jpg","/images/services-client/space-makeover/cafe-restaurant-salon/001.jpg","/images/services-client/space-makeover/washroom/007.jpg","/images/services-client/space-makeover/stairs/129.jpg","/images/services-client/space-makeover/bedroom/151.jpg","/images/services-client/space-makeover/puja-room/003.jpg"]

/* VASUPRIY_CONTENT_PAIRED_SECTIONS_V2: Preserve every original PDF paragraph. */
function groupDropContent(blocks) {
  const groups = []
  for (const block of blocks) {
    if (block.type === 'heading') {
      groups.push({ title: block.text, blocks: [] })
    } else {
      if (!groups.length) groups.push({ title: '', blocks: [] })
      groups[groups.length - 1].blocks.push(block)
    }
  }
  return groups
}

// Mirror partitions and walls: dedicated conceptual images, not client project photography.
const mirrorPartitionPhotos = [
  '/images/services/mirror-partitions/mirror-glass-divider.webp',
  '/images/services/mirror-partitions/bronze-mirror-partition.webp',
]
function dropSectionPhotoKey(title, selectedKeys) {
  const heading = title.toLowerCase()
  if (/wiring|electrical|lighting|ac |air.condition/.test(heading)) return 'drop-servicing/ac-electrical'
  if (/glass door/.test(heading)) return 'drop-servicing/mirror-glazing/glass-doors'
  if (/partition/.test(heading)) return 'drop-servicing/mirror-glazing/partitions'
  if (/skylight|sunroof/.test(heading)) return 'drop-servicing/mirror-glazing/sunroofing-skylight'
  if (/mirror|glaz/.test(heading)) return 'drop-servicing/mirror-glazing/glass-doors'
  if (/plumb|civil|ceiling|structure/.test(heading)) return 'drop-servicing/architectural-civil'
  if (/drawing|3d|2d|grfc/.test(heading)) return 'drop-servicing/2d-3d-drawing'
  if (/curtain|blind/.test(heading)) return 'drop-servicing/curtains-blinds'
  if (/garden|landscap|plant/.test(heading)) return 'drop-servicing/garden-setup'
  if (/floor|epoxy/.test(heading)) return 'drop-servicing/epoxy-flooring'
  if (/lift|elevator/.test(heading)) return 'drop-servicing/lift-installation'
  if (/coating|nano/.test(heading)) return 'drop-servicing/nano-coating'
  if (/artisan|artistr|painting|mural|craft/.test(heading)) return 'drop-servicing/indian-artis'
  if (/door|window/.test(heading)) return 'drop-servicing/windows-doors'
  return selectedKeys[0] || 'drop-servicing/architectural-civil'
}

/* VASUPRIY_OTHER_SERVICES_CONTENT_PHOTOS_V1 */
function ServiceDetail() {
  const location = useLocation()
  const slug = location.pathname.split('/').filter(Boolean).at(-1)

  const service = serviceData[slug]
  const [selectedIndex, setSelectedIndex] = useState(0)
  const articleRef = useRef(null)
  // VASUPRIY_MOBILE_SERVICE_AUTOSCROLL_V1
  const handleServiceSelect = (index) => {
    setSelectedIndex(index)

    if (typeof window === 'undefined' || window.innerWidth > 1024) {
      return
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const article = articleRef.current
        if (!article) return

        const headerOffset = 110
        const top =
          article.getBoundingClientRect().top +
          window.scrollY -
          headerOffset

        window.scrollTo({
          top: Math.max(0, top),
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
        })
      })
    })
  }

  useEffect(() => {
    setSelectedIndex(0)
  }, [slug])

  if (!service) {
    return (
      <main style={{ padding: '160px 24px 80px', textAlign: 'center' }}>
        <h1>Service not found</h1>
        <Link to="/interior-services">View all services</Link>
      </main>
    )
  }

  const selected = service.items[selectedIndex] || service.items[0]
  const imageGroup = serviceImages[slug]
  const selectedClientCategoryKeys = clientServiceCategories[slug]?.[selectedIndex] || []
  const selectedClientGroups = selectedClientCategoryKeys.map((key) => ({
    key,
    label: clientRoomLabels[key.split('/').pop()] || selected.title,
    images: clientServicePhotos[key] || [],
  })).filter((group) => group.images.length > 0)
  const existingSelectedImages = (imageGroup?.items[selectedIndex] || []).map(findImage).filter(Boolean)
  const selectedImages = selectedClientGroups.length > 0
    ? selectedClientGroups.flatMap((group) => group.images).slice(0, 5)
    : existingSelectedImages
  // VASU_CUSTOM_SELECTED_CONTENT_V3: all custom-product panels follow the active sidebar item.
  const customSelectedPhotos = selectedClientGroups.flatMap((group) => group.images)
  const customSelectedPhoto = customSelectedPhotos[0] || existingSelectedImages[0] || findImage('premium-wall-panels-51.jpg')
  const customSelectedEditorial = serviceEditorial[selected.title]

  return (
    <main className={`vasu-service-page ${slug === 'space-designing-makeover' ? 'vasu-service-page--space-makeover' : ''}`}>
      <section
        className="vasu-service-hero"
        style={{
          backgroundImage: imageGroup?.hero && findImage(imageGroup.hero)
            ? `linear-gradient(90deg, rgba(3,35,42,.91), rgba(3,35,42,.55)), url("${findImage(imageGroup.hero)}")`
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="vasu-service-container">
          <span className="vasu-service-eyebrow">
            VASUPRIY INTERIOVILLA / SERVICES
          </span>

          <h1>{service.title}</h1>
          <p>{service.subtitle}</p>

          <div className="vasu-service-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/interior-services">Services</Link>
            <span>/</span>
            <span>{service.title}</span>
          </div>
        </div>
      </section>

      <section className="vasu-service-main">
        <div className="vasu-service-container vasu-service-layout">
          <aside className="vasu-service-sidebar">
            <div className="vasu-service-sidebar-inner">
              <span className="vasu-service-sidebar-eyebrow">
                EXPLORE SERVICES
              </span>

              <h2>Our Expertise</h2>

              <div className="vasu-service-sidebar-list">
                {service.items.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    className={`vasu-service-sidebar-item ${
                      selectedIndex === index ? 'active' : ''
                    }`}
                    aria-pressed={selectedIndex === index}
                    onClick={() => handleServiceSelect(index)}
                  >
                    <span className="vasu-service-sidebar-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span>{item.title}</span>

                    <span aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>

              <div className="vasu-service-sidebar-cta">
                <span>HAVE A PROJECT IN MIND?</span>
                <h3>Let's create something beautiful.</h3>
                <Link to="/contact">Book a Consultation ↗</Link>
              </div>

              {/* VASUPRIY MORE SERVICES CARD V1 */}
              <div className="vasu-more-services">
                <span className="vasu-more-services-eyebrow">
                  DISCOVER MORE
                </span>

                <h3>Explore More Services</h3>

                <p>
                  Discover more ways to transform your space
                  with our thoughtfully curated solutions.
                </p>

                <div className="vasu-more-services-list">
                  {Object.entries(serviceData)
                    .filter(([serviceSlug]) => serviceSlug !== slug)
                    .map(([serviceSlug, otherService], index) => (
                      <Link
                        key={serviceSlug}
                        to={`/services/${serviceSlug}`}
                        className="vasu-more-services-link"
                      >
                        <span className="vasu-more-services-number">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <span className="vasu-more-services-name">
                          {otherService.title}
                        </span>

                        <span
                          className="vasu-more-services-arrow"
                          aria-hidden="true"
                        >
                          &#8599;
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
            

</aside>

          <article className="vasu-service-content" ref={articleRef}>
            <span className="vasu-service-content-eyebrow">
              {slug === 'space-designing-makeover' ? "WHAT'S INCLUDED" : 'OUR DESIGN SOLUTIONS'}
            </span>

            <h2>{selected.title}</h2>

            <p className="vasu-service-lead">
              {selected.description || service.description}
            </p>
            {slug === 'space-designing-makeover' && selectedClientGroups.length > 0 && (
              <div className="vasu-space-client-galleries" aria-label={`${selected.title} related client photographs`}>
                {selectedClientGroups.map((group) => (
                  <section className="vasu-space-client-category" key={group.key} style={{ margin: '24px 0' }}>
                    <h3 style={{ marginBottom: 12 }}>{group.label}</h3>
                    <div className="vasu-pdf-gallery">
                      {group.images.slice(0, 2).map((src, index) => (
                        <img key={src} src={src} loading="lazy" decoding="async" alt={`${group.label} project photograph ${index + 1}`} />
                      ))}
                    </div>
                    {group.images.length > 2 && (
                      <details style={{ marginTop: 12 }}>
                        <summary style={{ cursor: 'pointer', fontWeight: 600 }}>View more {group.label} photos ({group.images.length - 2})</summary>
                        <div className="vasu-pdf-gallery" style={{ marginTop: 14 }}>
                          {group.images.slice(2).map((src, index) => (
                            <img key={src} src={src} loading="lazy" decoding="async" alt={`${group.label} project photograph ${index + 3}`} />
                          ))}
                        </div>
                      </details>
                    )}
                  </section>
                ))}
              </div>
            )}

            {slug !== 'space-designing-makeover' && serviceEditorial[selected.title] && (
              <div className="vasu-service-editorial-intro">
                <span className="vasu-service-editorial-eyebrow">A CLOSER LOOK</span>
                <p>{serviceEditorial[selected.title].intro}</p>
              </div>
            )}
            {slug === 'drop-servicing-installation' && (
              <div className="vasu-drop-pdf-detail" key={selectedIndex}>
                <span className="vasu-drop-pdf-eyebrow">VASUPRIY INTERIOVILLA / SERVICE DETAILS</span>
                {groupDropContent(dropPdfDetails[selectedIndex] || []).map((group, groupIndex) => {
                  const photoKey = dropSectionPhotoKey(group.title, selectedClientCategoryKeys)
                  const photos = selectedIndex === 2 && /mirror partitions|mirror.*walls/i.test(group.title) ? mirrorPartitionPhotos : (clientServicePhotos[photoKey] || selectedImages)
                  const exteriorVisual = /3d\s+elevation\s*&\s*interior\s*\/\s*exterior\s+rendering/i.test(group.title)
                    ? '/images/services/exterior/elevation-exterior-rendering.webp'
                    : /grfc.*drawings.*detailing/i.test(group.title)
                      ? '/images/services/exterior/grfc-facade-detailing.webp'
                      : null
                  const imageSrc = exteriorVisual || photos[groupIndex % photos.length] || selectedImages[0]
                  return (
                    <section className="vasu-drop-content-pair" key={`${selectedIndex}-${groupIndex}`}>
                      {imageSrc && (
                        <figure className="vasu-drop-content-pair-photo">
                          <img src={imageSrc} alt={exteriorVisual ? `${group.title} architectural concept illustration` : `${group.title || selected.title} client project photograph`} loading="lazy" decoding="async" />
                        </figure>
                      )}
                      <div className="vasu-drop-content-pair-copy">
                        {group.title && <h3>{group.title}</h3>}
                        {group.blocks.map((block, i) =>
                          block.type === 'bullet' ? <p className="vasu-drop-pdf-bullet" key={i}>{block.text}</p> :
                          block.type === 'cta' ? <p className="vasu-drop-pdf-cta" key={i}>{block.text}</p> :
                          <p key={i}>{block.text}</p>
                        )}
                      </div>
                    </section>
                  )
                })}
              </div>
            )}
            {/* VASUPRIY_CUSTOM_PRODUCTS_PDF_V1 + SELECTED_CONTENT_V3 */}
            {slug === 'customized-theme-products' && (
              <div className="vasu-custom-pdf-detail" key={`custom-content-${selectedIndex}`}>
                <section className="vasu-custom-pdf-section">
                  <span className="vasu-custom-pdf-eyebrow">01 / INTRODUCTION</span>
                  <h3>{selected.title} — Introduction</h3>
                  <div className="vasu-custom-copy-image-pair">
                    {customSelectedPhoto && <img src={customSelectedPhoto} alt={`${selected.title} client portfolio inspiration`} loading="lazy" decoding="async" />}
                    <div>
                      <p>{customSelectedEditorial?.intro || selected.description}</p>
                      <p>Every home tells a unique story, and your living space should reflect your distinct personality. At Vasupriy Interiovilla, we move beyond off-the-shelf options to bring you customized products that fit your exact lifestyle and spatial dimensions.</p>
                    </div>
                  </div>
                </section>
                <section className="vasu-custom-pdf-section">
                  <span className="vasu-custom-pdf-eyebrow">02 / EXPERT GUIDANCE</span>
                  <h3>Expert Guidance for {selected.title}</h3>
                  <div className="vasu-custom-copy-image-pair vasu-custom-copy-image-pair--reverse">
                    {customSelectedPhoto && <img src={customSelectedPhotos[1] || customSelectedPhoto} alt={`${selected.title} materials and expert guidance`} loading="lazy" decoding="async" />}
                    <div>
                      <p>Personalized interior design is not just about making products—it is about listening to you. We blend market trends with your individual aesthetic.</p>
                      <p>{customSelectedEditorial?.approach}</p>
                      <div className="vasu-custom-pdf-points">
                        {(customSelectedEditorial?.highlights || []).map((point, index) => (
                          <div key={`${selected.title}-${index}`}><strong>{String(index + 1).padStart(2, '0')} / </strong>{point}</div>
                        ))}
                        <div><strong>Understanding Your Needs:</strong> We ensure every piece serves you perfectly.</div>
                        <div><strong>Tailored Suggestions:</strong> Based on your room size and layout, we recommend the most suitable materials.</div>
                        <div><strong>Visualizing Before Creating:</strong> We provide samples and previews so you can see the vision.</div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="vasu-custom-pdf-section">
                  <span className="vasu-custom-pdf-eyebrow">03 / OUR PRODUCTS</span>
                  <h3>What We Customize — {selected.title}</h3>
                  <div className="vasu-custom-pdf-products vasu-custom-pdf-products--selected">
                    <div className="vasu-custom-pdf-product vasu-client-custom-product is-selected" key={selected.title}>
                      {customSelectedPhoto && <img className="vasu-client-custom-product-photo" src={customSelectedPhotos[2] || customSelectedPhoto} loading="lazy" decoding="async" alt={`${selected.title} project photograph`} />}
                      <div className="vasu-client-custom-product-copy">
                        <span>{String(selectedIndex + 1).padStart(2, '0')}</span>
                        <div><h4>{selected.title}</h4><p>{selected.description}</p><p>{customSelectedEditorial?.intro}</p></div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="vasu-custom-pdf-section">
                  <span className="vasu-custom-pdf-eyebrow">04 / THE PROCESS</span>
                  <h3>Step-by-Step Customization — {selected.title}</h3>
                  <div className="vasu-custom-pdf-steps">
                    {['Share Your Theme', 'Design & Concept Planning', 'Material Selection', 'Crafting & Installation'].map((step, index) => (
                      <div className="vasu-client-custom-step" key={`${selected.title}-${step}`}>
                        {customSelectedPhoto && <img src={customSelectedPhotos[index % customSelectedPhotos.length] || customSelectedPhoto} alt={`${step} — ${selected.title} inspiration`} loading="lazy" decoding="async" />}
                        <div><span>0{index + 1}</span><h4>{step}</h4></div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {slug === 'customized-theme-products' && selectedImages.length > 0 && (
              <div
                className="vasu-service-image-gallery"
                style={{ margin: '30px 0 38px' }}
              >
                <div
                  style={{
                    overflow: 'hidden',
                    borderRadius: '16px',
                    aspectRatio: '16 / 10',
                    background: '#eae5db',
                  }}
                >
                  <img
                    key={selectedImages[0]}
                    src={selectedImages[0]}
                    alt={`${selected.title} interior design example`}
                    loading="lazy"
                    decoding="async"
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>

                {selectedImages.length > 1 && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
                      gap: '14px',
                      marginTop: '14px',
                    }}
                  >
                    {selectedImages.slice(1).map((src, index) => (
                      <div
                        key={src}
                        style={{
                          overflow: 'hidden',
                          borderRadius: '12px',
                          aspectRatio: '4 / 3',
                          background: '#eae5db',
                        }}
                      >
                        <img
                          src={src}
                          alt={`${selected.title} related interior example ${index + 2}`}
                          loading="lazy"
                          decoding="async"
                          style={{
                            display: 'block',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          
            {slug === 'customized-theme-products' && (
              <div className="vasu-custom-pdf-cta">
                <h3>Have a Specific Theme or Design in Mind?</h3>
                <Link to="/contact">Connect with Vasupriy Interiovilla Today!</Link>
              </div>
            )}
            <div className="vasu-service-inline-details">
<div className="vasu-service-fullwidth-heading">
            <span className="vasu-service-editorial-eyebrow">MORE ABOUT THIS SERVICE</span>
            <h2>{selected.title} &mdash; The Details</h2>
          </div>
        <div className="vasu-service-gallery-showcase">
          <div className="vasu-sidebar-vertical-gallery">
              {selectedImages.slice(0, 2)
                .map((src, index) => (
                  <div
                    className="vasu-sidebar-gallery-image"
                    key={src}
                  >
                    <img
                      src={src}
                      alt={`${service.title} design inspiration ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
            </div>
        </div>

{slug !== 'space-designing-makeover' && serviceEditorial[selected.title] && (
              <>
                <section className="vasu-service-editorial-focus">
                  <span className="vasu-service-editorial-eyebrow">THE DETAILS THAT MATTER</span>
                  <h3>What We Focus On</h3>
                  <div className="vasu-service-editorial-points">
                    {serviceEditorial[selected.title].highlights.map((point, index) => (
                      <div className="vasu-service-editorial-point" key={point}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <div>{point}</div>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="vasu-service-editorial-approach">
                  <span className="vasu-service-editorial-eyebrow">OUR APPROACH</span>
                  <h3>Designed Around Your Requirements</h3>
                  <p>{serviceEditorial[selected.title].approach}</p>
                </section>
              </>
            )}
            <div className="vasu-service-content-divider" />

            {slug !== 'space-designing-makeover' && (<>
<h3>Thoughtfully Designed for Your Space</h3>

            <p>{service.description}</p>
</>)}
            </div>
          </article>
        </div>
        {/* VASUPRIY FULL WIDTH SERVICE DETAILS V1 */}
        <div className="vasu-service-container vasu-service-fullwidth">
          {/* VASUPRIY_SPACE_PDF_CONTENT_V1 â€” exact text from supplied Space Designing & Makeover PDF */}
          {slug === 'space-designing-makeover' && (
            <div className="vasu-pdf-service">
              {/* VASUPRIY_SPACE_DUPLICATE_CLEANUP_V1: Services are presented in the interactive sidebar and selected service article. */}
              <section className="vasu-pdf-section" aria-labelledby="vasu-space-process">
                <div className="vasu-pdf-section-heading"><span>02 / THE PROCESS</span><h2 id="vasu-space-process">How We Bring Your Space to Life</h2></div>
                <div className="vasu-pdf-grid vasu-pdf-grid--two">
                  {[
                    ['Vision & Assessment', 'Understanding lifestyle, preferences, and budget while evaluating current space.'],
                    ['Layout & Concept Design', 'Developing strategic space planning frameworks, 2D/3D layouts, and mood boards.'],
                    ['Material & Element Finalization', 'Selecting the finest wallpapers, furnishings, and decor elements.'],
                    ['Seamless Execution', 'On-ground team handling the entire room transformation with zero hassle.'],
                  ].map(([title, detail], index) => (
                    <div className="vasu-pdf-step vasu-space-illustrated-card" key={title}>
                      <img className="vasu-space-card-photo" src={['/images/services/process/01-vision-assessment.webp', '/images/services/process/02-layout-concept-design.webp', '/images/services/process/03-material-finalization.webp', '/images/services/process/04-seamless-execution.webp'][index]} alt={`${title} â€” interior project inspiration`} loading="lazy" decoding="async" />
                      <span>STEP {index + 1}</span><h3>{title}</h3><p>{detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="vasu-pdf-section" aria-labelledby="vasu-space-why">
                <div className="vasu-pdf-section-heading"><span>04 / WHY CHOOSE US</span><h2 id="vasu-space-why">Why Opt for Our Space Makeover?</h2></div>
                <div className="vasu-pdf-grid vasu-pdf-grid--two">
                  {[
                    ['Cost-Effective & Smart', 'Brand-new, luxurious look through targeted space enhancement without full-scale renovation costs.'],
                    ['Maximum Utility', 'Precise space planning and layout optimization for even the tightest spaces.'],
                    ['Tailored to You', 'Unique aesthetic designs built entirely around your personal taste.'],
                    ['Hassle-Free Expertise', 'Dedicated interior design professionals managing everything from start to finish.'],
                  ].map(([title, detail], index) => (
                    <div className="vasu-pdf-benefit vasu-space-illustrated-card" key={title}>
                      <img className="vasu-space-card-photo" src={spaceProcessAndBenefitsPhotos[index + 4]} alt={`${title} â€” interior project inspiration`} loading="lazy" decoding="async" />
                      <div className="vasu-space-benefit-copy"><span aria-hidden="true">&#10003;</span><div><h3>{title}</h3><p>{detail}</p></div></div>
                    </div>
                  ))}
                </div>
              </section>
              <div className="vasu-pdf-cta"><h2>Ready to Give Your Room a Fresh New Vibe?</h2><Link to="/contact">Connect with Vasupriy Interiovilla Today! <span aria-hidden="true">&#8599;</span></Link></div>
            </div>
          )}
          {slug !== 'space-designing-makeover' && (<>
          <div className="vasu-service-process">
              <div>
                <span>01</span>
                <h4>Understand</h4>
                <p>We discuss your space, preferences and requirements.</p>
              </div>

              <div>
                <span>02</span>
                <h4>Design</h4>
                <p>We develop a suitable concept and execution approach.</p>
              </div>

              <div>
                <span>03</span>
                <h4>Deliver</h4>
                <p>We coordinate the work to bring the concept to life.</p>
              </div>
            </div>

            </>)}
{/* <Link to="/contact" className="vasu-service-primary-cta">
              Discuss Your Project <span aria-hidden="true">↗</span>
            </Link> */}
        </div>

      </section>
    </main>
  )
}

export default ServiceDetail