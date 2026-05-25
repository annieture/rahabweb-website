const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to SQLite database');
});

db.serialize(() => {
  // Insert packages
  db.run(
    `INSERT INTO packages (title, description, price, features) VALUES 
    ('طراحی وب پایه', 'طراحی سایت ساده و معرفی شرکت', 500000, '3 صفحه - دیزاین زیبا - موبایل فرندلی'),
    ('طراحی وب پیشرفته', 'طراحی سایت کامل و تعاملی', 1000000, '10 صفحه - سیستم مدیریت محتوا - فرم‌های تعاملی'),
    ('فروشگاه آنلاین', 'طراحی و توسعه فروشگاه آنلاین', 1500000, 'سیستم پرداخت - ارسال خودکار - مدیریت موجودی'),
    ('توسعه نرم‌افزار', 'توسعه نرم‌افزار تخصصی', 2000000, 'مشاوره رایگان - طراحی UI/UX - کد تمیز'),
    ('اپلیکیشن موبایل', 'ایجاد اپلیکیشن iOS و Android', 3000000, 'اپلیکیشن آفلاین - سنکرونایز ابری - پشتیبانی 1 سال');
  `,
    (err) => {
      if (err) console.log('Packages already exist or error:', err.message);
      else console.log('Packages inserted');
    }
  );

  // Insert portfolio items
  db.run(
    `INSERT INTO portfolio (title, description, category, image_url, link) VALUES 
    ('فروشگاه الکترونیک', 'طراحی و توسعه فروشگاه آنلاین پوشاک', 'فروشگاه آنلاین', 'https://via.placeholder.com/400x250/1e40af/ffffff?text=فروشگاه', 'https://example.com'),
    ('سایت شرکت خدماتی', 'طراحی سایت شرکت خدمات کنسالتینگ', 'سایت شرکتی', 'https://via.placeholder.com/400x250/059669/ffffff?text=شرکت', 'https://example.com'),
    ('اپلیکیشن مدیریت پروژه', 'اپلیکیشن موبایل برای مدیریت پروژه‌ها', 'اپلیکیشن موبایل', 'https://via.placeholder.com/400x250/f59e0b/ffffff?text=پروژه', 'https://example.com'),
    ('سایت بلاگ تخصصی', 'سایت بلاگ با سیستم مدیریت محتوا', 'بلاگ', 'https://via.placeholder.com/400x250/7c3aed/ffffff?text=بلاگ', 'https://example.com'),
    ('سایت شهری', 'طراحی سایت شهرداری با اطلاعات شهری', 'سایت دولتی', 'https://via.placeholder.com/400x250/ec4899/ffffff?text=شهری', 'https://example.com'),
    ('کمپین بازاریابی', 'طراحی کمپین دیجیتال مارکتینگ', 'دیجیتال مارکتینگ', 'https://via.placeholder.com/400x250/06b6d4/ffffff?text=بازاریابی', 'https://example.com');
  `,
    (err) => {
      if (err) console.log('Portfolio items already exist or error:', err.message);
      else console.log('Portfolio items inserted');
    }
  );

  // Insert articles
  db.run(
    `INSERT INTO articles (title, content, category, author, image_url, views) VALUES 
    ('آینده طراحی وب در 2026', '<p>طراحی وب هر روز در حال تحول است. در سال 2026، تکنولوژی‌های جدیدی مانند هوش مصنوعی، واقعیت مجازی و تکنولوژی‌های نوین دیگر نقش بیشتری در طراحی وب‌سایت‌ها ایفا خواهند کرد.</p><p>یکی از اهم روندها استفاده از هوش مصنوعی برای بهبود تجربه کاربری است. سایت‌های هوشمند می‌توانند رفتار کاربر را درک کنند و محتوای مناسب را به آنها ارائه دهند.</p><p>همچنین امنیت وب‌سایت‌ها بیش از پیش مهم شده است. باید از روش‌های مدرن برای محافظت از داده‌های کاربران استفاده کنیم.</p>', 'طراحی وب', 'تیم رهاوب', 'https://via.placeholder.com/400x250/1e40af/ffffff?text=آینده', 45),
    ('بهترین روش‌های SEO در سال 2026', '<p>بهینه‌سازی برای موتورهای جستجو (SEO) تا زمانی که موتورهای جستجو وجود داشته باشند، مهم خواهد ماند.</p><p>در سال 2026، الگوریتم‌های جستجو بیشتر بر روی تجربه کاربری و محتوای با کیفیت تمرکز دارند. باید اطمینان حاصل کنیم که سایت ما سریع است، ایمن است و محتوای مناسب دارد.</p><p>استفاده از داده‌های ساختاری (Schema) و تاگ‌های Meta نیز در بهبود رتبه‌بندی نقش مهمی دارند.</p>', 'SEO', 'تیم رهاوب', 'https://via.placeholder.com/400x250/059669/ffffff?text=SEO', 78),
    ('اهمیت دیجیتال مارکتینگ برای کسب‌وکار', '<p>دیجیتال مارکتینگ یکی از بهترین روش‌های فروش و معرفی محصولات و خدمات است.</p><p>با استفاده از رسانه‌های اجتماعی، ایمیل مارکتینگ، تبلیغات آنلاین و سایر روش‌های دیجیتال، می‌توانیم به مشتریان بالقوه خود دسترسی پیدا کنیم.</p><p>مهم است که استراتژی مارکتینگ خود را بر اساس نیاز مشتریان و هدف‌های کسب‌وکار تدوین کنیم.</p>', 'دیجیتال مارکتینگ', 'تیم رهاوب', 'https://via.placeholder.com/400x250/f59e0b/ffffff?text=مارکتینگ', 92),
    ('انتخاب فریمورک و تکنولوژی مناسب', '<p>انتخاب فریمورک و تکنولوژی مناسب برای پروژه شما بسیار مهم است.</p><p>هر فریمورک مزایا و معایب خاص خود را دارد. Node.js و Express برای توسعه سریع، React برای رابط کاربری دینامیکی و Django برای پروژه‌های بزرگ خوب‌اند.</p><p>باید نیاز‌های پروژه، تجربه تیم و بودجه را در نظر گرفته و فریمورک مناسب را انتخاب کنیم.</p>', 'توسعه نرم‌افزار', 'تیم رهاوب', 'https://via.placeholder.com/400x250/7c3aed/ffffff?text=فریمورک', 56),
    ('نکات امنیتی مهم برای توسعه‌دهندگان', '<p>امنیت یکی از مهم‌ترین جنبه‌های توسعه وب‌سایت‌ها و نرم‌افزارها است.</p><p>باید از حملات رایج مثل SQL Injection، XSS و CSRF محافظت کنیم. همچنین رمز عبور‌ها را به درستی ذخیره کنیم و از HTTPS استفاده کنیم.</p><p>آموزش تیم درباره امنیت و استفاده از ابزارهای امنیتی نیز بسیار مهم است.</p>', 'امنیت', 'تیم رهاوب', 'https://via.placeholder.com/400x250/ec4899/ffffff?text=امنیت', 67);
  `,
    (err) => {
      if (err) console.log('Articles already exist or error:', err.message);
      else console.log('Articles inserted');
    }
  );
});

db.close((err) => {
  if (err) console.error(err.message);
  else console.log('Database initialized successfully!');
});
