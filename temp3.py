#all environment related factors

import requests
import json

def get_product_data(product_name):
   
    url = f"https://world.openfoodfacts.org/cgi/search.pl?search_terms={product_name}&search_simple=1&action=process&json=1"
    
    
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data.get("products"):
            product = data["products"][0]  
            return {
                "product_name": product.get("product_name"),
                "nutri_score": product.get("nutriscore_grade"),
                "eco_score": product.get("ecoscore_grade"),
                "eco_score_data": product.get("ecoscore_data"),
                "environment_tags": product.get("environment_impact_level_tags"),
                "carbon_footprint": product.get("carbon-footprint_100g"),
            }
        else:
            return "No products found for the given name."
    else:
        return f"Error: {response.status_code}"

def main():
    product_name = "Maggie Chicken noodles"  
    product_data = get_product_data(product_name)
    
    if isinstance(product_data, dict):
        
        print(json.dumps(product_data, indent=4))
    else:
        print(product_data)

if __name__ == "__main__":
    main()
