#all the data available in the api
import requests
import json

def inspect_api_response(product_name):
    url = f"https://world.openfoodfacts.org/cgi/search.pl?search_terms={product_name}&search_simple=1&action=process&json=1"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data.get("products"):
            product = data["products"][0]
            print("Available fields in the API response:")
            for key in product.keys():
                print(f"- {key}")
        else:
            print("No products found.")
    else:
        print("Error retrieving data. Status code:", response.status_code)




def main():
    
    product_name = "Pizza express margherita"
    products = inspect_api_response(product_name)
    
    if products:
       
        product = products[0] 
        inspect_api_response(product_name)
    else:
        print("No products found for the given name.")

if __name__ == "__main__":
    main()

