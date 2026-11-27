# Shaadikipanchayat — project evidence pack

**Project:** Shaadikipanchayat  
**Discipline:** B.Des Fashion Design  
**Artifact:** Browser prototype, V1 and V2  
**Evidence status:** Prototype and a consolidated evidence draft are prepared;
primary-user testing, validated vendor data, final media assets and final
submission packaging are still outstanding.

> **Evidence integrity:** The supplied project workbook and prompt log contain
> a reference scan and design intentions, not documented user interviews or a
> completed usability study. No participant feedback, vendor facts, AI
> recommendations, prices, ratings, or availability have been invented in this
> pack. All vendors displayed in the prototype are explicitly fictional.

## 1. Project foundation

### Design problem

Wedding service information is scattered across search, social media, personal
recommendations and separate business pages. Couples and families planning one
or more functions can find it difficult to compare services, budget, work and
availability, and may need to repeat the same brief to multiple vendors.

### Audience

The primary audience is engaged couples and family members, roughly 21–40, who
are planning one or more wedding functions. Wedding planners are a secondary
audience. The intended experience should make room for different locations,
budgets, traditions, languages, family needs and personal styles rather than
assuming every Indian wedding follows one template.

### Intended outcome

Help people turn their ideas, location, budget and wedding requirements into a
useful vendor shortlist, so they can spend less time searching and feel more
organised and confident when reaching out. The user retains the final choice.

### Research and references

The supplied workbook records a reference scan:

| Reference | What it informed | Limit |
|---|---|---|
| WedMeGood | Vendor categories and portfolios | Reference scan; no product benchmarking data recorded |
| WeddingWire | Vendor profiles and planning tools | Reference scan; not evidence of local user needs |
| Pinterest | Visual discovery and mood boards | Inspiration does not confirm service details |
| Google Search / Maps | Local discovery and contact details | Listings may be incomplete or out of date |
| Conversational AI | Guided, natural-language interaction | Must be checked for accuracy and bias; must not invent vendor facts |

**Synthesis from the workbook:** inspiration is not enough on its own. People
also need practical service, location, price and contact information, with
vendor details checked rather than generated as fact.

**Research limitation:** These are secondary-reference observations and
stated audience needs. The supplied files do not document primary interviews,
survey data, or validated market research. Test the prototype with people who
have planned or are currently planning a wedding before making claims about
usability or demand.

## 2. Research-to-design decisions

| Evidence / need in the supplied brief | Prototype decision | How to test |
|---|---|---|
| Requirements are scattered and users repeat the same brief | Wedding brief collects city, date, budget range, guest estimate, style, functions and services | Ask a participant to complete a brief without coaching; note confusion or skipped fields |
| Wedding plans can include several functions | Function choices include engagement, mehendi, haldi, wedding, reception and other | Ask whether the terms and options fit the participant’s own celebration |
| Users need help comparing relevant services | Service filters, example fit explanations, shortlist and side-by-side comparison | Give a discovery task and observe whether the reason for fit is understood |
| Prices and availability are hard to establish | No fabricated price, rating, or availability; profile says to ask the vendor directly | Ask what participants believe the sample information confirms |
| Different traditions, tastes, budgets and family needs matter | Multiple styles, optional budget, free-form enquiry, neutral wording and no forced tradition | Ask whose needs are represented or missing; do not infer inclusivity from the UI alone |
| Personal information needs care | City-level location only, optional fields, no account, local-only storage and prototype warning | Ask what participants would and would not share; inspect browser storage behavior |

## 3. Design system and consistency

The supplied Week 6 Design System template is blank. The project files state a
direction—warm, modern and festive, subtly Indian-inspired, clear and
uncluttered—but do not specify exact colours, fonts or component rules. The
following are **prototype decisions made for this build**, not pre-existing
approved brand specifications:

### Design anchors

1. **Welcoming, not prescriptive:** users can choose their own functions and
   styles, leave fields blank, and add context in their own words.
2. **Warm and calm:** paper/cream surfaces, terracotta emphasis, muted rose,
   sage and sand details, with editorial serif headings and readable system
   sans-serif body text.
3. **Practical before decorative:** clear labels, helpful notes, consistent
   cards, filters and actions; decorative forms stay secondary to the task.
4. **Trust is visible:** fictional/unverified notices remain close to profile
   and enquiry actions. Unknown prices and dates are explicitly “ask directly.”
