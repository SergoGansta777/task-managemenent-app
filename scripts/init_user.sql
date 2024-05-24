CREATE USER task_management_backend WITH PASSWORD 'test_backend';
CREATE DATABASE task_management;
GRANT ALL PRIVILEGES ON DATABASE task_management TO task_management_backend;
