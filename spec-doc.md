## Assumptions (TBD by product)

* **Core use case:** Mobile users need to **notice, understand, and act** on time-sensitive events (alerts, approvals, updates) in seconds, with minimal context switching.
* **Primary users:** Frontline/field operators + team leads who are **often on the move** and check the app in many short sessions/day.
* **Success:** Lower **time-to-awareness** and **time-to-action**; fewer missed critical events; higher opt-in and sustained engagement.

## Open questions (blocking for final spec)

* What event sources exist (systems, categories), and which require **immediate** action vs “FYI”?
* What actions are allowed from a notification (ack, approve/deny, open item, reply), and what needs re-auth?
* What geographies/compliance apply (e.g., GDPR, HIPAA, financial), and what counts as **PII** in notification text?

---

# 1) UI requirements document

## Product definition

| Field                 | Requirement                                                                                                                                                                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name                  | **Nimo real-time notifications**                                                                                                                                                                                       |
| Primary job           | Help users **stay aware** and **complete small actions** fast on a phone.                                                                                                                                              |
| Notification surfaces | **In-app feed** + optional **system push** (when supported and user opted in).                                                                                                                                         |
| Web push constraints  | Web Push uses Service Workers + Push API. ([MDN Web Docs][1]) Notifications require **secure context (HTTPS)**. ([MDN Web Docs][2]) On iOS/iPadOS, Web Push is for **Home Screen web apps** (installed). ([WebKit][3]) |

---

## Information architecture (mobile-first)

**Bottom nav (max 3 items)**

1. **Notifications** (default)
2. **Search** (optional; if volume is high)
3. **Settings** (or “Profile”)

**Notifications (primary)**

* Tabs (top, sticky):

  * **All**
  * **Action required**
  * **Mentions/Direct**
* Controls (single row under tabs):

  * **Filter** (category/source)
  * **Sort** (Newest / Priority)
  * **Mark all read**
* List items (cards) with:

  * Priority indicator
  * Title + 1–2 line summary
  * Timestamp (relative + exact on long-press)
  * State (Unread, Read, Acknowledged)
  * Primary action (if applicable)

**Notification detail**

* Full content
* Action panel (1 primary, 1–2 secondary)
* Related object summary (key fields)
* History (optional)

**Settings**

* Push opt-in (per category)
* Quiet hours
* Mute/snooze rules
* Privacy controls (preview sensitivity)
* Offline behavior info

**Admin/desktop (secondary access)**

* Category configuration
* Templates/microcopy controls
* Routing rules (who gets what)
* Audit/export

---

## Core user flows (real-time notifications)

### A. First-run: permission + setup (no dark patterns)

1. User lands on **Notifications**.
2. Sees **value pre-prompt** (“Get alerts when approvals need you”).
3. User taps **Enable notifications**.
4. App shows category toggles first, then requests browser permission **only after user interaction**. ([web.dev][4])
5. If denied/blocked: show “How to enable” instructions and continue with in-app feed.

### B. In-app real-time receipt → triage → act

1. New event arrives (socket/SSE).
2. List updates with **non-jarring** UI:

   * Insert at top
   * Brief “New” chip
   * Optional subtle vibration (native only; otherwise none)
3. User taps item → detail.
4. User completes action.
5. Item state updates across list + detail (optimistic with rollback on failure).

### C. Push notification → deep link → complete micro-task

1. Push arrives (if opted-in).
2. User taps push → app opens to **detail** (or filtered list if auth needed).
3. If session expired: user signs in, then returns to target item.
4. Action completes, and user sees confirmation + next suggested step.

### D. Manage noise (mute/snooze)

1. From list item overflow:

   * Mute this source
   * Snooze this type
2. Confirm with duration (defaults below).
3. Settings shows active mutes with end times.

---

## Screen-level requirements (by state)

### Notifications list

| State   | UI requirement                                                   | Testable acceptance                                           |
| ------- | ---------------------------------------------------------------- | ------------------------------------------------------------- |
| Loading | Skeleton list (5–7 rows). Keep nav usable.                       | Skeleton appears within 200ms of route start.                 |
| Empty   | “No notifications yet” + explanation + CTA to configure sources. | Empty state shown when count=0 after fetch.                   |
| Success | Virtualized list; new items prepend; unread count visible.       | 60fps scroll on mid-tier phones with 200+ items.              |
| Error   | Inline error banner + “Retry”. Cache last known list.            | If fetch fails, user can retry; cached list remains viewable. |
| Offline | Persistent “Offline” chip + show cached list + queue actions.    | When offline, actions queue and show “Will send when online”. |

### Notification detail

