# Chapter 4 - Clients & Portal Access

**Slug:** `ch-04-clients-and-portal-access`  
**Audience:** Admin (Therapist can create and open clients under `/therapist/clients`)  
**Order:** 4000

Create patient records, set portal access, and work the full client profile.

**Primary path:** Sidebar → **Clients** → `/admin/clients`

---

## 4.1 Create clients and portal access

### Add New Client

1. **Clients** → **Add Client**
2. Modal **Add New Client**
3. Tabs: **Personal → Address → Referral → Employment → Clinical**
4. Footer: **Cancel**, **Next**, and on the last tab **Create Client**  
   Edit mode uses **Save Changes**. **Consents** appears only on **Edit Client**.

#### Personal Information

Required: **Full Name**, **Email**  
Optional: **Phone**, **Date of Birth**, **Gender**, **Marital Status**, **Pronouns**, **Language**

##### Immediate Setup

- **Enable Portal Access** — ON sends the portal path and activation email; OFF keeps clinic-only until later
- **Email Notifications** — email updates when ON

#### Address Information

**Street Address 1**, **Street Address 2**, **City**, **State/Province**, **ZIP / Postal Code**, **Country**  
Optional **Emergency Contact**: name, phone, relationship

#### Referral & Case Information

**Start Date**, **Referral Date**, **Referrer Name**, **Reference Number**, **Client Source**, **Referral Notes**

#### Employment & Socioeconomic

**Employment Status**, **Education Level**, **Number of Dependents**

#### Client Stage & Service Type

**Status**, **Client Type**, **Client stage**, **Service Type**, **Service Frequency**, **Treatment Modalality**, **Assigned Therapist** (recommended)

**Needs Follow-up** fields when shown. **Insurance Information** when enabled. Then **Create Client** → toast **Client created successfully.**

Minimum viable record: Full Name + Email; assign a therapist when you can; only leave Portal ON with a correct email.

### Portal choice at create time

- Portal yes: **Enable Portal Access** ON with a valid **Email**
- Portal no: leave OFF, enable later from Overview if needed

### Enable, resend, or disable portal later

1. Open the client → **Overview** → **Portal Access Management**
2. Check **Portal Email**
3. Use **Enable Portal Access**, **Resend Activation Email**, or **Disable Portal Access** (confirm)

Portal features when on: appointments, booking, invoices, document upload.

### Edit, close, or delete a client

On Overview:

- **Edit** (pencil) → **Edit Client** → **Save Changes**
- **Close File** / **Activate File**
- **Delete** (confirm)

### Filter the clients list

1. `/admin/clients` → search and **Filters**
2. Typical filters: **Status**, **Stage**, **Assigned Therapist**, **Client Type**
3. **Apply filters**, **Clear all**, or remove a single filter chip

---

## 4.2 Client profile tabs

Exact tab labels:

1. **Overview**
2. **Sessions**
3. **Assessments**
4. **Reports**
5. **Forms & Docs**
6. **Billing**
7. **Tasks**
8. **Checklists**
9. **History**

### Sessions

Open **Sessions**. Use **Schedule Session** / **+ Schedule Session** for **Schedule New Session** (see Chapter 5). Session card ⋮ covers edit, status, notes, recording, invoice when status allows.

### Assessments

Open **Assessments**, assign or open the assessment flow, and confirm status updates.

### Forms & Docs

Open **Forms & Docs**. Assign clinical forms. Upload with **Upload Document** and track completion.

### Checklists

Open **Checklists**, assign a process checklist template, and track items.

### Tasks

Open **Tasks**, **Add task** → **Create task**, then edit or delete as shown.

### History

Open **History**. Use communications / **Email History** as labeled. **Add Note**, edit **Save**, delete **Delete Note**. Filter by type and dates when available.

### Billing

Review invoices for this client. Use the main **Billings** workspace (Chapter 6) for pay, email, download, and status.
