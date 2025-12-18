This is great. Nimo provided very specific constraints that fundamentally change the design approach—specifically the decision to go **Synchronous (Real-Time)** rather than Asynchronous.

This means the designer isn't just designing a form; they are designing a **waiting experience** to prevent abandonment while the AI "thinks."

Here is the **Designer Brief & Future State Journey** based on Nimo’s feedback. You can hand this directly to your UX designer.

***

# Designer Brief: Real-Time Receipt Substantiation (Mobile Web)

## 1. Core Constraints & Directives (From Product)
* **Platform:** Mobile Web (Responsive). No native app required.
* **Trigger:** SMS Text Message (primary) containing a unique "Magic Link."
* **Authentication:** None (Token-based link).
* **Expiration:** Link dies after **4 days**.
* **Privacy:** Display **Merchant Name** and **Amount**. Do *not* display specific medical procedure codes.
* **The "One Big Thing":** **Real-Time AI Validation.**
    * *Requirement:* The user must wait on the screen while the AI scans the image.
    * *UX Challenge:* We need a compelling "Scanning/Thinking" state to keep them from closing the browser.
    * *Error Handling:* If they upload a picture of a dog (or a blur), we must catch it immediately and ask for a retake *before* they leave.

---

## 2. The Future State User Journey


[Image of mobile user flow diagram]


### Scenario A: The Happy Path (Compliance in <30 Seconds)
1.  **Trigger:** User swipes card at "City Chiropractic" for $80.
2.  **Notification:** 10 seconds later, User receives an SMS: *"WEX Benefits: Your $80 charge at City Chiropractic requires a receipt. Click here to upload."*
3.  **Landing:** User taps link. Mobile web page opens. Sees "City Chiropractic - $80" and a big **[Upload Receipt]** button.
4.  **Capture:** User taps button -> OS Camera opens -> Snaps photo.
5.  **The "Hook" (Loading State):** User sees a dynamic scanning animation: *"Analyzing receipt... Checking date... Verifying amount..."* (Duration: ~3-5 seconds).
6.  **Success:** Screen transitions to a Green Checkmark: *"Success! Receipt verified."* User closes browser.

### Scenario B: The "Bad Photo/Dog" Path (Real-Time Correction)
1.  **Capture:** User accidentally uploads a photo of their dog or a blurry receipt.
2.  **The "Hook":** Scanner animation runs...
3.  **Soft Failure:** AI returns negative result. UI displays: *"We couldn't find a receipt in that photo."* or *"Image is too blurry."*
4.  **Recovery:** UI presents two buttons: **[Try Again]** (Primary) and **[It is a receipt, submit anyway]** (Secondary/Ghost - *optional fallback*).

### Scenario C: The "Too Late" Path
1.  **Trigger:** User clicks the SMS link 5 days later.
2.  **Error:** Landing page loads an "Expired" state.
3.  **Action:** UI says: *"For security, this link has expired. Please log in to your benefits portal to upload this receipt."*

---

## 3. Wireframe Requirements (Screen by Screen)

### Screen 1: The Landing Page (Unauthenticated)
* **Header:** Simple logo (Employer or Administrator).
* **Context Card:**
    * **Merchant:** City Chiropractic
    * **Amount:** $80.00
    * **Date:** Today's Date
    * *Note:* No sensitive medical info.
* **Primary Action:** Large, thumb-friendly button: **[Take Photo of Receipt]**.
* **Secondary Link:** "Why do I need to do this?" (Tooltip/Modal).

### Screen 2: The "Thinking" State (Critical)
* *Note:* This replaces the "Success" message from previous iterations.
* **Visual:** A progress bar, a spinning circle, or a "scanning" animation over the thumbnail of the image they just took.
* **Microcopy:** needs to be active.
    * *"Uploading..."*
    * *"Reading text..."*
    * *"Verifying merchant..."*
* **Goal:** Reduce perceived latency. If this takes >5 seconds, the user will leave.

### Screen 3: The "Soft Error" (Real-Time Rejection)
* **Visual:** Red or Yellow warning icon.
* **Copy:** Specific to the error (if possible).
    * *"We don't see a date on this image."*
    * *"This looks like a pet, not a receipt."*
* **Action:** **[Retake Photo]** (High contrast).

### Screen 4: The Success State
* **Visual:** Green Checkmark.
* **Copy:** "Receipt Received. You're all set!"
* **Feedback:** "We have matched this receipt to your $80 expense."
* **Exit:** No further buttons needed (or a simple "Close").

### Screen 5: The "Expired" State (Edge Case)
* **Visual:** Broken link icon or lock icon.
* **Copy:** "This link has expired for your security."
* **CTA:** Button linking to the main Login Portal.

---

## 4. Specific Questions for Design Team (To resolve during wireframing)
1.  **Multiple Pages:** Since we suspect a limit (likely 1-3 images), how does the UI handle "Add Page 2"? Does the AI check happen after *each* photo, or after the *batch* is submitted?
    * *Assumption for V1:* Batch check. User snaps 2 photos -> Hits "Check Receipt" -> AI runs.
2.  **Browser Permissions:** How do we handle the browser asking *"Allow Chrome to access Camera?"* (This is an OS-level friction point).
    * *Best Practice:* Add a pre-screen text: *"We need camera access to scan your receipt."*



### Next Step
Would you like me to draft the **User Stories (Jira Tickets)** for the engineering team based on this flow, or should we wait for the wireframes first?