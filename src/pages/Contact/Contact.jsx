import { useEffect, useRef, useState } from "react";
import {
  contactInfo,
  validateContactForm,
  submitContactMessage,
} from "../../data/contactInfo.js";
import heroImage from "../../assets/contact/contactheader.png";
import studioImage from "../../assets/images/home/hero-interior.png";
import "./Contact.css";

const emptyForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  message: "",
};
const fields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    autoComplete: "given-name",
    maxLength: 80,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    autoComplete: "family-name",
    maxLength: 80,
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    autoComplete: "tel",
    maxLength: 32,
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    autoComplete: "email",
    maxLength: 254,
  },
];

function ContactIcon({ type }) {
  const paths = {
    phone: (
      <path d="M5 3h4l2 5-3 2a17 17 0 0 0 6 6l2-3 5 2v4c0 1-1 2-2 2C9 21 3 15 3 5c0-1 1-2 2-2Z" />
    ),
    email: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    location: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[type]}
    </svg>
  );
}

function SocialIcon({ type }) {
  const paths = {
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    facebook: (
      <path d="M14 8h2V5h-2c-2 0-3 1.5-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8.5c0-.3.2-.5.5-.5Z" />
    ),
    youtube: (
      <>
        <rect x="2.5" y="6" width="19" height="12" rx="4" />
        <path d="m10.5 9.8 4.5 2.2-4.5 2.2Z" fill="currentColor" stroke="none" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[type]}
    </svg>
  );
}

