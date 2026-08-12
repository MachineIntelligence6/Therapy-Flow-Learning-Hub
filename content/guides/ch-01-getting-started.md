# Chapter 1 - Getting Started

**Slug:** `ch-01-getting-started`  
**Audience:** Everyone (Admin, Therapist, Staff, Client)  
**Order:** 1000
Use the right login portal, finish first access setup, then open SmartHub.

---

## 1.1 Sign in correctly

### Who signs in where

Use the full site URL (example base: `https://therapyflow.pro`). The base domain can be changed later from **Super Admin**, so your clinic link may look different but the paths stay the same.

- Who: Organisation Admin · Login URL: `https://therapyflow.pro/auth/staff/login` · After login: `https://therapyflow.pro/admin/dashboard`
- Who: Therapist · Login URL: `https://therapyflow.pro/auth/staff/login` · After login: `https://therapyflow.pro/therapist/dashboard`
- Who: Custom staff · Login URL: `https://therapyflow.pro/auth/staff/login` · After login: first allowed `https://therapyflow.pro/staff/...` page
- Who: Client / patient · Login URL: `https://therapyflow.pro/auth/login` · After login: `https://therapyflow.pro/user/appointments`

Rules:

- Staff, therapists, and admins always use **Staff** login: `https://therapyflow.pro/auth/staff/login`
- Clients always use **Client** login: `https://therapyflow.pro/auth/login`
- Do not mix the two portals

### First login for staff, admin, or therapist

1. Open `https://therapyflow.pro/auth/staff/login`
2. Enter **email** and temporary **password** from your clinic
3. Click **Sign In**
4. If asked to set a password, complete **Set your password** at `https://therapyflow.pro/auth/staff/activate-your-account`
5. Enter new password and confirm, then submit **Set password**
6. If **Protect your account** (MFA) appears:
   - Choose a method (Email is the usual default)
   - Enter the code
   - Save recovery codes (Copy or Download)
   - Use **I saved my codes - continue to portal** (or **Continue to portal**) when offered
7. You should land in SmartHub. If you only finished password setup without a full session, sign in again at `https://therapyflow.pro/auth/staff/login`

| Situation | Path |
|-----------|------|
| Must change password on first use | `https://therapyflow.pro/auth/staff/activate-your-account` |
| Forgot password later | `https://therapyflow.pro/auth/staff/forgot-password` |

### Forgot password (Admin, Therapist, Staff)

1. Open `https://therapyflow.pro/auth/staff/forgot-password` (**Reset Password**)
2. Enter staff email and continue
3. Check email, then open the reset link (opens `https://therapyflow.pro/auth/staff/set-new-password?token=...`)
4. Set and confirm password, then **Back to login** and sign in at `https://therapyflow.pro/auth/staff/login`

If no email arrives: check spam, then ask Admin to confirm the user is **Active** under **User & Access → User Profiles**.

### Forgot password (Client)

1. Open `https://therapyflow.pro/auth/forgot-password`
2. Enter portal email
3. Open the email link (`https://therapyflow.pro/auth/set-new-password?token=...`)
4. Set password, then sign in at `https://therapyflow.pro/auth/login`

If it fails: Portal access must be ON for that client. Clinic: open the client **Overview → Portal Access Management** and **Resend Activation Email** if they never activated.

---
Product: `https://therapyflow.pro/auth/staff/login` · `https://therapyflow.pro/auth/login`
