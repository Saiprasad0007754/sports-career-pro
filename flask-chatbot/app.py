import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
# Enable CORS for React frontend running typically on port 3000
CORS(app)

# Configure Gemini
API_KEY = os.getenv("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY") # Replace or set in .env
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash")

SYSTEM_PROMPT = """You are SportPath AI, an expert sports career guidance assistant. 
You have deep knowledge about: all sports worldwide (cricket, football, athletics, 
badminton, tennis, swimming, basketball, hockey, boxing, kabaddi, and more), 
sports careers in India and internationally, training plans, diet and nutrition, 
sports rules and regulations, salary and earnings in Indian leagues (IPL, ISL, PBL, PKL), 
government sports opportunities (SAI, sports quota jobs - Railways, Army, Police), 
famous athletes and their career journeys, sports history, major tournaments, 
Olympics, Commonwealth Games, Asian Games, sports psychology, injury prevention, 
fitness metrics (BMI, VO2 max), coaching licenses, and career after playing. 
Always give detailed, accurate, helpful and encouraging responses. 
Format answers clearly using line breaks. Always answer in strict, clear English, even if the user asks a question in another language like Hindi or Hinglish."""

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        
        # We can construct the chat history or just send the completion with system instructions.
        response = model.generate_content([
            {"role": "user", "parts": [{"text": SYSTEM_PROMPT + "\n\nUser: " + user_message}]}
        ])
        
        reply = response.text
        return jsonify({"reply": reply, "isBot": True})
        
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return jsonify({"reply": "Sorry, I could not process your request right now. Error: " + str(e), "isBot": True}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
