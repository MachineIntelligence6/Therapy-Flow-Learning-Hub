# Chapter 6 — Billing & Payments

**Slug:** `ch-06-billing-and-payments`  
**Audience:** Admin (Therapist with access: `/therapist/billings`)  
**Order:** 6000

Operate clinic invoice records: search, filter, pay, email, download, discount, and status.

---

## 6.1 Billings workspace (Admin)

**Path:** Sidebar → **Billings** → `/admin/billings`

### Overview cards

- **Outstanding Balance**
- **Total Collected**
- **Active Clients**
- **Total Records**

### Table: **Billing Records**

**Search:** client names (placeholder as shown)  
**Filters** →

| Filter |
|--------|
| **Billing Status** |
| **Payment Status** |
| **Payment Method** |
| **Client Type** |
| **Session Type** |
| **Filter by Date** → **Start Date** · **End Date** |

**Clear all** · **Apply filters**

**Columns:** Client · Service · Therapist · Date · Amount · Paid · Status · Actions

### Record a payment

1. Row **Pay now**
2. Modal **Record Payment**
3. Fields: **Paid By** · **Amount received ($)** · **Date received** · **Payment Method** · **Reference Number** · notes
4. **Record Payment** (or **Cancel**)

### Row actions

- **Pay now** · **Preview**
- ⋮ **Email Invoice** · **Preview Invoice** · **Download Invoice**
- **Apply Discount** → **Discount Type** · **Amount** → **Apply Discount**
- **View Transactions**
- **Change Status** / **Change Billing Status** → **New Status** · **Optional Notes** → Mark as Paid / Denied as shown

(Split/refund appears when the build exposes those menu items.)

### Related clinic setup

- Invoice rules: Settings → **Invoice Policies** (Chapter 2)
- Client online pay: [Payments & Subscription](./ch-02-payments-and-subscription.md) (Stripe Connect) + client guide Chapter 9 **Pay now**

---
Product: `/admin/billings`
