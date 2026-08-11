# Chapter 1 — Getting Started

**Slug:** `ch-01-getting-started`  
**Audience:** Everyone (Admin, Therapist, Staff, Client)  
**Order:** 1000

Everyone starts here: use the correct login portal, finish first password setup, and recover access if locked out.

---

## 1.1 Sign in correctly

### Who signs in where

| Who | Login URL | After login |
|-----|-----------|-------------|
| Organisation Admin | `/auth/staff/login` | `/admin/dashboard` |
| Therapist | `/auth/staff/login` | `/therapist/dashboard` |
| Custom staff | `/auth/staff/login` | First allowed `/staff/...` page |
| Client / patient | `/auth/login` | `/user/appointments` |

**Rules**

- Staff, therapists, and admins always use **`/auth/staff/login`**
- Clients always use **`/auth/login`**
- Do not mix the two portals

### First login — set your password (staff / admin / therapist)

1. Open `/auth/staff/login`
2. Enter **email** + temporary **password** from your admin
3. Click **Sign In**
4. If required, open **Set your password** at `/auth/staff/activate-your-account`
5. Enter new password + confirm → **Set password** (button may show **Saving...**)
6. Success page `/auth/staff/password-reset-success` → **Back to login**
7. Sign in again with the new password

| Situation | Correct path |
|-----------|--------------|
| First login / must change password | `/auth/staff/activate-your-account` |
| Forgot password later | `/auth/staff/forgot-password` |

### Forgot password (Admin / Therapist / Staff)

1. `/auth/staff/forgot-password` (**Reset Password**)
2. Enter staff email → continue
3. `/auth/staff/check-email` → open email
4. Link opens `/auth/staff/set-new-password?token=...`
5. Set + confirm password → success → **Back to login** → `/auth/staff/login`

If no email: check spam; confirm user is **Active** under **User & Access → User Profiles**.

### Forgot password (Client)

1. `/auth/forgot-password`
2. Enter portal email → `/auth/check-email`
3. Link: `/auth/set-new-password?token=...`
4. Set password → `/auth/login`

If it fails: clinic must have **Enable Portal Access** ON; use client **Overview → Portal Access Management → Resend Activation Email** if never activated.

---
Product logins: `/auth/staff/login` · `/auth/login`
