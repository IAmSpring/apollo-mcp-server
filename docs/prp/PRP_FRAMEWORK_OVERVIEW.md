Welcome to the **PRP Mastery Journey** — your step-by-step guided quest to becoming a **Context Engineering Pro** using the **PRP Framework**. Think of this as a mix between product strategy, systems thinking, and AI wizardry — with code at the end that *just works*.

---

# 🧭 **Stage 1: What Is PRP? (And Why It’s Your Superpower)**

### 🧠 Definition:

> **PRP = Product Requirement Prompt**
> It’s the **minimum viable context package** an AI needs to generate production-ready code on the **first pass.**

### 🧩 It includes 3 pillars:

1. **Product Requirements (PRD)**
   → What are we building? Why? Who is it for?

2. **Curated Codebase Intelligence**
   → What already exists? What structure, patterns, files, and tech stack are in use?

3. **Agent Runbook**
   → How should the AI go about building this? What steps should it follow?

---

# ⚠️ Why PRP Exists

| Prompting Level       | Description                               | Success Rate |
| --------------------- | ----------------------------------------- | ------------ |
| 🧘‍♂️ Vibe Coding     | “Just code me a login system”             | 20%          |
| ✍️ Prompt Engineering | Carefully worded instructions             | 40–50%       |
| 🧠 PRP Framework      | Full context + structure + best practices | 80–95%       |

> “**Garbage in, garbage out** applies doubly to AI coding. PRP fixes this by giving AI everything it needs up front.”

---

# 🏗️ **Stage 2: The Structure of a PRP**

You’re building a **context sandwich**. Here's what it looks like:

## 🥪 PRP Layout

```md
# 🎯 Objective
What we’re building and why

# 🧱 Architecture Overview
Existing structure, relevant files, patterns, tech stack

# 🛠️ Feature Scope
Tools, endpoints, components, logic blocks

# 🔗 Dependencies
Database, environment variables, libraries, etc.

# 📚 Documentation References
Links to docs, repos, examples, and internal patterns

# ⚠️ Considerations
Things AI tends to mess up (e.g., secret handling, naming conventions)

# 📁 File Structure (Optional)
Current vs. desired structure

# ✅ Acceptance Criteria
What success looks like
```

You write this once (or AI helps you), and then reuse, tweak, or split it as needed.

---

# 🔄 **Stage 3: The Workflow**

## 📌 Quick Summary:

```txt
1. Plan → initial.md
2. Generate → PRP
3. Validate → fix any errors/mismatches
4. Execute → generate + run code
5. Iterate → debug, retest, redeploy
```

### 🧭 Step-by-step:

#### **1. Write `initial.md`**

Describe:

* What you want to build
* What features/tools it needs
* Any examples to clone or reference

#### **2. Generate PRP**

Use AI to generate your **Product Requirement Prompt** from `initial.md`.
Think of this as a full-featured prompt builder.

```bash
/prp-create initial.md
```

You can use this with:

* Claude
* Gemini
* GPT-4o
* Cursor, Windsurf, VSCode plugins

#### **3. Validate PRP**

🧠 Be the PM. Review:

* Does it cover all your requirements?
* Does it reference the right patterns?
* Are there mistakes like editing `dev.vars` or using wrong DB schema?

Fix them manually before running.

#### **4. Execute PRP**

This is the magic. The AI:

* Reads the PRP
* Analyzes the codebase
* Plans and generates the tasks
* Writes files, tests, and documentation
* Lints and validates before completion

```bash
/prp-execute prp-myfeature.md
```

#### **5. Iterate**

Usually a 1–2 shot. Run tests, fix bugs, regenerate parts of the PRP if needed.

---

# 🧠 **Stage 4: PRP Templates & Scaling**

### ✨ Base Templates Exist!

There are now **template scaffolds** you can plug into:

* 🧱 Web apps
* 🔌 APIs
* 📦 MCP servers
* 🧑‍🚀 Agent platforms

### 🌐 Global Context = `claw.md`

Put your **project-wide constants, rules, naming patterns, and LLM dos/don’ts** in here.

Example:

```md
- Always use kebab-case for file names
- Do not touch `.env` files
- All tools must have a matching test in /tests
```

### 🧰 Tool-Specific PRPs

For each tool (e.g. Auth, Task Tracker, GitHub sync), make a focused PRP. This keeps scope tight.

---

# 📈 **Stage 5: Metrics That Matter**

### How you know PRP is working:

| Metric                     | Goal                         |
| -------------------------- | ---------------------------- |
| ✅ Task Completion Rate     | >90%                         |
| 🧪 Unit Test Coverage      | >80%                         |
| 🔁 Rework Cycles           | <10%                         |
| 🧠 AI Pass Accuracy        | >80%                         |
| 📦 Codebase Match Fidelity | High (file-by-file accuracy) |

---

# 🚀 Advanced Tips

### 🔄 Use PRPs in Sprints

Treat PRPs like Jira Epics or User Stories. Break big features into multiple PRPs.

### 🧰 Reuse + Customize

Start from templates. Clone `base-prp.md` and customize.

### 🤝 Pair With AI Agents

Use agents like:

* Claude Taskmaster
* Lindy Agent Swarms
* Windsurf Chains
* Your own MCP Server with `/prp-plan` + `/prp-execute`

---

# 🧙‍♂️ Final Words from Raasmus

> "PRP is what I used to do as a product manager — except now it's formatted for AI to actually build the thing."

