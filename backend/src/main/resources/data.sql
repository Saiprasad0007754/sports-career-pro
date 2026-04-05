-- ==============================================================
--  Sports Career Guidance System — Sample Data
--  Run AFTER 01_schema.sql
-- ==============================================================

-- ==============================================================
-- SPORTS
-- ==============================================================
INSERT IGNORE INTO sports (name, category, description, min_age, max_age, min_weight_kg, max_weight_kg) VALUES
('Cricket',    'Team',       'Bat-and-ball game; most popular sport in India with IPL, domestic & international circuits.',   10, 35, 60.0, 90.0),
('Football',   'Team',       'World''s most popular sport; played in ISL, I-League and international tournaments.',            8,  32, 60.0, 85.0),
('Athletics',  'Individual', 'Track & field events: sprints, long-distance, jumps, throws. Pathway to Olympics.',             10, 30, 50.0, 90.0),
('Badminton',  'Individual', 'Fast-paced racket sport; India produces world-class players competing in BWF circuits.',        8,  30, 50.0, 80.0),
('Tennis',     'Individual', 'Global racket sport; pathways through ITF, ATP/WTA tournaments and national circuits.',         7,  35, 55.0, 85.0),
('Swimming',   'Individual', 'Competitive water sport in multiple strokes; pathway to Asian Games and Olympics.',             6,  28, 55.0, 90.0),
('Basketball', 'Team',       'Five-on-five court sport; NBA India, national leagues and 3x3 competition growing rapidly.',    10, 35, 70.0, 110.0),
('Kabaddi',    'Team',       'Contact sport deeply rooted in India; Pro Kabaddi League offers professional opportunities.',   12, 30, 65.0, 100.0);

-- ==============================================================
-- CAREERS
-- ==============================================================

-- Cricket
INSERT IGNORE INTO careers (sport_id, title, description, avg_salary_inr, level_required, passion_score, income_score, stability_score, fitness_score) VALUES
(1,'Professional Cricketer',   'Play at domestic/international level in Ranji, IPL, and national team.',       '₹5L – ₹10Cr/yr',  'District',      10, 10, 6, 9),
(1,'Cricket Coach',            'Train and develop players at academy, state or national level.',                '₹3L – ₹50L/yr',   'State',         8,  7,  8, 5),
(1,'Cricket Commentator',      'Live commentary and analysis for TV, radio and digital media.',                 '₹5L – ₹2Cr/yr',   'National',      7,  9,  7, 3),
(1,'Umpire / Match Referee',   'Officiate matches after BCCI certification.',                                   '₹2L – ₹40L/yr',   'State',         6,  6,  9, 4),
(1,'Sports Journalist',        'Cover cricket news, interviews and match analysis.',                            '₹3L – ₹15L/yr',   'District',      7,  6,  7, 3);

-- Football
INSERT INTO careers (sport_id, title, description, avg_salary_inr, level_required, passion_score, income_score, stability_score, fitness_score) VALUES
(2,'Professional Footballer',  'Play in ISL, I-League or represent India internationally.',                    '₹3L – ₹5Cr/yr',   'District',      10, 8,  6, 10),
(2,'Football Coach',           'Coach teams at school, club, state or national level with AFC/AIFF cert.',    '₹2.5L – ₹1Cr/yr', 'State',         8,  7,  8, 5),
(2,'Sports Physiotherapist',   'Injury prevention and rehabilitation for football teams.',                     '₹4L – ₹25L/yr',   'State',         7,  8,  9, 5),
(2,'Football Scout',           'Identify talented players for clubs and academies.',                           '₹3L – ₹20L/yr',   'National',      8,  7,  7, 4),
(2,'Sports Manager',           'Handle player contracts, transfers and sponsorships.',                         '₹5L – ₹30L/yr',   'National',      6,  9,  8, 2);

-- Athletics
INSERT INTO careers (sport_id, title, description, avg_salary_inr, level_required, passion_score, income_score, stability_score, fitness_score) VALUES
(3,'Professional Athlete',     'Compete in national/international track & field events.',                      '₹2L – ₹3Cr/yr',   'District',      10, 7,  5, 10),
(3,'Athletics Coach',          'Train sprinters, long-distance runners and field event athletes.',             '₹2L – ₹20L/yr',   'State',         8,  6,  8, 6),
(3,'Physical Education Teacher','Teach PE in schools/colleges and coach athletics teams.',                    '₹2.5L – ₹8L/yr',  'District',      7,  5,  10, 5),
(3,'Sports Scientist',         'Apply biomechanics and sports nutrition to improve athletic performance.',     '₹4L – ₹20L/yr',   'National',      8,  8,  9, 5);

