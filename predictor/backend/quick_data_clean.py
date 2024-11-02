import pandas as pd
from sklearn.preprocessing import LabelEncoder
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel, Field
import joblib
import os
import pandas as pd


# Define the columns you want to keep
columns_to_keep = [
    "price", "num_bed", "num_bath", "property_size", "km_from_cbd", "num_parks", 
    "suburb_lng", "suburb_lat", "suburb_population", "suburb_skm", 
    "suburb_median_income", "type"
]

current_dir = os.getcwd()
relative_path = os.path.join("src\\assets\\data", "cleaned_dataset.csv")
path = os.path.join(current_dir, relative_path)

df = pd.read_csv(path)
# Filter DataFrame to keep only specified columns
df = df[[col for col in columns_to_keep if col in df.columns]]

# Label encode the 'property_type' column if it exists
if 'type' in df.columns:
    le = LabelEncoder()
    df['type'] = le.fit_transform(df['type'])
    
    # Print the mapping of numbers to property types
    print("Label encoding mapping for 'type':")
    for idx, class_label in enumerate(le.classes_):
        print(f"{idx}: {class_label}")

# Display the DataFrame to verify the changes
print(df.head())

# Optionally, save the modified DataFrame to a new CSV file
output_file_path = 'filtered_file.csv'
df.to_csv(output_file_path, index=False)