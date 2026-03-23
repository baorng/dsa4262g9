# Product Requirements Document
## Interview Anxiety Assessment Tool
**Version**: 1.0 | **Stage**: Investor Pitch MVP | **Stack**: React + Supabase

---

## 1. Product Overview

A web application that helps university students and fresh graduates identify their interview anxiety profile through a short questionnaire. Users receive a personalised anxiety score breakdown across five types, get matched to a targeted resource, and can retake the assessment post-interview to track improvement. An anonymised public analytics dashboard demonstrates the tool's impact.

---

## 2. Goals & Success Metrics

| Goal | Metric |
|---|---|
| Help users identify their anxiety type | % of users who complete the questionnaire |
| Drive resource engagement | % of users who click through to their matched resource |
| Show improvement over time | % of returning users whose dominant anxiety score decreases |
| Demonstrate impact for investors | Analytics dashboard showing aggregate score trends |

---

## 3. Target Users

- **University students** preparing for internship or graduate interviews
- **Fresh graduates and job seekers** actively interviewing

**User mindset**: Slightly anxious, seeking self-awareness and practical help. Tone should feel supportive, non-clinical, and encouraging — never diagnostic or alarming.

---

## 4. Design Direction

- **Vibe**: Warm, friendly, modern — soft rounded corners, gentle gradients, approachable typography
- **Color palette**: Warm off-whites, peach/apricot accents, soft teal or sage for highlights, muted coral for CTAs
- **Typography**: A distinctive rounded or humanist display font (e.g. DM Serif Display or Fraunces) paired with a clean readable body font (e.g. Plus Jakarta Sans or Nunito)
- **Animations**: Smooth progress transitions, gentle score reveal animations, staggered card entrances
- **Do NOT use**: Purple gradients, generic Inter/Roboto, clinical whites, anything that feels like a medical form

---

## 5. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Styling | Tailwind CSS |
| Backend / DB | Supabase (PostgreSQL) |
| Auth | None — anonymous session tracking via UUID stored in localStorage |
| Hosting | Vercel (recommended) |

---

## 6. Anxiety Types Reference

| Type | Code | Description |
|---|---|---|
| Communication Anxiety | `communication` | Struggles articulating thoughts fluently; responses feel disorganised |
| Appearance Anxiety | `appearance` | Heightened self-monitoring of posture, expressions, gestures |
| Social Anxiety | `social` | Difficulty with conversational flow, small talk, reading social cues |
| Performance Anxiety | `performance` | Preoccupied with meeting expectations; overthinking and physiological arousal |
| Behavioural Anxiety | `behavioural` | Changes in voice, fidgeting, eye contact — misread as low confidence |

---

## 7. Scoring Logic

All questions are rated on a **1–5 Likert scale** (1 = Never, 5 = Always).

Reverse-scored questions (marked `_rev`): score = `6 - raw_score`

```
communication = mean(Q1, Q6, Q11, Q16, Q21_rev, Q26)
appearance    = mean(Q2, Q7, Q12, Q17, Q22, Q27)
social        = mean(Q3_rev, Q8_rev, Q13, Q18_rev, Q23, Q28_rev)
performance   = mean(Q4, Q9, Q14, Q19, Q24, Q29)
behavioural   = mean(Q5, Q10, Q15, Q20, Q25, Q30)
```

The **dominant anxiety type** is the one with the highest mean score. In case of a tie, show all tied types.

---

## 8. Questions

All 30 questions in order, with reverse-score flags noted:

