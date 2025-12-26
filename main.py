"""
https://blog.postman.com/how-to-build-an-api-in-python/
Localhost:8000/get-message
"""
from typing import Annotated
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from mysql.connector import pooling
from dotenv import load_dotenv
import os

from pydantic import BaseModel

from security import hash_password, verify_password

class UsernameChecker(BaseModel):
    username: str

class AccountInfo(BaseModel):
    username: str
    password: str

load_dotenv()

dbconfig = {
    "host": os.getenv('DB_HOST'),
    "user": os.getenv('DB_USER'),
    "password": os.getenv('DB_PASSWORD'),
    "database": os.getenv('DB_NAME'),

}

pool = pooling.MySQLConnectionPool(pool_name="mypool", pool_size=5, **dbconfig)

app = FastAPI()

# Add the CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

'''
@app.get("/get-message")
async def read_root():
    return {"Message": "Congrats! This is your first FastAPI!"}
'''

@app.get("/get-message")
async def read_root():
    return {"Message": "Congrats! This is your first FastAPI!"}


@app.get("/api/account/create")
async def accountcreate():
    return {}


@app.post("/api/account/username-availability")
async def accountCheckUsernameAvailable(username: UsernameChecker):
    conn = pool.get_connection()
    cursor = conn.cursor(dictionary=True)

    sql = "SELECT 1 FROM POTENTIAL_EMPLOYEE WHERE PotEmpUsername=%s"
    print(username)

    cursor.execute(sql, (username.username,))
    result = cursor.fetchone()
    cursor.close()
    conn.close()

    print(result)

    return {
        "available": result is None
    }


@app.post("/api/account/create")
async def accountCreate(account: AccountInfo):
    account_created_success = False
    try:
        conn = pool.get_connection()
        cursor = conn.cursor(dictionary=True)

        # print(type(account.password))
        # print(len(account.password))
        hashed_password = hash_password(str(account.password))
        sql = "INSERT INTO POTENTIAL_EMPLOYEE (PotEmpUsername, PotEmpPassword) VALUES (%s, %s)"

        cursor.execute(sql, (account.username, hashed_password,))
        conn.commit() # MUST COMMIT TO SAVE CHANGES

        cursor.close()
        conn.close()

        account_created_success = True

    except Exception as e:
        e.add_note("Error Occured in Creating User")
        raise


    return {
        "account_created_success": account_created_success
    }

@app.post("/api/account/signin")
async def accountSignin(account: AccountInfo):
    signin_success = False
    try:
        conn = pool.get_connection()
        cursor = conn.cursor(dictionary=True)

        # hashed_password = hash_password(str(account.password))
        # print(hashed_password)
        # sql = "SELECT * FROM POTENTIAL_EMPLOYEE" # CASE 1
        sql = "SELECT * FROM POTENTIAL_EMPLOYEE WHERE PotEmpUsername=%s" # CASE 2
        # sql = "SELECT * FROM POTENTIAL_EMPLOYEE WHERE PotEmpUsername=%s AND PotEmpPassword=%s" # CASE 3

        # cursor.execute(sql) # CASE 1
        cursor.execute(sql, (account.username,)) # CASE 2
        # cursor.execute(sql, (account.username, hashed_password,)) # CASE 3

        result = cursor.fetchall()

        # print(result)
        # print(result[0].keys())
        # print(result[0]['PotEmpPassword'])
        is_verified = verify_password(account.password, result[0]['PotEmpPassword'])

        # signin_success = result is not None
        signin_success = is_verified

        cursor.close()
        conn.close()

        return {
            "signin_success": signin_success
        }

    except Exception as e:
        e.add_note("Error Occured When Signing In")
        raise