function Contact() {
  const rootRef = useRef(null);
  const formRef = useRef(null);
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [sending, setSending] = useState(false);
  const pendingRef = useRef(false);
  const mountedRef = useRef(true);
  const mapUrl =
    contactInfo.mapEmbedUrl ||
    (contactInfo.address
      ? `https://www.google.com/maps?q=${encodeURIComponent(contactInfo.address)}&output=embed`
      : "");

  useEffect(() => {
    mountedRef.current = true;
    const previousTitle = document.title;
    document.title = "Contact Us | Vasupriy Interiovilla";
    const root = rootRef.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer;
    if (!preference.matches && window.IntersectionObserver) {
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("contact-revealed");
              observer.unobserve(entry.target);
            }
          }),
        { threshold: 0.08 },
      );
      root.classList.add("contact-motion");
      root
        .querySelectorAll("[data-contact-reveal]")
        .forEach((element) => observer.observe(element));
    }
    return () => {
      mountedRef.current = false;
      observer?.disconnect();
      root.classList.remove("contact-motion");
      document.title = previousTitle;
    };
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setFeedback(null);
  }

  function validateField(event) {
    const name = event.target.name;
    setErrors((current) => ({
      ...current,
      [name]: validateContactForm(values)[name],
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (pendingRef.current) return;
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    setFeedback(null);
    if (Object.keys(nextErrors).length) {
      formRef.current.elements.namedItem(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    pendingRef.current = true;
    setSending(true);
    try {
      await submitContactMessage(
        contactInfo.submissionEndpoint,
        Object.fromEntries(
          Object.entries(values).map(([key, value]) => [key, value.trim()]),
        ),
      );
      if (mountedRef.current) {
        setFeedback({
          success: true,
          message:
            "Thank you. Your message has been received. We look forward to speaking with you.",
        });
        setValues(emptyForm);
      }
    } catch (error) {
      if (mountedRef.current)
        setFeedback({ success: false, message: error.message });
    } finally {
      pendingRef.current = false;
      if (mountedRef.current) setSending(false);
    }
  }

  const contactBlocks = [
    {
      type: "phone",
      label: "Phone Number",
      value: contactInfo.phone,
      href: contactInfo.phone
        ? `tel:${contactInfo.phone.replace(/[^+\d]/g, "")}`
        : null,
      description: "A conversation is a wonderful place to begin.",
    },
    {
      type: "email",
      label: "Email Address",
      value: contactInfo.email,
      href: contactInfo.email ? `mailto:${contactInfo.email}` : null,
      description: "Share your ideas, questions and inspiration.",
    },
    {
      type: "location",
      label: "Our Location",
      value: contactInfo.address,
      href: contactInfo.address
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`
        : null,
      description: "A space for ideas, materials and possibilities.",
    },
  ];

  return (
    <div className="contact-page" ref={rootRef}>
      <section className="contact-hero" aria-labelledby="contact-title">
        <img
          src={heroImage}
          className="contact-hero-image"
          alt=""
          fetchPriority="high"
        />
        <div className="site-container contact-hero-content">
          <span className="section-label">A beautiful space starts here</span>
          <h1 id="contact-title">
            Contact <em>Us.</em>
          </h1>
          <p>
            Tell us what you're imagining. Let's shape a space that feels like
            you.
          </p>
        </div>
      </section>

      <section className="contact-marquee" aria-label="Our design services">
        <div className="contact-marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {contactInfo.services.map((service) => (
                <li key={service}>
                  <span>{service}</span>
                  <span className="contact-marquee-star" aria-hidden="true">
                    ✦
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      <section
        className="contact-information"
        aria-labelledby="contact-information-title"
      >
        <div className="site-container">
          <div className="contact-section-heading" data-contact-reveal>
            <div>
              <span className="section-label">Let's connect</span>
              <h2 id="contact-information-title">
                Get In <em>Touch.</em>
              </h2>
            </div>
            <p>
              From a single room to an entire project, we'd love to hear your
              vision and explore the possibilities together.
            </p>
          </div>
          <div className="contact-info-grid">
            {contactBlocks.map((block) => (
              <div
                className="contact-info-card"
                key={block.type}
                data-contact-reveal
              >
                <span className="contact-icon">
                  <ContactIcon type={block.type} />
                </span>
                <h3>{block.label}</h3>
                {block.href ? (
                  <a href={block.href}>{block.value}</a>
                ) : (
                  <span className="contact-unconfigured">
                    Details coming soon
                  </span>
                )}
                <p>{block.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="contact-message-section"
        aria-labelledby="contact-message-title"
      >
        <div className="site-container contact-message-grid">
          <div className="contact-message-visual" data-contact-reveal>
            <img
              src={studioImage}
              alt="Warm contemporary interior with thoughtfully selected furniture and finishes"
              loading="lazy"
              decoding="async"
              width="900"
              height="1200"
            />
            <div className="contact-image-caption">
              <span>Thoughtfully designed. Personally yours.</span>
              <p>
                Every great space begins with <em>a conversation.</em>
              </p>
            </div>
          </div>
          <div className="contact-form-panel" data-contact-reveal>
            <span className="section-label">Get In Touch</span>
            <h2 id="contact-message-title">
              Send Us A <em>Message.</em>
            </h2>
            <p className="contact-form-intro">
              Tell us about your space and what you have in mind. We'd love to
              help you take the next step.
            </p>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              aria-busy={sending}
            >
              <p className="contact-required-note">
                Fields marked * are required.
              </p>
              <div className="contact-form-grid">
                {fields.map((field) => (
                  <div className="contact-field" key={field.name}>
                    <label htmlFor={`contact-${field.name}`}>
                      {field.label} <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id={`contact-${field.name}`}
                      {...field}
                      required
                      value={values[field.name]}
                      onChange={updateField}
                      onBlur={validateField}
                      disabled={sending}
                      aria-invalid={!!errors[field.name]}
                      aria-describedby={
                        errors[field.name]
                          ? `contact-${field.name}-error`
                          : undefined
                      }
                    />
                    {errors[field.name] && (
                      <p
                        className="contact-field-error"
                        id={`contact-${field.name}-error`}
                      >
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
                <div className="contact-field contact-message-field">
                  <label htmlFor="contact-message">
                    Message <span className="contact-optional">(optional)</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    maxLength={2000}
                    value={values.message}
                    onChange={updateField}
                    onBlur={validateField}
                    disabled={sending}
                    placeholder="Your space, your ideas, your vision…"
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                  />
                  {errors.message && (
                    <p
                      className="contact-field-error"
                      id="contact-message-error"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>
              <div
                className="contact-feedback"
                aria-live="polite"
                aria-atomic="true"
              >
                {feedback && (
                  <p
                    className={
                      feedback.success
                        ? "contact-success"
                        : "contact-send-error"
                    }
                  >
                    {feedback.message}
                  </p>
                )}
              </div>
              <div className="contact-form-footer">
                <button
                  className="contact-submit"
                  type="submit"
                  disabled={sending}
                >
                  <span>{sending ? "Sending…" : "Submit Message"}</span>
                  <span className="contact-submit-arrow" aria-hidden="true">
                    ↗
                  </span>
                </button>
                <div className="contact-socials">
                  <p className="contact-socials-label">Follow Us</p>
                  <div className="contact-socials-links">
                    <a
                      className="contact-social-btn contact-social-btn--instagram"
                      href={contactInfo.socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Vasupriy Interiovilla on Instagram"
                      title="Instagram"
                    >
                      <SocialIcon type="instagram" />
                    </a>
                    <a
                      className="contact-social-btn contact-social-btn--facebook"
                      href={contactInfo.socials.facebook}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Vasupriy Interiovilla on Facebook"
                      title="Facebook"
                    >
                      <SocialIcon type="facebook" />
                    </a>
                    <a
                      className="contact-social-btn contact-social-btn--youtube"
                      href={contactInfo.socials.youtube}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Vasupriy Interiovilla on YouTube"
                      title="YouTube"
                    >
                      <SocialIcon type="youtube" />
                    </a>
                  </div>
                </div>
              </div>
              {!contactInfo.submissionEndpoint && (
                <p className="contact-availability">
                  Online messaging will be available soon.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <section
        className="contact-location"
        aria-labelledby="contact-location-title"
      >
        <div className="site-container">
          <div className="contact-section-heading" data-contact-reveal>
            <div>
              <span className="section-label">Our Location</span>
              <h2 id="contact-location-title">
                Experience Our Design Studio
                <br />
                <em>Crafted for Creativity.</em>
              </h2>
            </div>
            {contactInfo.address && <p>{contactInfo.address}</p>}
          </div>
          <div className="contact-map" data-contact-reveal>
            {mapUrl ? (
              <iframe
                src={mapUrl}
                title="Vasupriy Interiovilla studio location on Google Maps"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="contact-map-placeholder">
                <span className="contact-icon">
                  <ContactIcon type="location" />
                </span>
                <h3>Our studio location is coming soon.</h3>
                <p>Visit this space for our address and directions.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
