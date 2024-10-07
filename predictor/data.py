# Importing the libraries
import numpy as np
import pandas as pd

# Importing Modules created for project
import visualisations as vis
import data_utilities as utils

#Set random seed for consistent testing
np.random.seed(69420)

def clean_dataset( dataset ):
    """ 
    Initial Cleaning, 
        - Convert date_sold to continuous numerical format "days_since_sale"
        - Remove any mssing values
        - Remove irrelevant house types "Vacant Land" and "Block of Units", 
    """
    print("Calculating days_since_sale and dropping date_sold")
    dataset = utils.transform_date_sold(dataset)
    dataset = utils.remove_missing_values(dataset)
    dataset = utils.remove_vacant_and_blocks(dataset)
    dataset = dataset.drop(['type'], axis=1)
    dataset = dataset.drop(['suburb'], axis=1)
    print("Removing places with 0 bedrooms as well as the types of Vacant Land and Block of Unit")

    return dataset

def remove_outliers(dataset):
    """ 
    Outlier Removal, 
        - Convert date_sold to continuous numerical format "days_since_sale"
        - Remove any mssing values
        - Remove irrelevant house types "Vacant Land" and "Block of Units", 
    """

    # standardize values for db scan
    irrelevant_features = []
    print("Standardising the dataset")
    db_scan_dataset = utils.standardize(dataset, irrelevant_features)

    # Perform nn classification 
    print("Performing nearest neighbour test")
    distances, nearest_neighbor_distances = utils.nn_classification(db_scan_dataset)

    # estimate elbow to find eps
    vis.plot_nn(nearest_neighbor_distances)
    eps = utils.get_nn_elbow(distances, nearest_neighbor_distances)

    # mark outliers, and remove them using db scan
    print("Running DBSCAN to detect and remove outliers")
    dataset = utils.db_scan(dataset, db_scan_dataset, eps)
    utils.save_cleaned_dataset(dataset)
    return dataset

def feature_selection(dataset):
    """
    Feature Selection
        - Create a correlation matrix of all the non categorical Features
        - Plot values to heatmap to easily view correlation matrix
    """
    # incompatible features:
    corr_matrix = utils.get_corr_matrix(dataset)
    vis.plot_heatmap(corr_matrix)

def standardize_dataset(dataset):
    
    """
    Standardise dataset,
        - Standardise all numeric values in the dataset, excluding the target variable price
        - Join the standardized dataset with the categorical features removed before standardisation
    """
    irrelevant_features = ['price']
    # Standardise dataset and rejoin categorical variables
    print("Standardising the dataset...")
    standardized_dataset = utils.standardize(dataset, irrelevant_features)
    standardized_df = utils.convert_to_df(standardized_dataset)
    irrelevant_dataset = dataset[irrelevant_features]
    dataset = utils.join_datasets(standardized_df, irrelevant_dataset)

    # Export the dataset to CSV
    dataset.to_csv('data/final_dataset.csv', index=False)
    print("final dataset successfully saved")
    return dataset



if __name__ == "__main__":
    """ Step 0: Load the dataset """
    dataset = pd.read_csv('data/domain_properties.csv')
    print(dataset)
    """ Step 1: initial cleaning """
    dataset = clean_dataset(dataset)
        
    """ Step 2: Outlier Removal """
    dataset = remove_outliers(dataset)

    """ Step 3: Feature Selection """
    feature_selection(dataset)

    """ Step 5: standardise dataset """
    dataset = standardize_dataset(dataset)

    dataset.to_csv('data/final_dataset.csv', index=False)



