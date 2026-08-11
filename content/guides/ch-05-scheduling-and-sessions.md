# Chapter 5 — Scheduling & Sessions

**Slug:** `ch-05-scheduling-and-sessions`  
**Audience:** Admin (Therapist scheduling mirrored in Chapter 8)  
**Order:** 5000

Book appointments, bulk import, manage calendar views, run session lifecycle, and triage from the dashboard.

**Primary nav:** Sidebar → **Scheduling** → `/admin/scheduling`

---

## 5.1 Booking appointments (Admin)

### Schedule New Session

**Entry points**

| Entry | Path |
|-------|------|
| Calendar | **Scheduling** → **+ New Session** / **New Session** |
| Client | Profile → **Sessions** → **Schedule Session** |
| Dashboard | Empty Upcoming → **Schedule Session** |

**Modal:** **Schedule New Session**  
**Plan type:** **One-time session** · **Recurring series** (steps **1 Session** → **2 Repeat**)

**Field order (Session step)**

1. **Session Type**  
2. **Client**  
3. **Service**  
4. **Therapist** (Admin; prefill from **Assigned Therapist** when set)  
5. **Session Mode**  
   - **In Person** — “Face to face at clinic”  
   - **Virtual** — “Online video session”  
6. **Date**  
7. **Select time slot** (therapist timezone / availability)  
8. **Room** — in-person only, after date/time  
9. **Session notes or special instructions** (optional)  

**Buttons**

| Plan | Button |
|------|--------|
| One-time | **Schedule Session** |
| Recurring step 1 | **Continue** |
| Recurring step 2 | **Create Recurring Series** |
| Any | **Cancel**, **Back** |

**Success:** **Session scheduled successfully!** / recurring success messaging → **Done**

**Calendar views:** **Day** · **Week** · **Month** · **All Sessions**

| Mode | Room | Meeting |
|------|------|---------|
| In Person | Physical **Room** | No Zoom |
| Virtual | No room required | Zoom when therapist Zoom works |

### Bulk import sessions

1. `/admin/scheduling` → **Import**
2. Modal **Bulk Upload Sessions**
3. **Download Template** → fill CSV → upload
4. **Upload Sessions** → review errors/success
5. Confirm on calendar / **All Sessions**

---

## 5.2 Session lifecycle and dashboard operations

### Session card ⋮ actions (status-dependent)

| Menu label | Purpose |
|------------|---------|
| **Edit Session Details** | **Edit Session** modal |
| **Create invoice** | When billable |
| **Record Session** / **View Transcript** | Recording flow |
| **Mark as Scheduled / Confirmed / Overdue / In Progress / Completed / Cancelled / Rescheduled / No-Show** | Status |
| **Cancel Upcoming Series** | Future recurrence |
| **Join Meeting** | Virtual (therapist/staff paths) |
| **Download PDF** / **Reopen Note** | After note |
| **Delete Session** | Confirm |

### Notes

1. **Add Note** / **View Note**
2. Complete **Add Session Note** editor
3. Submit/save; later PDF / reopen / delete as offered

### Admin dashboard (`/admin/dashboard`)

**Stat cards:** **Active Clients** · **Today's Sessions** · **Pending Tasks** · **Billing Overview**

**Sessions panel:** tabs **Previous** · **Upcoming** · **Overdue** → **View all** → scheduling; empty → **Schedule Session**

**Tasks panels:** **Upcoming Deadlines** · **Recent Tasks** → ⋮ View/Edit/Delete → **View all** → `/admin/tasks` or history; empty **Create new task**

---
Product: `/admin/scheduling` · `/admin/dashboard`