5. **User control:** saved items and tasks are editable, optional brief fields
   do not block progress, and no contact is sent without an explicit real
   integration.

### Tokens and components

| Element | Prototype rule |
|---|---|
| Canvas / surface | Warm paper `#f6f1e8`; cards `#fffdf9` |
| Primary action | Terracotta `#b65f49`; hover `#924a39` |
| Supporting colours | Muted rose `#ead4ca`, sage `#dce5d8`, sand neutrals |
| Typography | Georgia/serif display headings; system sans-serif body and controls |
| Shape / spacing | Soft 7–12 px control/card corners; consistent compact spacing |
| Vendor card | Service, profile name, fictional label, sample fit reason, tags, save, compare and profile actions |
| Trust language | “Fictional · not verified”; “Price & availability: ask”; explanatory profile caveat |
| Accessibility | Semantic buttons/forms, visible focus, labels, keyboard-operable controls, reduced-motion support, responsive layouts |

The visual language is consistent across the overview, wedding brief, results,
profile, shortlist and planning board. V1 is intentionally less informative as
an iteration baseline; the V2 experience carries the complete visual and trust
system. The V1/V2 switch provides an in-app comparison rather than claiming
that a pre-existing, tested app was available.

## 4. Prototype scope and versions

### V1 — directory baseline

V1 demonstrates the initial broad idea: browse wedding-service categories and
open example profiles. The directory is deliberately simple so it can be
compared with the later flow. It does not use the wedding brief or explain
personal relevance.

### V2 — guided, trust-aware discovery

V2 adds a guided wedding brief, filters, sample explanations for why a profile
may fit, fictional/unverified indicators, a shortlist, side-by-side comparison,
an enquiry draft and planning checklist. Users can return to edit their brief.
They can skip optional information and clear filters.

### Prototype flow

**Overview → wedding brief → suggested profiles → profile → save/compare →
enquiry draft → planning board.**

The brief captures city, date, budget range, guest count, style, functions and
needed service categories. The profile asks users to confirm real price,
availability, portfolio, terms and credentials directly.

### What is functional

- Responsive interface, navigation and V1/V2 selection.
- Wedding-brief fields and filters; profile pages and sample fit copy.
- Save/remove profiles; compare selected example profiles.
- Enquiry form saves a local draft and clearly says that no message was sent.
- Planning checklist can be checked, added to and edited.
- Brief, shortlist, tasks and enquiry draft persist in the current browser.

### What is not implemented

- No live AI, database, vendor account, vendor verification, business search,
  real vendor listing, payment, calendar, account, cloud sync or contact
  delivery.
- No price, availability, rating or quality claims.
- The illustrative profiles are not endorsements. Replace them with consented,
  verified vendor information before a public or production release.

## 5. Prompt evolution and AI process

The supplied prompt log records three project ideation stages:

| Version | Prompt focus | What changed |
|---|---|---|
| V1 | Broad wedding vendor app, users and features | Established a multi-category directory and contact need |
| V2 | Multiple functions; location, date, budget, style and service needs; filters, profiles, shortlist and enquiry; do not invent facts | Made the user journey practical and added a data-integrity constraint |
| V3 | Screen-by-screen flow; AI chat, explained suggestions, verification labels, comparison, dashboard, inclusivity and privacy; never invent vendor details | Added trust, user control and a more complete set of screens |

**Prompt evolution lesson from the workbook:** clearer role, context, audience,
steps and constraints produced a more useful direction; AI suggestions still
need human review and fact-checking.

### Source prompts (transcribed from the supplied Prompt Log)

**V1 — broad app concept**

> Help me develop an app idea called Shaadikipanchayat. I want it to help
> people find wedding vendors, including jewellery designers, clothing
> boutiques, decorators, planners and other service providers. Explain who
> might use it and what its main features could be.

**V2 — practical journey**

> Build on the Shaadikipanchayat idea for Indian weddings that may include
> several functions. Let users add their location, dates, budget, style
> references and service needs. Include helpful follow-up questions, suitable
> vendor suggestions, filters, vendor profiles, a shortlist and an enquiry
> option. Don’t make up prices, ratings or availability.

**V3 — screen-by-screen, trust and privacy**

> Help me map out Shaadikipanchayat screen by screen. Include onboarding, an AI
> chat, vendor suggestions across wedding categories, filters for location,
> budget, style and date, vendor cards, verification labels, comparisons,
> shortlists, direct contact and a planning dashboard. Make space for different
> regional traditions and budgets. Clearly label AI-generated content, protect
> personal information and never invent vendor details.

