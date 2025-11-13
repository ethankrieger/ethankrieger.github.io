import json

# Load data from existing JSON file
with open('dualshockers.json', 'r') as f:
    data = json.load(f)

# Add website key to each dictionary in the list
for item in data:
    item["website"] = "DualShockers"

# Save the updated data to a new JSON file
with open('updated_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)


print("New JSON file created: updated_data.json")
