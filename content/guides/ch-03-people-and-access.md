# Chapter 4 - People & Access (Admin)

**Slug:** `ch-03-people-and-access`  
**Audience:** Admin  
**Order:** 4000
Create roles, create users with passwords, finish professional profiles and schedules, assign supervisors, and review duplicates.

**Primary path:** Sidebar → **User & Access**

| Item | Route |
|------|--------|
| **User Profiles** | `/admin/user-access/profiles` |
| **Role Management** | `/admin/user-access/roles` |
| **Duplicate Detection** | `/admin/user-access/duplicate-detection` |

---

## 4.1 Roles

### Create and manage roles

1. Open **Role Management**
2. Use **Search role...** if the list is long
3. **Create Role** → modal **Create New Role**
4. Fill **Role Name**, **Display Name**, description, and **Permissions** (**Select all** if needed)
5. Submit **Create Role**
6. Edit with **Update Role**, or **Delete** and confirm **Delete role?**

Create Therapist and custom staff roles before bulk user create so the **Role** dropdown is ready on **Add User**.

---

## 4.2 Users and professional profiles

### Create a therapist or staff user

1. **User Profiles** (not Supervisor Assignments)
2. **Add New User**
3. Fill in order: **Full Name**, **Email**, **Username**, **Phone**, **Role**, **Password**
4. **Add User** → toast **User added successfully.**
5. User signs in at `/auth/staff/login` and completes first password / MFA if required

There is no email-only invite without a password in the current UI.

### Edit, activate, deactivate, or delete

On the user row ⋯ menu:

- **Edit Basic Info** → Full Name, Email, Username, Phone, Role → **Save Changes**
- **Professional Details**
- **Deactivate** / **Activate**
- **Delete** (confirm)

### Professional Details (Admin)

⋯ → **Professional Details**

Sections: **License**, **Specializations**, **Background**, **Schedule**, **Emergency Contact**

Use **Save Profile** or section **Save changes** as shown. Admin does not show the therapist-only **Zoom Integration** or in-app **Password** blocks (those are on therapist **My Profile**).

### Therapist schedule from Admin

1. Professional Details → **Schedule**
2. Set **Time Zone** (required)
3. **Select Rooms** for in-person rooms
4. Set **Working hours** (days, start/end; in-person / virtual modes if shown)
5. Optional: max clients per day, session duration
6. **Save Profile**

### Assign a supervisor

1. Open **Supervisor Assignments**
2. **Assign Supervisor** → pick supervisor and assignee → **Assign**

### Duplicate detection

1. Open **Duplicate Detection**
2. **Refresh Scan**
3. Open **View full record** when needed
4. **Keep this** or **Mark as Duplicate** (confirm)

---
Product: `/admin/user-access/profiles` · `/admin/user-access/roles`
