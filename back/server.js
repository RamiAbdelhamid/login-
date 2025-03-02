const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");

// تحميل متغيرات البيئة
dotenv.config();

const app = express();

// ✅ إعداد CORS لحل مشاكل الاتصال بين السيرفر والواجهة الأمامية
app.use(
  cors({
    origin: "http://localhost:5173", // السماح للفرونت بالوصول
    methods: ["GET", "POST", "PUT", "DELETE"], // السماح بالطلبات المطلوبة
    credentials: true, // السماح بإرسال الكوكيز
  })
);

// ✅ Middleware لتفسير JSON والبيانات المرسلة عبر النماذج
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ توجيه المسارات
app.use("/api/users", userRoutes);

// ✅ التعامل مع أخطاء المسارات غير الموجودة
app.use((req, res, next) => {
  res.status(404).json({ message: "🚫 Route not found" });
});

// ✅ التعامل مع الأخطاء العامة
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ message: "❌ Internal Server Error" });
});

// ✅ تشغيل السيرفر بعد الاتصال بقاعدة البيانات
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });
