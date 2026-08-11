# Chapter 4 — Clients & Portal Access

**Slug:** `ch-04-clients-and-portal-access`  
**Audience:** Admin (Therapist overlap on create/profile under `/therapist/clients`)  
**Order:** 4000

Create patient records, decide portal access, and work the full client profile tabs.

**Primary nav:** Sidebar → **Clients** → `/admin/clients`

---

## 4.1 Create clients and portal access decisions

### Create a client / patient (Add New Client)

1. **Clients** → **Add Client**
2. Modal **Add New Client**
3. Tabs order: **Personal → Address → Referral → Employment → Clinical**
4. Footer: **Cancel** · **Next** · last tab **Create Client**  
   Edit mode: **Save Changes**. **Consents** appears only on **Edit Client**.

#### Personal — section **Personal Information**

| Field | Required |
|-------|----------|
| **Full Name** | Yes |
| **Email** | Yes |
| **Phone** | No |
| **Date of Birth** | No |
| **Gender** | No |
| **Marital Status** | No |
| **Pronouns** | No |
| **Language** | No |

**Immediate Setup**

| Control | Meaning |
|---------|---------|
| **Enable Portal Access** | ON = portal + activation email path; OFF = clinic-only until later |
| **Email Notifications** | Email updates when ON |

#### Address — **Address Information**

**Street Address 1** · **Street Address 2** · **City** · **State/Province** · **ZIP / Postal Code** · **Country**  

**Emergency Contact** checkbox → **Contact Name** · **Contact Phone** · **Relationship to Client**

#### Referral — **Referral & Case Information**

**Start Date** · **Referral Date** · **Referrer Name** · **Reference Number** · **Client Source** · **Referral Notes**

#### Employment — **Employment & Socioeconomic**

**Employment Status** · **Education Level** · **Number of Dependents**

#### Clinical — **Client Stage & Service Type**

**Status** · **Client Type** · **Client stage** · **Service Type** · **Service Frequency** · **Treatment Modality** · **Assigned Therapist** (strongly recommended)

**Needs Follow-up:** Priority · Due Date · notes  

**Insurance Information** when enabled: Provider · Type · Policy Number · Group Number · Copay · Deductible · Insurance Phone  

General notes field → click **Create Client** → toast **Client created successfully.** Stay on list; open row for profile.

**Minimum:** Full Name + Email · prefer Assigned Therapist · Portal ON only with correct email.

### Choose portal at create time

- **Yes:** Personal → **Enable Portal Access** ON + valid **Email**  
- **No:** leave OFF — enable later from Overview if needed  

### Enable, resend, or disable portal later

1. Open client → **Overview** → **Portal Access Management**
2. Review **Portal Email**
3. Actions: **Enable Portal Access** · **Resend Activation Email** · **Disable Portal Access** (confirm)

Portal features when on: appointments, book, invoices, documents upload.

### Edit, close, or delete a client file

Overview header:

- **Edit** (pencil) → **Edit Client** → **Save Changes**
- **Close File** / **Activate File**
- **Delete** (confirm)

### Filter the clients list

1. `/admin/clients` → search and **Filters**
2. Typical filters: **Status**, **Stage**, **Assigned Therapist**, **Client Type**
3. **Apply filters** · **Clear all** · use chips to remove one filter

---

## 4.2 Working inside the client profile tabs

**Profile tabs (exact labels)**

1. **Overview**  
2. **Sessions**  
3. **Assessments**  
4. **Reports**  
5. **Forms & Docs**  
6. **Billing**  
7. **Tasks**  
8. **Checklists**  
9. **History**

### Sessions tab

1. Open client → **Sessions**
2. Review list / infinite scroll as available
3. **+ Schedule Session** / **Schedule Session** → **Schedule New Session** modal (Chapter 5)
4. Session card ⋮: edit, status marks, notes, recording, invoice (as status allows)

### Assessments

1. **Assessments** → assign / open assessment flow for the client
2. Confirm assignment appears and status updates

### Forms & Docs

1. **Forms & Docs**
2. Assign clinical forms; upload documents with **Upload Document** type fields as shown
3. Track completion / review status

### Checklists

1. **Checklists**
2. Assign process checklist template
3. Track items to completion

### Tasks from profile

1. **Tasks**
2. **Add task** / create task → fill form → **Create task**
3. Edit / delete with confirmations as shown

### History / Communications / Email History

1. **History**
2. Sub-tabs: communications & **Email History** (labels as shown)
3. **Add Note** → **Add note**; edit **Save**; delete **Delete Note**
4. Search/filter by type (Call/Email/Note) and dates when available

### Billing tab on client

Review invoices tied to this client; use **Billings** workspace (Chapter 6) for payments and actions.

---
Product: `/admin/clients`
