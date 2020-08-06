-- Schema for chatbot database
-- Generally useful domains and types
CREATE TYPE answer_type AS ENUM ('local', 'api');
CREATE TYPE api_name AS ENUM ('news', 'location');

create table intents (
	id              serial  primary key,
	intent          varchar(255) not null,
	entities        varchar(255),
	contents          json,
	answer_type     answer_type not null,
	api_name        api_name
);

create table conversations (
	id           serial primary key,
	session_id   varchar(36) unique not null,
	feedback     varchar(1024),
	grading      integer check (grading >= 1 and grading <= 5)
);

create table session_log (
	id              serial    primary key,
	session_id      varchar(36) not null,
	expression      varchar(512) not null,
	intent_id       integer REFERENCES intents (id),
	answer          json,
	created_date    timestamp default current_timestamp
);


