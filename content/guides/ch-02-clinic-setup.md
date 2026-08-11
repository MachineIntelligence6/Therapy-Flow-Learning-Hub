# Chapter 2 — Clinic Setup (Admin)

**Slug:** `ch-02-clinic-setup`  
**Audience:** Admin  
**Order:** 2000

Make the clinic operational before clients and sessions: practice identity, catalogs, services, rooms, and invoice rules.

**Payments & Subscription** (Stripe Connect for client invoices, SmartHub SaaS plan) is a separate sub-chapter: [Payments & Subscription](./ch-02-payments-and-subscription.md).

**Primary nav:** Sidebar → **System** → **Settings** → `/admin/settings`

**Settings tabs (exact labels)**

| Tab | Query |
|-----|--------|
| **System Options** | `?tab=system-options` |
| **Service Prices** | `?tab=service-prices` |
| **Service Visibility** | `?tab=service-visibility` |
| **Invoice Policies** | `?tab=invoice-policies` |
| **Therapy Rooms** | `?tab=therapy-rooms` |
| **Library Categories** | `?tab=library-categories` |
| **Administration** | `?tab=administration` |

---

## 2.1 Practice foundations

### Configure practice details (Administration)

1. `/admin/settings` → **Administration**
2. Under **Practice Configuration**, fill practice name, address, phone, email, website, timezone, and other shown fields
3. Click **Save Configuration**
4. Refresh and confirm values remain

### Manage System Options (dropdown catalogs)

1. Settings → **System Options**
2. Review categories
3. **Add Category** when needed
4. Inside a category: **Add New Option**
5. Edit or delete options carefully (existing records may use them)
6. Reorder if the UI allows so common values appear first

Create useful session-type options **before** heavy scheduling.

### Create Library Categories

1. Settings → **Library Categories**
2. **Add Category** → enter details → **Add Category** / **Update Category**
3. Confirm it appears for Content → Library

---

## 2.2 Services and rooms

### Add service codes and prices

1. Settings → **Service Prices** (`?tab=service-prices`)
2. **Add Service Code**
3. Fill service name, duration, base rate/price, code/identifier, other fields shown
4. Submit **Add Service Code**
5. Confirm the row in the list; repeat for each service

### Control which services therapists and clients can see

1. Settings → **Service Visibility**
2. For each service row review:
   - Therapist visibility  
   - Client portal visibility  
3. Turn ON only what each audience should book
4. Save/apply if the UI requires it
5. Test Admin/Therapist **Service** dropdown and portal **Select a service**

**Common mistake:** service exists in **Service Prices** but is hidden from portal → clients cannot book it.

### Add therapy rooms

On this tab you create the clinic’s rooms. Therapists (or Admin on the therapist’s profile) then assign those rooms on **Schedule → Select Rooms**, so only those rooms show when booking **In Person** sessions.

1. Settings → **Therapy Rooms**
2. **Add Room**
3. Enter room number, room name, room type, keep **active** if usable
4. Submit **Add Room**
5. Assign rooms to therapists:
   - Admin → User Profiles → **Professional Details** → **Schedule** → **Select Rooms**, or  
   - Therapist → **My Profile** → **Schedule** → **Select Rooms**

Inactive rooms do not appear reliably when booking in-person sessions.

---

## 2.3 Invoice policies

### Create invoice policies

1. Settings → **Invoice Policies**
2. **Add Policy**
3. Configure: **Client type**, **Session status**, price type (fixed/%), price value, optional service, optional date range
4. **Create policy**
5. Edit later → **Save changes**; use active toggle to enable/disable

---

**Next (sub-chapter):** [Payments & Subscription](./ch-02-payments-and-subscription.md) — Stripe Connect for client invoice pay, and the clinic’s SmartHub plan.

---
Product: `/admin/settings`
