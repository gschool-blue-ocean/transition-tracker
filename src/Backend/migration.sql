DROP TABLE IF EXISTS  cohorts, users, admins;

CREATE TABLE cohorts(
    cohort_id SERIAL PRIMARY KEY,
    cohort_name TEXT,
    start_date TEXT,
    end_date TEXT
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    first VARCHAR(50) NOT NULL,
    last VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(30) NOT NULL,
    branch VARCHAR(20),
    leave_start_date VARCHAR(20),
    ets_date VARCHAR(20),
    admin BOOLEAN NOT NULL,
    cohort_id INTEGER,
    foreign key(cohort_id) references cohorts(cohort_id)
);