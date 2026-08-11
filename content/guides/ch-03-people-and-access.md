# Chapter 3 — People & Access (Admin)

**Slug:** `ch-03-people-and-access`  
**Audience:** Admin  
**Order:** 3000

Create roles, users with passwords, professional profiles/schedules, supervisors, and duplicate review.

**Primary nav:** Sidebar → **User & Access**

| Item | Route |
|------|--------|
| **User Profiles** | `/admin/user-access/profiles` |
| **Role Management** | `/admin/user-access/roles` |
| **Duplicate Detection** | `/admin/user-access/duplicate-detection` |

---

## 3.1 Roles

### Create and manage roles & permissions

1. Open **Role Management**
2. Optional **Search role...**
3. **Create Role** → modal **Create New Role**
4. Fields:
   - **Role Name**
   - **Display Name**
   - Role description
   - **Permissions** (use **Select all** if needed)
5. **Create Role**
6. Edit → **Update Role**; **Delete** → confirm **Delete role?**

Create Therapist (and custom staff) roles **before** bulk user create so **Role** dropdown is ready on Add User.

---

## 3.2 Users and professional profiles

### Create a therapist or staff user with password

1. **User Profiles** tab (not Supervisor Assignments)
2. **Add New User**
3. Fields in order:
   - **Full Name** *  
   - **Email** *  
   - **Username** *  
   - **Phone**  
   - **Role** * (searchable)  
   - **Password** *  
4. **Add User** → toast **User added successfully.**
5. User signs in at `/auth/staff/login` (first-password activation if required)

There is no email-only invite without password in the current UI.

### Edit, activate, deactivate, or delete a user

Row ⋯ menu:

- **Edit Basic Info** → Full Name, Email, Username, Phone, Role → **Save Changes**
- **Professional Details**
- **Deactivate** / **Activate**
- **Delete** (confirm)

### Complete professional details (Admin)

⋯ → **Professional Details** sidebar:

**License** · **Specializations** · **Background** · **Schedule** · **Emergency Contact**

| Section | Example fields |
|---------|----------------|
| **License** | License Number, License Type, License State, License Expiration |
| **Specializations** | Specializations, Languages, Years of Experience, Clinical Experience Summary |
| **Background** | Research Background, Supervisory Experience, Career Objectives |
| **Emergency Contact** | Name, Number, Email, Relation |

**Save Profile** / section **Save changes** as shown. Admin modal does **not** include therapist-only **Zoom Integration** / **Password** (therapist **My Profile** does).

### Set therapist schedule from Admin

1. Professional Details → **Schedule**
2. **Time Zone** (required)
3. **Select Rooms** (in-person rooms)
4. **Working hours**: enable days, start/end slots; configure In-person / Virtual modes if shown
5. Optional: **Max Clients / day**, **Session Duration (min)**
6. **Save Profile**

### Assign a supervisor

1. Tab **Supervisor Assignments**
2. **Assign Supervisor** → select supervisor + assignee → **Assign**

### Run duplicate detection

1. **Duplicate Detection**
2. **Refresh Scan**
3. **View full record** when needed
4. **Keep this** or **Mark as Duplicate** (confirm)

---
Product: `/admin/user-access/profiles` · `/admin/user-access/roles`