-- Badminton
INSERT INTO careers (sport_id, title, description, avg_salary_inr, level_required, passion_score, income_score, stability_score, fitness_score) VALUES
(4,'Professional Badminton Player','Compete in BWF, national championships and represent India.',             '₹3L – ₹8Cr/yr',   'District',      10, 9,  6, 9),
(4,'Badminton Coach',          'Coach players at club, state and national level with BAI certification.',     '₹2L – ₹30L/yr',   'State',         8,  7,  8, 5),
(4,'Sports Analyst',           'Analyse match data and opponent strategies for national teams.',              '₹3L – ₹15L/yr',   'National',      7,  8,  8, 4);

-- Tennis
INSERT INTO careers (sport_id, title, description, avg_salary_inr, level_required, passion_score, income_score, stability_score, fitness_score) VALUES
(5,'Professional Tennis Player','Compete in ITF, ATP/WTA events and represent India at Davis/Billie Jean King Cup.','₹2L – ₹50Cr/yr','District',   10, 10, 5, 9),
(5,'Tennis Coach',             'Train players from grassroots to professional level with AITA certification.','₹3L – ₹40L/yr',   'State',         8,  8,  8, 5),
(5,'Tennis Analyst',           'Analyse player performance with data tools for professional clubs.',           '₹4L – ₹15L/yr',   'National',      7,  8,  8, 4);

-- Swimming
INSERT INTO careers (sport_id, title, description, avg_salary_inr, level_required, passion_score, income_score, stability_score, fitness_score) VALUES
(6,'Professional Swimmer',     'Compete in national championships, Asian Games and aim for Olympics.',        '₹2L – ₹5Cr/yr',   'District',      10, 7,  5, 10),
(6,'Swimming Coach',           'Train swimmers at clubs, academies and national camps.',                      '₹2L – ₹20L/yr',   'State',         8,  6,  8, 5),
(6,'Lifeguard / Water Safety', 'Ensure safety at pools, beaches and water parks.',                           '₹1.5L – ₹6L/yr',  'District',      5,  4,  10, 7);

-- Basketball
INSERT INTO careers (sport_id, title, description, avg_salary_inr, level_required, passion_score, income_score, stability_score, fitness_score) VALUES
(7,'Professional Basketball Player','Play in NBA India programme, national leagues and 3x3 events.',          '₹2L – ₹10Cr/yr',  'District',      10, 8,  6, 10),
(7,'Basketball Coach',         'Coach at school, college, state and professional team levels.',               '₹2L – ₹25L/yr',   'State',         8,  7,  8, 5);

-- Kabaddi
INSERT INTO careers (sport_id, title, description, avg_salary_inr, level_required, passion_score, income_score, stability_score, fitness_score) VALUES
(8,'Professional Kabaddi Player','Play in Pro Kabaddi League (PKL) and represent India internationally.',    '₹5L – ₹3Cr/yr',   'District',      10, 9,  7, 10),
(8,'Kabaddi Coach',            'Coach at club, state and national level.',                                   '₹2L – ₹15L/yr',   'State',         8,  6,  8, 5);

-- ==============================================================
-- SKILLS
-- ==============================================================

-- Cricket
INSERT IGNORE INTO skills (sport_id, skill_name, skill_type, description) VALUES
(1,'Batting Technique',    'Technical', 'Grip, stance, footwork, shot selection and timing.'),
(1,'Bowling Technique',    'Technical', 'Pace, swing, spin variations and accurate line/length.'),
(1,'Fielding & Catching',  'Physical',  'Quick reflexes, throwing accuracy and agile ground fielding.'),
(1,'Mental Toughness',     'Mental',    'Focus under pressure, handling failure and match temperament.'),
(1,'Physical Fitness',     'Physical',  'Stamina, strength, flexibility and injury prevention.'),
(1,'Game Intelligence',    'Mental',    'Reading the game, understanding strategy and adapting to conditions.');

