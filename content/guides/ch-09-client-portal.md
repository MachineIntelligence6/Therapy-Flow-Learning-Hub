# Chapter 12 - Client Portal

**Slug:** `ch-09-client-portal`  
**Audience:** Client  
**Order:** 12000
Activate access, book and review sessions, manage profile, documents, forms, and invoices.

**Client sidebar**

| Label | Route |
|-------|--------|
| **Appointments** | `/user/appointments` |
| **Booked Sessions** | `/user/booked-sessions` |
| **Invoices** | `/user/invoices` |
| **Documents** | `/user/documents` |
| **Clinical Forms** | `/user/clinical-forms` |

After activation, login is `/auth/login` only (never staff login).

---

## 12.1 Activate and sign in

### Activate from email

Clinic must have **Enable Portal Access** ON, and you need the activation email (or a resend).

1. Open `/portal/activate/:token`
2. Complete **Activate Your Account**
3. Password and confirm → **Activate account**
4. You should land on `/user/appointments`

Invalid link: clinic **Resend Activation Email** from client **Overview**.

### Sign in after activation

1. `/auth/login`
2. Email and password
3. Land on `/user/appointments`
4. Avatar menu: **My Profile**, **Privacy Settings**

First-time security may show MFA and recovery codes. Save the codes, then continue into the portal.

Forgotten password: `/auth/forgot-password` (Chapter 1).

---

## 12.2 Book and review appointments

### Book an appointment

1. **Appointments** → `/user/appointments`
2. Choose **In person** or **Virtual Visit**
3. **Select Date & Time** (future date and slot)
4. Choose service under the on-screen service prompt → **Select a service**
5. **Next**
6. Confirm modal: name, date and time, meeting type (**Virtual** / **In-Person**), service, price
7. **Confirm Booking** → confirmation screen → **Done**

List filters: **Upcoming**, **Previous**, plus search as shown.

### Booked sessions and rating

1. **Booked Sessions** → `/user/booked-sessions`
2. Search: **Search by service, therapist, or location...**
3. Status filter when available
4. Detail: `/user/booked-sessions/:sessionId` → **Back to booked sessions**
5. Completed session: **Rate session** / **Rate this session**
6. Modal **Rate your session**: **Rating (0-10)**, **Comment** → **Submit rating**

---

## 12.3 Profile, documents, forms, pay

### My Profile and Privacy

1. Avatar → **My Profile** (`/user/my-profile`)
2. Read-only basics: **Full Name**, **Client ID**, **Email**, **Phone**
3. **Upload new picture** (JPEG/PNG/GIF/WebP within size limits)
4. **Timezone** (search **Search timezone...**) → **Save timezone**
5. Avatar → **Privacy Settings** (`/user/privacy-settings`)

### Documents

1. **Documents** → **Uploaded Documents**
2. **Upload Document** → file and metadata → **Upload Document**
3. Preview or download from the table as shown

### Clinical forms

1. **Clinical Forms**
2. Search or status filter
3. Card **Start** / **Continue** / **View** → `/user/clinical-forms/:formId`
4. Fill fields and signature when required
5. **Submit Form**

### Pay an invoice

1. **Invoices** → `/user/invoices`
2. **Pay now** → Stripe Checkout
3. Success return shows a completed payment toast
4. Cancelled checkout can show a cancelled message
5. **Receipt** download when available

Requires clinic **Payment Integration** under **System → Payments & Subscription** (see Chapter 13) and a payable invoice.

---
Product: `/user/*`
