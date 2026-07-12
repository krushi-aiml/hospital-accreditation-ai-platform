import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


EMAIL_ADDRESS = "krushi1013@gmail.com"

EMAIL_PASSWORD = "xyii wzcq gpev uedv"


def send_otp_email(
    receiver_email,
    otp
):

    subject = "AccredAI OTP Verification"

    body = f"""
Your OTP for AccredAI is:

{otp}

This OTP is valid for 10 minutes.
"""

    message = MIMEMultipart()

    message["From"] = EMAIL_ADDRESS
    message["To"] = receiver_email
    message["Subject"] = subject

    message.attach(
        MIMEText(body, "plain")
    )

    try:

        server = smtplib.SMTP(
            "smtp.gmail.com",
            587
        )

        server.starttls()

        server.login(
            EMAIL_ADDRESS,
            EMAIL_PASSWORD
        )

        server.send_message(message)

        server.quit()

        return True

    except Exception as e:

        print("EMAIL ERROR:", e)

        return False