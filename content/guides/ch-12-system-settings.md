# Chapter 3 - System Settings (Admin)

**Slug:** `ch-12-system-settings`  
**Audience:** Admin  
**Order:** 3000
Configure dropdown catalogs, the therapy services you sell and book, and invoice pricing rules under **System → Settings**.

**Primary path:** Sidebar → **System** → **Settings** → `/admin/settings`

This chapter covers three tabs:

1. **System Options** - dropdown values used across SmartHub  
2. **Services** - service codes, prices, and who can see them  
3. **Invoice Policies** - automatic pricing rules when invoices are created  

Other Settings tabs (rooms, library, administration) are covered in Clinic Setup where noted.

---

## 3.1 System Options

System Options are the lists behind many dropdowns: client type, client source, gender, session type, employment status, and other clinic catalogs.

### Open System Options

1. Open **System → Settings**
2. Select the **System Options** tab
3. Categories appear in the left list; options for the selected category appear on the right

### Add or update a category (when you need a new list)

1. Use **Add Category** (or the add control shown)
2. Enter the category name and details
3. Save the category
4. Select it in the sidebar before adding options

### Add a new option (example: Client Type)

1. Select the category that feeds the field you care about (for example **Client Type**)
2. Click **Add New Option** (or the equivalent option-add control)
3. Enter the label and value shown in the form
4. Save the option
5. Keep the option active when staff should see it
6. Reorder options if the UI allows, so common values sit first

Edit carefully if existing clients, sessions, or policies already use that option. Delete only when nothing still depends on it.

### Where the new option appears

After you save an active option, staff pick it in the product surfaces that use that category. Common examples:

| System Options category (typical) | Where you use it |
|-----------------------------------|------------------|
| **Client Type** | **Clients → Add Client / Edit Client → Clinical** tab → **Client Type** dropdown |
| **Client Source** | Add / Edit Client → **Referral** tab → **Client Source** |
| **Gender** (and similar personal lists) | Add / Edit Client → **Personal** tab |
| **Session Type** (clinical session type lists) | **Schedule New Session** → **Session Type** |
| Employment / education style lists | Add / Edit Client → **Employment** tab when those fields are shown |

**Check it worked (Client Type example)**

1. Go to **Clients → Add Client**
2. Open the **Clinical** tab
3. Open the **Client Type** dropdown
4. Confirm your new option is listed
5. Select it, finish any required fields, and create or save the client when testing end to end

If the option is missing, confirm it is under the correct category, is active, and refresh the page.

---

## 3.2 Services (session offerings)

Services define what you book and invoice: code, name, duration, price, and whether therapists or clients can see the service when scheduling.

Services live on one **Services** tab (code, name, duration, price, plus **Therapist** and **Client** visibility toggles).

### Open Services

1. Open **System → Settings**
2. Select the **Services** tab
3. Search by service code or name when the list is long

### Add a service

1. Click **Add Service Code**
2. Enter **Service Code**, **Service Name**, duration, and **price** (base rate)
3. Save with **Add Service Code** (or the create control on the modal)
4. Confirm the row appears in the table

### Control who sees the service

On each row:

1. Toggle **Therapist** ON so therapists can pick the service when booking
2. Toggle **Client** ON so the service can appear for client portal booking when portal booking uses clinic services
3. Leave a toggle OFF to hide the service from that audience without deleting the code

### Where the service appears

| Audience / place | What you should see |
|------------------|---------------------|
| Admin **Schedule New Session** | **Service** dropdown lists services that are available to book (respecting therapist visibility and assignment rules) |
| Therapist **Schedule New Session** | Same **Service** list for the therapist, when **Therapist** visibility is ON |
| Client portal booking | Services with **Client** visibility ON can be offered as bookable options (when the portal booking flow is enabled) |
| Billings / invoice lines | The service code and rate feed session billing when that service is used on the session |

**Check it worked**

1. Create or edit a service and turn **Therapist** ON  
2. Open **Scheduling → New Session** (or client **Sessions → Schedule Session**)  
3. Confirm the **Service** dropdown shows the new service  
4. If portal booking is used, turn **Client** ON and confirm the service is available to clients when they book  

Common issue: the service exists in the table but clients cannot book it because **Client** visibility is OFF.

---

## 3.3 Invoice Policies

Invoice policies set dynamic pricing rules by client type, session status, price type (fixed amount or percentage), service scope, and related options. Enabled policies apply when staff create session billing / invoices.

### Open Invoice Policies

1. Open **System → Settings**
2. Select the **Invoice Policies** tab
3. Use search to find a policy by client type, status, or name when shown

### Create a policy

1. Click **+ Add Policy**
2. Choose who it matches (for example client type — including types you added under System Options)
3. Choose session status (or all statuses when the form allows)
4. Set **Price type** (fixed or percentage) and the rate or amount
5. Set service scope (all services or a specific service) when available
6. Set priority if multiple policies can match
7. Save / **Create policy**
8. Leave the policy **Enabled** when it should apply (use the enabled toggle on the row)

### Edit, disable, or delete

1. Open the policy **Actions** menu (or edit control)
2. Update fields and save, or toggle **Enabled** off to stop applying without deleting
3. Delete only when the policy is no longer needed

### Where the policy applies

The policy does **not** run on the Settings screen itself. It runs when billing creates an invoice for a matching session:

1. Complete or status-update a session so it is ready for billing (per your clinic process)
2. Create the invoice from the session / client billing flow (Chapter 9)
3. SmartHub evaluates enabled policies against that session’s client type, status, service, and rules
4. The matching policy adjusts invoice price (for example percentage off base rate, or fixed amount)
5. Open the invoice (list or **View details**) and confirm the amount reflects the policy

**Check it worked (simple path)**

1. Ensure a **Client Type** option exists (Section 12.1) and assign it to a test client  
2. Ensure a **Service** exists with a clear base rate (Section 12.2)  
3. Create an **Invoice Policy** for that client type (and session status / service if you scoped them), enabled, with a clear percentage or fixed value  
4. Book a session for that client with that service and advance status as needed for billing  
5. Generate the invoice  
6. Confirm the calculated line or total follows the policy (for example 30% when the demo policy is 30%)  

If the policy does not apply: confirm it is **Enabled**, client type / status / service scope match the session, and priority is not overridden by another policy.

---

## Quick map

| Settings tab | You configure | You verify later at |
|--------------|---------------|---------------------|
| **System Options** | Catalog values | Client form dropdowns, scheduling session type, other catalog fields |
| **Services** | Codes, rates, visibility | Session **Service** dropdown; portal bookable services when Client is ON |
| **Invoice Policies** | Pricing rules | Generated session invoices and amounts |

---

Payments for client Stripe Connect and the clinic SmartHub plan stay under **System → Payments & Subscription**, not on these Settings tabs.
