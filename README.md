# Sports Career Guidance System with Automated Chatbot
### Final Year Mini Project — Full Stack Web Application

---

## Project Overview

This system helps users choose a sports career by analysing their profile
(sport interest, age, weight, fitness level, career goal, and priority) and
providing personalised guidance including:

- Recommended career roles with match scores
- Required skills breakdown
- Step-by-step training roadmap
- Sport-specific diet plan
- Career growth path (District → State → National → International)
- Automated chatbot for instant Q&A

---

## Technology Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Frontend    | React 18 + Axios                  |
| Backend     | Java 17 + Spring Boot 3.2         |
| Database    | MySQL 8.0                         |
| ORM         | JPA / Hibernate                   |
| Build Tool  | Maven                             |

---

## Project Structure

```
sports-career-pro/
├── database/
│   ├── 01_schema.sql          ← Create all tables
│   └── 02_data.sql            ← Insert sample data
│
├── backend/                   ← Spring Boot Maven project
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/sportscareer/
│       │   ├── SportsCareerApplication.java   ← Main entry point
│       │   ├── config/
│       │   │   └── CorsConfig.java            ← Allow React to call API
│       │   ├── model/                         ← JPA Entities (DB tables)
│       │   │   ├── Sport.java
│       │   │   ├── Career.java
│       │   │   ├── Skill.java
│       │   │   ├── TrainingPath.java
│       │   │   ├── DietPlan.java
│       │   │   ├── UserProfile.java
│       │   │   └── ChatLog.java
│       │   ├── dto/                           ← Request/Response objects
│       │   │   ├── UserProfileRequest.java
│       │   │   ├── GuidanceReport.java
│       │   │   ├── CareerRecommendation.java
│       │   │   ├── ChatRequest.java
│       │   │   ├── ChatResponse.java
│       │   │   └── ApiError.java
│       │   ├── repository/                    ← Database access layer
│       │   │   ├── SportRepository.java
│       │   │   ├── CareerRepository.java
│       │   │   ├── SkillRepository.java
│       │   │   ├── TrainingPathRepository.java
│       │   │   ├── DietPlanRepository.java
│       │   │   ├── UserProfileRepository.java
│       │   │   └── ChatLogRepository.java
│       │   ├── service/                       ← Business logic layer
│       │   │   ├── RecommendationService.java ← Core engine
│       │   │   └── ChatbotService.java        ← NLP keyword matching
│       │   └── controller/                    ← REST API endpoints
│       │       ├── GuidanceController.java
│       │       ├── ChatbotController.java
│       │       └── GlobalExceptionHandler.java
│       └── resources/
│           └── application.properties         ← DB config
│
└── frontend/                  ← React application
    ├── package.json
    └── src/
        ├── App.js                             ← Root component + navigation
        ├── index.js                           ← React entry point
        ├── styles/
        │   └── App.css                        ← Global styles
        ├── services/
        │   └── api.js                         ← Axios API calls
        └── components/
            ├── form/
            │   ├── GuidanceForm.jsx           ← Multi-step input form
            │   └── GuidanceForm.css
            ├── dashboard/
            │   ├── Dashboard.jsx              ← Results display
            │   └── Dashboard.css
            └── chatbot/
                ├── Chatbot.jsx                ← Chat interface
                └── Chatbot.css
```

---

## Step-by-Step Setup & Run Guide

### Prerequisites

Make sure these are installed:
- Java 17+ → `java -version`
- Maven 3.8+ → `mvn -version`
- Node.js 18+ → `node -version`
- MySQL 8.0 → `mysql --version`

---

### STEP 1 — Set Up MySQL Database

Open MySQL command line or MySQL Workbench and run both SQL files in order:

```sql
-- In MySQL terminal:
source /path/to/database/01_schema.sql;
source /path/to/database/02_data.sql;
```

Or run via command line:
```bash
mysql -u root -p < database/01_schema.sql
mysql -u root -p < database/02_data.sql
```

Verify:
```sql
USE sports_career_pro_db;
SHOW TABLES;
SELECT COUNT(*) FROM sports;    -- should be 8
SELECT COUNT(*) FROM careers;   -- should be 25+
```

---

### STEP 2 — Configure Backend Database Connection

Open this file:
```
backend/src/main/resources/application.properties
```

