# CREATE TABLE users (
#     uuid CHAR(36) PRIMARY KEY DEFAULT (UUID()),   -- UUID (unique id)
#     name TEXT NOT NULL,                           -- Name (text)
#     email TEXT NOT NULL,                   		-- Email (text)
#     bio TEXT DEFAULT NULL,                   		-- Bio (text)
#     role TEXT DEFAULT NULL,                           -- Role (text)
#     location TEXT DEFAULT NULL,                   -- Email (text)
#     linkedin TEXT DEFAULT NULL,                   -- Email (text)
#     password TEXT NOT NULL,                       -- Password (text)
#     created DATETIME DEFAULT CURRENT_TIMESTAMP,   -- Created (default to now)
#     modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Modified (updated automatically)
#     deleted DATETIME,                             -- Deleted (nullable)
#     status INT DEFAULT 1                          -- Status (default to 1)
# )

# CREATE TABLE blogs (
#     uuid CHAR(36) PRIMARY KEY DEFAULT (UUID()),  
#     category TEXT NOT NULL,
#     title TEXT NOT NULL,
#     description TEXT NOT NULL,
#     cover_image TEXT NOT NULL,
#     author TEXT NOT NULL,
#     content LONGTEXT DEFAULT NULL,
#     created DATETIME DEFAULT CURRENT_TIMESTAMP,   
#     modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
#     deleted DATETIME,                            
#     status INT DEFAULT 1                          
# )

# CREATE TABLE categories (
#     uuid CHAR(36) PRIMARY KEY DEFAULT (UUID()),                    -- UUID (unique id)
#     title TEXT NOT NULL,
#     created DATETIME DEFAULT CURRENT_TIMESTAMP,   -- Created (default to now)
#     modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Modified (updated automatically)
#     deleted DATETIME,                             -- Deleted (nullable)
#     status INT DEFAULT 1                          -- Status (default to 1)
# )

# Testing tables 
# DROP TABLE users
# insert into users (name, role, email, password) values ("Eduardo", "creator", "eduardo@merivilla.co", "merivilla2025")

# select * from users 

# drop table blogs

# select * from users


TRUNCATE table blogs