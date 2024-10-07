import joblib
import numpy as np
import pandas as pd
from datetime import datetime

def load_model(model_path):
    """Load a saved model."""
    return joblib.load(model_path)

def preprocess_input(user_input, model_type):
    """Preprocess the user input for prediction based on the model type."""
    
    # Convert user input to a DataFrame
    df_input = pd.DataFrame([user_input], columns=['km_from_cbd', 'num_bath', 'num_bed', 'num_parking', 
                                                   'property_size','suburb_elevation', 'suburb_lat', 
                                                   'suburb_lng', 'suburb_median_income'
                                                   ,'suburb_population', 'suburb_sqkm'])
    
    if model_type == "lgbm":
        # Load preprocessing tools
        scaler = load_model('models/scaler.joblib')
        selector = load_model('models/selector.joblib')

        # Feature selection
        X_selected = selector.transform(df_input)

        # Scale the features
        X_scaled = scaler.transform(X_selected)
        
        return X_scaled
    else:
        # For other models (like HGBR or LR) with no special encoding
        X_final = df_input
        return X_final

def make_predictions(model, X):
    """Make predictions using the loaded model."""
    return model.predict(X)

def get_user_input(model_type):
    if model_type in ["hgbr", "lr", "lgbm"]:
        num_bath = float(input("Number of bathrooms: "))
        num_bed = float(input("Number of bedrooms: "))
        num_parking = float(input("Number of parking spaces: "))
        property_size = float(input("Property size (in square meters): "))
        suburb_population = input("Suburb Population: ")
        suburb_sqkm = float(input("Suburb Size (in sqkm): "))
        suburb_median_income = float(input("Suburb median income: "))
        km_from_cbd = float(input("Distance from CBD (in km): "))
        suburb_lat = float(input("Suburb Latitude: "))
        suburb_lng = float(input("Suburb Longitude: "))
        suburb_elevation = float(input("Suburb Elevation: "))

        user_input = [
            km_from_cbd, num_bath, num_bed, num_parking, property_size,
            suburb_elevation, suburb_lat, suburb_lng, suburb_median_income,
            suburb_population, suburb_sqkm
        ]
    else:
        print(f"{model_type} not supported")
        user_input = None

    return user_input

def demonstrate_prediction():
    """Demonstration of model prediction with user input."""
    model_type = input("Model Type (lr, hgbr, or lgbm): ")
    
    # Load the models
    hgbr_model = load_model('models/hgbr_model.joblib')
    lr_model = load_model("models/lr_model.joblib")
    lgbm_model = load_model("models/lgbm_model.joblib")  # Load LightGBM model
    label_encoder = load_model("models/label_encoder.joblib")  # Load LabelEncoder for converting predictions
    
    # Get user input
    user_input = get_user_input(model_type)

    if user_input is not None:
        # Preprocess the input
        processed_input = preprocess_input(user_input, model_type)

        # Perform prediction based on the model type
        if model_type == "hgbr":
            prediction = make_predictions(hgbr_model, processed_input)
            prediction_labels = prediction  # For HGBR, keep numerical prediction
        elif model_type == "lr":
            prediction = make_predictions(lr_model, processed_input)
            prediction_labels = prediction  # For LR, keep numerical prediction
        elif model_type == "lgbm":
            prediction = make_predictions(lgbm_model, processed_input)
            # Convert prediction to categorical values using LabelEncoder for LightGBM
            prediction_labels = label_encoder.inverse_transform(prediction)
        else:
            prediction_labels = "NONE"

        # Display the predictions
        print("\nPredictions based on your input:")
        print("Prediction:", prediction_labels)
    else:
        print("No valid input received for the selected model.")


if __name__ == "__main__":
    demonstrate_prediction()
