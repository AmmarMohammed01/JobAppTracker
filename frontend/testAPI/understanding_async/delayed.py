"""
Localhost:8000/get-message
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import asyncio

app = FastAPI()

# Add the CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

@app.get("/api/starters/get-message")
async def read_root():
    print("Request received, waiting 5 seconds")
    await asyncio.sleep(5)
    return {"message": "Hello, sorry I am late!"}
