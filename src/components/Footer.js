import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterSiteMetadata {
      site {
        siteMetadata {
          title
          social {
            twitter
            linkedin
            instagram
          }
        }
      }
    }
  `)

  const siteTitle = data?.site?.siteMetadata?.title || "روستای دنگپیا"
  const social = data?.site?.siteMetadata?.social || {}

  const socialLinks = [
    {
      key: "instagram",
      label: "اینستاگرام",
      href: social.instagram,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm10.1 2.4a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
        </svg>
      ),
    },
    {
      key: "twitter",
      label: "توییتر",
      href: social.twitter,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      ),
    },
    {
      key: "linkedin",
      label: "لینکدین",
      href: social.linkedin,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.29V9h3.41v1.56h.05c.48-.9 1.64-1.86 3.38-1.86 3.62 0 4.29 2.38 4.29 5.47v6.28ZM5.27 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.05 20.45H3.48V9h3.57v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
        </svg>
      ),
    },
  ].filter((item) => typeof item.href === "string" && item.href.trim().length > 0)

  return (
    <footer className="bg-gray-900 text-white" aria-label="پاورقی سایت">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-primary-400">{siteTitle}</h2>
            <p className="text-gray-300 leading-relaxed">
              به روستای زیبای ما خوش آمدید. با آخرین اخبار، رویدادها و خدمات در ارتباط باشید.
            </p>

            {socialLinks.length > 0 ? (
              <div className="flex items-center gap-4" aria-label="شبکه‌های اجتماعی">
                {socialLinks.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={item.label}
                    className={`text-gray-400 hover:text-primary-400 transition-colors duration-200 rounded ${focusRing}`}
                  >
                    <span className="sr-only">{item.label}</span>
                    {item.icon}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* Quick Links */}
          <nav className="space-y-4" aria-label="پیوندهای سریع">
            <h3 className="text-lg font-semibold text-primary-400">پیوندهای سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className={`text-gray-300 hover:text-primary-400 transition-colors duration-200 inline-flex items-center gap-2 rounded ${focusRing}`}
                >
                  <span>درباره ما</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className={`text-gray-300 hover:text-primary-400 transition-colors duration-200 inline-flex items-center gap-2 rounded ${focusRing}`}
                >
                  <span>اخبار</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className={`text-gray-300 hover:text-primary-400 transition-colors duration-200 inline-flex items-center gap-2 rounded ${focusRing}`}
                >
                  <span>خدمات</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`text-gray-300 hover:text-primary-400 transition-colors duration-200 inline-flex items-center gap-2 rounded ${focusRing}`}
                >
                  <span>تماس با ما</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Legal + Contact */}
          <div className="space-y-4">
            <nav aria-label="قوانین و مقررات" className="space-y-4">
              <h3 className="text-lg font-semibold text-primary-400">قوانین و مقررات</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/privacy-policy"
                    className={`text-gray-300 hover:text-primary-400 transition-colors duration-200 inline-flex items-center gap-2 rounded ${focusRing}`}
                  >
                    <span>حریم خصوصی</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-of-service"
                    className={`text-gray-300 hover:text-primary-400 transition-colors duration-200 inline-flex items-center gap-2 rounded ${focusRing}`}
                  >
                    <span>شرایط خدمات</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-6 p-4 bg-gray-800 rounded-lg" aria-label="تماس سریع">
              <h4 className="font-semibold text-primary-400 mb-2">تماس سریع</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <a
                  href="mailto:info@dangepia.ir"
                  className={`hover:text-primary-400 transition-colors duration-200 rounded inline-flex ${focusRing}`}
                >
                  info@dangepia.ir
                </a>
                <div className="text-gray-300">۰۹۸-XXX-XXXX</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-center sm:text-right">
            <p className="text-gray-400">
              © {new Date().toLocaleDateString("fa-IR", { year: "numeric" })} {siteTitle}. تمامی حقوق محفوظ است.
            </p>
            <p className="text-sm text-gray-500">طراحی شده با عشق برای جامعه دنگپیا</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