-- Football
INSERT INTO skills (sport_id, skill_name, skill_type, description) VALUES
(2,'Ball Control & Dribbling','Technical','Close control, dribbling past defenders in tight spaces.'),
(2,'Passing & Vision',     'Technical', 'Short/long passing accuracy and reading teammate positions.'),
(2,'Shooting & Finishing', 'Technical', 'Power, accuracy and composure in front of goal.'),
(2,'Speed & Endurance',    'Physical',  'Covering 10–12 km per match with repeated sprints.'),
(2,'Tactical Awareness',   'Mental',    'Understanding formations, pressing and positional discipline.'),
(2,'Heading',              'Physical',  'Winning aerial duels and directing headed efforts accurately.');

-- Athletics
INSERT INTO skills (sport_id, skill_name, skill_type, description) VALUES
(3,'Explosive Speed',      'Physical',  'Maximum sprint speed crucial for short-distance events.'),
(3,'Endurance & VO2 Max',  'Physical',  'Cardiovascular fitness for middle and long-distance events.'),
(3,'Running Form',         'Technical', 'Proper biomechanics: arm drive, foot strike, stride length.'),
(3,'Strength & Power',     'Physical',  'Core and leg strength for jumping and throwing disciplines.'),
(3,'Mental Discipline',    'Mental',    'Consistency in training, race strategy and pain tolerance.');

-- Badminton
INSERT INTO skills (sport_id, skill_name, skill_type, description) VALUES
(4,'Footwork',             'Technical', 'Fast, precise court coverage using split-step and recovery.'),
(4,'Smash & Drop Shots',   'Technical', 'Powerful offensive smashes and deceptive drop shots.'),
(4,'Net Play',             'Technical', 'Tight net shots and flick serves to control the net.'),
(4,'Reflexes & Agility',   'Physical',  'Reaction time to shuttle speeds exceeding 300 km/h.'),
(4,'Rally Consistency',    'Mental',    'Patient, error-free rallying and smart shot placement.');

-- Tennis
INSERT INTO skills (sport_id, skill_name, skill_type, description) VALUES
(5,'Serve & Return',       'Technical', 'Powerful, accurate serve and solid service return game.'),
(5,'Forehand & Backhand',  'Technical', 'Consistent topspin groundstrokes from both sides.'),
(5,'Volley & Net Play',    'Technical', 'Approach shots and finishing volleys at the net.'),
(5,'Mental Fortitude',     'Mental',    'Composure in tiebreaks, saving break points and momentum shifts.');

-- Swimming
INSERT INTO skills (sport_id, skill_name, skill_type, description) VALUES
(6,'Stroke Technique',     'Technical', 'Freestyle, breaststroke, backstroke and butterfly mechanics.'),
(6,'Breathing Rhythm',     'Technical', 'Efficient bilateral breathing and hypoxic training.'),
(6,'Turns & Starts',       'Technical', 'Explosive starts and fast flip/touch turns.'),
(6,'Endurance & Speed',    'Physical',  'Aerobic base for distance events, anaerobic power for sprints.');

-- Basketball
INSERT INTO skills (sport_id, skill_name, skill_type, description) VALUES
(7,'Dribbling & Ball Handling', 'Technical', 'Crossover, behind-the-back, and maintaining control under pressure.'),
(7,'Shooting Accuracy',    'Technical', 'Jump shots, layups, free throws, and three-pointers.'),
(7,'Defense & Rebounding', 'Physical',  'Boxing out, blocking, and man-to-man defense.'),
(7,'Court Vision',         'Mental',    'Read passing lanes and finding open teammates.');

-- Kabaddi
INSERT INTO skills (sport_id, skill_name, skill_type, description) VALUES
(8,'Raiding Strategies',   'Technical', 'Bonus line crossing, toe touch, and hand touch techniques.'),
(8,'Tackling (Defending)', 'Physical',  'Ankle hold, thigh hold, and chain tackles.'),
(8,'Breath Control (Cant)','Physical',  'Continuous chanting of ''Kabaddi'' while maintaining speed.'),
(8,'Agility & Reflexes',   'Physical',  'Dodging and escaping defenders in a fraction of a second.');

