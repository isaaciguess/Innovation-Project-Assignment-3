import matplotlib.pyplot as plt  # Import matplotlib for plotting
import seaborn as sns  # Import seaborn for visualization
from data import dataset  # Import the dataset from data.py

# Exclude 'price' from features
feature_columns = dataset.columns.drop(['price','suburb'])
irrelevant_categorical_features = ['suburb']

# Identify numerical and categorical columns
numerical_columns = dataset[feature_columns].select_dtypes(include=['int64', 'float64']).columns
categorical_columns = dataset[feature_columns].select_dtypes(include=['object', 'category']).columns

# Plot numerical variables
for col in numerical_columns:
    plt.figure(figsize=(8, 6))
    sns.scatterplot(data=dataset, x=col, y='price', alpha=0.5)
    plt.title(f'Price vs {col}')
    plt.xlabel(col)
    plt.ylabel('Price')
    plt.show()

# Plot categorical variables
for col in categorical_columns:
    plt.figure(figsize=(12, 6))
    sns.boxplot(data=dataset, x=col, y='price')
    plt.title(f'Price vs {col}')
    plt.xlabel(col)
    plt.ylabel('Price')
    plt.xticks(rotation=45)
    plt.show()
