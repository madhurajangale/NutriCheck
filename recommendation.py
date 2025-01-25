import requests
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

SEARCH_URL = "https://world.openfoodfacts.org/cgi/search.pl"

def fetch_product_details(product_name):
    """
    Fetch product details by its name.
    """
    try:
        response = requests.get(
            f"https://world.openfoodfacts.org/cgi/search.pl?search_terms={product_name}&search_simple=1&action=process&json=1"
        )
        if response.status_code == 200:
            data = response.json()
            if data.get("products"):
                return data["products"]
            else:
                print("Product not found.")
                return None
    except requests.RequestException as e:
        print(f"Error fetching product details: {e}")
        return None

def search_alternatives(category, allergens, min_nutri_score, max_carbon_footprint):
    """
    Search for alternatives in the same category, excluding allergens and
    sorting by nutri-score and carbon footprint.
    """
    params = {
        "action": "process",
        "tagtype_0": "categories",
        "tag_contains_0": "contains",
        "tag_0": category,
        "json": 1,
        "page_size": 50,
    }
    try:
        response = requests.get(SEARCH_URL, params=params)
        response.raise_for_status()
        products = response.json().get("products", [])
        
        alternatives = []
        for product in products:
            if category in product.get("categories_tags", []): 
                try:
                    nutri_score = product.get("nutriscore_score", 100)
                    carbon_footprint = product.get("ecoscore_data", {}).get("agribalyse", {}).get("co2_total", float("inf"))
                    product_allergens = product.get("allergens_tags", [])

                    if nutri_score >= min_nutri_score or carbon_footprint < max_carbon_footprint:
                            alternatives.append({
                                "product_name": product.get("product_name", "Unknown"),
                                "nutri_score": nutri_score,
                                "carbon_footprint": carbon_footprint,
                                "url": product.get("url", "Unknown"),
                            })
                except Exception as e:
                    print(f"Error processing product: {e}")
        
        alternatives.sort(key=lambda x: (-x["nutri_score"], x["carbon_footprint"]))
        return alternatives
    except requests.RequestException as e:
        print(f"Error fetching alternatives: {e}")
        return []

@app.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    """
    API endpoint that returns product recommendations based on a scanned product.
    """
    product_name = "cadbury shots"
    product = fetch_product_details(product_name)

    if product:
        product = product[0]
        categories = product.get("categories_tags", [None])
        category = categories[-2] if categories else None

        allergens = product.get("allergens_tags", [])
        nutri_score = product.get("nutriscore_score", 100)
        carbon_footprint = product.get("ecoscore_data", {}).get("agribalyse", {}).get("co2_total", float("inf"))

        if category:
            alternatives = search_alternatives(
                category=category,
                allergens=allergens,
                min_nutri_score=nutri_score,
                max_carbon_footprint=carbon_footprint,
            )
            print(alternatives)
            return jsonify(alternatives)  # Send recommendations as a JSON response
        else:
            return jsonify({"error": "Category information is missing for this product."})
    else:
        return jsonify({"error": "Failed to retrieve product details."})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
