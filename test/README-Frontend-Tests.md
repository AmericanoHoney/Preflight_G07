# Frontend Testing Guide

คู่มือการทดสอบ Frontend สำหรับแอป Preflight Product Storage

## ไฟล์เทส

- `cypress/e2e/frontend.cy.ts` - เทสครบถ้วนสำหรับ Frontend พร้อมการเชื่อมต่อ Backend

## การทดสอบครอบคลุม

- การโหลดหน้าเว็บและ UI พื้นฐาน
- การแสดงรายการสินค้า
- สถานะการโหลดและสถานะว่าง
- การจัดการข้อผิดพลาด
- การอัพเดทแบบเรียลไทม์ (SWR)
- Responsive Design (มือถือ, แท็บเล็ต, คอมพิวเตอร์)
- ประสิทธิภาพและ UX
- การเชื่อมต่อกับ Backend API

## วิธีการรันเทส

### ข้อกำหนดเบื้องต้น

1. **Frontend ต้องทำงานอยู่**

   ```bash
   cd preflight-frontend
   npm run dev
   # ควรเข้าถึงได้ที่ http://localhost:4000
   ```

2. **Backend ต้องทำงานอยู่**
   ```bash
   cd backend
   npm run dev
   # ควรเข้าถึงได้ที่ http://localhost:3000
   ```

### การรันเทส

#### วิธีที่ 1: ใช้ Script (แนะนำ)

```bash
cd test
./run-frontend-tests.sh          # เปิด Cypress GUI
./run-frontend-tests.sh headless # รันแบบไม่มีหน้าต่าง
```

#### วิธีที่ 2: ใช้คำสั่ง Cypress โดยตรง

```bash
cd test
npx cypress open                 # เปิด Cypress GUI
npx cypress run                  # รันเทสแบบไม่มีหน้าต่าง
```

#### วิธีที่ 3: ใช้ npm script

```bash
cd test
npm test  # เปิด Cypress GUI
```

## การแก้ปัญหา

### Frontend เข้าไม่ได้

```bash
cd preflight-frontend
npm run dev
```

### Backend เข้าไม่ได้

```bash
cd backend
npm run dev
```

### ใช้ Docker

```bash
# รัน Docker Compose
docker-compose up -d

# ตรวจสอบสถานะ
docker-compose ps

# รันเทส
cd test
./run-frontend-tests.sh headless
```

## ตัวอย่างการทดสอบ

### การทดสอบพื้นฐาน

```typescript
it("should load the main page", () => {
  cy.visit("http://localhost:4000");
  cy.contains("🏪 Product Storage").should("be.visible");
});
```

### การทดสอบกับ Backend

```typescript
// เพิ่มสินค้าผ่าน API
cy.request({
  method: "PUT",
  url: "http://localhost:3000/stock",
  body: { title: "Test Product", category: "Test", amount: 1 },
});

// ตรวจสอบว่าแสดงใน Frontend
cy.visit("http://localhost:4000");
cy.contains("Test Product").should("be.visible");
```

## หมายเหตุ

- เทสจะลบข้อมูลทดสอบอัตโนมัติก่อนแต่ละเทส
- ใช้ Backend API จริงในการทดสอบ
- ทดสอบการทำงานแบบเรียลไทม์ผ่าน SWR
- รองรับการทดสอบบนอุปกรณ์หลายขนาด
