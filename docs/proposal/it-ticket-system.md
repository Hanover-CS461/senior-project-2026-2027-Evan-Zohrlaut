---
# IT Ticket System — Senior Project Proposal

> Alternate idea

---

## 1. Utility — What problem does it solve?

IT help requests arrive through scattered channels: email, hallway conversations, text messages, or just "can you come look at this?" They get lost, forgotten, duplicated, or answered twice, and there is no shared record of *who asked, what broke, or what was done to fix it*.

This app gives everyone one place to submit, track, assign, and resolve IT support requests. Nothing falls through the cracks, and every request's status is always visible. Since signing up is a barrier, submitters track their request with a ticket ID instead of an account.

## 2. Users — Who would use it and why?

| Who              | What they do                           | Why they'd use it                                                                                               |
| ---------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Students / staff | Submit requests                        | They can see their request was received and is being worked on, instead of wondering if anyone read their email |
| IT support staff | Triage, assign, respond, close tickets | A single organized queue instead of a messy inbox; a history of past fixes                                      |

## 3. The idea in 10 words or less

> "File an IT ticket and track it without signing up." 

## 4. Similar products

- **Zendesk / Freshservice** — mature help-desk platforms. Powerful, but heavy, paid per seat, and built for big businesses rather than a small team.
- **osTicket** — free and open-source, but you host it yourself and there's a lot of setup and upkeep.
- **Jira Service Management** — very capable, but way more than a small group needs.

## 5. How it's different

Most help desks force you to create an account before you can even ask for help. This app doesn't: submitters file a ticket with just their contact info and follow it through New → Assigned → Resolved → Closed using a ticket ID — package-tracking style, with no account anywhere in the flow.

- **Ticket ID lookup:** submitters check progress at any time without logging in, like tracking a package
- **Frictionless submission:** contact info only, no sign-up, no portal to learn
- **Small by design:** one simple workflow, no admin dashboards, no enterprise features

## 6. Features

**Core:**

- Submit a ticket with contact info (name/email), category, priority, and description — no sign-up required
- Status flow: New → Assigned → Resolved → Closed
- Comments and history on each ticket
- Filter/search tickets by status and category
- **Ticket ID lookup** — every ticket gets an ID; submitters can check its status anytime without an account

**Stretch (if time allows):**

- Email notification when a ticket's status changes

## 7. Scope decisions

- **Web-based** — the natural fit for a tool multiple people use
- **No accounts** — submitters just leave their contact info in the ticket