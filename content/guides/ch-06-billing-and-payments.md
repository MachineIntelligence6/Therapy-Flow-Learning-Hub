# Chapter 9 - Billing & Payments

**Slug:** `ch-06-billing-and-payments`  
**Audience:** Admin (Therapist with access: `/therapist/billings`)  
**Order:** 9000
Run clinic invoice records: search, filter, record payments, email, download, discount, and status.

**Path:** Sidebar → **Billings** → `/admin/billings`

Online client **Pay now** depends on Stripe Connect under **System → Payments & Subscription**, not this workspace alone.

---

## 9.1 Billings workspace (Admin)

### Overview cards

- **Outstanding Balance**
- **Total Collected**
- **Active Clients**
- **Total Records**

### Table: Billing Records

Use search on client names. Open **Filters** for:

| Filter |
|--------|
| **Billing Status** |
| **Payment Status** |
| **Payment Method** |
| **Client Type** |
| **Session Type** |
| **Filter by Date** (**Start Date**, **End Date**) |

**Clear all** · **Apply filters**

Typical columns: Client, Service, Therapist, Date, Amount, Paid, Status, Actions.

### Record a payment

1. Row **Pay now**
2. Modal **Record Payment**
3. **Paid By**, **Amount received ($)**, **Date received**, **Payment Method**, **Reference Number**, notes
4. **Record Payment** (or **Cancel**)

### Other row actions

- **Preview**
- ⋮ **Email Invoice**, **Preview Invoice**, **Download Invoice**
- **Apply Discount** → type and amount → **Apply Discount**
- **View Transactions**
- **Change Status** / **Change Billing Status** → new status and optional notes

Split or refund appears only when that build exposes those items.

### Related setup

- Invoice rules: **Settings → Invoice Policies** (Chapter 3)
- Client card pay: **System → Payments & Subscription → Payment Integration** (Chapter 13)
- Client steps: Chapter 12 **Pay an invoice**

---
Product: `/admin/billings`
