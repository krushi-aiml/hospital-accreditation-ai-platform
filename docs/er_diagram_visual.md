+------------+
|   USERS    |
+------------+
| id         |
| username   |
| email      |
| password   |
| role       |
+------------+
      |
      | 1:N
      |
      v
+------------+
| DOCUMENTS  |
+------------+
| id         |
| user_id    |
| file_name  |
+------------+
      |
      | 1:1
      |
      v
+------------+
|  REPORTS   |
+------------+
| id         |
| document_id|
| score      |
| status     |
+------------+
      |
      | 1:N
      |
      v
+------------------+
| RECOMMENDATIONS  |
+------------------+
| id               |
| report_id        |
| recommendation   |
| priority         |
+------------------+

+------------+
| STANDARDS  |
+------------+
| id         |
| code       |
| name       |
| requirement|
+------------+