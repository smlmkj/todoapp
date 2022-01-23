CREATE DATABASE todo;
USE todo;
CREATE TABLE task(
  id          BIGINT        AUTO_INCREMENT,
  title       VARCHAR(255)  NOT NULL,
  due         VARCHAR(255),
  p_scoer     BIGINT,
  duration    BIGINT,
  importance  INT,
  created_at  TIMESTAMP     DEFAULT current_timestamp,
  created_by  BIGINT        DEFAULT 0,
  updated_at  TIMESTAMP     DEFAULT current_timestamp,
  updated_by  BIGINT        DEFAULT 0,
  PRIMARY KEY(id)
);

CREATE TABLE goal(
  id         BIGINT         AUTO_INCREMENT,
  title      VARCHAR(255)   NOT NULL,
  priority   BIGINT,
  created_at TIMESTAMP      DEFAULT current_timestamp,
  created_by BIGINT         DEFAULT 0,
  updated_at TIMESTAMP      DEFAULT current_timestamp,
  updated_by BIGINT         DEFAULT 0,
  PRIMARY KEY(id)
);
CREATE TABLE milestone(
  id         BIGINT         AUTO_INCREMENT,
  title      VARCHAR(255)   NOT NULL,
  due        VARCHAR(255),
  created_at TIMESTAMP      DEFAULT current_timestamp,
  created_by BIGINT         DEFAULT 0,
  updated_at TIMESTAMP      DEFAULT current_timestamp,
  updated_by BIGINT         DEFAULT 0,
  PRIMARY KEY(id)
);
CREATE TABLE milestone_member(
  milestone_id         BIGINT         NOT NULL,
  task_id           BIGINT          NOT NULL,
  created_at TIMESTAMP      DEFAULT current_timestamp,
  created_by BIGINT         DEFAULT 0,
  updated_at TIMESTAMP      DEFAULT current_timestamp,
  updated_by BIGINT         DEFAULT 0,
  PRIMARY KEY(milestone_id, task_id)
);
CREATE TABLE goal_member(
  goal_id         BIGINT         NOT NULL,
  milestone_id           BIGINT          NOT NULL,
  created_at TIMESTAMP      DEFAULT current_timestamp,
  created_by BIGINT         DEFAULT 0,
  updated_at TIMESTAMP      DEFAULT current_timestamp,
  updated_by BIGINT         DEFAULT 0,
  PRIMARY KEY(goal_id, milestone_id)
);
