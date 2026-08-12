# Chapter 10 - Staff (Custom Roles)

**Slug:** `ch-10-staff-custom-roles`  
**Audience:** Custom staff / supervisors (permission-driven)  
**Order:** 10000
How custom staff access differs from full Admin or dedicated Therapist homes when the menu comes from role permissions.

---

## 10.1 Permission-based staff access

### Sign in and menu

1. Sign in at `/auth/staff/login`
2. Complete first password and MFA if required (Chapter 1)
3. SmartHub loads permissions from your **Role**
4. You land on the first permitted `/staff/...` route
5. If nothing is allowed: `/staff/no-access` with **No access configured**

Sidebar items show **only** when allowed. Common groups:

- **Clients**
- **Scheduling**
- **Billings**
- **Tasks**
- User management (if permitted)
- Content children (Library, Assessment, Clinical Forms, Process Checklists, Report Templates)
- Compliance (often **HIPAA Audit**)
- **Notifications**
- **Payments & Subscription** only if that permission is granted

There is **no** dedicated staff dashboard like Admin or Therapist dashboards.

### Using other chapters with limited access

| If you can open... | Follow... | Note |
|------------------|---------|------|
| Clients | Chapter 4 | Only screens you see |
| Scheduling | Chapter 5 | Some edits may be hidden |
| Billings / Tasks / Content / Compliance / Notifications | Chapters 6 to 7 | Buttons may be missing by design |
| Payments & Subscription | Chapter 2 sub-chapter | Pay and Connect buttons may be restricted |

### Supervisor pattern

Supervisors may see many menu items but lack write actions such as some schedule edits, billing policy work, subscription pay, or portal bulk controls.

Missing buttons are almost always role design, not a broken page. Ask Admin to adjust **Role Management** if access is wrong.

---
Product: `/staff/*` · Roles: `/admin/user-access/roles`
