import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import classification_report
import lightgbm as lgb
from sklearn.feature_selection import SelectKBest, f_classif
import numpy as np
import matplotlib.pyplot as plt

# Load the data
data = pd.read_csv('data/domain_properties.csv')

# Create price categories based on percentiles
low_threshold = data['price'].quantile(0.33)
high_threshold = data['price'].quantile(0.66)

# Set up the bins based on the calculated percentiles
bins = [0, low_threshold, high_threshold, float('inf')]
labels = ['low', 'medium', 'high']

# Create new price categories
data['price_category'] = pd.cut(data['price'], bins=bins, labels=labels)

# Select features for classification (matching the features used in main.py)
features = ['km_from_cbd', 'num_bath', 'num_bed', 'num_parking', 
            'property_size', 'suburb_elevation', 'suburb_lat', 
            'suburb_lng', 'suburb_median_income', 'suburb_population', 
            'suburb_sqkm']

X = data[features]
y = data['price_category']

# Encode the price categories into numerical labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# Feature selection: No need to reduce features since we're using all of them
selector = SelectKBest(f_classif, k='all')  # Use all input features
X_train_selected = selector.fit_transform(X_train, y_train)
X_test_selected = selector.transform(X_test)

# Scale the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train_selected)
X_test_scaled = scaler.transform(X_test_selected)

# Train the LightGBM model with the updated feature set
best_lgb_model = lgb.LGBMClassifier(random_state=42, n_estimators=300, learning_rate=0.05, max_depth=3, 
                                    num_leaves=31, subsample=0.8, lambda_l1=0.0, lambda_l2=0.0, min_child_weight=1)
best_lgb_model.fit(X_train_scaled, y_train)

# Save the trained model and preprocessing objects
joblib.dump(best_lgb_model, 'models/lgbm_model.joblib')
joblib.dump(scaler, 'models/scaler.joblib')
joblib.dump(label_encoder, 'models/label_encoder.joblib')
joblib.dump(selector, 'models/selector.joblib')

print("LightGBM model and preprocessing objects saved successfully.")

# Predict on the test set
y_pred_lgb = best_lgb_model.predict(X_test_scaled)

# Convert the predicted numerical labels back to the original categories for readability
y_pred_labels = label_encoder.inverse_transform(y_pred_lgb)
y_test_labels = label_encoder.inverse_transform(y_test)

# Print classification report
print(classification_report(y_test_labels, y_pred_labels))

# Extract feature importance from the trained LightGBM model
feature_importance = best_lgb_model.feature_importances_
feature_names = [features[i] for i in selector.get_support(indices=True)]

# Create a DataFrame to display feature names and their importance scores
feature_importance_df = pd.DataFrame({
    'Feature': feature_names,
    'Importance': feature_importance
}).sort_values(by='Importance', ascending=False)

# Display the feature importance
print(feature_importance_df)

# Plot the feature importance
plt.figure(figsize=(10, 6))
plt.barh(feature_importance_df['Feature'], feature_importance_df['Importance'], color='skyblue')
plt.xlabel('Importance Score')
plt.ylabel('Feature')
plt.title('Feature Importance in LightGBM Model')
plt.gca().invert_yaxis()  # Invert y-axis for better readability
plt.show()