| State   | UI requirement                                           | Testable acceptance                                        |
| ------- | -------------------------------------------------------- | ---------------------------------------------------------- |
| Loading | Skeleton header + action buttons disabled.               | Buttons disabled until data loaded or cached.              |
| Success | Clear hierarchy: Title → summary → key fields → actions. | Primary action visible without scrolling on 390×844.       |
| Error   | Explain what failed: load vs action submit.              | Action submit error preserves user input and allows retry. |
| Offline | Read-only detail (from cache). Actions queue if safe.    | Unsafe actions require online + show explanation.          |

### Settings

| State              | UI requirement                                               | Testable acceptance                                       |
| ------------------ | ------------------------------------------------------------ | --------------------------------------------------------- |
| Success            | Category toggles; quiet hours; active mutes list.            | Changes persist and reflect immediately in list behavior. |
| Permission blocked | Show OS/browser steps + “Open system settings” if supported. | Users can proceed with in-app notifications regardless.   |

---

## Interaction patterns (mobile, one-handed, interruption-safe)

**Layout**

* Bottom nav; primary CTA in lower half.
* Avoid top-right-only critical controls.
* Use **sticky tabs** and **sticky filter bar**.

**Gestures**

* **Tap** opens detail.
* **Swipe right**: mark read/unread (optional).
* **Swipe left**: quick actions (Ack / Snooze) with undo.
* Provide overflow menu for all actions (gesture parity).

**Interruption safety**

* If user backgrounded mid-action:

  * Persist draft/selection locally.
  * On return, restore state and show “Continue?” banner.

**Touch targets**

* Minimum **24×24 CSS px** per WCAG 2.5.8. ([W3C][5])
* Prefer 44×44 for primary actions (product standard).

---

## Notification UX rules (priority, grouping, deduplication, snooze/mute)

### Priority model (3 levels)

| Level              | Definition                                           | UI treatment                                                 | Push eligibility           |
| ------------------ | ---------------------------------------------------- | ------------------------------------------------------------ | -------------------------- |
| P0 Critical        | Safety/financial/operational stop; deadline imminent | Pinned section + strong visual marker; requires explicit ack | Allowed; limited frequency |
| P1 Action required | User must do something soon                          | Shows action chip; appears in “Action required” tab          | Allowed if opted-in        |
| P2 FYI             | Informational                                        | Low emphasis; batch/grouped                                  | Off by default             |

### Grouping rules

* Group by **(source + object id + event type)** within a rolling window.
* Window defaults:

  * P0: no grouping unless identical duplicates
  * P1: 2 minutes
  * P2: 15 minutes
* Group header shows count (“5 updates”) and most recent summary.

### Deduplication rules

* Each event must have **event_id** and **dedupe_key**.
* If dedupe_key repeats within window:

  * Do not add a new row
  * Update existing row:

    * Increment count
    * Update timestamp to latest
    * Append to detail history

### Snooze/mute rules

| Control     | Scope             | Default durations     | Requirements                                           |
| ----------- | ----------------- | --------------------- | ------------------------------------------------------ |
| Snooze      | Notification type | 1h, 4h, Today, 1 week | Visible on list item + settings; expires automatically |
| Mute        | Source/object     | 24h, 7d, 30d, Forever | Must show active mute badge on affected items          |
| Quiet hours | User-level        | 22:00–07:00 (TBD)     | Suppress push; keep in-app feed updating               |

**Action design**

* Prefer **non-destructive** actions; destructive requires extra context. ([Apple Developer][6])
* Max 1 primary + 2 secondary actions per item (mobile constraint).

---

## Content requirements (microcopy, truncation, localization readiness)

**Tone**

* Short, concrete verbs. Avoid jargon. Lead with what happened.

**Template structure**

* Title: ≤ 50 characters (target)
* Summary: ≤ 120 characters (2 lines on common phones)
* Metadata: Source + timestamp
* Action labels: verb-first (“Approve”, “Acknowledge”, “Open task”)

**Truncation**

* Use 2-line clamp on list.
* On overflow: keep nouns, drop adjectives.
* Never truncate:

  * Amounts
  * Dates
  * “Approved/Denied” outcomes

**Localization readiness**

* No concatenated strings.
* Support longer labels (German-like expansion).
* Store timestamps as ISO; format by locale.

---

## Accessibility requirements

**Minimums**

* WCAG 2.2 AA target. Touch targets meet 2.5.8 guidance. ([W3C][5])

**Screen reader**

* Notification list is a semantic list (`role="list"`, items `role="listitem"`).
* Unread state announced (“Unread”).
* New items announced via `aria-live="polite"` with batching (avoid spam).

**Focus order**

