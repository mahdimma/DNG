import React from "react";

const GalleryGuidelinesSection = () => {
  const guidelines = [
    {
      icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
      title: "کیفیت تصویر",
      description: "عکس‌ها باید با کیفیت بالا باشند (حداقل ۱۰۸۰×۱۹۲۰)"
    },
    {
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "محتوای اصیل",
      description: "تصاویر باید اصل و توسط ارسال‌کننده گرفته شده باشند"
    },
    {
      icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",
      title: "توضیحات کامل",
      description: "لطفاً توضیح یا کپشن کوتاهی برای هر عکس ارسال کنید"
    },
    {
      icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
      title: "حریم خصوصی",
      description: "اطمینان حاصل کنید افراد حاضر در عکس رضایت دارند"
    },
    {
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      title: "محتوای مثبت",
      description: "عکس‌ها باید جنبه‌های مثبت زندگی روستایی را نشان دهند"
    },
    {
      icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
      title: "فرمت‌های قابل قبول",
      description: "JPG، PNG، TIFF فرمت‌های پشتیبانی شده هستند"
    }
  ];

  return (
    <section className="card bg-white mb-12">
      <div className="text-center mb-8">
        <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
          راهنمای ارسال عکس
        </h4>
        <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guidelines.map((guideline, index) => (
          <div key={index} className="flex items-start space-x-4 space-x-reverse">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={guideline.icon} />
              </svg>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900 mb-2">
                {guideline.title}
              </h5>
              <p className="text-sm text-gray-600 leading-relaxed">
                {guideline.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GalleryGuidelinesSection;
