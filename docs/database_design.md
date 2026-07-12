# Hospital Accreditation Database

## Users Table

Stores login information.

Columns:
- id
- username
- email
- password
- role
- created_at

## Documents Table

Stores uploaded policy documents.

Columns:
- id
- user_id
- file_name
- upload_date

## Reports Table

Stores compliance reports.

Columns:
- id
- document_id
- compliance_score
- status
- generated_at

## Recommendations Table

Stores AI recommendations.

Columns:
- id
- report_id
- recommendation
- priority

## Standards Table

Stores accreditation standards.

Columns:
- id
- standard_code
- standard_name
- requirement