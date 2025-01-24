#all the data available in the api

import requests
import json

def inspect_api_response(product_name):
    # URL to search for products by name
    url = f"https://world.openfoodfacts.org/cgi/search.pl?search_terms={product_name}&search_simple=1&action=process&json=1"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data.get("products"):
            # Print all keys for the first product
            product = data["products"][0]
            print("Available fields in the API response:")
            for key in product.keys():
                print(f"- {key}")
        else:
            print("No products found.")
    else:
        print("Error retrieving data. Status code:", response.status_code)

# Example usage


def main():
    # Example product name (replace with the product name you want to search for)
    product_name = "Pizza express margherita"
    products = inspect_api_response(product_name)
    
    if products:
        # Fetch the first product from the search result and display info
        product = products[0]  # Modify as needed to select the correct product
        inspect_api_response(product_name)
    else:
        print("No products found for the given name.")

if __name__ == "__main__":
    main()

