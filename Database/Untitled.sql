CREATE USER janfrey WITH PASSWORD 'Jan1234';
ALTER ROLE janfrey SET client_encoding TO 'utf8';
ALTER ROLE janfrey SET default_transaction_isolation TO 'read committed';
ALTER ROLE janfrey SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE lead_management TO janfr;
