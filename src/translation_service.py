from flask import Flask, request, jsonify
from flask_cors import CORS
from vulavula import VulavulaClient
import os

app = Flask(__name__)
CORS(app)

client = VulavulaClient(os.getenv('VULAVULA_TOKEN'))

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    try:
        classification_data = {
            "examples": [
                {"intent": "greeting", "example": "Molo"},
                {"intent": "greeting", "example": "Unjani"},
                {"intent": "goodbye", "example": "Hamba kakuhle"},
                {"intent": "goodbye", "example": "Sala kakuhle"},
            ],
            "inputs": [data['text']]
        }
        
        result = client.classify(classification_data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000) 