| # | Question | Reverse? |
|---|---|---|
| 1 | I sometimes pause longer than I intend to before answering interview questions. | |
| 2 | I occasionally notice myself adjusting how I sit or position myself during an interview. | |
| 3 | I find it easy to engage in casual conversation with interviewers before formal questions begin. | ✓ |
| 4 | While answering a question, I sometimes mentally review whether my previous answer sounded good enough. | |
| 5 | My speaking pace sometimes changes during interviews compared to normal conversations. | |
| 6 | I find it difficult to clearly organize my thoughts when answering unexpected questions. | |
| 7 | I occasionally become aware of how my facial expressions might appear during interviews. | |
| 8 | Conversations with interviewers usually feel natural and smooth. | ✓ |
| 9 | I sometimes think about whether I am performing well while the interview is still ongoing. | |
| 10 | My hands or body sometimes move more than usual during interviews. | |
| 11 | I sometimes realize halfway through an answer that I am not explaining my point clearly. | |
| 12 | I occasionally think about how my posture might be interpreted by the interviewer. | |
| 13 | I sometimes find it hard to interpret the interviewer's reactions or cues. | |
| 14 | I worry about making mistakes when responding to interview questions. | |
| 15 | I sometimes avoid direct eye contact when thinking about my answer. | |
| 16 | I sometimes lose track of what I was trying to say while explaining an idea. | |
| 17 | I occasionally think about how I look while answering questions. | |
| 18 | Small talk with interviewers usually helps me feel more comfortable. | ✓ |
| 19 | I tend to analyze my answers immediately after giving them. | |
| 20 | My voice sometimes sounds different during interviews than it does in normal conversations. | |
| 21 | I find it easy to explain my ideas clearly during interviews. | ✓ |
| 22 | I sometimes become aware of how my gestures or body language appear. | |
| 23 | I occasionally feel unsure about how to respond to conversational cues from interviewers. | |
| 24 | I sometimes feel pressure to answer questions perfectly. | |
| 25 | I sometimes notice myself fidgeting during interviews. | |
| 26 | I sometimes need a moment to gather my thoughts before responding. | |
| 27 | I occasionally wonder whether my expressions match what I am trying to say. | |
| 28 | I find it easy to maintain a natural conversational flow during interviews. | ✓ |
| 29 | I sometimes think about how the interview outcome might depend on my current answer. | |
| 30 | I sometimes notice changes in my breathing or speaking rhythm during interviews. | |

---

## 9. Pages & User Flow

```
Landing Page
    ↓
Questionnaire (30 questions, paginated)
    ↓
Results Page (score breakdown + dominant type)
    ↓
Resource Page (matched resource for dominant type)
    ↓ (optional)
Analytics Dashboard (public, anonymised)
```

---

## 10. Page Specifications

### 10.1 Landing Page (`/`)

**Purpose**: Explain the tool, build trust, drive users to start.

**Content**:
- Hero headline: e.g. *"Find out what's holding you back in interviews."*
- 2–3 sentence description of what the tool does
- Key callouts: "30 questions · 5 minutes · No sign-up needed"
- Brief explanation of the 5 anxiety types (icon + one-line description each)
- Primary CTA button: **"Start the Assessment"**
- Secondary link: **"View Analytics Dashboard"**

**Behaviour**:
- On load, generate a UUID and store in `localStorage` as `user_session_id` if not already present
- This UUID will be used to associate all future attempts by this browser session

---

### 10.2 Questionnaire Page (`/quiz`)

**Purpose**: Collect 30 responses efficiently without fatigue.

**Layout**:
- Display **one question at a time** (not all 30 at once)
- Show a progress bar at the top (e.g. "Question 7 of 30")
- Large, readable question text
- 5 answer options displayed as **selectable pill/card buttons**:
  - 1 — Never
  - 2 — Rarely
  - 3 — Sometimes
  - 4 — Often
  - 5 — Always
- Selecting an answer auto-advances to the next question after a short 300ms delay
- Back button available to revisit previous questions
- Final question shows a **"See My Results"** button instead of auto-advancing

**Behaviour**:
- All responses stored in React state during quiz
- On completion, scores are computed client-side using the formulas in Section 7
- Results object is then written to Supabase (see Section 12)

---

### 10.3 Results Page (`/results`)

**Purpose**: Deliver the user's anxiety profile in a clear, non-alarming, actionable way.

**Layout**:
- Headline: e.g. *"Your Interview Anxiety Profile"*
- **Score breakdown**: A horizontal or radial bar chart showing all 5 anxiety type scores (1.0–5.0 scale), with the dominant type visually highlighted
- **Dominant type card**: Large card with:
  - Anxiety type name and icon
  - 2–3 sentence plain-language description
  - Score shown prominently
- **Interpretation guide**: Small note explaining what the score range means (e.g. 1–2 = Low, 3 = Moderate, 4–5 = High)
- CTA: **"Get Your Resource"** → navigates to `/resource`
- Secondary CTA: **"Retake After Your Interview"** → saves state/timestamp and returns to `/quiz`

**Behaviour**:
- If user has a prior attempt stored (via `user_session_id`), show a **comparison view**: "Last time vs Now" delta for each anxiety type
- Animate score bars on entry

---

### 10.4 Resource Page (`/resource`)

**Purpose**: Give users a practical next step matched to their dominant anxiety type.

**Layout**:
- Restate the dominant anxiety type at the top
- Short paragraph on why this resource was chosen for them
- Resource card with:
  - Title
  - Description (2–3 sentences)
  - **"Access Resource"** button → placeholder link `#` for now
- Below: smaller cards for the other 4 anxiety types with their placeholder links (so users can explore further)
- CTA at bottom: **"Retake the Quiz After Your Next Interview →"**

