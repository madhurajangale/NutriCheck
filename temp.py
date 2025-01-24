import requests
import json

def search_product_by_name(product_name):
    # URL to search for products by name
    url = f"https://world.openfoodfacts.org/cgi/search.pl?search_terms={product_name}&search_simple=1&action=process&json=1"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data.get("products"):
            return data["products"]
        else:
            print("No products found.")
            return None
    else:
        print("Error searching for product data. Status code:", response.status_code)
        return None

def display_product_info(product):
    if not product:
        print("No product information available.")
        return

    # Display basic product information
    print(f"Product Name: {product.get('product_name', 'N/A')}")
    print(f"Brand: {product.get('brands', 'N/A')}")
    print(f"Quantity: {product.get('quantity', 'N/A')}")
    print(f"Serving Size: {product.get('serving_size', 'N/A')}")

    # Display Nutri-Score
    nutri_score = product.get("nutriscore_grade", "N/A")
    print(f"Nutri-Score: {nutri_score.upper()}")  # Nutri-Score is often a letter grade (e.g., A, B, C)

    # Display Eco-Score
    eco_score = product.get("ecoscore_grade", "N/A")
    print(f"Eco-Score: {eco_score.upper()}")  # Eco-Score is also typically a letter grade

    # Display environmental impact information
    print("\nEnvironmental Impact:")
    if "environment_impact_level_tags" in product:
        impact_levels = product["environment_impact_level_tags"]
        for level in impact_levels:
            print(f"- {level.replace('en:', '').capitalize()}")
    else:
        print("No environmental impact information available.")

    # Display additional environmental metrics if available
    # carbon_footprint = nutrients.get("carbon-footprint_100g", "N/A")
    # print(f"- Carbon Footprint: {carbon_footprint} g per 100g")

    # water_footprint = nutrients.get("water-footprint_100g", "N/A")
    # print(f"- Water Footprint: {water_footprint} L per 100g")

    # Display ingredients
    print("\nIngredients:")
    print(product.get("ingredients_text_en", "No ingredients information available."))

    

    # Display nutrition facts
    print("\nNutrition Facts:")
    nutrients = product.get("nutriments", {})
    print(f"- Energy: {nutrients.get('energy-kcal_100g', 'N/A')} kcal per 100g")
    print(f"- Carbohydrates: {nutrients.get('carbohydrates_100g', 'N/A')} g per 100g")
    print(f"- Fat: {nutrients.get('fat_100g', 'N/A')} g per 100g")
    print(f"- Saturated Fat: {nutrients.get('saturated-fat_100g', 'N/A')} g per 100g")
    print(f"- Protein: {nutrients.get('proteins_100g', 'N/A')} g per 100g")
    print(f"- Sugars: {nutrients.get('sugars_100g', 'N/A')} g per 100g")
    print(f"- Fiber: {nutrients.get('fiber_100g', 'N/A')} g per 100g")
    print(f"- Salt: {nutrients.get('salt_100g', 'N/A')} g per 100g")

    # Check for "low" nutritional values (Example: low fat, low sugar)
    check_low_nutrients(nutrients)

    # Display image URLs
    print("\nImages:")
    front_image = product.get("image_url")
    if front_image:
        print(f"- Front Image: {front_image}")
    else:
        print("No images available.")

def check_low_nutrients(nutrients):
    """ Check and display if the product has low nutritional values """
    low_fat_threshold = 3  # grams per 100g
    low_sugar_threshold = 5  # grams per 100g
    low_salt_threshold = 0.5  # grams per 100g

    fat = nutrients.get("fat_100g", 0)
    sugar = nutrients.get("sugars_100g", 0)
    salt = nutrients.get("salt_100g", 0)

    if isinstance(fat, (int, float)) and fat <= low_fat_threshold:
        print("\n- This product has low fat content (<= 3g per 100g).")
    if isinstance(sugar, (int, float)) and sugar <= low_sugar_threshold:
        print("- This product has low sugar content (<= 5g per 100g).")
    if isinstance(salt, (int, float)) and salt <= low_salt_threshold:
        print("- This product has low salt content (<= 0.5g per 100g).")

def main():
    # Example product name (replace with the product name you want to search for)
    product_name = "Pizza express margherita"
    products = search_product_by_name(product_name)
    
    if products:
        # Fetch the first product from the search result and display info
        product = products[0]  # Modify as needed to select the correct product
        display_product_info(product)
    else:
        print("No products found for the given name.")

if __name__ == "__main__":
    main()