-- ==============================================================
-- TRAINING PATHS
-- ==============================================================

-- Cricket — District
INSERT IGNORE INTO training_paths (sport_id, career_level, step_number, step_title, step_description, duration_estimate) VALUES
(1,'District',1,'Join a Local Academy',  'Enrol in a BCCI-affiliated cricket academy. Learn fundamentals of batting, bowling and fielding.',                  '6–12 months'),
(1,'District',2,'School Tournaments',    'Represent your school in inter-school and district-level tournaments. Work on consistent performances.',              '1–2 years'),
(1,'District',3,'District Selection',    'Appear for district cricket association trials. Aim for U-16 or U-19 district team selection.',                        '1 year');

-- Cricket — State
INSERT IGNORE INTO training_paths (sport_id, career_level, step_number, step_title, step_description, duration_estimate) VALUES
(1,'State',1,'Domestic Age-group Cricket','Play in U-16 / U-19 BCCI zonal tournaments (Vijay Merchant, Cooch Behar Trophy).',                               '2–3 years'),
(1,'State',2,'State Ranji Trial',         'Attend Ranji Trophy trials. Consistent district performances get you noticed by state selectors.',                  '1 year'),
(1,'State',3,'State Team Selection',      'Get selected for Ranji Trophy state squad and perform consistently across seasons.',                                 'Ongoing');

-- Cricket — National
INSERT IGNORE INTO training_paths (sport_id, career_level, step_number, step_title, step_description, duration_estimate) VALUES
(1,'National',1,'Ranji Trophy Performance','Score consistently in Ranji Trophy and be listed in BCCI domestic performance rankings.',                          '2–4 years'),
(1,'National',2,'India A / Duleep Trophy', 'Earn call-up to India A tour or Duleep Trophy (four-day red-ball cricket)..',                                     '1–2 years'),
(1,'National',3,'National Team',           'National team selection by BCCI based on sustained domestic performances and fitness standards.',                  'Ongoing');

-- Football — District
INSERT IGNORE INTO training_paths (sport_id, career_level, step_number, step_title, step_description, duration_estimate) VALUES
(2,'District',1,'Grassroots Football',   'Join a local football club or SAI centre. Build ball control, passing and positional fundamentals.',                '1–2 years'),
(2,'District',2,'School & District Leagues','Represent school and district in AIFF grassroots tournaments.',                                                  '2–3 years'),
(2,'District',3,'AIFF Academy Trial',    'Attend trials for AIFF-affiliated state or regional academy for structured training.',                              '1 year');

-- Football — National
INSERT IGNORE INTO training_paths (sport_id, career_level, step_number, step_title, step_description, duration_estimate) VALUES
(2,'National',1,'I-League / ISL Club',   'Sign with an I-League or ISL club through trials or youth academies.',                                             '3–5 years'),
(2,'National',2,'India U-23 / Senior',   'Consistent club performances attract AIFF national camp invitations.',                                             '2–4 years'),
(2,'National',3,'Blue Tigers (Senior)',  'Full senior national team selection through sustained form and fitness.',                                          'Ongoing');

-- Athletics — District
INSERT IGNORE INTO training_paths (sport_id, career_level, step_number, step_title, step_description, duration_estimate) VALUES
(3,'District',1,'Identify Event & Join SAI','Identify your best event (sprint/distance/jump/throw). Join SAI centre or state NIS-certified coach.',          '6 months'),
(3,'District',2,'School Nationals',      'Participate in Khelo India School Games and state school athletics meets.',                                         '1–2 years'),
(3,'District',3,'District Athletics Trials','Compete in AFI district trials and Athletics Federation meet to earn state berth.',                            '1 year');

-- Athletics — International
INSERT IGNORE INTO training_paths (sport_id, career_level, step_number, step_title, step_description, duration_estimate) VALUES
(3,'International',1,'Senior Nationals', 'Consistently medal at AFI Senior National Athletics Championships.',                                               '2–3 years'),
(3,'International',2,'Asian & Commonwealth','Achieve qualif. standards for Asian Athletics Championships and Commonwealth Games.',                           '1–2 years'),
(3,'International',3,'World / Olympics',  'Hit World Athletics qualifying standards and gain selection for India at World Championships / Olympics.',         'Ongoing');

