from sklearn.preprocessing import StandardScaler, OneHotEncoder
from datetime import datetime
from sklearn.neighbors import NearestNeighbors
from kneed import KneeLocator
from sklearn.cluster import DBSCAN
import numpy as np
import pandas as pd
from sklearn.metrics import mean_absolute_error
from sklearn.metrics import mean_absolute_percentage_error
from sklearn.metrics import root_mean_squared_error


def transform_date_sold( dataset ):
    #format into format pandas takes, and cast to pandas datatype
    dataset['date_sold'] = pd.to_datetime(dataset['date_sold'], format='%d/%m/%y')
    #load current date as pandas datatype
    current_date = pd.to_datetime(datetime.now().date())
    # Calculate 'days_since_sale' 
    dataset['days_since_sale'] = (current_date - dataset['date_sold']).dt.days
    # Drop 'date_sold'
    dataset = dataset.drop(columns=['date_sold'])
    return dataset

def remove_missing_values( dataset ):
    # Remove places with 0 bedrooms (Some have 0 bedrooms but have bathrooms)
    dataset = dataset[dataset.num_bed > 0]
    return dataset

def remove_vacant_and_blocks( dataset ):
    # Remove 'type == 'Vacant land' and 'Block of Units'
    types_to_remove = ['Vacant land', 'Block of Units']
    dataset = dataset[~dataset.type.isin(types_to_remove)]
    return dataset

def standardize(dataset, irrelevant_features):
    relevant_features = list(dataset.columns.difference(irrelevant_features))
    dataset_to_scale = dataset[relevant_features]
    # Standardise the data
    scaler = StandardScaler()
    standardised_dataset = scaler.fit_transform(dataset_to_scale)
    return standardised_dataset

def convert_to_df(dataset):
    data_frame = pd.DataFrame(dataset)
    return data_frame

def nn_classification(dataset):
    # Compute the nearest neighbor
    nn = NearestNeighbors(n_neighbors=15) 
    nn.fit(dataset)

    # Get the distance to nearest neighbor
    distances, indices = nn.kneighbors(dataset)
    nearest_neighbor_distances = distances[:, 1]  # Exclude self distances
    return [distances, nearest_neighbor_distances]

def get_nn_elbow(distances, nearest_neighbor_distances):
    kneedle = KneeLocator(x = range(1, len(distances)+1), y = nearest_neighbor_distances, S = 1.0, curve = "concave", direction = "increasing", online=True)
    eps = kneedle.knee_y
    print("Epsilon value is " + str(eps))
    return eps

def db_scan(dataset, db_scan_dataset, eps):
    # Compute DBSCAN
    dbscan = DBSCAN(eps, min_samples=15)  # Adjust hyperparameters as needed
    dbscan.fit(db_scan_dataset)
    dataset['dbscan_labels'] = dbscan.labels_
    # Remove outliers rows with dbscan_labels == -1
    return dataset[dataset['dbscan_labels'] != -1].drop('dbscan_labels', axis=1)

def save_cleaned_dataset( cleaned_dataset ):
    print("Saving cleaned dataset..")
    # Display the shape of the cleaned dataset and optionally save it to a file
    print(cleaned_dataset.shape)
    cleaned_dataset.to_csv('data/cleaned_dataset.csv', index=False)
    print("Dataset save successful")

def get_corr_matrix(dataset):
    print("Determining heatmap correlations")
    # Calculate correlation matrix
    return dataset.corr()

def join_datasets(dataset_1, dataset_2):
    return pd.concat([dataset_1, dataset_2.reset_index(drop=True)], axis=1)

def split_x_y(train_data, test_data, relevant_features, target_variable):
    X_train = train_data[relevant_features]
    y_train = train_data[target_variable]

    X_test = test_data[relevant_features]
    y_test = test_data[target_variable]
    return [X_train, X_test, y_train, y_test]

def evaluate_model(y_train_pred, y_test):
    #get MAPE (the MAE as a percentage)
    MAPE = mean_absolute_percentage_error(y_test, y_train_pred) * 100
    #get MAE
    MAE = mean_absolute_error(y_test, y_train_pred)

    RMSE = root_mean_squared_error(y_test, y_train_pred)

    #print metrics
    print(MAE.round(2))
    print(MAPE.round(2))
    print(RMSE.round(2))