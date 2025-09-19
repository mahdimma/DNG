import React from "react"
import PropTypes from "prop-types"

/**
 * Demo component showcasing the refactored news template features
 * This component can be used to test all the new functionality
 */
const NewsTemplateDemo = () => {
  const sampleArticles = [
    {
      frontmatter: {
        title: "خبر نمونه اول",
        date: "2024-01-15",
        author: "نویسنده نمونه",
        category: "اعلامیه",
        featured: true
      },
      excerpt: "این یک خلاصه نمونه برای خبر اول است که نشان‌دهنده محتوای مقاله می‌باشد.",
      fields: {
        slug: "/news/sample-news-1"
      }
    },
    {
      frontmatter: {
        title: "رویداد مهم روستا",
        date: "2024-01-10",
        author: "شورای روستا",
        category: "رویداد"
      },
      excerpt: "گزارشی از رویداد مهم اخیر در روستا که مورد استقبال اهالی قرار گرفت.",
      fields: {
        slug: "/news/village-event"
      }
    },
    {
      frontmatter: {
        title: "توسعه زیرساخت‌ها",
        date: "2024-01-05",
        author: "مدیریت روستا",
        category: "توسعه"
      },
      excerpt: "گزارش پیشرفت پروژه‌های توسعه زیرساخت‌های روستای دنگپیا.",
      fields: {
        slug: "/news/infrastructure-development"
      }
    }
  ]

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            نمایش قابلیت‌های جدید قالب اخبار
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            این صفحه تمام قابلیت‌های جدید و بهبودهای انجام شده در سیستم اخبار را نمایش می‌دهد
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Features List */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="w-6 h-6 ml-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              قابلیت‌های جدید
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2 ml-3"></span>
                <div>
                  <h3 className="font-semibold">جستجوی پیشرفته</h3>
                  <p className="text-gray-600 text-sm">جستجو در عنوان، محتوا، نویسنده و دسته‌بندی</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2 ml-3"></span>
                <div>
                  <h3 className="font-semibold">فیلترینگ هوشمند</h3>
                  <p className="text-gray-600 text-sm">فیلتر بر اساس دسته‌بندی با نمایش تعداد</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2 ml-3"></span>
                <div>
                  <h3 className="font-semibold">مرتب‌سازی پیشرفته</h3>
                  <p className="text-gray-600 text-sm">مرتب‌سازی بر اساس تاریخ، عنوان و دسته‌بندی</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2 ml-3"></span>
                <div>
                  <h3 className="font-semibold">طراحی ریسپانسیو</h3>
                  <p className="text-gray-600 text-sm">سازگار با تمام اندازه‌های صفحه</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2 ml-3"></span>
                <div>
                  <h3 className="font-semibold">بهبود دسترسی</h3>
                  <p className="text-gray-600 text-sm">ARIA labels و navigation با کیبورد</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2 ml-3"></span>
                <div>
                  <h3 className="font-semibold">اشتراک‌گذاری پیشرفته</h3>
                  <p className="text-gray-600 text-sm">Web Share API با fallback</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Performance Improvements */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="w-6 h-6 ml-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              بهبودهای عملکرد
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 ml-3"></span>
                <div>
                  <h3 className="font-semibold">Loading States</h3>
                  <p className="text-gray-600 text-sm">Skeleton loading برای بهتر شدن تجربه کاربر</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 ml-3"></span>
                <div>
                  <h3 className="font-semibold">Component Memoization</h3>
                  <p className="text-gray-600 text-sm">بهینه‌سازی re-renders</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 ml-3"></span>
                <div>
                  <h3 className="font-semibold">Efficient Filtering</h3>
                  <p className="text-gray-600 text-sm">الگوریتم‌های بهینه برای جستجو و فیلتر</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 ml-3"></span>
                <div>
                  <h3 className="font-semibold">Modern CSS</h3>
                  <p className="text-gray-600 text-sm">استفاده از CSS Grid و Flexbox</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">نحوه استفاده از کامپوننت‌های جدید</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">EnhancedNewsSection</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<EnhancedNewsSection 
  articles={newsArticles}
  showStats={true}
  showSearch={true}
  showSort={true}
  showFilter={true}
  gridColumns="lg:grid-cols-2 xl:grid-cols-3"
  className="custom-news-section"
/>`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">SearchBox</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<SearchBox
  searchTerm={searchTerm}
  onSearchChange={handleSearchChange}
  placeholder="جستجو در اخبار..."
  showClearButton={true}
  autoFocus={false}
/>`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">FilterResultsInfo</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<FilterResultsInfo
  totalResults={totalArticles}
  filteredResults={filteredCount}
  searchTerm={searchTerm}
  activeCategory={activeCategory}
  onClearFilters={clearFilters}
/>`}
              </pre>
            </div>
          </div>
        </div>

        {/* Sample Articles Display */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">نمونه نمایش اخبار</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleArticles.map((article, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                {article.frontmatter.featured && (
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium mb-4 inline-block">
                    ویژه
                  </div>
                )}
                <h3 className="font-bold text-lg mb-2">{article.frontmatter.title}</h3>
                <div className="text-sm text-gray-500 mb-3">
                  {article.frontmatter.date} • {article.frontmatter.author}
                </div>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                    {article.frontmatter.category}
                  </span>
                  <button className="text-primary-600 hover:text-primary-800 font-medium">
                    ادامه مطلب
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

NewsTemplateDemo.propTypes = {}

export default NewsTemplateDemo
