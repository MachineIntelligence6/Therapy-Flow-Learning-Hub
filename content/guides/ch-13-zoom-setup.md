# Chapter 5 - Zoom Setup (Therapist)

**Slug:** `ch-13-zoom-setup`  
**Audience:** Therapist (Admin can remind therapists to complete this)  
**Order:** 5000
Connect Zoom Server-to-Server OAuth on the therapist profile so virtual sessions can create and join Zoom meetings.

**Primary path:** Sign in → avatar → **My Profile** → **Zoom Integration**

---

## 5.1 Sign in as a therapist

1. Open the staff login: `/auth/staff/login` (not the client portal login)
2. Enter your therapist email and password
3. Complete MFA if prompted (same first-login path as Chapter 1)
4. Confirm you land on the therapist area (usually `/therapist/dashboard`)

If login fails: ask Admin to confirm your user is **Active** under **User & Access → User Profiles**.

---

## 5.2 Open My Profile

1. Click your **avatar** (top bar)
2. Choose **My Profile**
3. Use the profile sidebar sections: **Basic Info**, **License**, **Specializations**, **Background**, **Schedule**, **Zoom Integration**, **Password**
4. Open **Zoom Integration**

You can finish **Schedule** (time zone, rooms, working hours) in the same profile, but Zoom lives only under **Zoom Integration**.

---

## 5.3 Get Zoom Server-to-Server credentials

In SmartHub, expand **How to get your Zoom credentials** if shown. Outside SmartHub:

1. Open [https://marketplace.zoom.us/develop/apps/](https://marketplace.zoom.us/develop/apps/)
2. Sign in with your Zoom account
3. At the bottom left, click **Developer**
4. Expand the **Build App** dropdown, then choose **Create** / create a new app
5. Choose **Server-to-Server OAuth**
6. Fill in the app information and create the app
7. Open **Scopes** (or **Add Scopes**) on the app
8. Under **Meeting**, add the meeting scopes SmartHub needs to create, read, update, and delete meetings. Prefer these granular scopes (or the equivalent Meeting write/read options if your Zoom UI still shows classic scopes):
   - `meeting:write:meeting` (create meetings)
   - `meeting:read:meeting` (get meeting details)
   - `meeting:update:meeting` (update meetings)
   - `meeting:delete:meeting` (cancel / delete meetings)
9. If Zoom only offers admin variants for your account role, use the matching `:admin` scopes instead (for example `meeting:write:meeting:admin`)
10. Click **Done** / **Continue**, then **Activate** the app if Zoom asks you to activate after scopes change
11. On the app credentials page, copy:
   - **Account ID**
   - **Client ID**
   - **Client Secret**

Keep the Client Secret private. You paste it into SmartHub only.

If **Test Connection** succeeds but virtual sessions cannot create Zoom meetings, return to [Marketplace apps](https://marketplace.zoom.us/develop/apps/) → your app → **Scopes** and confirm the Meeting scopes above are still present and the app is **Activated**.

---

## 5.4 Save Zoom Integration in SmartHub

1. Stay on **My Profile → Zoom Integration**
2. If status shows **Not connected**, enter:
   - **Zoom Account ID**
   - **Zoom Client ID**
   - **Zoom Client Secret**
3. Click **Save changes**
4. Confirm status shows **Connected** (Account ID / updated date may appear)
5. Click **Test Connection** — expect **Zoom connection is working!**
6. Optional later: **Update Credentials** to replace values, or **Remove Integration** (confirm) to disconnect

After Zoom is connected, book a **Virtual** session from Scheduling. When the session allows it, use **Join Meeting** / **Join Zoom** from the session card.

---

## 5.5 Quick checklist

| Step | Action |
|------|--------|
| 1 | `/auth/staff/login` as therapist |
| 2 | Avatar → **My Profile** → **Zoom Integration** |
| 3 | Open [marketplace.zoom.us/develop/apps](https://marketplace.zoom.us/develop/apps/), sign in → bottom-left **Developer** → **Build App** → create new app (**Server-to-Server OAuth**) |
| 4 | **Scopes → Meeting**: add write / read / update / delete meeting scopes; **Activate** |
| 5 | Copy Account ID, Client ID, Client Secret |
| 6 | Paste credentials → **Save changes** |
| 7 | **Test Connection** until Connected |
| 8 | Book a Virtual session and confirm Join Zoom is available |

---

**Related:** Chapter 11 (Therapist Workspace) for day-to-day scheduling; Chapter 7 (Scheduling & Sessions) for booking virtual sessions.

Product: `/therapist/*` · Profile Zoom Integration