The full source log remains a separate working record at
[`prompt-process-log.md`](./prompt-process-log.md); this section is included so
the consolidated evidence PDF contains the original prompt evolution.

**AI contribution in this deliverable:** AI coding assistance was used to
translate the supplied brief into prototype structure, interface copy, sample
interaction logic and this evidence draft. This pass applies the constraints
of fictional sample data, no generated ratings or quotes, optional brief
fields, visible limitations and local-only enquiry. The student still needs to
review and approve the proposed visual system and interaction choices; no
participant validation is claimed. There is no live AI inference in the app.

**Source record:** The original prompt log is retained separately in
[`prompt-process-log.md`](./prompt-process-log.md), alongside the prototype
build record and next-test log template.

## 6. Task 2 — evidence status

The Task 2 template asks for the research-to-output connection, design system,
starting point, meaningful iterations, prompt/tool evidence, final output,
before/after comparison, reflection and sources. Week 8 guidance specifies a
single PDF submission.

### Prepared in this project folder

- Research and audience synthesis, with evidence limits stated.
- Research-to-design decision map and operational design anchors.
- V1 directory and V2 guided app in the same runnable prototype.
- A transparent version comparison and implementation notes.
- A prompt evolution summary and human/AI contribution statement.

### Prototype iteration record

| Iteration | Goal | Change in this prototype | What it addresses | Evidence to capture |
|---|---|---|---|---|
| 1 — V1 directory | Make the starting concept visible | Category directory with example profiles | Establishes the broad vendor-discovery idea | Capture the V1 directory and label it as a constructed baseline |
| 2 — V2 brief-led flow | Connect requirements to discovery | Optional wedding brief and service/style filters | Responds to multi-function plans and scattered requirements | Capture brief and filtered results; test comprehension with a participant |
| 3 — trust and continuity | Support decisions without overstating facts | Fictional/unverified notices, fit explanations, profiles, shortlist, compare, enquiry draft and planning checklist | Responds to missing/uncertain vendor details and the need to organize next steps | Capture profile, comparison and planner; confirm warning comprehension with participants |

These are iterations implemented for this prototype pass, not three
participant-tested rounds. Add actual dated screenshots and user observations
before describing any change as validated.

### Still needed for a complete formal Task 2 submission

- Screenshots of the interface and a before/after spread captured from the
  actual prototype.
- Actual tool/prompt workflow screenshots, if the course requires them.
- Any Task 2-specific class feedback or existing starting-point artifact.
- Review of the design system with the student and instructor; the supplied
  Week 6 template is unfilled, so these tokens are proposed rather than
  previously approved.
- Add the actual screenshots, feedback and source evidence, then finalize the
  consolidated single-PDF submission.

Do not present the current V1 as a previously built or user-tested artifact:
it is a deliberately constructed in-app baseline for comparison.

## 7. Task 3 — prototype evidence

### Prototype question

Can a couple or family member understand how to express the main needs for a
multi-function wedding, find relevant service examples, understand why a result
may fit, and tell which vendor information still needs to be confirmed?

### V1 evaluation and iteration rationale

| Evaluation area | V1 baseline observation | V2 response | Evidence still required |
|---|---|---|---|
| Problem fit | Directory organizes categories but does not reduce repeated briefing | Optional wedding brief gathers core requirements | Participant completes the brief and explains its value |
| Audience relevance | Generic browsing does not account for different functions or priorities | Multiple functions/styles and optional budget field | Participants identify relevant and missing choices |
| Usability / clarity | User must infer relevance from a category and profile | Clear next steps, filters, fit explanation, save and compare actions | Observe task completion and collect participant wording |
| Design consistency | Minimal directory surface | Shared type, colour, card, spacing and action rules across screens | Check consistency with user/instructor against Week 6 criteria |
| Research connection | Category browse responds only to the broad directory need | Details, contact, fit and trust cues respond to stated workbook needs | Verify usefulness with actual wedding planners/couples |
| Overall strength | Useful starting point; not enough decision support | More complete testable journey; still a static, fictional-data prototype | Do not claim validated effectiveness until testing |

This is a design rationale and internal walkthrough checklist, not participant
test data or a completed user-evaluation score.

### Test plan (to complete with real participants)

