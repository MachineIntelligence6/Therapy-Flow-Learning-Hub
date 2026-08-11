# Chapter 8 - Therapist Workspace

**Slug:** `ch-08-therapist-workspace`  
**Audience:** Therapist  
**Order:** 8000

Therapist first days: caseload, schedule, booking, billings, tasks, and notifications.

**Therapist sidebar**

| Label | Route |
|-------|--------|
| **Dashboard** | `/therapist/dashboard` |
| **Clients** | `/therapist/clients` |
| **Scheduling** | `/therapist/scheduling` |
| **Billings** | `/therapist/billings` |
| **Tasks** | `/therapist/tasks` |

Login is always `/auth/staff/login` (never client `/auth/login`).

---

## 8.1 First days

### Login and dashboard

1. Sign in at `/auth/staff/login` (first password / MFA as in Chapter 1)
2. Land on `/therapist/dashboard`
3. Cards: **Active Clients**, **Today's Sessions**, **Pending Tasks**, **Billing Overview**
4. Sessions tabs: **Previous**, **Upcoming**, **Overdue** → **View all** or **Schedule Session**
5. Deadlines and recent tasks link into `/therapist/tasks` or history

### My Profile schedule and Zoom

1. Avatar menu → **My Profile**
2. Sections: **Basic Info**, **License**, **Specializations**, **Background**, **Schedule**, **Zoom Integration**, **Password**
3. **Schedule**: **Time Zone**, **Select Rooms**, **Working hours** → **Save Profile**
4. Other sections: **Save changes** as shown
5. Configure **Zoom Integration** for virtual sessions
6. Use **Password** to change password while signed in

Emergency contact sits under **Basic Info** on the therapist self-profile.

---

## 8.2 Clients and scheduling

### Clients

1. **Clients** → `/therapist/clients`
2. Open a row for the same profile tabs as Admin
3. **Add Client** → **Add New Client** (Personal through Clinical; full field list in Chapter 4)
4. Optional **Enable Portal Access**; set **Assigned Therapist** (often yourself)
5. **Create Client**; manage portal from **Overview → Portal Access Management**
6. Header **Edit** / **Delete** (confirm)

### Schedule a session

1. **Scheduling** → `/therapist/scheduling`
2. Views: **Day**, **Week**, **Month**, **All Sessions**
3. **New Session** → **Schedule New Session**
4. Fields: **Session Type**, **Client**, **Service**, **Session Mode**, **Date**, time slot, **Room** (In Person), notes  
   There is **no Therapist picker**. You are the therapist.
5. **Schedule Session**
6. Or open a client **Sessions** tab → **Schedule Session**
7. ⋮ → **Edit Session Details**; virtual → **Join Meeting** / **Join Zoom** when available

---

## 8.3 Billings, tasks, notifications

### Billings

`/therapist/billings` uses the same invoice actions as Chapter 6 (Pay now, email, preview, download, discount, status), limited by your clients and permissions.

### Tasks

1. `/therapist/tasks` with **All tasks** / **Active tasks**
2. **Add task** → **Create new task** → **Create task**
3. **Edit task**, **Task Details**, delete confirms
4. **View History** → `/therapist/tasks/history`

### Notifications

1. Top bar bell → **View all**
2. Inbox under therapist notifications (often `/therapist/system/notifications`)
3. Create client-scoped items only if offered  
   No full Admin event catalog / triggers suite

---
Product: `/therapist/*`
