-- Optional demo seed data for analytics visuals.
-- Safe to run once after supabase/setup.sql.

insert into public.quiz_results (
  session_id,
  attempt_number,
  taken_at,
  communication_score,
  appearance_score,
  social_score,
  performance_score,
  behavioural_score,
  dominant_type,
  raw_responses
)
values
  (
    'demo-session-001',
    1,
    now() - interval '20 days',
    3.90,
    2.80,
    3.10,
    4.20,
    3.40,
    'performance',
    '{"Q1":4,"Q2":3,"Q3":2,"Q4":5,"Q5":4}'::jsonb
  ),
  (
    'demo-session-001',
    2,
    now() - interval '5 days',
    3.20,
    2.40,
    2.90,
    3.50,
    3.00,
    'performance',
    '{"Q1":3,"Q2":2,"Q3":2,"Q4":4,"Q5":3}'::jsonb
  ),
  (
    'demo-session-002',
    1,
    now() - interval '14 days',
    4.10,
    3.90,
    3.00,
    3.60,
    3.20,
    'communication',
    '{"Q1":5,"Q2":4,"Q3":2,"Q4":4,"Q5":3}'::jsonb
  ),
  (
    'demo-session-003',
    1,
    now() - interval '10 days',
    2.60,
    4.20,
    3.80,
    3.30,
    3.90,
    'appearance',
    '{"Q1":3,"Q2":5,"Q3":2,"Q4":3,"Q5":4}'::jsonb
  ),
  (
    'demo-session-003',
    2,
    now() - interval '2 days',
    2.30,
    3.60,
    3.30,
    3.00,
    3.20,
    'appearance',
    '{"Q1":2,"Q2":4,"Q3":2,"Q4":3,"Q5":3}'::jsonb
  ),
  (
    'demo-session-004',
    1,
    now() - interval '8 days',
    3.10,
    2.90,
    4.30,
    3.50,
    3.60,
    'social',
    '{"Q1":3,"Q2":3,"Q3":1,"Q4":4,"Q5":3}'::jsonb
  ),
  (
    'demo-session-005',
    1,
    now() - interval '1 days',
    2.80,
    2.70,
    3.10,
    2.90,
    4.10,
    'behavioural',
    '{"Q1":2,"Q2":3,"Q3":3,"Q4":3,"Q5":5}'::jsonb
  )
on conflict (session_id, attempt_number) do nothing;
