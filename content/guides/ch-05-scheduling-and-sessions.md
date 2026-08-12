# Chapter 7 - Scheduling & Sessions

**Slug:** `ch-05-scheduling-and-sessions`  
**Audience:** Admin (Therapist scheduling is similar in Chapter 11)  
**Order:** 7000
Book sessions, import in bulk, use calendar views, and manage the session lifecycle from Scheduling and the Admin dashboard.

**Primary path:** Sidebar → **Scheduling** → `/admin/scheduling`

---

## 7.1 Book sessions (Admin)

### Schedule New Session

| Entry | How |
|-------|-----|
| Calendar | **Scheduling** → **New Session** / **+ New Session** |
| Client profile | **Sessions** → **Schedule Session** |
| Dashboard | Empty Upcoming → **Schedule Session** |

Modal title: **Schedule New Session**  
Plan type: **One-time session** or **Recurring series** (steps **1 Session** then **2 Repeat**)

Session step fields (order as shown):

1. **Session Type**
2. **Client**
3. **Service**
4. **Therapist** (Admin; often prefilled from **Assigned Therapist**)
5. **Session Mode**: **In Person** ("Face to face at clinic") or **Virtual** ("Online video session")
6. **Date**
7. **Select time slot** (therapist timezone and availability)
8. **Room** (In Person only; after date/time)
9. **Session notes or special instructions** (optional)

| Plan | Main button |
|------|-------------|
| One-time | **Schedule Session** |
| Recurring step 1 | **Continue** |
| Recurring step 2 | **Create Recurring Series** |

Also: **Cancel**, **Back**. Success messaging ends with **Done**.

**Calendar views:** **Day**, **Week**, **Month**, **All Sessions**

| Mode | Room | Online meeting |
|------|------|----------------|
| In Person | Physical **Room** | No Zoom |
| Virtual | No room required | Meeting / Zoom when configured for the therapist |

### Bulk import

1. `/admin/scheduling` → **Import**
2. Modal **Bulk Upload Sessions**
3. **Download Template**, fill CSV, upload
4. **Upload Sessions** and review errors or success
5. Confirm on the calendar or **All Sessions**

---

## 7.2 Session lifecycle and dashboard

### Session card ⋮ (status dependent)

| Menu label | Purpose |
|------------|---------|
| **Edit Session Details** | **Edit Session** modal |
| **Create invoice** | When billable |
| **Record Session** / **View Transcript** | Recording flow |
| Status marks | Scheduled, Confirmed, Overdue, In Progress, Completed, Cancelled, Rescheduled, No-Show |
| **Cancel Upcoming Series** | Future recurrence |
| **Join Meeting** | Virtual (staff/therapist paths) |
| **Download PDF** / **Reopen Note** | After note work |
| **Delete Session** | Confirm |

Virtual sessions may also show **Join Zoom** where the product surface uses that label.

### Notes

1. **Add Note** or **View Note**
2. Complete the note editor
3. Save; later use PDF, reopen, or delete when offered

### Admin dashboard (`/admin/dashboard`)

**Stat cards:** **Active Clients**, **Today's Sessions**, **Pending Tasks**, **Billing Overview**

**Sessions panel:** **Previous**, **Upcoming**, **Overdue** → **View all** to Scheduling; empty state **Schedule Session**

**Tasks panels:** **Upcoming Deadlines**, **Recent Tasks** → ⋮ View / Edit / Delete → **View all** to `/admin/tasks`; empty **Create new task**

---
Product: `/admin/scheduling` · `/admin/dashboard`
