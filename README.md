# Personal Management System

## Overview

The Personal Management System is a comprehensive platform designed to help users organize their daily lives, improve productivity, and track health-related goals. This centralized system offers features for task management, goal tracking, personal health monitoring, expense tracking, news updates, and productivity enhancement.

## Target Users

This system is ideal for individuals seeking to:
- Manage daily tasks and long-term goals effectively
- Stay informed with the latest news
- Track personal health metrics
- Monitor expenses
- Enhance productivity by minimizing distractions

## Key Features

1. **News Feed**
   - Integration with external APIs to provide up-to-date news and information
   - Customizable news preferences

2. **Task List**
   - Create, organize, and prioritize tasks
   - Set deadlines for tasks
   - Receive notifications for upcoming or overdue tasks
   - Track task completion progress

3. **Personal Tracking**
   - Monitor daily water consumption
   - Track calorie intake
   - Log and categorize expenses
   - View tracking history and generate reports

4. **Productivity Mode**
   - Optional feature to minimize distractions
   - Customizable settings to block certain apps or websites during focused work periods

5. **Goal Tracking**
   - Set personal goals across various life areas
   - Monitor progress towards goals
   - Receive motivational reminders and milestone celebrations

## Technical Architecture

The Personal Management System follows a client-server architecture:

- **Frontend**: React.js
  - Handles user interface and interactions
  - Responsive design for multi-device support

- **Backend**: Django (Python)
  - Manages business logic
  - Handles API requests and responses
  - Integrates with external APIs for news feed and other services

- **Database**: PostgreSQL
  - Stores user data, tasks, goals, and tracking information

- **External APIs**:
  - News API for the news feed feature
  - (Potentially) Nutrition API for calorie tracking
  - (Potentially) Finance API for expense categorization

## Installation Instructions

### Prerequisites
- Python 3.8 or higher
- Node.js 14 or higher
- npm 6 or higher
- PostgreSQL 12 or higher

### Step 1: Clone the Repository
```
git clone https://github.com/yourusername/personal-management-system.git
cd personal-management-system
```
### Step 2: Set up the Backend

1. Create a Virtual Environment
```
python -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate
```

2. Install Dependencies
```
pip install -r requirements.txt
```

3. Set up PostgreSQL
- Install PostgreSQL if you haven't already (https://www.postgresql.org/download/)
- Create a new database for the project:
  ```
  psql -U postgres
  CREATE DATABASE personal_management_db;
  ```

4. Configure Database Settings
- In the project directory, locate the `settings.py` file
- Update the `DATABASES` configuration:
  ```python
  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.postgresql',
          'NAME': 'personal_management_db',
          'USER': 'your_postgres_username',
          'PASSWORD': 'your_postgres_password',
          'HOST': 'localhost',
          'PORT': '5432',
      }
  }
  ```
- Replace `your_postgres_username` and `your_postgres_password` with your actual PostgreSQL credentials.

5. Obtain and Configure API Keys

- For News API:

- Go to https://newsapi.org/
   - Sign up for an account if you don't have one
   - Once logged in, find your API key in your account dashboard

- For Quote API:

   - Visit https://api-ninjas.com/
   - Create an account if you don't have one
   - After logging in, locate your API key in your account settings


- In the project's root directory, create a file named .env 
- Add the following lines to the .env file:
```
NEWSAPI_API=your_newsapi_key_here
QUOTE_API=your_quote_api_key_here
```

6. Run Migrations
```
python manage.py makemigrations
python manage.py migrate
```
7. Create a Superuser (Optional)
```
python manage.py createsuperuser
```
8. Start the Backend Server
```
python manage.py runserver
```
### Step 3: Set up the Frontend

1. Install Dependencies
```
cd frontend
npm install
```

2. Start the Frontend Development Server
```
npm start
```

### Step 4: Access the Application
Open your web browser and navigate to `http://localhost:3000` to access the Personal Management System.

## Troubleshooting
- If you encounter any database connection issues, double-check your PostgreSQL installation and the database configuration in `settings.py`.
- For any dependency-related issues, ensure you're using compatible versions of Python and Node.js as specified in the prerequisites.
