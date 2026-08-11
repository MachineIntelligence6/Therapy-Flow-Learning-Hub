# Chapter 2 — Payments & Subscription (Admin)

**Slug:** `ch-02-payments-and-subscription`  
**Parent:** `ch-02-clinic-setup`  
**Audience:** Admin  
**Order:** 2100

Sub-chapter of **Clinic Setup**. Connect Stripe so clients can pay clinic invoices online, and manage the clinic’s own SmartHub subscription. These are two different billing paths — do not mix them.

**Primary nav:** Sidebar → **System** → **Settings** → `/admin/settings`

| Tab | Query |
|-----|--------|
| **Payment Integration** | `?tab=stripe-connect` |
| **Subscription** | `?tab=subscription-billing` |

---

## Connect Stripe for client invoice payments

**Payment Integration** = clients pay clinic invoices (Connect).  
**Subscription** = clinic pays SmartHub SaaS — do not mix.

1. Settings → **Payment Integration**
2. **Connect Stripe** → complete Stripe onboarding
3. Return to SmartHub; verify connected status
4. Optional **Advanced Stripe configuration** → **Save configuration**
5. **Refresh** / **Disconnect** only when intentional

After connect, clients can use **Pay now** on portal invoices when billing allows.

---

## Manage the clinic SmartHub subscription

1. Settings → **Subscription** (or `/billing/subscription` / `/admin/billing/subscription`)
2. Review plan, trial, next actions
3. Add payment method / subscribe / pay invoice as offered
4. Success path: `/billing/subscription/success`

---
Product: `/admin/settings?tab=stripe-connect` · `/admin/settings?tab=subscription-billing`  
Related: [Clinic Setup](./ch-02-clinic-setup.md) · [Billing & Payments](./ch-06-billing-and-payments.md) · [Client Portal — Pay now](./ch-09-client-portal.md)