Change these two lines to match your MySQL setup:
```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

---

### STEP 3 — Run Spring Boot Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

You should see:
```
✅ Sports Career Guidance API running → http://localhost:8080/api
```

Test it in browser:
```
http://localhost:8080/api/guidance/sports
http://localhost:8080/api/chat/health
```

---

### STEP 4 — Run React Frontend

Open a NEW terminal window:

```bash
cd frontend
npm install
npm start
```

Browser opens automatically at:
```
http://localhost:3000
```

---

### STEP 5 — Use the Application

1. Fill the **Get Guidance** form (2 steps):
   - Step 1: Name, Sport, Age, Weight, Height
   - Step 2: Fitness Level, Career Goal, Priority
2. Click **Get My Guidance Report** — see the full dashboard
3. Explore tabs: Summary, Careers, Skills, Training, Diet Plan
4. Click 💬 (bottom-right) to open the **chatbot**
5. Ask questions like:
   - `cricket career`
   - `diet for athletes`
   - `training football`
   - `skills badminton`
   - `salary in sports`

---

## REST API Endpoints

| Method | Endpoint                  | Description                          |
|--------|---------------------------|--------------------------------------|
| GET    | /api/guidance/sports      | Get list of supported sports         |
| POST   | /api/guidance/analyze     | Submit profile, get guidance report  |
| POST   | /api/chat/message         | Send chat message, get bot response  |
| GET    | /api/chat/health          | Check if API is running              |

### Example API Request (POST /api/guidance/analyze):

```json
{
  "name": "Rahul Sharma",
  "sportInterest": "Cricket",
  "age": 18,
  "weightKg": 68.5,
  "heightCm": 175.0,
  "fitnessLevel": "Intermediate",
  "careerLevel": "State",
  "priority": "passion"
}
```

### Example Chatbot Request (POST /api/chat/message):

```json
{ "message": "What career options do I have in cricket?" }
```

---

## Database Schema Summary

| Table           | Purpose                                         |
|-----------------|-------------------------------------------------|
| sports          | Master list of 8 supported sports               |
| careers         | 25+ career roles across all sports              |
| skills          | Physical, Technical, Mental skills per sport    |
| training_paths  | Step-by-step training roadmap per level         |
| diet_plans      | Meal recommendations per sport & fitness level  |
| user_profiles   | Stores submitted user profiles                  |
| chat_logs       | Records all chatbot conversations               |

---

## Module-by-Module Viva Explanation

### 1. Frontend (React)

**GuidanceForm.jsx**
- Multi-step form using React controlled components (useState)
- Step 1 collects basic info; Step 2 collects goals
- On submit, calls `analyzeProfile()` API via Axios
- Passes report up to App via `onReportReady` callback (prop drilling)

**Dashboard.jsx**
- Receives GuidanceReport object as props
- Displays stat cards, growth path, and 5 tabbed sections
- Tabs: Summary, Careers, Skills, Training Roadmap, Diet Plan
- Each tab is a separate sub-component (SummaryTab, CareersTab etc.)

**Chatbot.jsx**
- Floating panel triggered by FAB (Floating Action Button)
- Messages stored in local state array
- Typing indicator shown while waiting for API response
- Enter key sends message; quick suggestion chips for common queries

**api.js**
- Axios instance with baseURL `/api` (proxied to port 8080)
- Three functions: `analyzeProfile`, `sendChatMessage`, `getSupportedSports`

---

### 2. Backend (Spring Boot)

**MVC Architecture:**
```
Request → Controller → Service → Repository → Database
Response ← Controller ← Service ← Repository ← Database
```

**Controllers** (Presentation Layer)
- `GuidanceController` — handles `/api/guidance/*` endpoints
- `ChatbotController` — handles `/api/chat/*` endpoints
- `GlobalExceptionHandler` — catches all errors, returns clean JSON

**Services** (Business Logic Layer)
- `RecommendationService` — core recommendation engine:
  1. Finds sport in DB
  2. Computes BMI and fitness score (0–100)
  3. Scores careers using priority-weighted algorithm
  4. Fetches skills, training paths, diet from DB
  5. Builds complete GuidanceReport
- `ChatbotService` — keyword-based NLP:
  1. Tokenizes user message
  2. Scores each keyword by token overlap
  3. Returns best-matching response from knowledge base

**Repositories** (Data Access Layer)
- Extend `JpaRepository<Entity, Long>`
- Spring auto-generates CRUD methods
- Custom query methods using method name conventions
  e.g. `findBySportIdAndCareerLevelIgnoreCase()`

**Models** (JPA Entities)
- Java classes annotated with `@Entity` = mapped to DB tables
- `@OneToMany` / `@ManyToOne` = table relationships
- `@Id @GeneratedValue` = auto-increment primary key
- Lombok `@Data` = auto-generates getters/setters

**DTOs** (Data Transfer Objects)
- Separate from entities — used only for API input/output
- `UserProfileRequest` — incoming form data with validation
- `GuidanceReport` — complete outgoing response object
- `ApiError` — standard error response format

---

### 3. Recommendation Engine (Key Logic)

**Fitness Score (0–100):**
```
Age suitability    → max 30 pts
BMI / weight       → max 30 pts
Fitness level      → max 40 pts (Beginner=10, Intermediate=25, Advanced=40)
```

**Career Matching Score:**
```
Priority weight    → income/passion/stability/fitness score × 8
Career level bonus → +15 if user's goal matches career's required level
Fitness compat.    → +5 to +10 based on closeness of fitness scores
```
Careers are sorted by score DESC — highest match shown first.

---

### 4. Chatbot NLP Logic

Simple keyword tokenization approach:
1. Split keyword and user message into tokens
2. Count token overlaps (full match = 2pts, partial = 1pt)
3. Keyword with highest score wins
4. Fallback response if no keyword scores ≥ 2

Example: User types "what career in cricket?"
- "cricket career" keyword scores 2 (contains "cricket") + 0 = 2 ✓ — MATCH
- All bot responses are stored in a static `LinkedHashMap`

---

## Optional Enhancements (If Time Permits)

1. **Add React Router** — proper URL-based navigation
2. **Add Authentication** — Spring Security + JWT tokens
3. **Improve NLP** — integrate with an actual NLP library or GPT API
4. **Charts** — add Chart.js to visualise fitness scores
5. **PDF Export** — generate downloadable career report PDF
6. **Admin Panel** — CRUD interface to manage sports/careers in DB

---

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `Access denied for user 'root'` | Check password in application.properties |
| `Table 'sports' doesn't exist` | Run 01_schema.sql first, then 02_data.sql |
| `CORS error in browser` | Make sure Spring Boot is running on port 8080 |
| `npm start` fails | Run `npm install` first |
| `Port 8080 in use` | Change `server.port` in application.properties |
| `ddl-auto validate fails` | Change to `update` temporarily, then back to `validate` |

---

*Project by: [Your Name] | [Roll No] | [College Name]*
*Guided by: [Professor Name]*
