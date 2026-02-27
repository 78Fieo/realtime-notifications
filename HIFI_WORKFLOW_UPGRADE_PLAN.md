# Hi-Fi Workflow Upgrade Plan (WEX Brand 2026)

## Goal
Upgrade the current receipt-upload prototype to a stakeholder-ready hi-fi experience using WEX Brand 2026 assets and tokens, while preserving the approved phase-1 scope.

## Phase-1 Scope (Locked)
1. Active flow includes:
   - SMS trigger
   - Email trigger
   - Landing
   - Upload
   - Processing (5-10 seconds)
   - Outcomes: Success, Under Review, Error, Expired
2. Reminder flow is excluded from active flow and treated as phase 2.
3. Copy remains placeholder until PM/comms approval.

## Source of Truth (Brand)
Use only these files as brand references:
1. `/Users/W441936/Cursor/WEX Brand 2026/src/themes/wex-prime-theme.css`
2. `/Users/W441936/Cursor/WEX Brand 2026/design-tokens/extracted/brand-exploration.tokens.md`
3. `/Users/W441936/Cursor/WEX Brand 2026/src/assets/wex_logo_red.svg`
4. `/Users/W441936/Cursor/WEX Brand 2026/src/assets/wex_logo_white.svg`
5. `/Users/W441936/Cursor/WEX Brand 2026/src/index.css`

## Delivery Sequence

### Step 1: Token Bridge
1. Create a `:root` token block in `/Users/W441936/Cursor/real time notifications - nimo/src/index.css` for:
   - brand colors
   - semantic colors (success/warning/error/info)
   - type stack
   - border radius
   - shadows
2. Replace direct hardcoded hex values in active screens with token variables.
3. Keep a minimal fallback palette only where strictly required.

## Acceptance Criteria
1. No active phase-1 screen relies on one-off hardcoded colors for core UI elements.
2. Token names are semantic and reusable.

### Step 2: Shell + Core Components
1. Update shared layout styles in `/Users/W441936/Cursor/real time notifications - nimo/src/index.css`:
   - phone frame
   - cards
   - buttons
   - form controls
   - status badges
2. Introduce WEX visual language:
   - soft blue-tinted surfaces
   - branded primary action treatment
   - rounded containers
   - brand-consistent shadow model
3. Replace placeholder logo blocks with WEX logo assets where display constraints allow.

## Acceptance Criteria
1. Shell/components look visually coherent and clearly WEX-branded.
2. Contrast remains readable for all primary content.

### Step 3: Screen-by-Screen Hi-Fi Pass
Apply final visual polish to these files:
1. `/Users/W441936/Cursor/real time notifications - nimo/src/screens/SMSTrigger.jsx`
2. `/Users/W441936/Cursor/real time notifications - nimo/src/screens/EmailTrigger.jsx`
3. `/Users/W441936/Cursor/real time notifications - nimo/src/screens/LandingOptimal.jsx`
4. `/Users/W441936/Cursor/real time notifications - nimo/src/screens/CameraPreview.jsx`
5. `/Users/W441936/Cursor/real time notifications - nimo/src/screens/AIValidation.jsx`
6. `/Users/W441936/Cursor/real time notifications - nimo/src/screens/Success.jsx`
7. `/Users/W441936/Cursor/real time notifications - nimo/src/screens/UnderReview.jsx`
8. `/Users/W441936/Cursor/real time notifications - nimo/src/screens/SpecificError.jsx`
9. `/Users/W441936/Cursor/real time notifications - nimo/src/screens/Expired.jsx`

For each screen:
1. Apply hierarchy cleanup (headline, body, CTA, support text).
2. Ensure CTA treatment follows one primary and one secondary action pattern.
3. Keep placeholder copy but enforce consistent tone and label patterns.

## Acceptance Criteria
1. All active states can be demoed without visual inconsistencies.
2. All four outcomes are visually distinct and semantically clear.

### Step 4: Motion + State Polish
1. Refine processing-state transitions in:
   - `/Users/W441936/Cursor/real time notifications - nimo/src/screens/AIValidation.jsx`
   - `/Users/W441936/Cursor/real time notifications - nimo/src/screens/Thinking.jsx`
2. Target perceived wait of 5-10 seconds.
3. Keep deterministic stage progression for demo reliability.

## Acceptance Criteria
1. Processing never appears instant.
2. Progress/microcopy visibly changes during wait.

### Step 5: QA + Stakeholder Readiness
1. Run build and smoke test:
   - SMS entry path
   - Email entry path
   - each outcome branch
2. Verify reminder is not reachable in active flow.
3. Validate mobile viewport presentation.
4. Record final QA checklist results in this file before demo.

## Acceptance Criteria
1. `npm run build` passes.
2. No broken navigation in the control panel.
3. Demo path can be completed by a tester with no context.

## PM Checkpoints (with Nimo)
Use these checkpoints to avoid rework:
1. Checkpoint A (after Step 1): token naming and brand interpretation sign-off.
2. Checkpoint B (after Step 3): visual sign-off of core screens.
3. Checkpoint C (after Step 5): final demo narrative and fallback path selection.

## Out-of-Scope (for this pass)
1. Phase-2 reminder implementation.
2. Final legal/comms copy approval.
3. Backend event or service changes.

## Demo Script (Recommended Order)
1. SMS trigger -> Success
2. Email trigger -> Under Review
3. Error (dog photo)
4. Expired link

## Final Handoff Artifacts
Before handoff, provide:
1. Link to running prototype
2. Build success output
3. One-page change summary
4. Known open items requiring PM/security sign-off
