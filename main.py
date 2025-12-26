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

class UsernameChecker(BaseModel):
    username: str

load_dotenv()

dbconfig = {
    "host": os.getenv('HOST'),
    "user": os.getenv('USER'),
    "password": os.getenv('PASSWORD'),
    "database": os.getenv('DATABASE'),

}

# pool = pooling.MySQLConnectionPool(pool_name="mypool", pool_size=5, **dbconfig)

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
# username : Annotated[str, Body()]
async def accountCheckUsernameAvailable(username: UsernameChecker):
    # conn = pool.get_connection()

    sql = "SELECT * FROM POTENTIAL_EMPLOYEE WHERE PotEmpUsername='%s'"
    print(username)
    condition = username

    # conn.execute(sql, condition)
    
    # result = conn.fetchall()

    '''
    for x in result:
        print(x)
    '''

    # conn.close()
    return {}
