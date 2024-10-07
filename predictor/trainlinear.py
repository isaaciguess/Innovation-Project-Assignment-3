import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import data_utilities as utils
import visualisations as vis

import joblib
import os


def train_lr(X_train,X_test,y_train):
    # Train a simple linear regression model
    lr = LinearRegression()
    lr.fit(X_train, y_train)

    #save_model(lr, 'models/lr_model.joblib')
    # Make predictions
    y_train_pred = lr.predict(X_test)
    return y_train_pred

"""
def save_model(model, filepath):
    # Ensure the 'models' folder exists
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    # Save the model using joblib
    joblib.dump(model, filepath)
    print(f"Model saved at {filepath}")
"""

if __name__ == "__main__":
    final_dataset = pd.read_csv('data/final_dataset.csv')

    # Split the dataset %80 in train, %20 in test
    train_data, test_data = train_test_split(final_dataset, test_size=0.2)

    # Export the datasets to CSV files if needed 
    train_data.to_csv('data/train_data.csv', index=False)
    test_data.to_csv('data/test_data.csv', index=False)

    #load test and train data
    train_data = pd.read_csv('data/train_data.csv')
    test_data = pd.read_csv('data/test_data.csv')

        # target_variable is the variable we are trying to predict: 'price'
    target_variable = 'price'
    # List features we do not want to include 
    irrelevant_features = ['property_inflation_index','days_since_sale', 'cash_rate']
    # Select relevant features
    relevant_features = final_dataset.columns.difference(irrelevant_features + [target_variable])

    X_train, X_test, y_train, y_test = utils.split_x_y(train_data, test_data, relevant_features, target_variable)
    prediction = train_lr(X_train, X_test, y_train)

    # Train the model
    print("Linear Regression Evaluation")
    utils.evaluate_model(prediction, y_test)
    vis.plot_predict_vs_actual(y_test, prediction)