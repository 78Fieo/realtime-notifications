# PRD: Real-Time SMS Receipt Substantiation (MVP)

| Document Details | |
| :--- | :--- |
| **Project Name** | Real-Time Receipt Request + AI Validation |
| **Status** | **Approved for Design / Tech Specs** |
| **Platform** | Mobile Web (via SMS Link) |
| **Key Stakeholders** | Nimo (PM), Nate/Ann (AI/Tech), Security Team |

---

## 1. The "Why" (Problem Statement)
**The Context:**
When members use their FSA/HSA cards at non-IIAS merchants (e.g., Dental, Vision, Chiropractic), the transaction is flagged for substantiation. Currently, members receive requests days or weeks later via email or mail.

**The Problem:**
* **Context Loss:** By the time the member is asked for a receipt, they have lost it, thrown it away, or forgotten the details.
* **Friction:** Current solutions require logging into a portal, which has high drop-off rates.
* **Result:** High volume of denied claims, card suspensions, and support tickets.

**The Solution:**
Trigger an SMS immediately upon authorization (at the Point of Sale) containing a "Magic Link." This allows the member to snap and upload the receipt instantly—without logging in—while they are still at the counter or in their car.

---

## 2. Goals & User Outcomes

### Primary Business Goals
1.  **Increase Auto-Substantiation:** Capture receipts for 60%+ of flagged transactions within 1 hour of purchase.
2.  **Reduce Manual Review:** Utilize real-time AI to ensure uploaded images are legible and valid before they enter the adjudication queue.
3.  **Zero-Friction Compliance:** Eliminate the need for username/password entry for this specific task.

### User Outcomes
* **"One and Done":** The user resolves the compliance issue immediately and doesn't have to think about it again.
* **Confidence:** The user receives immediate feedback ("Receipt Verified") rather than wondering if their upload was accepted.

---

## 3. The "Who" (Target Audience)
* **Primary:** Mobile-first cardholders. They are busy, likely waiting at a doctor's office checkout or sitting in their car immediately after an appointment.
* **Constraint:** They may not have the WEX mobile app installed.

---

## 4. The "What" (Functional Requirements)

### 4.1. The Trigger (SMS Notification)
* **Timing:** Immediate (near real-time) after card authorization.
* **Channel:** SMS (Text Message) is primary.
* **Content:**
    * Merchant Name (e.g., "City Chiropractic").
    * Transaction Amount (e.g., "$80.00").
    * **Call to Action:** "Click here to upload receipt."
    * **Constraint:** **NO** specific medical procedure codes or sensitive health data in the text.

### 4.2. The "Magic Link" (Authentication)
* **Mechanism:** Unique, tokenized URL that authenticates the *transaction session* only, not the full user account.
* **No Login:** User taps link -> Landing page opens. No password required.
* **Expiration (Hard Constraint):** Link expires in **4 Days** (96 hours).
* **Expired State:** If clicked after day 4, redirect user to a static page: *"Link Expired. Please log in to the web portal to manage this claim."*

### 4.3. The Landing Page (Mobile Web)
* **Privacy Mode:** Display only **Merchant Name** and **Amount**. Do not display member name or detailed service info (HIPAA minimization).
* **Action:** Single primary button: **[Upload Receipt]**.
* **Multi-Page Support:** UI must allow uploading multiple images (e.g., page 1 and 2 of a hospital bill) before final submission.

### 4.4. Real-Time AI Validation (The "Thinking" State)
* **Behavior:** **Synchronous Processing.** The user must wait on the screen while the image is analyzed.
* **UI Requirement:** To prevent abandonment during processing, the UI must display an engaging "Processing/Scanning" animation.
    * *Target Latency:* Goal is <5 seconds. If >5 seconds, UI must provide specific updates (e.g., *"Reading text..."*).
* **Validation Logic:**
    * AI checks for: Legibility, Date, Amount, Merchant, "Is this a document?"
    * AI rejects: Blurry photos, dark photos, non-documents (e.g., pets, landscapes).

### 4.5. Real-Time Error Correction
* **Scenario:** AI detects a bad image.
* **Response:** UI displays a "Soft Block" immediately.
    * *Message:* "We couldn't read that. Please retake the photo."
    * *Action:* User taps [Retake] and tries again immediately.
* **Override:** (To be discussed with Tech) If user fails twice, allow a "Force Submit" to prevent frustration, flagging it for manual human review.

---

## 5. Success Metrics (KPIs)

| Metric | Target |
| :--- | :--- |
| **Receipt Capture Rate** | 50% of flagged transactions captured within 30 mins. |
| **SMS Click-Through Rate** | >40% |
| **AI Rejection Rate (Valid)** | User successfully retakes photo after "Blurry" warning 80% of the time. |
| **CSAT (Ease of Use)** | Top box score for "Ease of uploading documentation." |

---

## 6. Designer Notes (UX Guidance)

* **Urgency vs. Anxiety:** The SMS text should feel helpful ("Keep your benefits safe"), not alarming ("Your card is in trouble").
* **The "Spinner" Problem:** Since we are doing synchronous AI (Nimo's requirement), the loading state is the most critical part of the UI. It cannot just be a gray spinner. It needs to tell the user *what* it is doing so they don't close the browser.
* **Permissions:** The flow must gracefully handle the browser asking for Camera Permissions.

---

## 7. Open Technical Questions (For Engineering)
1.  **AI Latency:** Can the current backend architecture support a synchronous response in under 5 seconds? If not, do we need a "We'll text you back with the result" fallback?
2.  **Multi-Page Stitching:** Does the AI validate each page individually (Page 1 ok, Page 2 blurry) or the document as a whole?

