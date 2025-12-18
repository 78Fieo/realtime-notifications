# UX Recommendations: Real-Time Receipt Substantiation

**Author:** UX Design  
**Date:** December 11, 2024  
**Status:** Draft for PM Review  

---

## Executive Summary

After reviewing both the PRD (from Product) and the Dev Spec (from Engineering), we identified several UX friction points in the dev spec flow. This document outlines our recommendations for an **optimal user experience** that reduces friction while maintaining technical requirements.

**Key Recommendation:** Reduce the flow from 5 screens to 3 screens while adding real-time AI feedback.

---

## Flow Comparison

### Current Flows Side-by-Side

| Step | Dev Spec Flow | Optimal UX Flow | Savings |
|------|---------------|-----------------|---------|
| 1 | Landing Page | Landing Page | — |
| 2 | Upload Method Modal | ~~Removed~~ | -1 screen |
| 3 | OS Picker (Camera/Files) | Camera (inline) | — |
| 4 | Preview of Image (separate) | Preview (inline with camera) | -1 screen |
| 5 | Processing/Upload | AI Validation (with feedback) | Enhanced |
| 6 | Result (5 possible states) | Result (3 clear states) | Simplified |

**Net result:** 2 fewer screens, clearer outcomes, same functionality.

---

## Detailed Recommendations

### 1. Remove Upload Method Modal

**Dev Spec says:** Show modal with Documents / Camera / Photos options.

**Our recommendation:** Make "Take Photo" the primary action. Add small "or upload file" link for edge cases.

**Rationale:**
- 90%+ of users will use camera (they're at the checkout or in their car)
- Extra modal adds cognitive load and one more tap
- File upload is an edge case (digital receipts, already-saved photos)

**Proposed UI:**
```
┌─────────────────────────────┐
│  [ 📷 ]  Take Photo         │  ← Primary CTA (large button)
│                             │
│  or upload from files       │  ← Text link (small, secondary)
└─────────────────────────────┘
```

---

### 2. Inline Preview Instead of Separate Screen

**Dev Spec says:** After OS picker returns, show separate "Preview of image" screen.

**Our recommendation:** Show preview inline after camera capture, with Retake/Upload options.

**Rationale:**
- Users expect immediate feedback after taking a photo
- Separate screen feels like "going backward" in the flow
- Combining reduces tap count from 3 to 1

**Proposed UI:**
```
┌─────────────────────────────┐
│  ┌───────────────────────┐  │
│  │                       │  │
│  │   [ Photo Preview ]   │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  [ Retake ]    [ Upload ✓ ] │
└─────────────────────────────┘
```

---

### 3. Real-Time AI Validation with Specific Feedback

**Dev Spec says:** Generic processing, then show result.

**PRD says:** Real-time AI validation that catches bad photos immediately.

**Our recommendation:** Keep the PRD approach. Show specific, actionable errors.

**Why this matters:**
- User can fix the problem immediately (while still at the merchant)
- Reduces downstream manual review workload
- Better user confidence ("the system actually checked my receipt")

**Error Messages (Specific vs Generic):**

| Dev Spec (Generic) | Optimal (Specific) |
|--------------------|--------------------|
| "Receipt could not be saved" | "Photo is too blurry. Please retake." |
| "Receipt could not be saved" | "We can't find a date on this receipt." |
| "Receipt could not be saved" | "This doesn't look like a receipt." |

---

### 4. Clarify "Success Not Substantiated" State

**Dev Spec says:** "Your receipt has been uploaded successfully but your claim could not be substantiated."

**Problem:** This is confusing. Is it success or failure? User doesn't know what to do.

**Our recommendation:** Rename to "Under Review" with clear next steps.

**Proposed copy:**
```
┌─────────────────────────────┐
│         [ 🔍 ]              │
│                             │
│    Receipt Under Review     │
│                             │
│  Your receipt was uploaded  │
│  successfully. Our team     │
│  will review it within      │
│  2 business days.           │
│                             │
│  We'll notify you if we     │
│  need anything else.        │
└─────────────────────────────┘
```

**Key changes:**
- "Under Review" is honest but not alarming
- Specific timeframe (2 business days)
- Promise of notification
- No confusing "substantiation" jargon

---

### 5. Add Confirmation SMS (Close the Loop)

**Dev Spec says:** Nothing about post-success communication.

**PRD says:** Nothing explicit, but mentions user confidence.

**Our recommendation:** Send confirmation SMS after successful upload.

**Proposed SMS:**
```
WEX Benefits: ✓ Your $80 receipt for City Chiropractic was received. 
No action needed.
```

**For "Under Review" cases:**
```
WEX Benefits: Your receipt for City Chiropractic ($80) is under review. 
We'll notify you within 2 business days.
```

**Rationale:**
- Closes the cognitive loop for the user
- Reduces "did it work?" anxiety
- Reduces support calls asking about status

---

## Questions for PM (Nimo)

Before finalizing, we need alignment on:

1. **Real-time AI validation:** Is this still in scope? Dev spec doesn't explicitly include it, but PRD requires it. This is a significant UX differentiator.

2. **Upload method modal:** Can we remove it and make Camera the default? Or is there a technical/business reason to keep all three options visible?

3. **"Not substantiated" terminology:** Can we change this to "Under Review"? The current language is confusing and may cause user anxiety.

4. **Confirmation SMS:** Is this feasible to add? It significantly improves user confidence.

5. **Retry limits:** Dev spec says 3 retries then terminal failure. Is this the right number? Should we allow more for AI validation errors vs. technical upload errors?

---

## Appendix: Screen Count Comparison

### Dev Spec Flow (5+ screens)
1. Landing Page
2. Upload Method Modal
3. Image Preview
4. Processing
5. Success / Success-Not-Substantiated / Upload-Failed / Terminal-Failure

### Optimal Flow (3 screens)
1. Landing Page (with direct camera trigger)
2. Camera + Inline Preview + AI Validation
3. Success / Under Review / Error-with-Retry

---

## Next Steps

1. [ ] PM review and alignment on open questions
2. [ ] Finalize optimal flow based on PM feedback
3. [ ] Update prototype to reflect final decisions
4. [ ] Create high-fidelity mockups for approved flow
5. [ ] Handoff to engineering with UX specs

---

*This document was created based on analysis of RTN_PRD.md, RTN_design_brief.md, and the engineering dev spec.*








