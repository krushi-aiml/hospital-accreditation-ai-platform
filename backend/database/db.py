from sqlalchemy import create_engine

DATABASE_URL = "postgresql://postgres:password@localhost/hospital_accreditation"

engine = create_engine(DATABASE_URL)