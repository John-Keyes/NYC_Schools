import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_ROOT_PWD = os.getenv("DB_ROOT_PWD")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

mySql = mysql.connector.connect(
    host=DB_HOST,
    user=DB_USER,
    password=DB_ROOT_PWD,
    database=DB_NAME,
    port=DB_PORT
).cursor()