import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
import time

def plot_nn(nearest_neighbor_distances):
    nearest_neighbor_distances_sorted = np.sort(nearest_neighbor_distances)
    plt.plot(range(1, len(nearest_neighbor_distances_sorted) + 1), nearest_neighbor_distances_sorted)
    plt.ylabel("k-NN distance")
    plt.xlabel("Sorted observations (4th NN)")
    plt.show()
    time.sleep(2)

def plot_heatmap(corr_matrix):
    # Set the size of the figure
    plt.figure(figsize=(10, 8))
    # Create the heatmap
    sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', fmt=".2f")
    # Add a title
    plt.title('Correlation Heatmap of Housing Variables')
    # Display the heatmap
    plt.show() 
    time.sleep(2)

def plot_predict_vs_actual(y_test, y_train_pred):
    # Scatter plot for actual values
    plt.scatter(y_test, y_train_pred, color='blue', label='Actual vs Predicted', alpha=0.6)

    # Plot a diagonal line representing perfect prediction
    max_value = max(max(y_test), max(y_train_pred))
    plt.plot([0, max_value], [0, max_value], color='red', linestyle='--', label='Ideal fit line')

    # Set labels and title
    plt.xlabel('Actual Values')
    plt.ylabel('Predicted Values')
    plt.title('Actual vs Predicted Housing Prices')
    plt.legend()
    plt.grid(True)

    # Show plot
    plt.show()

    