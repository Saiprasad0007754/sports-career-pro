-- ==============================================================
--  Sports Career Guidance System — Database Schema
--  Run this file FIRST, then run 02_data.sql
-- ==============================================================

CREATE DATABASE IF NOT EXISTS sports_career_pro_db;
USE sports_career_pro_db;

-- ---------------------------------------------------------------
-- TABLE: sports
-- Master list of sports supported by the system
-- ---------------------------------------------------------------
CREATE TABLE sports (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(100) NOT NULL UNIQUE,   -- e.g. "Cricket"
    category      VARCHAR(100),                   -- "Team" / "Individual"
    description   TEXT,
    min_age       INT,                             -- minimum recommended start age
    max_age       INT,                             -- typical peak age
    min_weight_kg DECIMAL(5,2),                   -- ideal body weight range (low)
    max_weight_kg DECIMAL(5,2),                   -- ideal body weight range (high)
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------
-- TABLE: careers
-- Career roles available within each sport
-- ---------------------------------------------------------------
CREATE TABLE careers (
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    sport_id       BIGINT NOT NULL,
    title          VARCHAR(150) NOT NULL,   -- e.g. "Professional Cricketer"
    description    TEXT,
    avg_salary_inr VARCHAR(100),            -- salary range string
    level_required VARCHAR(50),            -- "District","State","National","International"
    passion_score  INT DEFAULT 5,          -- 1-10: how passion-driven
    income_score   INT DEFAULT 5,          -- 1-10: income potential
    stability_score INT DEFAULT 5,         -- 1-10: job stability
    fitness_score  INT DEFAULT 5,          -- 1-10: fitness requirement
    FOREIGN KEY (sport_id) REFERENCES sports(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------
-- TABLE: skills
-- Skills required for each sport (categorised)
-- ---------------------------------------------------------------
CREATE TABLE skills (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    sport_id    BIGINT NOT NULL,
    skill_name  VARCHAR(150) NOT NULL,
    skill_type  VARCHAR(50),   -- "Physical" / "Technical" / "Mental"
    description TEXT,
    FOREIGN KEY (sport_id) REFERENCES sports(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------
-- TABLE: training_paths
-- Step-by-step training roadmap for each sport
-- ---------------------------------------------------------------
CREATE TABLE training_paths (
    id                BIGINT AUTO_INCREMENT PRIMARY KEY,
    sport_id          BIGINT NOT NULL,
    career_level      VARCHAR(50) NOT NULL,  -- District / State / National / International
    step_number       INT NOT NULL,
    step_title        VARCHAR(200) NOT NULL,
    step_description  TEXT,
    duration_estimate VARCHAR(100),           -- "6 months", "2 years"
    FOREIGN KEY (sport_id) REFERENCES sports(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------
-- TABLE: diet_plans
-- Diet recommendations per sport and fitness level
-- ---------------------------------------------------------------
CREATE TABLE diet_plans (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    sport_id        BIGINT NOT NULL,
    fitness_level   VARCHAR(50) NOT NULL,  -- "Beginner","Intermediate","Advanced"
    meal_time       VARCHAR(50) NOT NULL,  -- "Breakfast","Lunch","Dinner","Pre-workout","Post-workout"
    recommendation  TEXT NOT NULL,
    calories_approx INT,                   -- approximate calories for this meal
    notes           TEXT,
    FOREIGN KEY (sport_id) REFERENCES sports(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------
-- TABLE: user_profiles
-- Stores submitted user profiles for report generation
-- ---------------------------------------------------------------
CREATE TABLE user_profiles (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(150),
    sport_interest  VARCHAR(100) NOT NULL,
    age             INT NOT NULL,
    weight_kg       DECIMAL(5,2) NOT NULL,
    height_cm       DECIMAL(5,2),
    fitness_level   VARCHAR(50) NOT NULL,   -- Beginner / Intermediate / Advanced
    career_level    VARCHAR(50) NOT NULL,   -- District / State / National / International
    priority        VARCHAR(50) NOT NULL,   -- fitness / income / passion / stability
    bmi             DECIMAL(5,2),
    fitness_score   INT,                    -- computed fitness score 0-100
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------
-- TABLE: chat_logs
-- Logs every chatbot conversation
-- ---------------------------------------------------------------
CREATE TABLE chat_logs (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_message    TEXT NOT NULL,
    bot_response    TEXT NOT NULL,
    matched_keyword VARCHAR(100),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
