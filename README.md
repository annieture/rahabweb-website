# وبسایت شرکت رهاوب

وبسایت حرفه‌ای برای شرکت رهاوب متخصص در طراحی وب، توسعه نرم‌افزار و دیجیتال مارکتینگ

## ویژگی‌ها

- ✅ طراحی واکنش‌پذیر (Responsive)
- ✅ backend کامل با Express.js
- ✅ پایگاه داده SQLite
- ✅ چند صفحه (Multi-page)
- ✅ فرم‌های تعاملی
- ✅ سیستم مدیریت محتوا برای مقالات
- ✅ پورتفولیو و نمونه‌کارها
- ✅ سیستم ثبت‌نام با نمایش قیمت
- ✅ سیستم تماس
- ✅ پشتیبانی زبان فارسی

## نصب و اجرا

### پیش‌نیاز‌ها
- Node.js (v14 یا بالاتر)
- npm

### مراحل نصب

1. **Clone یا دانلود پروژه**
```bash
cd rahabweb-website
```

2. **نصب وابستگی‌ها**
```bash
npm install
```

3. **مقدار‌دهی اولیه پایگاه داده**
```bash
node init-db.js
```

4. **اجرای سرور**
```bash
npm start
```

یا برای توسعه (با خودکار restart):
```bash
npm run dev
```

5. **دسترسی به سایت**
برو به: `http://localhost:3000`

## ساختار پروژه

```
rahabweb-website/
├── server.js              # سرور Express
├── init-db.js            # مقدار‌دهی پایگاه داده
├── package.json          # وابستگی‌ها
├── database.db           # پایگاه داده SQLite
├── public/
│   ├── css/
│   │   └── style.css    # استایل اصلی
│   └── uploads/         # آپلود فایل‌ها
└── views/
    ├── layout.ejs       # الگوی اصلی
    ├── index.ejs        # صفحه خانه
    ├── about.ejs        # صفحه درباره
    ├── services.ejs     # صفحه خدمات
    ├── portfolio.ejs    # صفحه نمونه‌کارها
    ├── blog.ejs         # صفحه مقالات
    ├── blog-detail.ejs  # جزئیات مقاله
    ├── contact.ejs      # صفحه تماس
    ├── register.ejs     # صفحه ثبت‌نام
    ├── pricing.ejs      # صفحه قیمت
    └── 404.ejs          # صفحه خطا
```

## صفحات سایت

1. **خانه** (`/`) - صفحه اصلی
2. **درباره** (`/about`) - معرفی شرکت
3. **خدمات** (`/services`) - لیست خدمات
4. **نمونه‌کارها** (`/portfolio`) - پروژه‌های انجام شده
5. **مقالات** (`/blog`) - مجموعه مقالات
6. **جزئیات مقاله** (`/blog/:id`) - صفحه مقاله
7. **تماس** (`/contact`) - فرم تماس
8. **ثبت‌نام** (`/register`) - ثبت‌نام و انتخاب پکیج
9. **قیمت** (`/pricing/:packageId`) - نمایش قیمت پکیج

## API Endpoints

### POST Endpoints
- `POST /api/contact` - ارسال پیام تماس
- `POST /api/register` - ثبت‌نام

### GET Endpoints
- `GET /` - صفحه خانه
- `GET /about` - درباره
- `GET /services` - خدمات
- `GET /portfolio` - نمونه‌کارها
- `GET /blog` - مقالات
- `GET /blog/:id` - جزئیات مقاله
- `GET /contact` - صفحه تماس
- `GET /register` - صفحه ثبت‌نام
- `GET /pricing/:packageId` - قیمت پکیج

## جداول پایگاه داده

### users
- id, name, email, phone, company, package_id, created_at

### packages
- id, title, description, price, features, created_at

### portfolio
- id, title, description, category, image_url, link, created_at

### articles
- id, title, content, category, author, image_url, views, created_at

### contacts
- id, name, email, subject, message, status, created_at

## رنگ‌های استفاده شده

- Primary: `#1e40af` (آبی)
- Secondary: `#059669` (سبز)
- Accent: `#f59e0b` (زرد)
- Dark: `#0f172a` (تیره)

## تکنولوژی‌های استفاده شده

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, EJS
- **Database**: SQLite3
- **File Upload**: Multer
- **Body Parser**: برای پردازش درخواست

## کنترل و سفارش‌دهی

برای مشاهده سفارش‌ها و ثبت‌نام‌ها:
- پایگاه داده مستقیماً در `database.db` ذخیره می‌شود
- می‌توانید از ابزارهای SQLite برای مشاهده داده‌ها استفاده کنید

## توسعه‌های آینده

- [ ] پنل ادمین برای مدیریت محتوا
- [ ] سیستم پرداخت آنلاین
- [ ] سیستم احراز هویت کاربر
- [ ] سیستم نظری و امتیاز‌دهی
- [ ] ایمیل خودکار
- [ ] درگاه اشتراک

## مشاهده‌ی بیشتر

برای مشاهده تغییرات و آپدیت‌های جدید:
https://github.com/annieture/rahabweb-website

## پشتیبانی

برای سؤالات و مشکلات:
- ایمیل: info@rahabweb.ir
- تلفن: ۰۹۱۲۳۴۵۶۷۸۹

---

**توسعه دهنده**: تیم رهاوب
**سال**: ۱۴۰۵
