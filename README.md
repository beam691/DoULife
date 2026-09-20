# เรียนภาษา — ระบบเข้าสู่ระบบ

เว็บนี้ใช้ Supabase Auth จริงสำหรับอีเมล/รหัสผ่าน, Google OAuth, session persistence, protected `/home`, logout และ password reset

หลังล็อกอิน ระบบจะเปิด Lumi English ที่ `/learning/index.html` โดยเก็บความคืบหน้าและโปรไฟล์ในเบราว์เซอร์แยกตาม Supabase UID จึงไม่ปะปนระหว่างบัญชี ผู้ใช้แก้ไขชื่อ, username และรูปโปรไฟล์ได้ที่เมนู Profile

## ตั้งค่า

1. สร้างโปรเจกต์ใน Supabase
2. เปิด Authentication > Providers > Email และ Google
   - หากไม่ต้องการยืนยันอีเมล: ไปที่ **Authentication > Providers > Email** แล้วปิด **Confirm email** ก่อนเปิดใช้งานเว็บ
3. ตั้งค่า Google OAuth credentials ใน Google Cloud แล้วใส่ Client ID/Secret ใน Supabase
4. เพิ่ม URL ของเว็บและ callback URL ใน Supabase โดยใช้ `http://localhost:5173` สำหรับพัฒนา และ URL จริงสำหรับ production
5. คัดลอก `.env.example` เป็น `.env` แล้วใส่ค่า `VITE_SUPABASE_URL` และ `VITE_SUPABASE_ANON_KEY`
6. รัน `npm run dev`

ใช้เฉพาะ Supabase anon key ฝั่ง client ห้ามใส่ service-role key ใน `.env` ของเว็บ
