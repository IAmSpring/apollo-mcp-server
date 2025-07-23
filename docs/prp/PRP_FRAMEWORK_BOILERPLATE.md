# 🧠 PRP Framework Boilerplate
_Use this as a foundation to build your own PRPs. Copy, customize, and execute._

---

## 🎯 Objective

Clearly state what you're building and why.  
> Example: "We’re building a task manager API with user authentication and recurring task support."

---

## 🧱 Existing Architecture

Brief overview of current setup, if any.

- Language: e.g., TypeScript
- Framework: e.g., Next.js or FastAPI
- Deployment: e.g., Cloudflare Workers or Vercel
- Existing Code References:  
  - `/lib/db.ts` for database access  
  - `/middleware/auth.ts` for auth logic

---

## 🛠️ Feature Scope

List the features/tools/components to be built.

```md
- [ ] User Authentication (OAuth2)
- [ ] Task CRUD endpoints
- [ ] Recurring task logic
- [ ] REST API with JSON responses
```

---

## 🔗 Dependencies

External services, packages, or data sources the AI should use or not touch.

- Use: `supabase-js`, `zod`, `jsonwebtoken`
- Avoid: Direct SQL unless using Supabase client
- Environments: Reference `.env.example` (do not modify)

---

## 📚 Documentation & References

Links or internal files AI should consult for best practices or scaffolding.

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Existing Codebase](https://github.com/example/repo)
- File patterns: `lib/tools/*.ts`, `components/ui/*.tsx`

---

## ⚠️ Known Issues & Considerations

Preempt common AI mistakes or constraints.

- Avoid writing inline SQL queries
- Always include validation with Zod
- Do not write `.env` values in code

---

## 📁 File Structure (Suggested)

```
.
├── lib/
│   └── db.ts
├── tools/
│   ├── auth.ts
│   └── tasks.ts
├── routes/
│   ├── api/
│   │   ├── login.ts
│   │   └── tasks.ts
├── tests/
│   └── tasks.test.ts
```

---

## ✅ Acceptance Criteria

Describe what “done” looks like.

- [ ] All endpoints respond with correct structure
- [ ] Auth protects task routes
- [ ] Tests pass for all major paths
- [ ] Code passes lint & typecheck
- [ ] Documentation updated

---

## 🧪 Validation Gates

- Lint: `eslint .`
- Typecheck: `tsc --noEmit`
- Tests: `vitest run` or `jest`
- Manual QA: Feature walkthrough

---

## 🧬 Memory Prompts (Optional)

```md
🧠 MEMORY: Reference tool registry in /tools/index.ts
📚 DOC REF: Supabase official docs for auth and storage
```

---

## 📎 Notes

This is a generic PRP boilerplate. Adjust scope, features, and structure based on your use case.  
Be as detailed as you would for a new senior engineer joining the project for the first time.

