# Prototype Handoff v1 (UX + Accessibility)

## Objective
Deliver a stakeholder-ready iPhone Safari prototype that demonstrates notification-driven action flow with clear hierarchy, low cognitive load, and accessibility-safe interaction patterns.

## Scope
Phase-1 prototype UX only:
1. Entry points: SMS, Email
2. In-browser flow: Landing, Capture/Preview, Processing, Success, Under Review, Error, Expired
3. Reminder remains phase 2

## Visual Direction (locked)
1. Primary action color: solid WEX main blue `#172DA1` (no gradient on primary CTA).
2. WEX logos from:
   - `/Users/W441936/Cursor/real time notifications - nimo/src/assets/wex_logo_red.svg`
   - `/Users/W441936/Cursor/real time notifications - nimo/src/assets/wex_logo_white.svg`
3. iPhone Safari shell is canonical environment (`390x844` frame).
4. No annotation/meta UI in prototype screens (no UX notes, debug callouts, design questions).

## Screen Mapping (current implementation files)
1. SMS entry: `/Users/W441936/Cursor/real time notifications - nimo/src/screens/SMSTrigger.jsx`
2. Email entry: `/Users/W441936/Cursor/real time notifications - nimo/src/screens/EmailTrigger.jsx`
3. Landing: `/Users/W441936/Cursor/real time notifications - nimo/src/screens/LandingOptimal.jsx`
4. Capture/Preview: `/Users/W441936/Cursor/real time notifications - nimo/src/screens/CameraPreview.jsx`
5. Processing: `/Users/W441936/Cursor/real time notifications - nimo/src/screens/AIValidation.jsx`
6. Success: `/Users/W441936/Cursor/real time notifications - nimo/src/screens/Success.jsx`
7. Under review: `/Users/W441936/Cursor/real time notifications - nimo/src/screens/UnderReview.jsx`
8. Error: `/Users/W441936/Cursor/real time notifications - nimo/src/screens/SpecificError.jsx`
9. Expired: `/Users/W441936/Cursor/real time notifications - nimo/src/screens/Expired.jsx`

## UX Requirements for Handoff
1. First glance clarity (<2s): state label + what happened + next action.
2. Primary action always visible without scroll on key decision states.
3. Max 1 primary + 2 secondary actions.
4. No dead ends: each terminal screen has clear next step.
5. Interruption-safe experience: user can return and continue.

## Accessibility Requirements for Handoff
1. Minimum target size 24x24 CSS px, preferred 44x44 for primary controls.
2. Visible focus indication on interactive controls.
3. Priority/state not color-only; include text labels.
4. Screen-reader-friendly status updates on processing screen.
5. Contrast-safe text and controls across all states.

## State/Behavior Requirements
1. Processing shows progressive change for 5-10 seconds (not instant).
2. Success confirms completion and closure.
3. Under Review explains that upload succeeded and what happens next.
4. Error gives corrective action and retry path.
5. Expired explains fallback path (portal).

## Event/Instrumentation Expectations (for dev handoff)
Prototype should visually represent these outcomes:
1. `notif_open`
2. `notif_action_start`
3. `notif_action_complete`
4. `notif_action_fail`
5. `permission_result` (conceptual in setup)
6. `notif_snooze_set` / `notif_mute_set` (future)

## Open Decisions (PM/Security)
1. Final copy and legal phrasing.
2. Sensitive lock-screen preview policy.
3. Final expiration policy wording if changed by security.
4. Quiet-hours and snooze defaults for phase 2.

## Demo Path
1. SMS -> Success
2. Email -> Under Review
3. Error (invalid image)
4. Expired

## Acceptance Checklist
1. Build passes (`npm run build`).
2. No annotation/debug blocks in UI.
3. Primary CTA style is solid WEX blue.
4. iPhone Safari shell consistent on all in-browser flow screens.
5. UX and accessibility requirements above are visibly represented.
