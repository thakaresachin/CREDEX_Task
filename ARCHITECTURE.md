# Architecture Overview

Credex follows a MERN-based client-server architecture.

---

# Frontend Architecture

React.js handles:

- Routing
- UI rendering
- Audit forms
- Result pages
- Share report pages

Main folders:

- components/
- pages/
- services/

---

# Backend Architecture

Express.js API server handles:

- Audit calculations
- AI summary generation
- Shared report APIs
- Lead management

Main folders:

- controllers/
- routes/
- services/
- models/

---

# Database

MongoDB Atlas stores:

- Audit reports
- Recommendations
- Shared IDs
- Leads

---

# AI Integration

Groq API generates professional audit summaries using LLM prompts.

---

# Flow

User Input → API Request → Audit Calculation → MongoDB Save → AI Summary → Frontend Result