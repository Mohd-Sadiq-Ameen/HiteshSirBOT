import google.generativeai as genai
from dotenv import load_dotenv
import os
import sys

load_dotenv()
# 1. Set up your Gemini API key securely (use env var in production)
genai.configure(api_key= os.environ['GEMINI_API_KEY'] )  # <-- Replace with your API key

# 2. Read tweets from the file
with open("tweets.txt", "r", encoding="utf-8") as file:
    tweets = file.read()

# 3. Create the Gemini model
model = genai.GenerativeModel('models/gemini-1.5-flash')

# 4. Start the chat with system instruction
chat = model.start_chat(history=[
    {
        "role": "user",
        "parts": [f"Behave like the person who wrote these tweets:\n\n{tweets}"]
    }
])

# 5. Get the question passed from Node.js (or prompt interactively)
if len(sys.argv) > 1:
    question = sys.argv[1]
else:
    question = input("Ask something: ")

# 6. Send the message and get the response
response = chat.send_message(question)

# 7. Print the reply (Node.js will capture this)
print(response.text)