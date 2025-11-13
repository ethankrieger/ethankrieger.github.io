import json

# List of JSON files to merge
files = ['data-dualshockers.json', 'data-fansided.json', 'data-pelican-debrief.json']

merged_data = []

# Read each file and append its data
for file_name in files:
    with open(file_name, 'r', encoding='utf-8') as f:
        data = json.load(f)
        # If data is a list, extend merged_data; if a dict, append as single element
        if isinstance(data, list):
            merged_data.extend(data)
        elif isinstance(data, dict):
            merged_data.append(data)

# Write merged data to a new file with your formatting
with open('cleaned-data.json', 'w', encoding='utf-8') as f:
    json.dump(merged_data, f, indent=2, ensure_ascii=False)

print("Merged JSON created as 'cleaned-data.json'")