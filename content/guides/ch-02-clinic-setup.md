# Chapter 2 - Clinic Setup (Admin)

**Slug:** `ch-02-clinic-setup`  
**Audience:** Admin  
**Order:** 2000
Set up the clinic before busy client and session work: practice details, catalogs, services, rooms, and invoice rules.

Payments and Stripe are **not** in Settings. Use **System → Payments & Subscription** for client payments and the clinic SmartHub plan (see related guides at the bottom of that page).

Open settings from the sidebar: **System → Settings** (`/admin/settings`). Use the tabs along the page for each area below.

---

## 2.1 Practice foundations

### Practice details (Administration)

1. Open **System → Settings** → **Administration**
2. Under **Practice Configuration**, fill practice name, address, phone, email, website, timezone, and the other fields shown
3. Click **Save Configuration**
4. Refresh and confirm the values still show

### System Options (dropdown lists)

1. Settings → **System Options**
2. Review categories
3. **Add Category** when you need a new group
4. Inside a category: **Add New Option**
5. Edit or delete carefully if records already use those values
6. Reorder options when the UI allows, so common values sit first

Add useful session-type options before you schedule at scale.

### Library Categories

1. Settings → **Library Categories**
2. **Add Category** → enter details → **Add Category** or **Update Category**
3. Confirm the category is available under **Content → Library**

---

## 2.2 Services and rooms

### Service Prices

1. Settings → **Service Prices**
2. Click **Add Service Code**
3. Fill service name, duration, rate/price, code, and other fields shown
4. Submit **Add Service Code**
5. Confirm the row appears; repeat for each service

### Service Visibility

1. Settings → **Service Visibility**
2. For each service, set therapist visibility and client portal visibility
3. Turn ON only what each audience should use
4. Save or apply if the UI asks for it
5. Check the **Service** dropdown in Admin/Therapist booking and **Select a service** in the client portal

Common issue: the service exists under **Service Prices** but is hidden for the portal, so clients cannot book it.

### Therapy Rooms

Create clinic rooms here. Assign rooms on a therapist schedule (**Select Rooms**) so they appear when booking **In Person** sessions.

1. Settings → **Therapy Rooms**
2. **Add Room**
3. Enter room number, name, type; keep active if the room is usable
4. Submit **Add Room**
5. Assign rooms from Admin **User & Access → User Profiles** → **Professional Details** → **Schedule** → **Select Rooms**, or from Therapist **My Profile** → **Schedule** → **Select Rooms**

Inactive rooms usually do not show for in-person booking.

---

## 2.3 Invoice policies

1. Settings → **Invoice Policies**
2. **Add Policy**
3. Set client type, session status, price type (fixed or %), value, and optional service or date range
4. **Create policy**
5. Edit later with **Save changes**; use the active toggle to enable or disable

---

Open **System → Payments & Subscription** next when you are ready to connect Stripe or manage the clinic plan.