-- ==============================================================
-- DIET PLANS
-- ==============================================================

-- Cricket — Beginner
INSERT IGNORE INTO diet_plans (sport_id, fitness_level, meal_time, recommendation, calories_approx, notes) VALUES
(1,'Beginner','Breakfast',    '4 egg whites + 2 whole-grain rotis + 1 banana + 1 glass low-fat milk.',         450, 'Eat 30–45 min before morning training.'),
(1,'Beginner','Pre-workout',  'Small handful of mixed nuts + 1 fruit (apple or banana).',                       200, 'Have this 60 min before net practice.'),
(1,'Beginner','Lunch',        '2 cups brown rice / 3 rotis + dal + sabzi + curd + salad.',                     650, 'Main recovery meal after morning session.'),
(1,'Beginner','Post-workout', 'Whey protein shake OR 1 glass milk + 2 boiled eggs.',                           300, 'Consume within 30 min of finishing training.'),
(1,'Beginner','Dinner',       '2–3 rotis + lean chicken/paneer + sabzi + salad.',                              550, 'Keep dinner light; avoid heavy carbs after 9 PM.');

-- Cricket — Advanced
INSERT IGNORE INTO diet_plans (sport_id, fitness_level, meal_time, recommendation, calories_approx, notes) VALUES
(1,'Advanced','Breakfast',    'Oats + protein powder smoothie + 6 egg whites + whole-grain toast.',             600, 'High-protein start for intense training days.'),
(1,'Advanced','Pre-workout',  'Banana + peanut butter on rice cakes + black coffee (optional).',                350, 'Energy boost 45 min before intense drills.'),
(1,'Advanced','Lunch',        'Grilled chicken/fish 200g + brown rice + steamed veggies + dal.',                800, 'Protein-rich mid-day recovery meal.'),
(1,'Advanced','Post-workout', 'Whey isolate shake + fast carbs (rice cakes or fruit).',                        400, 'Critical 30-minute anabolic window — do not skip.'),
(1,'Advanced','Dinner',       'Grilled salmon/paneer + quinoa / sweet potato + greens salad.',                 650, 'Omega-3 rich dinner promotes overnight muscle repair.');

-- Football — Beginner
INSERT IGNORE INTO diet_plans (sport_id, fitness_level, meal_time, recommendation, calories_approx, notes) VALUES
(2,'Beginner','Breakfast',    'Porridge with milk + banana + 2 boiled eggs.',                                  400, 'Slow-release carbs for 90-minute match endurance.'),
(2,'Beginner','Pre-workout',  'Toast with peanut butter + 1 fruit.',                                           250, 'Light snack 1 hour before training.'),
(2,'Beginner','Lunch',        '3 rotis + chicken curry / rajma + salad + curd.',                               700, 'Replenish glycogen after morning sessions.'),
(2,'Beginner','Post-workout', 'Chocolate milk OR whey shake + banana.',                                        350, '3:1 carb-to-protein ratio ideal for football recovery.'),
(2,'Beginner','Dinner',       '2 rotis + grilled chicken/fish + stir-fried veggies.',                          550, 'Adequate protein for overnight muscle repair.');

-- Athletics — Intermediate
INSERT IGNORE INTO diet_plans (sport_id, fitness_level, meal_time, recommendation, calories_approx, notes) VALUES
(3,'Intermediate','Breakfast','Idli (4) + sambar + 1 glass milk + banana.',                                    500, 'South Indian option rich in carbs and probiotics.'),
(3,'Intermediate','Pre-workout','Dates (6–8) + 1 glass coconut water.',                                        200, 'Natural sugar spike 45 min before track session.'),
(3,'Intermediate','Lunch',    '3 cups cooked rice + chicken / lentils + buttermilk + vegetables.',             750, 'Heavy carb loading for distance runners.'),
(3,'Intermediate','Post-workout','Protein shake + baked sweet potato.',                                        400, 'Fast protein + complex carbs for sprint athletes.'),
(3,'Intermediate','Dinner',   'Grilled chicken (150g) + 2 rotis + sabzi + salad.',                            600, 'Moderate carbs; higher protein for muscle synthesis.');