Invite people who have planned or are planning a wedding. Ask permission before
recording, avoid collecting sensitive personal information, and tell
participants that all listings are fictional. For each task, record completion,
where they hesitate, what they expect to happen, and their own words. Do not
coach until the task is complete.

1. Create a brief for a wedding in a city of your choice with more than one
   function and at least one service need.
2. Find an example that could fit a preference and explain what the profile
   does and does not confirm.
3. Save two profiles and compare them; describe what information is missing
   before deciding.
4. Draft a vendor question and explain whether you expect it to be sent.
5. Find and update one planning task.

After each session, fill this record without identifying the participant:

| Session | Task | Observed action / quote | Confusion or barrier | Keep | Change | Test next |
|---|---|---|---|---|---|---|
| Not yet conducted | 1–5 | Add only after a real session | — | — | — | — |

### Current Keep / Change / Test Next

- **Keep:** optional fields; clear fictional-data warnings; direct confirmation
  prompts; sample fit explanations tied to chosen preferences; save and compare
  controls.
- **Change:** pending real participant findings. Do not claim user feedback
  before collecting it.
- **Test next:** brief comprehension, usefulness of profile explanations,
  missing information, whether the fictional/unverified warning is noticed,
  and whether users expect enquiry delivery.

### Three-minute review outline

1. **Problem and audience (35 sec):** scattered vendor search for couples and
   families planning different functions.
2. **V1 and learning question (35 sec):** simple directory is easy to scan but
   does not capture context or explain relevance.
3. **V2 changes (65 sec):** wedding brief, filters and fit explanation, trust
   cues, shortlist/compare, local enquiry draft and flexible checklist.
4. **What is evidence vs. not yet known (30 sec):** show the working flow; say
   user testing and vendor validation have not happened.
5. **Next test (15 sec):** run the five tasks with wedding planners/couples and
   prioritize changes from observed confusion.

## 8. Process book and final-project checklist

Use the semester process-book template as a chronological record rather than
reconstructing events that did not happen. The following evidence remains to
be added as the course proceeds:

- Research questions, references and any primary research with participant
  consent.
- Prompt versions, tool/workflow screenshots and selected/rejected outputs.
- Week 6 design-system review and consistency checks across three outputs.
- Actual V1/V2 screenshots, participant observations and iteration decisions.
- AI-use disclosure, fact-checking and human interventions.
- Final prototype walkthrough and tested links.
- Journey poster, campaign poster/key visual, audio identity and promotional
  video, if required for the final project.
- A3 landscape journey poster, physical model/prototype and presentation
  materials for the jury.
- Sources, reflection and remaining limitations.

For the Week 15 submission described in the updated Week 14 brief, prepare:

1. A six-slide narrated presentation MP4, in the student's own voice, no longer
   than five minutes.
2. One consolidated evidence PDF including the process book, prompt log, A3
   journey poster, campaign visual, media links, prototype evidence, sources
   and AI disclosure.

Bring the printed A3 landscape journey poster, physical prototype/model and a
device for the showcase. Test every media link. The package above is not
represented as already complete by this prototype folder.

## 9. Supplied source materials consulted

- `Shaadikipanchayat_Workbook.docx` — project foundation, audience, audience
  needs, reference scan, prompt evolution and explorations.
- `Shaadikipanchayat_Prompt_Log_docx.docx` — project context and V1/V2/V3
  prompts/reflections.
- `AI Studio_Week 6_Design System & Consistency Template.docx` — design-system
  evidence criteria; supplied template is unfilled.
- `AI_Studio_Task_2_Evidence_Submission.docx` and
  `AI Powered-I_Week 8_Task 2 Submission Studio.pptx` — Task 2 evidence and
  packaging guidance.
- `AI_Studio_Week_9_Prototype_Evidence_Template_Task_3.docx` and
  `AI_Powered-I_Week_12_Task_3_Submission_and_Mid-Review.pptx` — prototype
  iteration, evidence and review expectations.
- `AI Studio_Design Research & AI Process Book_Semester Template.docx` — process
  book structure.
- `AI Powered-I_Week 11_Technical Know-How & Task 3 Production.pdf`,
  `AI_Powered-I_Week_13_Deploy_Measure_Project_Viva.pptx`, and
  `AI_Powered_I_Week_14_Final_Project_Production_and_Jury_Preparation_UPDATED.pdf`
  — production, viva and final-project preparation.
