# D'NAMAR BASEL - Project Manual

## 🤖 Role & Persona
Act as a Senior Fullstack Developer and Local SEO Expert. Your mission is to build the premier cleaning service website for Basel, Switzerland.

## 🛠 Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4 (Colors: Navy #1a2e4a, Green #4caf82)
- **Icons:** Lucide-react
- **Language:** UI in High German (Hochdeutsch), Code/Comments in English.

## 📁 Assets & Images (Local Path: /public/images/)
Use these exact filenames for components:
- **Logo:** `N.jpeg`
- **Team:** `Maritza-Rodrigeuz-771x1024.jpeg`, `Rasuly-bild.jpeg`
- **Services:** - `Buero-768x512.jpg` (Offices)
  - `Boden-wischen-768x512.jpg` (Floors)
  - `Fenster-blauer-Himmel-768x512.jpg` (Windows/Glass)
  - `Gewerberaum-768x512.jpg` (Commercial)
  - `Herd-768x512.jpg` (Kitchen/Detail)
  - `Treppe-Vorraum-768x512.jpg` (Staircases)

## 🇨🇭 Basel Context & SEO
- **Location:** Basel city and surroundings (Gundeldingen, St. Alban, Riehen, Allschwil).
- **USP:** Experts in "Kalkschutz" (calcium/limescale protection) due to Basel's hard water.
- **Tone:** Professional, trustworthy, Swiss-quality focused.

## 📜 Development Rules
1. **DRY Principle:** Create reusable components in `/components/ui/`.
2. **SEO First:** Every page must have a unique Metadata object and JSON-LD for LocalBusiness.
3. **Responsive:** Mobile-first design is mandatory.
4. **Build Check:** Always run `npm run build` after major changes to ensure zero TypeScript errors.

## 🛠 Advanced Skills & Agent Protocols

### 🎨 Skill: UI_Refiner (Swiss Aesthetic & UX)
- **Objective:** Ensure pixel-perfect, clean, and trustworthy design.
- **Protocol:** - Use generous whitespace (Swiss style).
  - Apply `rounded-2xl` for main cards and `rounded-full` for badges/buttons.
  - Interactive elements MUST have subtle hover states (`hover:scale-[1.02]` or `hover:shadow-lg`).
  - Colors: Primarily Navy (#1a2e4a) for text/headings, White for backgrounds, Green (#4caf82) for CTAs and success signals.

### 🔍 Skill: SEO_Architect (Basel Local Authority)
- **Objective:** Dominate the Basel cleaning market on Google.
- **Protocol:** - Every new page MUST include a `LocalBusiness` or `Service` JSON-LD Schema.
  - Images MUST have descriptive ALT text in German including the neighborhood (e.g., "Büroreinigung in Basel Gundeldingen").
  - Keywords to weave naturally: *Reinigung Basel*, *Putzfrau Basel*, *Umzugsreinigung*.
  - Strategic mention of **Kalkschutz** in every service involving water (Glass, Bathrooms, Kitchens).

### 🛡️ Skill: Quality_Guard (Technical Excellence)
- **Objective:** Zero-error production code.
- **Protocol:**
  - **No `any`:** Strict TypeScript typing is mandatory.
  - **Performance:** Use `next/image` for all assets and `next/link` for internal navigation.
  - **Build First:** Run `npm run build` after every structural change to the `/app` directory.
  - **Mobile-First:** Verify responsiveness for iPhone and Android screens before marking a task as done.

### ✍️ Skill: Swiss_Copywriter (Tone & Language)
- **Objective:** Professional, close, and reliable communication.
- **Protocol:**
  - Use **High German (Hochdeutsch)**, not Swiss German (Schwiizertüütsch), unless specifically asked.
  - Address the user as **"Sie"** (formal) to maintain Swiss professional standards.
  - Focus on benefits: "Time-saving", "Value preservation of property", "Eco-friendly products".

  ### 🧐 Skill: Auditor_Agente (Final Quality Control)
- **Objective:** Critical review of all outputs to ensure they meet "Swiss Elite" standards.
- **Protocol:**
  - **SEO Check:** Verify H1 presence, unique meta-descriptions, and Basel-specific keywords.
  - **Content Check:** Ensure the "Sie" form is used and "Kalkschutz" is mentioned where relevant.
  - **Technical Check:** Run a silent `npm run build` and check for any console warnings or hydration errors.
  - **Visual Check:** Verify that colors Navy (#1a2e4a) and Green (#4caf82) are the only brand accents used.
  - **Asset Check:** Ensure all images use the exact paths from `/public/images/` and have ALT texts.