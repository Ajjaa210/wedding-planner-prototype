# Shaadikipanchayat

A responsive, browser-based prototype for wedding vendor discovery and planning.
The experience is built around the Shaadikipanchayat brief in the supplied
workbook and prompt log: wedding details first, relevant vendor exploration,
clear reasons for a possible fit, a shortlist, and an enquiry draft.

## Run locally

From this folder, start a static server:

```sh
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000). No install, account, API
key, or external service is required.

## Prototype scope

- Switch between **V1**, a simple category directory, and **V2**, a guided
  wedding brief and discovery flow.
- Build and edit a brief with optional location, date, budget, guest estimate,
  styles, functions, and service categories.
- Filter illustrative profiles by service and style, inspect profile details,
  save a shortlist, compare selected examples, draft an enquiry, and manage a
  flexible planning checklist.
- Brief, saved profiles, checklist and enquiry draft are stored in this browser
  using local storage. There is no account, backend or message delivery.
- All vendor names and profiles are fictional. There are no real vendor
  recommendations, ratings, prices, credentials, verification or availability.

The interface does not use a live AI model. The match explanations demonstrate
how a future recommendation should connect a stated preference to a service;
they are sample copy, not model output.

## Project evidence

See [the project evidence pack](./docs/project-evidence.md) for the research
synthesis, design decisions, V1-to-V2 rationale, prototype evaluation plan,
Task 2/Task 3 documentation, process-book checklist, and remaining evidence
needed before submission.

The current consolidated evidence draft is available as
[PDF](./docs/project-evidence.pdf) and [HTML](./docs/project-evidence.html).
The separately maintained [Prompt & Process Log](./docs/prompt-process-log.md)
records the source prompt evolution and this prototype build.
To refresh the exports after editing the Markdown source:

```sh
(cd docs && pandoc project-evidence.md --standalone --css evidence-print.css \
  --metadata title="Shaadikipanchayat — Project Evidence" \
  --metadata author="Himani Mittal" \
  --output project-evidence.html)
swift scripts/render-evidence-pdf.swift docs/project-evidence.md docs/project-evidence.pdf
```
