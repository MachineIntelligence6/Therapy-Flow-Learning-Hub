# Chapter 9 — Client Portal

**Slug:** `ch-09-client-portal`  
**Audience:** Client  
**Order:** 9000

Activate access, book and review sessions, manage profile, documents, forms, and invoices.

**Client sidebar**

| Label | Route |
|-------|--------|
| **Appointments** | `/user/appointments` |
| **Booked Sessions** | `/user/booked-sessions` |
| **Invoices** | `/user/invoices` |
| **Documents** | `/user/documents` |
| **Clinical Forms** | `/user/clinical-forms` |

Login after activation: `/auth/login` only (never staff login).

---

## 9.1 Activate & sign in

### Activate from email

**Prerequisites:** Clinic turned **Enable Portal Access** ON; activation email received (or resent).

1. Open link `/portal/activate/:token`
2. Page **Activate Your Account**
3. Password + confirm → **Activate account** (**Activating...**)
4. Redirect to `/user/appointments`

Invalid link → clinic **Resend Activation Email** from Overview.

### Sign in after activation

1. `/auth/login`
2. Email + password
3. Land `/user/appointments`
4. Avatar: **My Profile** · **Privacy Settings**

Forgotten password: `/auth/forgot-password` (Chapter 1).

---

## 9.2 Book / review appointments

### Book an appointment

1. **Appointments** `/user/appointments`
2. Mode: **In person** or **Virtual Visit**
3. **Select Date & Time** → future date + slot
4. **Choose the type of service you need** → **Select a service**
5. **Next**
6. Modal **Confirm Your Appointment**: Name · Date & Time · Meeting Type (**Virtual** / **In-Person**) · Service · Price
7. **Confirm Booking** → **Appointment Confirmed** / **You're all set!** → **Done**

List: **Upcoming** · **Previous** · search as shown.  
Not available to clients today: cancel from list / join Zoom from this page.

### Booked sessions and rating

1. **Booked Sessions** `/user/booked-sessions`
2. Search: **Search by service, therapist, or location...**
3. Optional status filter (API-backed when deployed)
4. Open detail `/user/booked-sessions/:sessionId` → **Back to booked sessions**
5. Completed session: **Rate session** / **Rate this session**
6. Modal **Rate your session**: **Rating (0–10)** · **Comment** → **Submit rating**

---

## 9.3 Profile, documents, forms, payments

### My Profile and Privacy

1. Avatar → **My Profile** `/user/my-profile`
2. Read-only: **Full Name** · **Client ID** · **Email** · **Phone**
3. **Upload new picture** (JPEG/PNG/GIF/WebP size limits)
4. **Timezone** (search **Search timezone...**) → **Save timezone**
5. Avatar → **Privacy Settings** `/user/privacy-settings`

### Documents

1. **Documents** → heading **Uploaded Documents**
2. **Upload Document** → modal **Upload Document** → file + metadata → **Upload Document**
3. Preview / download from table as shown

### Clinical forms

1. **Clinical Forms**
2. Search / status filter
3. Card **Start** / **Continue** / **View** → `/user/clinical-forms/:formId`
4. Fill fields + signature when required
5. **Submit Form** (**Submitting...**)

### Pay an invoice

1. **Invoices** `/user/invoices`
2. **Pay now** → Stripe Checkout
3. Return `?payment=success` → toast **Payment completed successfully.**
4. Cancel Checkout may show **Payment was cancelled.**
5. **Receipt** download when available  

Requires clinic **Payment Integration** (Stripe Connect; see [Payments & Subscription](./ch-02-payments-and-subscription.md)) and a payable invoice.

---
Product: `/user/*`
