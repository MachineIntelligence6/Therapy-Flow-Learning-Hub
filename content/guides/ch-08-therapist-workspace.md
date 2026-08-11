# Chapter 8 — Therapist Workspace

**Slug:** `ch-08-therapist-workspace`  
**Audience:** Therapist  
**Order:** 8000

Therapist first days, caseload, own schedule, booking, billings, tasks, and notifications.

**Therapist sidebar**

| Label | Route |
|-------|--------|
| **Dashboard** | `/therapist/dashboard` |
| **Clients** | `/therapist/clients` |
| **Scheduling** | `/therapist/scheduling` |
| **Billings** | `/therapist/billings` |
| **Tasks** | `/therapist/tasks` |

Login: always `/auth/staff/login` (never client `/auth/login`).

---

## 8.1 First days

### Login and dashboard

1. `/auth/staff/login` → password activation if required (Chapter 1)
2. Land `/therapist/dashboard`
3. Cards: **Active Clients** · **Today's Sessions** · **Pending Tasks** · **Billing Overview**
4. Sessions tabs: **Previous** · **Upcoming** · **Overdue** → **View all** → scheduling or **Schedule Session**
5. Deadlines / recent tasks → `/therapist/tasks` or history

### Set schedule in My Profile

1. Avatar menu → **My Profile**
2. Sidebar: **Basic Info** · **License** · **Specializations** · **Background** · **Schedule** · **Zoom Integration** · **Password**
3. **Schedule** → **Time Zone** · **Select Rooms** · **Working hours** → **Save Profile**
4. Other sections → **Save changes**
5. Configure **Zoom Integration** for virtual sessions
6. **Password** section to change password while signed in

Emergency contact is under **Basic Info** on therapist self-profile.

---

## 8.2 Clients & scheduling

### Clients and create patient

1. **Clients** `/therapist/clients`
2. Open a row for profile tabs (same nine as Admin)
3. **Add Client** → **Add New Client** tabs Personal → Clinical (fields in Chapter 4)
4. Optional **Enable Portal Access**; set **Assigned Therapist** (often yourself)
5. **Create Client**; manage portal from **Overview → Portal Access Management**
6. Header **Edit** / **Delete** (confirm)

### Schedule a session as therapist

1. **Scheduling** `/therapist/scheduling`
2. Views: **Day** · **Week** · **Month** · **All Sessions**
3. **New Session** → **Schedule New Session**
4. Fields: **Session Type** · **Client** · **Service** · **Session Mode** · **Date** · time slot · **Room** (in person) · notes  
   **No Therapist picker** — you are the therapist
5. **Schedule Session** → success toast
6. Alternate: client **Sessions** → **Schedule Session**
7. ⋮ → **Edit Session Details**; virtual → **Join Meeting** when available

---

## 8.3 Billings, tasks, notifications

### Billings

`/therapist/billings` — same invoice operations as Chapter 6 (Pay now, email, preview, download, discount, status), scoped to your clients/permissions.

### Tasks

1. `/therapist/tasks` — **All tasks** / **Active tasks**
2. **Add task** → **Create new task** → **Create task**
3. **Edit task** · **Task Details** · delete confirms
4. **View History** → `/therapist/tasks/history`

### Notifications

1. Top bar bell → **View all**
2. `/therapist/system/notifications` — **Notifications** inbox
3. Create client-scoped notifications when offered  
   (No full Admin Event Catalog / Triggers suite)

---
Product: `/therapist/*`
