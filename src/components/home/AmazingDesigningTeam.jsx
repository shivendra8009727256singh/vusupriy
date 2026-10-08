import { useState } from 'react'
import './AmazingDesigningTeam.css'

import arunImage from '../../assets/images/home/team/arun-sharma.png'
import priyankaImage from '../../assets/images/home/team/priyanka.png'
import priyaImage from '../../assets/images/home/team/priya.png'
import anujImage from '../../assets/images/home/team/anuj-pratap-singh.png'

const teamMembers = [
  {
    id: 'arun',
    number: '01',
    name: 'Arun Sharma',
    role: 'Architectural Design',
    image: arunImage,
    description:
      'A bedroom is more than just a place to sleep—it is a personal sanctuary where comfort, relaxation, and style come together.',
  },
  {
    id: 'priyanka',
    number: '02',
    name: 'Priyanka',
    role: 'Interior Design & Planning',
    image: priyankaImage,
    description:
      'From big-picture layouts to the finest details, we bring your ideas to life with creativity, thoughtful planning, and precision.',
  },
  {
    id: 'priya',
    number: '03',
    name: 'Priya',
    role: 'Quality Management',
    image: priyaImage,
    description:
      'Every detail matters. We focus on quality, refined finishes, and careful attention to create spaces that feel exceptional.',
  },
  {
    id: 'anuj',
    number: '04',
    name: 'Anuj Pratap Singh',
    role: 'Project Management',
    image: anujImage,
    description:
      'From planning to final handover, we coordinate every stage to turn creative concepts into beautifully executed spaces.',
  },
]

export default function AmazingDesigningTeam() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeMember = teamMembers[activeIndex]

  return (
    <section
      className="amazing-team"
      id="amazing-designing-team"
      aria-labelledby="amazing-team-title"
      data-scroll-section
    >
      <div className="site-container amazing-team-container">
        <header className="amazing-team-header">
          <span className="amazing-team-eyebrow">
            <span aria-hidden="true">✦</span>
            THE PEOPLE BEHIND THE SPACES
          </span>

          <h2 id="amazing-team-title">
            Our Amazing <em>Designing Team</em>
          </h2>

          <p>
            Meet the creative minds and dedicated professionals
            who transform thoughtful ideas into inspiring interiors.
          </p>
        </header>

        <div className="amazing-team-showcase">
          <div className="amazing-team-feature">
            <div className="amazing-team-feature-image">
              {teamMembers.map((member, index) => (
                <img
                  key={member.id}
                  src={member.image}
                  alt={`${member.name} — ${member.role}`}
                  className={
                    index === activeIndex
                      ? 'amazing-team-portrait is-active'
                      : 'amazing-team-portrait'
                  }
                  aria-hidden={index !== activeIndex}
                  loading="lazy"
                  decoding="async"
                />
              ))}

              <div className="amazing-team-image-shade" />

              <span className="amazing-team-image-index">
                {activeMember.number} / 04
              </span>
            </div>

            <div
              className="amazing-team-feature-caption"
              key={activeMember.id}
              aria-live="polite"
            >
              <span>{activeMember.role}</span>
              <h3>{activeMember.name}</h3>
              <p>{activeMember.description}</p>
            </div>
          </div>

          <div
            className="amazing-team-members"
            aria-label="Meet our team members"
          >
            {teamMembers.map((member, index) => {
              const isActive = activeIndex === index

              return (
                <button
                  key={member.id}
                  type="button"
                  className={
                    isActive
                      ? 'amazing-team-member is-active'
                      : 'amazing-team-member'
                  }
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                >
                  <span className="amazing-team-member-number">
                    {member.number}
                  </span>

                  <span className="amazing-team-member-info">
                    <span className="amazing-team-member-role">
                      {member.role}
                    </span>

                    <span className="amazing-team-member-name">
                      {member.name}
                    </span>

                    <span className="amazing-team-member-description">
                      {member.description}
                    </span>
                  </span>

                  <span className="amazing-team-member-avatar">
                    <img
                      src={member.image}
                      alt=""
                      loading="lazy"
                    />
                  </span>

                  <span
                    className="amazing-team-member-arrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="amazing-team-footer">
          <span className="amazing-team-footer-line" />
          <p>
            Different expertise. One shared vision.
            <strong> Beautifully designed spaces.</strong>
          </p>
          <span className="amazing-team-footer-line" />
        </div>
      </div>
    </section>
  )
}