* Top to bottom: tabs → filters → list → bottom nav.
* After completing an action in detail, focus returns to:

  * Confirmation message, then
  * Next logical control

**Contrast**

* Text and icons meet AA contrast in all states.
* Do not use color alone to convey priority.

---

## Performance requirements (rendering, payload, battery/network)

**Web performance targets (field, 75th percentile)**

* LCP ≤ **2.5s**
* INP ≤ **200ms**
* CLS ≤ **0.1** ([web.dev][7])

**Rendering**

* Virtualize list for >50 items.
* Avoid reflow when new items arrive (reserve space).

**Network**

* Incremental sync:

  * Initial: last 50
  * Background: paginate on demand
* Push payloads should be minimal; fetch details on open.
* Optimize radio/battery: push is designed to reduce continuous networking, which matters for power usage. ([RFC Editor][8])

**Offline + caching**

* Cache shell + last viewed notifications.
* Use stale-while-revalidate for list fetches where safe. ([web.dev][9])

---

## Privacy/security requirements (lock screen preview, PII, auth/session)

**Permission UX**

* Never request notification permission on page load. ([web.dev][4])
* Pre-prompt must state:

  * What categories exist
  * Example notification
  * How to turn off later

**Lock screen / notification preview**

* Provide a “Sensitive content” mode:

  * Push shows generic text (“You have a new alert”) until app unlock.
* Default behavior depends on compliance (TBD); make configurable.

**PII handling**

* Do not include sensitive identifiers in push body by default.
* Use short codes or masked values (last 4) when necessary.

**Auth/session**

* Deep links require:

  * Valid session → open target
  * Expired session → authenticate, then return to target
* Session timeouts:

  * Support inactivity and absolute timeouts (policy-driven). ([NIST Pages][10])

**Transport**

* HTTPS required for Notifications API. ([MDN Web Docs][2])

**Audit**

* Log all notification actions with timestamp and actor id.

---

## Observability requirements (event taxonomy + UX health metrics)

### Event taxonomy (minimum)

| Event                     | When fired                       | Key properties                                               |
| ------------------------- | -------------------------------- | ------------------------------------------------------------ |
| `notif_received_inapp`    | Event appears in list            | `event_id`, `priority`, `source`, `dedupe_key`, `latency_ms` |
| `notif_received_push`     | Push delivered (server + client) | `platform`, `delivery_status`, `payload_bytes`               |
| `notif_open`              | User opens from list or push     | `entry_point` (list/push), `time_since_received_ms`          |
| `notif_action_start`      | User taps action                 | `action_type`, `requires_auth`                               |
| `notif_action_complete`   | Action success                   | `action_type`, `duration_ms`                                 |
| `notif_action_fail`       | Action error                     | `error_type`, `retry_available`                              |
| `notif_mute_set`          | Mute created                     | `scope`, `duration`                                          |
| `notif_snooze_set`        | Snooze created                   | `type`, `duration`                                           |
| `permission_prompt_shown` | Pre-prompt shown                 | `context`                                                    |
| `permission_result`       | Browser returns allow/deny/block | `result`                                                     |

### UX health metrics

* **Time-to-awareness:** median time from `received` → `open`
* **Time-to-action:** median `received` → `action_complete` (P0/P1)
* **Noise ratio:** notifications received per active user/day vs open rate
* **Deduplication rate:** % collapsed events
* **Delivery latency:** server event time → device receipt
* **Opt-in funnel:** pre-prompt accept → OS allow → retained 30d
* **Error rates:** list fetch, action submit, deep link auth failures

---

# 2) Decisions & tradeoffs

## Optimize for (mobile)

* **Fast scanning**: user understands priority in <2 seconds.
* **Low effort actions**: complete a micro-task in <15 seconds.
* **Resilience**: works with spotty connectivity; no blank screens.
* **Permission trust**: earn opt-in via contextual prompting. ([web.dev][4])

## Intentionally de-prioritize

* Full “email-like” notification history management (tags, folders).
* Heavy customization (per-sender rules beyond mute/snooze).
* Complex multi-step workflows inside the notification surface.

## Risks and mitigations

| Risk                               | Why it matters                                | Mitigation                                                                        |
| ---------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------- |
| Users deny notification permission | Hard to recover; reduces value                | Contextual pre-prompt + explain benefit; never prompt on load. ([web.dev][4])     |
| iOS push expectations mismatch     | iOS requires Home Screen web app for web push | “Install to Home Screen” education path; fallback to in-app feed. ([WebKit][3])   |
| Notification overload              | Users mute everything                         | Strict priority rules + grouping + defaults that batch FYI                        |
| Offline action conflicts           | Users act on stale data                       | Show last updated; queue only safe actions; require refresh for sensitive actions |
| Performance jank on long lists     | Breaks scanning                               | Virtualization + stable row heights; CWV targets. ([web.dev][7])                  |

