# Chapter 13 - Payments & Subscription (Admin)

**Slug:** `ch-02-payments-and-subscription`  
**Parent:** `ch-02-clinic-setup`  
**Audience:** Admin  
**Order:** 13000
Sub-chapter of **Clinic Setup**. Two separate money flows:

1. **Payment Integration** - clients pay your clinic invoices (Stripe Connect)
2. **Subscription** - your clinic pays the TherapyFlow / SmartHub plan

Do not mix these two tabs.

Open from the sidebar: **System → Payments & Subscription** (`/admin/payments-and-subscription`).

- **Payment Integration** tab: online pay for client invoices
- **Subscription** tab: clinic SmartHub plan, trial, and plan invoices

---

## 13.1 Payment Integration (client invoice pay)

Use this so clients can **Pay now** on portal invoices when the invoice is payable.

1. Open **System → Payments & Subscription**
2. Select **Payment Integration**
3. Click **Connect Stripe** and finish Stripe onboarding
4. Return to SmartHub and confirm connected status
5. Use **Advanced Stripe configuration** and **Save configuration** only if you need extra options
6. Use **Refresh** or **Disconnect** only when intentional

Until Stripe is connected for the clinic, online **Pay now** for clients will not work as expected.

---

## 13.2 Subscription (clinic SmartHub plan)

Use this for the organisation's own plan, trial status, invoices, and self-serve pay or checkout when offered.

1. Open **System → Payments & Subscription**
2. Select **Subscription**
3. Review plan name, status, billing cycle, price, and period end
4. Follow the primary button offered (for example add payment method, subscribe, pay invoice, or manage billing)
5. Open an invoice row with **View details** when you need the full invoice breakdown
6. Use **Pay invoice** when the balance is unpaid and self-serve pay is allowed

After checkout you may land on `/billing/subscription` or `/billing/subscription/success`.
