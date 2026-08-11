# Chapter 10 — Staff (Custom Roles)

**Slug:** `ch-10-staff-custom-roles`  
**Audience:** Custom staff / supervisors (permission-driven)  
**Order:** 10000

How custom staff accounts differ from full Admin or dedicated Therapist homes when menus come from role permissions.

---

## 10.1 Permission-based staff access

### Sign in and the staff menu

1. Sign in at `/auth/staff/login`
2. Complete first-password activation if required (Chapter 1)
3. SmartHub loads permissions from your **Role**
4. Land on first permitted `/staff/...` route
5. If none: `/staff/no-access` — **No access configured**

Sidebar items appear **only** when allowed. Common subsets:

- **Clients**
- **Scheduling**
- **Billings**
- **Tasks**
- User Management (if permitted)
- Content children (Library, Assessment, Clinical Forms, Process Checklists, Report Templates)
- Compliance (often **HIPAA Audit**)
- **Notifications**

There is **no** dedicated staff dashboard like Admin/Therapist dashboards.

### Using other chapters with limited access

| If you can open… | Follow… | Note |
|------------------|---------|------|
| Clients | Chapter 4 | Only screens you see |
| Scheduling | Chapter 5 | Some edits may be hidden |
| Billings / Tasks / Content / Compliance / Notifications | Chapters 6–7 | Buttons may be missing by design |
| Subscription (if allowed) | Chapter 2 | e.g. `/staff/billing/subscription` |

### Supervisor pattern

Supervisors may see a wide menu but lack write actions such as:

- certain scheduling edits  
- billing service/policy management  
- subscription pay  
- some portal bulk/admin-only controls  

Missing buttons are permission design, not a broken page. Ask Admin to adjust **Role Management** permissions if access is wrong.

---
Product: `/staff/*` · Roles: `/admin/user-access/roles`
