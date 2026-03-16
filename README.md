# GanttManager

GanttManager is a React + Vite frontend with a PHP/MySQL backend. It supports JWT authentication (httpOnly cookies), project/task management, dependencies, resources, milestones, and PDF reporting.

## Quick Start

1. Create the database schema in MySQL using [data/schema.sql](data/schema.sql).
2. Add api/.config.json with your database + SMTP credentials (see design specification).
3. Install frontend dependencies:
	- npm install
4. Run the frontend:
	- npm run dev

The Vite dev server proxies `/api/*` to `http://localhost/ganttmanager/api`.

## Backend Notes

- Place PHPMailer under api/PHPMailer (PHPMailer/src/...).
- The API expects to be served from Laragon at http://localhost/ganttmanager/api.
- The JWT cookie name is gm_token.
