from fastapi import APIRouter
from sqlalchemy import text
from database.db import engine
from services.email_service import send_otp_email
import random
import bcrypt


router = APIRouter()


# ---------------- SEND SIGNUP OTP ----------------

@router.post("/send-signup-otp")
def send_signup_otp(data: dict):

    try:

        email = data["email"]

        otp = str(
            random.randint(
                100000,
                999999
            )
        )

        with engine.connect() as conn:

            conn.execute(
                text("""
                    INSERT INTO otp_verification
                    (
                        email,
                        otp
                    )
                    VALUES
                    (
                        :email,
                        :otp
                    )
                """),
                {
                    "email": email,
                    "otp": otp
                }
            )

            conn.commit()


        send_otp_email(
            email,
            otp
        )


        return {
            "message": "OTP sent successfully"
        }


    except Exception as e:

        print("SEND OTP ERROR:", e)

        return {
            "error": str(e)
        }



# ---------------- VERIFY SIGNUP OTP ----------------


@router.post("/verify-signup-otp")
def verify_signup_otp(data: dict):

    try:

        name = data["name"]
        email = data["email"]
        password = data["password"]
        otp = data["otp"]


        with engine.connect() as conn:


            result = conn.execute(
                text("""
                    SELECT otp
                    FROM otp_verification
                    WHERE email = :email
                    ORDER BY id DESC
                    LIMIT 1
                """),
                {
                    "email": email
                }
            )


            row = result.fetchone()


            if not row:

                return {
                    "message": "OTP not found"
                }


            database_otp = row[0]


            print("Entered OTP:", otp)
            print("Database OTP:", database_otp)



            if str(database_otp).strip() != str(otp).strip():

                return {
                    "message": "Invalid OTP"
                }



            hashed_password = bcrypt.hashpw(
                password.encode("utf-8"),
                bcrypt.gensalt()
            ).decode("utf-8")



            conn.execute(
                text("""
                    INSERT INTO users
                    (
                        name,
                        email,
                        password,
                        is_verified
                    )
                    VALUES
                    (
                        :name,
                        :email,
                        :password,
                        TRUE
                    )
                """),
                {
                    "name": name,
                    "email": email,
                    "password": hashed_password
                }
            )



            conn.execute(
                text("""
                    DELETE FROM otp_verification
                    WHERE email = :email
                """),
                {
                    "email": email
                }
            )


            conn.commit()



        return {
            "message": "Account created successfully"
        }



    except Exception as e:

        print("VERIFY OTP ERROR:", e)

        return {
            "error": str(e)
        }





# ---------------- LOGIN ----------------


@router.post("/login")
def login(data: dict):

    try:

        email = data["email"]
        password = data["password"]


        with engine.connect() as conn:


            result = conn.execute(
                text("""
                    SELECT password
                    FROM users
                    WHERE email = :email
                """),
                {
                    "email": email
                }
            )


            row = result.fetchone()



            if not row:

                return {
                    "message": "User not found"
                }



            saved_password = row[0]



            if not bcrypt.checkpw(
                password.encode("utf-8"),
                saved_password.encode("utf-8")
            ):


                return {
                    "message": "Invalid password"
                }




        return {
            "message": "Login successful"
        }



    except Exception as e:


        print("LOGIN ERROR:", e)

        return {
            "error": str(e)
        }






# ---------------- SEND FORGOT PASSWORD OTP ----------------


@router.post("/send-forgot-password-otp")
def send_forgot_password_otp(data: dict):

    try:

        email = data["email"]


        with engine.connect() as conn:


            result = conn.execute(
                text("""
                    SELECT id
                    FROM users
                    WHERE email = :email
                """),
                {
                    "email": email
                }
            )


            user = result.fetchone()



            if not user:

                return {
                    "message": "User not found"
                }




            otp = str(
                random.randint(
                    100000,
                    999999
                )
            )



            conn.execute(
                text("""
                    INSERT INTO otp_verification
                    (
                        email,
                        otp
                    )
                    VALUES
                    (
                        :email,
                        :otp
                    )
                """),
                {
                    "email": email,
                    "otp": otp
                }
            )



            conn.commit()



        send_otp_email(
            email,
            otp
        )



        return {
            "message": "OTP sent successfully"
        }



    except Exception as e:

        print("FORGOT OTP ERROR:", e)

        return {
            "error": str(e)
        }





# ---------------- RESET PASSWORD ----------------


@router.post("/reset-password")
def reset_password(data: dict):

    try:


        email = data["email"]
        otp = data["otp"]
        password = data["password"]



        with engine.connect() as conn:


            result = conn.execute(
                text("""
                    SELECT otp
                    FROM otp_verification
                    WHERE email = :email
                    ORDER BY id DESC
                    LIMIT 1
                """),
                {
                    "email": email
                }
            )



            row = result.fetchone()



            if not row:

                return {
                    "message": "OTP not found"
                }



            database_otp = row[0]



            if str(database_otp).strip() != str(otp).strip():

                return {
                    "message": "Invalid OTP"
                }




            hashed_password = bcrypt.hashpw(
                password.encode("utf-8"),
                bcrypt.gensalt()
            ).decode("utf-8")




            conn.execute(
                text("""
                    UPDATE users
                    SET password = :password
                    WHERE email = :email
                """),
                {
                    "password": hashed_password,
                    "email": email
                }
            )



            conn.execute(
                text("""
                    DELETE FROM otp_verification
                    WHERE email = :email
                """),
                {
                    "email": email
                }
            )



            conn.commit()



        return {
            "message": "Password reset successful"
        }



    except Exception as e:


        print("RESET PASSWORD ERROR:", e)

        return {
            "error": str(e)
        }