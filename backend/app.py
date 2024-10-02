from flask import Flask, request
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)

# Configure CORS to allow requests from 'http://localhost:5173'
CORS(app, resources={r"/predict": {"origins": "http://localhost:5173"}})

# Load pre-trained models
model = pickle.load(open('dtr.pkl', 'rb'))
scaler = pickle.load(open('preprocessor.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Convert incoming data into a DataFrame to match model input
    input_data = pd.DataFrame({
        'Year': [data['Year']],
        'average_rain_fall_mm_per_year': [data['average_rain_fall_mm_per_year']],
        'pesticides_tonnes': [data['pesticides_tonnes']],
        'avg_temp': [data['avg_temp']],
        'Area': [data['Area']],
        'Item': [data['Item']]
    })

    # Apply preprocessing
    processed_data = scaler.transform(input_data)

    # Perform prediction
    prediction = model.predict(processed_data)

    return {'prediction': float(prediction)}

if __name__ == '__main__':
    app.run(debug=True, port=5000)