-- Badminton — Intermediate
INSERT IGNORE INTO diet_plans (sport_id, fitness_level, meal_time, recommendation, calories_approx, notes) VALUES
(4,'Intermediate','Breakfast','Multigrain toast + scrambled eggs (3) + orange juice + almonds.',               450, 'Quick energy for early morning court sessions.'),
(4,'Intermediate','Pre-workout','Banana + 1 scoop carbohydrate drink.',                                        200, 'Maintain blood glucose for long rallying sessions.'),
(4,'Intermediate','Lunch',    'Brown rice + dal + paneer / chicken + cucumber salad.',                         700, 'Protein + carb balance for afternoon court training.'),
(4,'Intermediate','Post-workout','Curd (Greek yogurt) + granola + berries.',                                   350, 'Probiotics + protein help recovery after intense drills.'),
(4,'Intermediate','Dinner',   'Dal khichdi + grilled tofu/chicken + salad.',                                   550, 'Easy-to-digest protein for overnight recovery.');

-- Tennis — Intermediate
INSERT IGNORE INTO diet_plans (sport_id, fitness_level, meal_time, recommendation, calories_approx, notes) VALUES
(5,'Intermediate','Breakfast','Oatmeal + berries + 1 scoop protein powder.',                                   500, 'Long lasting energy for baseline rallies.'),
(5,'Intermediate','Lunch',    'Whole wheat pasta + grilled chicken + side salad.',                             750, 'Carb load for evening matches.'),
(5,'Intermediate','Dinner',   'Grilled fish/tofu + sweet potato + steamed broccoli.',                          600, 'Lean protein for rapid muscle recovery.');

-- Swimming — Intermediate
INSERT IGNORE INTO diet_plans (sport_id, fitness_level, meal_time, recommendation, calories_approx, notes) VALUES
(6,'Intermediate','Breakfast','Smoothie (milk, banana, oats, peanut butter).',                                 550, 'Liquid meals are easier before morning pool sessions.'),
(6,'Intermediate','Lunch',    '3 cups rice + fish/dal + veggies.',                                             800, 'High calories to offset massive energy burns in water.'),
(6,'Intermediate','Dinner',   '2 rotis + paneer bhurji + large salad.',                                        500, 'Light dinner to maintain low body fat for buoyancy.');

-- Basketball — Intermediate
INSERT IGNORE INTO diet_plans (sport_id, fitness_level, meal_time, recommendation, calories_approx, notes) VALUES
(7,'Intermediate','Breakfast','4 whole eggs + 2 slices whole wheat toast + 1 apple.',                          600, 'Solid breakfast for a heavy practice day.'),
(7,'Intermediate','Lunch',    'Chicken/Soya chunks + brown rice + baked beans.',                               800, 'High protein lunch for maintaining power.'),
(7,'Intermediate','Dinner',   'Large mixed salad + grilled meat/paneer.',                                      600, 'Low carb dinner off-season.');

-- Kabaddi — Advanced
INSERT IGNORE INTO diet_plans (sport_id, fitness_level, meal_time, recommendation, calories_approx, notes) VALUES
(8,'Advanced','Breakfast','Omelette (5 whites, 1 whole) + 2 multigrain rotis + milk.',                     650, 'Heavy start for intense contact sports.'),
(8,'Advanced','Pre-workout','Sweet potato + black coffee.',                                                    250, 'Clean carbs for explosive mat sessions.'),
(8,'Advanced','Lunch',    'Heavy dal + chicken curry (low oil) + 3 portions rice + curd.',                     900, 'Re-feed to maintain muscle mass against heavy opponents.'),
(8,'Advanced','Post-workout','Whey isolate + creatine + banana.',                                              400, 'Immediate repair for muscle tearing.'),
(8,'Advanced','Dinner',   'Grilled paneer/chicken + 2 rotis + greens.',                                        600, 'Rich in vitamins and minerals for tissue repair.');

-- ==============================================================
-- Verification
-- ==============================================================
SELECT 'Sports' AS entity, COUNT(*) AS total FROM sports
UNION ALL SELECT 'Careers', COUNT(*) FROM careers
UNION ALL SELECT 'Skills',  COUNT(*) FROM skills
UNION ALL SELECT 'Training Steps', COUNT(*) FROM training_paths
UNION ALL SELECT 'Diet Plans', COUNT(*) FROM diet_plans;