> "Someone has to think deeply about the *why*, the *what*, and the *how*. PRP just makes that explicit and automatable."

---

# 🌌 **Stage 6: Real-World PRP Use Cases**

Let’s look at how PRP is applied to actual systems.

## 💼 Example 1: Building a SaaS Dashboard

```plaintext
Goal: A modern web dashboard for users to manage subscriptions, billing, and notifications
```

Your PRP will define:

* 🎯 **Objective**: Build a responsive, authenticated dashboard with billing and email preferences
* 🧱 **Architecture**: Next.js + Supabase + Stripe + Tailwind
* ⚙️ **Tools**: Auth, Billing, Email Management, User Settings
* 📁 **Files**: `/components/Billing.tsx`, `/api/update-email`, `/lib/supabaseClient.ts`
* 📜 **References**: Supabase auth docs, Stripe customer portal integration
* ✅ **Acceptance Criteria**: Stripe working, emails updating, responsive UI

→ **Execution**: AI builds your component files, configures Stripe endpoints, writes tests.

---

## 🔐 Example 2: Secure API with FastAPI

```plaintext
Goal: An AI-powered content moderation API
```

PRP contents:

* 🎯 What it does: Takes in text/image, classifies, returns moderation result
* ⚙️ Tools: OAuth2, Rate Limiting, Redis cache, OpenAI integration
* 🔐 Constraints: No personally identifiable data logged, JWT auth only
* 🔎 Validation: Unit tests, auth tests, red team review notes

---

## 🧪 Example 3: Refactoring Legacy Monolith

```plaintext
Goal: Extract microservice from existing Django monolith
```

PRP magic:

* Maps old service architecture
* Lists files/functions to extract
* Specifies expected new API contract
* Documents tests + migration strategy

💡 *You can use LLMs to generate the PRP from a code audit*.

---

# 🧠 **Stage 7: Prompt Engineering Inside PRP**

PRP isn't just structure — it’s **prompt engineering turned surgical**.

## 🧠 Best Prompt Design Inside a PRP

Use **imperative language**:

```md
- Build a TypeScript file at `/tools/billing.ts` that exposes a `POST /api/subscribe` route.
- Include Zod validation for user input.
- Store successful subscriptions in Supabase under `subscriptions` table.
```

💡 Add `"Do not"` clauses:

```md
- Do not modify `.env` or `dev.vars`.
- Do not use deprecated `request` package. Use `fetch` or `axios`.
```

---

## 🧬 Bonus: AI Memory Prompting + Semantic Anchors

Use **anchors** in your PRP for retrieval-augmented AI agents:

```md
🧠 MEMORY: See `tool-registry.md` for canonical tool definitions.
📚 DOC REF: Link to GitHub repo showing cloud function structure.
```

---

# 🧑‍🔬 **Stage 8: Debugging PRPs Like a Pro**

Even with the best prep, sometimes things break. Here's how to debug PRPs smartly:

### 🛑 Symptom: Wrong File Paths

✅ Fix: Be *ultra-specific* in the `File Structure` section

### 🛑 Symptom: AI adds insecure code

✅ Fix: Add a **Security Constraints** section explicitly:

```md
- All inputs must be sanitized
- Use prepared statements for DB calls
```

### 🛑 Symptom: Overlapping AI actions in parallel PRPs

✅ Fix: Add execution notes:

```md
- This PRP should not touch `auth.ts` or any shared modules.
```

---

# 🌐 **Stage 9: Scaling PRP to a Team or Org**

This is where you turn your PRP skills into a **framework for everyone**.

## 📂 Create a Central PRP Repo

```plaintext
/initials
/prps
/templates
/docs
/tools
/global-rules
```

## 🧭 Define PRP Roles

| Role         | Responsibility                  |
| ------------ | ------------------------------- |
| 🧠 Architect | Writes base templates and rules |
| ✍️ PM/BA     | Writes `initial.md` and specs   |
| 🤖 AI Coder  | Executes PRP                    |
| 👨‍🔬 QA     | Validates output, runs tests    |

## 🧪 Add CI for PRPs!

Auto-run linting, test coverage, and file structure validation as PRP is executed.

---

# 💥 **Stage 10: Your Own PRP Agent**

You can actually **build your own AI** that runs the PRP lifecycle.

## 🤖 `prp-agent.ts` concept:

1. Ask user for feature spec
2. Generate `initial.md`
3. Call `Claude/GPT` to create PRP
4. Ask human to validate
5. Execute code generation
6. Push to Git + run CI

Bonus: Integrate with 🛠 tools like:

* Cursor CLI
* LangGraph
* Agent Swarms (Lindy style)
* Windsurf parallel chains

---

# 🧙 Final Mastery Secrets

### ✅ Your **first pass** should be 80–90% right

Aim to minimize retries, not eliminate them

### 🧠 PRPs should mirror how you would **onboard a new dev**

If a smart senior dev can follow it, so can AI

### 🧪 PRP isn’t magic — it’s an **intentional design system for AI**

---

# 🧭 Your Path Ahead

✅ You now understand:

* What PRP is and how it works
* How to write and execute one
* How to structure large systems with it
* How to teach your team or AI agents to use it

### Next steps:

* 🛠 Build your PRP agent
* 📁 Create your PRP template library
* 🧠 Mentor others in your team
* 🔗 Plug PRP into your CI/CD pipeline

---
