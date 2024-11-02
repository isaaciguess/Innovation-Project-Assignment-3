from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel, Field
import joblib
import os
import pandas as pd

app = FastAPI()
# Add CORS middleware
app.add_middleware(
CORSMiddleware,
allow_origins=["http://localhost:3000"], # URL of React application
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

class PredictionInput(BaseModel):
# Field defines constraints for input validation
    num_bath: float = Field(..., description="Number of bathrooms")
    num_bed: float = Field(..., description="Number of bedrooms")
    num_parking: float = Field(..., description="Number of car spaces")
    property_size: float = Field(...,description="Property size(in sqm)")
    km_from_cbd: float = Field(..., description="Suburb Population")
    suburb_lng: float = Field(..., description="Suburb size(in sqkm)")


@app.get("/get_chart_data")
async def get_data():
    current_dir = os.getcwd()
    relative_path = os.path.join("src\\assets\\data", "filtered_file.csv")
    path = os.path.join(current_dir, relative_path)
    print(path)
    df = pd.read_csv(path)
    data =  df.to_dict(orient="list")

    updated_keys = {
        "num_bed": "Number of Bedrooms",
        "num_bath": "Number of Bathrooms",
        "property_size": "Property Size (sqm)",
        "km_from_cbd": "Distance from CBD (km)",
        "num_parks": "Number of Car Spaces",
        "suburb_lng": "Suburb Longitude",
        "suburb_lat": "Suburb Latitude",
        "suburb_population": "Suburb Population",
        "suburb_skm": "Suburb Size (sqkm)",
        "suburb_median_income": "Suburb Median Income",
        "price": "Price",
        "type": "Property Type" 
    }

    data = {updated_keys.get(k, k): v for k, v in data.items()}

    print(data)

    return data


@app.post("/run_model")
async def predict_price(input: PredictionInput):
        # Get the current working directory
    current_dir = os.getcwd()
    # Define the relative path to the joblib file
    relative_path = os.path.join("predictor\\backend\\model", "hgbr_model.joblib")
    # Create the full path
    path = os.path.join(current_dir, relative_path)
    
    model = joblib.load(path)
    # Call the machine learning model's predict function to get the price
    data = [[input.num_bed, input.num_bath, 
             input.property_size, input.km_from_cbd, 
             input.num_parking, input.suburb_lng]]   
    
    price = model.predict(data)[0]
    # Return the predicted price in a dictionary (JSON response)
    return {"predicted_price": round(price, 2)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
