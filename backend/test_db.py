print("Starting...")

from database.db import engine

print("Imported engine")

try:
    conn = engine.connect()
    print("Database Connected Successfully!")
    conn.close()
except Exception as e:
    print("Error:", e)

print("Finished")