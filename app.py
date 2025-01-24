from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

@app.route('/api/product', methods=['GET'])
def get_product_info():
    print("reached")
    product_name = request.args.get('name', '').strip()  
    print(product_name)
    if not product_name:
        return jsonify({"error": "Product name is required"}), 400

    url = f"https://world.openfoodfacts.org/cgi/search.pl?search_terms={product_name}&search_simple=1&action=process&json=1"
    response = requests.get(url)
    print(url)
    print(response)
    if response.status_code == 200:
        data = response.json()
        if data.get("products"):
            return jsonify({"products": data["products"]}), 200
        else:
            return jsonify({"error": "No products found for the given name"}), 404
    else:
        return jsonify({"error": f"Error fetching product data. Status code: {response.status_code}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