---

# 3) Prioritized backlog

## Must-have (with acceptance criteria)

| Requirement                                              | Acceptance criteria                                                                                                |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Mobile notifications list + tabs (All / Action required) | User can switch tabs; list updates within 300ms; unread state visible.                                             |
| Real-time in-app updates                                 | When connected, new items appear without full refresh; no scroll jump; row insert <100ms.                          |
| Detail view + primary action                             | From list to detail in <500ms (warm); action completes with confirmation and updated list state.                   |
| Offline support (read cached, queue safe actions)        | Airplane mode: user can view cached list/detail; queued actions show pending and auto-retry on reconnect.          |
| Grouping + dedupe                                        | Duplicate events within window do not create new rows; count increments; detail shows history.                     |
| Snooze/mute controls                                     | User can snooze/mute from overflow; active mute is visible in Settings; expires correctly.                         |
| Permission pre-prompt + compliant prompting              | No OS prompt on load; OS prompt only after user taps enable. ([web.dev][4])                                        |
| Secure context + session-safe deep links                 | Notifications features only on HTTPS. ([MDN Web Docs][2]) Deep link returns user to target after login.            |
| Accessibility baseline                                   | Touch targets meet 24×24 CSS px minimum. ([W3C][5]) Screen reader announces unread and new items without spamming. |
| Observability events                                     | All events in taxonomy fire with required properties; dashboard reports time-to-open and action success.           |

## Should-have

* Search notifications (by keyword/source)
* Quiet hours scheduling
* Batch actions (mark all read, acknowledge all in group)
* “Sensitive content” mode for push previews (compliance-driven)

## Nice-to-have

* Smart bundling suggestions (“You usually mute FYI from X”)
* Per-category notification sounds (native only; limited on web)
* Advanced filters (multi-select + saved views)

---

# 4) Research plan

## Evidence to gather

* **Benchmark**: time-to-open and time-to-action in current process (baseline).
* **Competitor patterns**: how top mobile products handle grouping, action buttons, and noise controls (Slack/Teams-like patterns; plus OS guidance). Apple HIG + Android guidance are primary references. ([Apple Developer][6])
* **Usability tests**: 30–45 min moderated on real phones, one-handed, with interruptions.
* **Field trial**: 1–2 week pilot measuring opt-in, open rate, action completion, and mute rates.

## 10 specific research questions

1. What does the user consider **P0** vs **P1** vs **FYI**, and where do we disagree?
2. What is the maximum tolerable **notifications/day** before users mute?
3. Which list item layout yields fastest **correct triage** (priority + action needed) within 2 seconds?
4. Do users trust the **pre-prompt** enough to opt in, and what wording increases allow rate?
5. When offline, which actions do users expect to work, and what failure copy prevents retries loops?
6. What grouping window feels right for each category (too aggressive vs too noisy)?
7. Which actions are safe to expose as **inline** vs only in detail?
8. What deep link failures occur most (session expiry, permissions, routing), and what recovery path feels least painful?
9. What content is considered sensitive on lock screen, and what is the default preview policy needed?
10. What metrics best predict long-term value: time-to-open, time-to-action, or reduction in missed events?

---

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Push_API "Push API - Web APIs | MDN"
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API?utm_source=chatgpt.com "Notifications API - Web APIs - MDN"
[3]: https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/?utm_source=chatgpt.com "Web Push for Web Apps on iOS and iPadOS - WebKit"
[4]: https://web.dev/articles/permissions-best-practices "Web permissions best practices  |  Articles  |  web.dev"
[5]: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html "Understanding Success Criterion 2.5.8: Target Size (Minimum) | WAI | W3C"
[6]: https://developer.apple.com/design/human-interface-guidelines/notifications?utm_source=chatgpt.com "Notifications | Apple Developer Documentation"
[7]: https://web.dev/articles/defining-core-web-vitals-thresholds "How the Core Web Vitals metrics thresholds were defined  |  Articles  |  web.dev"
[8]: https://www.rfc-editor.org/rfc/rfc8030?utm_source=chatgpt.com "RFC 8030: Generic Event Delivery Using HTTP Push"
[9]: https://web.dev/articles/stale-while-revalidate?utm_source=chatgpt.com "Keeping things fresh with stale-while-revalidate - web.dev"
[10]: https://pages.nist.gov/800-63-4/sp800-63b/session/?utm_source=chatgpt.com "Session Management - NIST"
