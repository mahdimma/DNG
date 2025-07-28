import React from "react"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"

const PrivacyPolicyPage = () => {
  return (
    <Layout title="سیاست حفظ حریم خصوصی" description="سیاست حفظ حریم خصوصی وبسایت روستای دانگپیا">
      <HeroSection 
        title="سیاست حفظ حریم خصوصی"
        subtitle="اطلاعاتی در مورد نحوه استفاده از اطلاعات شما"
        showButtons={false}
        showScrollIndicator={true}
      />
      
      {/* Privacy Policy Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              سیاست حفظ حریم خصوصی
            </h2>
            <p className="text-xl text-gray-600">
              آخرین به‌روزرسانی: {new Date().toLocaleDateString('fa-IR')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                مقدمه
              </h3>
              <p className="text-gray-700 leading-relaxed">
                روستای دانگپیا («ما»، «ماهای» یا «ماهاییم») متعهد به حفاظت از حریم خصوصی شما است. این سیاست حفظ حریم خصوصی چگونگی جمع‌آوری، استفاده و افشاء اطلاعات شخصی شما توسط وبسایت روستای دانگپیا را توضیح می‌دهد.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                اطلاعاتی که جمع‌آوری می‌کنیم
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">اطلاعاتی که شما به ما ارائه می‌دهید</h4>
                  <p className="text-gray-700 mb-4">ما اطلاعاتی را که مستقیماً به ما ارائه می‌دهید جمع‌آوری می‌کنیم، مانند زمانی که:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-primary-500 ml-2">✓</span>
                      فرم‌های تماس ما را پر می‌کنید
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 ml-2">✓</span>
                      در خبرنامه ما عضو می‌شوید
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 ml-2">✓</span>
                      در نظرسنجی‌های روستا شرکت می‌کنید
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 ml-2">✓</span>
                      بازخورد یا درخواست ارسال می‌کنید
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 ml-2">✓</span>
                      برای رویدادهای روستا ثبت‌نام می‌کنید
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">اطلاعاتی که به‌صورت خودکار جمع‌آوری می‌کنیم</h4>
                  <p className="text-gray-700 mb-4">هنگامی که به وبسایت ما دسترسی پیدا می‌کنید، ما به‌صورت خودکار اطلاعات خاصی را جمع‌آوری می‌کنیم، از جمله:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-primary-500 ml-2 mt-1">•</span>
                      آدرس IP شما
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 ml-2 mt-1">•</span>
                      نوع و نسخه مرورگر
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 ml-2 mt-1">•</span>
                      صفحاتی که در سایت ما بازدید می‌کنید
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 ml-2 mt-1">•</span>
                      زمان و تاریخ بازدید شما
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 ml-2 mt-1">•</span>
                      وبسایت معرف
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                چگونه از اطلاعات شما استفاده می‌کنیم
              </h3>
              <p className="text-gray-700 mb-4">ما از اطلاعات جمع‌آوری‌شده برای:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  ارائه و بهبود خدمات ما
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  ارتباط با شما در مورد امور روستایی
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  ارسال خبرنامه‌ها و به‌روزرسانی‌ها (با رضایت شما)
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  پاسخ به پرسش‌ها و درخواست‌های شما
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  سازماندهی و مدیریت رویدادهای روستا
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  تحلیل استفاده از وبسایت برای بهبود تجربه کاربری
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  رعایت تعهدات قانونی
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Data Sharing and Security Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                اشتراک‌گذاری و افشاء اطلاعات
              </h3>
              <p className="text-gray-700 mb-4">ما اطلاعات شخصی شما را نمی‌فروشیم، معامله نمی‌کنیم یا به‌صورت دیگر به اشخاص ثالث منتقل نمی‌کنیم، به جز در شرایط زیر:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  با رضایت صریح شما
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  برای رعایت الزامات قانونی
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  برای حفاظت از حقوق و امنیت ما
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  به ارائه‌دهندگان خدمات که به ما کمک می‌کنند (تحت توافق‌نامه‌های محرمانگی سخت‌گیرانه)
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  در صورت ادغام یا خریداری (شما مطلع خواهید شد)
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                امنیت داده‌ها
              </h3>
              <p className="text-gray-700">
                ما اقدامات امنیتی مناسب را برای محافظت از اطلاعات شخصی شما در برابر دسترسی غیرمجاز، تغییر، افشاء یا تخریب اجرا می‌کنیم. با این حال، هیچ روش انتقال از طریق اینترنت ۱۰۰٪ ایمن نیست.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                کوکی‌ها و فناوری‌های ردیابی
              </h3>
              <p className="text-gray-700">
                وبسایت ما ممکن است از کوکی‌ها و فناوری‌های ردیابی مشابه برای بهبود تجربه مرور شما استفاده کند. می‌توانید مرورگر خود را برای رد کوکی‌ها تنظیم کنید، اما این ممکن است برخی از عملکردهای وبسایت ما را محدود کند.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                حقوق شما
              </h3>
              <p className="text-gray-700 mb-4">شما حق دارید:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  به اطلاعات شخصی خود دسترسی پیدا کنید
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  اطلاعات نادرست را اصلاح کنید
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  حذف اطلاعات خود را درخواست کنید
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  مخالفت با پردازش اطلاعات خود کنید
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  در هر زمان رضایت خود را پس بگیرید
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  نسخه‌ای از اطلاعات خود را دریافت کنید
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Updates and Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                حریم خصوصی کودکان
              </h3>
              <p className="text-gray-700">
                وبسایت ما برای کودکان زیر ۱۳ سال طراحی نشده است. ما به‌صورت عمدی اطلاعات شخصی از کودکان زیر ۱۳ سال جمع‌آوری نمی‌کنیم. اگر فکر می‌کنید ما اطلاعاتی از کودکی زیر ۱۳ سال جمع‌آوری کرده‌ایم، لطفاً بلافاصله با ما تماس بگیرید.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                تغییرات در این سیاست حفظ حریم خصوصی
              </h3>
              <p className="text-gray-700">
                ممکن است این سیاست حفظ حریم خصوصی را از زمانی به زمان دیگر به‌روز کنیم. از هر تغییری با انتشار سیاست حفظ حریم خصوصی جدید در این صفحه و به‌روزرسانی تاریخ «آخرین به‌روزرسانی» در بالای این صفحه به شما اطلاع خواهیم داد.
              </p>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="mt-12">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                تماس با ما
              </h3>
              <p className="text-gray-700 mb-4">اگر سوالی درباره این سیاست حفظ حریم خصوصی دارید، با ما تماس بگیرید:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
                <div className="flex items-center">
                  <span className="font-semibold ml-2">ایمیل:</span>
                  <span className="text-primary-600">privacy@dangepia.ir</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold ml-2">تلفن:</span>
                  <span>+98-XXX-XXXX</span>
                </div>
                <div className="flex items-start">
                  <span className="font-semibold ml-2">آدرس:</span>
                  <span>دفتر روستا، خیابان اصلی، روستای دانگپیا</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="mt-12 p-6 bg-primary-50 rounded-xl border border-primary-200 text-center">
            <p className="text-gray-800 text-sm leading-relaxed">
              این سیاست حفظ حریم خصوصی با قوانین حفاظت از داده‌های ایران و استانداردهای بین‌المللی حریم خصوصی مطابقت دارد. برای سوالات حقوقی خاص، لطفاً با یک متخصص حقوقی مشورت کنید.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default PrivacyPolicyPage