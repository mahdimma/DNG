import React from "react"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"

const TermsOfServicePage = () => {
  return (
    <Layout title="شرایط استفاده از خدمات" description="شرایط استفاده از خدمات وبسایت روستای دنگپیا">
      <HeroSection 
        title="شرایط استفاده از خدمات"
        subtitle="قوانین و مقررات استفاده از وبسایت"
        showButtons={false}
        showScrollIndicator={true}
      />
      
      {/* Terms Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              شرایط استفاده از خدمات
            </h2>
            <p className="text-xl text-gray-600">
              آخرین به‌روزرسانی: {new Date().toLocaleDateString('fa-IR')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                پذیرش شرایط
              </h3>
              <p className="text-gray-700 leading-relaxed">
                با دسترسی و استفاده از وبسایت روستای دنگپیا («خدمات»)، شما شرایط و مقررات این توافق‌نامه را پذیرفته و موافق هستید. اگر با موارد فوق موافق نیستید، لطفاً از این خدمات استفاده نکنید.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                توضیح خدمات
              </h3>
              <p className="text-gray-700 mb-4">
                روستای دنگپیا یک پلتفرم آنلاین برای ساکنان و بازدیدکنندگان روستا فراهم می‌کند:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2">✓</span>
                  دسترسی به اطلاعات خدمات روستایی
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2">✓</span>
                  اطلاع از اخبار و رویدادهای روستا
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2">✓</span>
                  تماس با مسئولین روستا
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2">✓</span>
                  مشاهده نقشه و مکان‌های روستا
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2">✓</span>
                  بررسی اطلاعات آب و هوایی
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2">✓</span>
                  مرور گالری تصاویر روستا
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                مسئولیت‌های کاربر
              </h3>
              <p className="text-gray-700 mb-4">به عنوان کاربر خدمات ما، شما موافق هستید:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  ارائه اطلاعات دقیق و کامل در صورت نیاز
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  استفاده از خدمات فقط برای اهداف قانونی
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  احترام به حریم خصوصی و حقوق سایر کاربران
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  تلاش برای دسترسی غیرمجاز به سیستم‌های ما نکنید
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  پخش بدافزار یا کدهای مخرب نکنید
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  استفاده تجاری از خدمات بدون مجوز
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  گزارش هرگونه آسیب‌پذیری امنیتی کشف شده
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                محتوا و مالکیت فکری
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">محتوای ما</h4>
                  <p className="text-gray-700">
                    تمام محتوای این وبسایت، شامل متن، گرافیک، لوگوها، تصاویر و نرم‌افزار، متعلق به روستای دنگپیا یا تأمین‌کنندگان محتوای آن است و توسط قوانین کپی‌رایت و سایر قوانین مالکیت فکری محافظت می‌شود.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">محتوای تولیدشده توسط کاربر</h4>
                  <p className="text-gray-700">
                    هنگامی که محتوایی را در وبسایت ما ارسال می‌کنید (مانند نظرات، عکس‌ها یا بازخوردها)، به ما مجوز غیرانحصاری، بدون حق امتیاز و دائمی برای استفاده، اصلاح و نمایش چنین محتوایی برای هدف بهره‌برداری از خدماتمان اعطا می‌کنید.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                استفاده‌های ممنوع
              </h3>
              <p className="text-gray-700 mb-4">شما نمی‌توانید از خدمات ما استفاده کنید:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  برای هر هدف غیرقانونی یا ترغیب دیگران به انجام اعمال غیرقانونی
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  برای نقض قوانین، مقررات، قوانین بین‌المللی، فدرال، استانی یا محلی
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  برای نقض حقوق مالکیت فکری ما یا دیگران
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  برای آزار، سوءاستفاده، توهین، آسیب، کم‌رنگ کردن، ترساندن یا تبعیض
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  ارائه اطلاعات نادرست یا گمراه‌کننده
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  بارگذاری یا انتقال ویروس‌ها یا هر نوع کد مخرب
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  اسپم، فیشینگ، فارم، پیش‌زمینه، اسپایدر، کراول یا اسکریپ
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  برای هر هدف بی‌شرف یا غیراخلاقی
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Additional Terms Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                در دسترس بودن خدمات
              </h3>
              <p className="text-gray-700 mb-4">
                ما تلاش می‌کنیم خدمات را به‌صورت مداوم در دسترس نگه داریم، اما تضمین نمی‌کنیم که خدمات ما بدون وقفه یا بدون خطا باشد. ما حق را محفوظ می‌داریم:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  اصلاح یا توقف خدمات با یا بدون اطلاع قبلی
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  انجام تعمیرات که ممکن است به‌صورت موقت بر در دسترس بودن خدمات تأثیر بگذارد
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  به‌روزرسانی یا تغییر ویژگی‌ها و عملکردها
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  محدود کردن دسترسی به ویژگی‌ها یا محتوای خاص
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                حریم خصوصی
              </h3>
              <p className="text-gray-700">
                حریم خصوصی شما برای ما مهم است. لطفاً سیاست حفظ حریم خصوصی ما را که همچنین استفاده شما از خدمات را تنظیم می‌کند، برای درک شیوه‌های ما مرور کنید.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                سلب مسئولیت
              </h3>
              <p className="text-gray-700 mb-4">
                اطلاعات این وبسایت بر اساس «همان‌طور که هست» ارائه می‌شود. تا حدی که قانون اجازه می‌دهد، این شرکت:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  تمام نمایندگی‌ها و ضمانت‌های مربوط به این وبسایت و محتوای آن را رد می‌کند
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  تمام مسئولیت‌ها برای خسارات ناشی از یا در ارتباط با استفاده شما از این وبسایت را رد می‌کند
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  دقت یا کامل بودن اطلاعات آب و هوا را تضمین نمی‌کند
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 ml-2 mt-1">•</span>
                  مسئولیت لینک‌های خارجی یا محتوای شخص ثالث را نمی‌پذیرد
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                محدودیت مسئولیت
              </h3>
              <p className="text-gray-700">
                در هیچ شرایطی روستای دنگپیا، مدیران، کارمندان یا نمایندگان آن مسئول خسارات غیرمستقیم، تصادفی، خاص، پیامدی یا تنبیهی، از جمله بدون محدودیت، از دست دادن سود، داده، استفاده، اعتبار یا سایر ضررهای ناملموس، ناشی از استفاده شما از خدمات نخواهند بود.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal and Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                جبران خسارت
              </h3>
              <p className="text-gray-700">
                شما موافق هستید که روستای دنگپیا و مجوزدهندگان و مجوزگیرندگان آن، و کارمندان، پیمانکاران، نمایندگان، مسئولین و مدیران آن‌ها را از هرگونه ادعاهای خسارت، تعهدات، ضررهای مسئولیت‌ها، هزینه‌ها یا بدهی‌ها، و هزینه‌ها (از جمله اما نه محدود به هزینه‌های وکالت) دفاع، جبران خسارت و بی‌ضرر نگه دارید.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                خاتمه
              </h3>
              <p className="text-gray-700">
                ما ممکن است دسترسی شما را بلافاصله، بدون اطلاع قبلی یا مسئولیت، به هر دلیلی از جمله نقض شرایط، خاتمه دهیم یا تعلیق کنیم.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                قانون حاکم
              </h3>
              <p className="text-gray-700">
                این شرایط توسط قوانین جمهوری اسلامی ایران تفسیر و اجرا می‌شوند، بدون در نظر گرفتن مقررات تضاد قوانین. عدم اجرای ما از هر حق یا مقرراتی از این شرایط به عنوان تملیک آن حقوق در نظر گرفته نخواهد شد.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                تغییرات در شرایط
              </h3>
              <p className="text-gray-700">
                ما حق را محفوظ می‌داریم، به تشخیص خود، برای اصلاح یا جایگزینی این شرایط در هر زمان. اگر اصلاح مواد قابل توجهی باشد، ما سعی خواهیم کرد حداقل ۳۰ روز قبل از اجرای هر شرایط جدید اطلاع‌رسانی کنیم.
              </p>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="mt-12">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                اطلاعات تماس
              </h3>
              <p className="text-gray-700 mb-4">اگر سوالی درباره این شرایط خدمات دارید، با ما تماس بگیرید:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
                <div className="flex items-center">
                  <span className="font-semibold ml-2">ایمیل:</span>
                  <span className="text-primary-600">legal@dangepia.ir</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold ml-2">تلفن:</span>
                  <span>+98-XXX-XXXX</span>
                </div>
                <div className="flex items-start">
                  <span className="font-semibold ml-2">آدرس:</span>
                  <span>دفتر روستا، خیابان اصلی، روستای دنگپیا</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="mt-12 p-6 bg-primary-50 rounded-xl border border-primary-200 text-center">
            <p className="text-gray-800 text-sm leading-relaxed">
              این شرایط خدمات توسط قانون ایران اجرا می‌شوند و برای حفاظت از هر دو روستا و کاربران ما طراحی شده‌اند. برای سوالات حقوقی خاص، لطفاً با یک متخصص حقوقی واجد شرایط مشورت کنید.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default TermsOfServicePage