**Placeholder links**: Use `href="#"` for all resource links. Each anxiety type should have a distinct placeholder title:
  - Communication: *"Structuring Your Answers: A Practical Guide"*
  - Appearance: *"Body Language Confidence Workshop"*
  - Social: *"Conversational Flow in Professional Settings"*
  - Performance: *"Managing Perfectionism Under Pressure"*
  - Behavioural: *"Calm Presence Techniques for Interviews"*

---

### 10.5 Analytics Dashboard (`/analytics`)

**Purpose**: Demonstrate product impact to investors and the public. Show aggregate, anonymised trends.

**Access**: Fully public, no login required.

**Layout — 4 key visualisations**:

1. **Total Assessments Taken** — large number stat card
2. **Average Score by Anxiety Type** — grouped bar chart across all users
3. **Score Over Time** — line chart showing average scores per anxiety type by week/month (toggle)
4. **Returning Users: Before vs After** — bar chart comparing pre/post interview scores for users who retook the quiz, demonstrating resource effectiveness

**Additional**:
- Small note: *"All data is anonymised. No personal information is collected."*
- Filter: Toggle between "All time" / "Last 30 days" / "Last 7 days"

---

## 11. Anonymous Session Tracking

Since there are no user accounts, use the following approach:

- On first visit, generate a UUID (`crypto.randomUUID()`) and persist it in `localStorage` as `user_session_id`
- Every quiz submission is tagged with this UUID and a `taken_at` timestamp
- A `attempt_number` field (1, 2, 3…) is incremented per UUID to track retakes
- The analytics dashboard queries aggregate data only — never exposes individual UUIDs

---

## 12. Supabase Schema

### Table: `quiz_results`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key, auto-generated |
| `session_id` | text | Anonymous user UUID from localStorage |
| `attempt_number` | integer | 1 = first attempt, 2 = after interview, etc. |
| `taken_at` | timestamptz | Server timestamp |
| `communication_score` | numeric(3,2) | Mean score 1.00–5.00 |
| `appearance_score` | numeric(3,2) | |
| `social_score` | numeric(3,2) | |
| `performance_score` | numeric(3,2) | |
| `behavioural_score` | numeric(3,2) | |
| `dominant_type` | text | e.g. `"performance"` |
| `raw_responses` | jsonb | Full Q1–Q30 responses for future analysis |

### Supabase RLS Policy
- **INSERT**: Allow all (anonymous inserts)
- **SELECT**: Allow all (for public analytics dashboard)
- **UPDATE / DELETE**: Deny all

---

## 13. Component Architecture

```
src/
├── pages/
│   ├── Landing.jsx
│   ├── Quiz.jsx
│   ├── Results.jsx
│   ├── Resource.jsx
│   └── Analytics.jsx
├── components/
│   ├── ProgressBar.jsx
│   ├── QuestionCard.jsx
│   ├── AnswerPill.jsx
│   ├── ScoreChart.jsx          # Bar chart for results
│   ├── AnxietyTypeCard.jsx     # Used in results + resource pages
│   ├── ResourceCard.jsx
│   └── AnalyticsChart.jsx      # Recharts-based charts
├── lib/
│   ├── supabaseClient.js       # Supabase init
│   ├── scoring.js              # All scoring logic (pure functions)
│   └── session.js              # UUID generation + localStorage helpers
├── data/
│   ├── questions.js            # All 30 questions with metadata
│   └── anxietyTypes.js         # Type descriptions, icons, resource info
└── App.jsx                     # React Router setup
```

---

## 14. Out of Scope (MVP)

The following are explicitly excluded from the MVP to keep the build lean for the investor pitch:

- User authentication or accounts
- Email capture or notifications
- Admin dashboard or moderation tools
- Mobile app
- Paid tiers or gating
- Multi-language support
- Custom resource content (use placeholder links)
- AI-generated personalised feedback

---

## 15. Non-Functional Requirements

| Requirement | Target |
|---|---|
| Page load time | < 2 seconds on 4G |
| Quiz completion time | ~5 minutes |
| Accessibility | WCAG AA — keyboard navigable, sufficient contrast |
| Data privacy | No PII collected; session IDs are random UUIDs |

---

## 16. MVP Delivery Checklist

- [ ] Supabase project created with `quiz_results` table and RLS configured
- [ ] Anonymous session UUID generation working
- [ ] All 30 questions displayed one at a time with progress bar
- [ ] Scoring logic implemented and unit tested
- [ ] Results page shows all 5 scores with correct dominant type highlighted
- [ ] Retake flow works and stores `attempt_number` correctly
- [ ] Resource page shows correct matched resource + placeholder links
- [ ] Analytics dashboard shows all 4 charts with live Supabase data
- [ ] Warm, friendly visual design applied consistently across all pages
- [ ] Deployed to Vercel and accessible via public URL
