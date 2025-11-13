import json
from datetime import datetime

# Load your JSON file
with open('fansided-articles.json', 'r') as f:
    data = json.load(f)

# Assume the date field is named "created_at"
for item in data:
    iso_date = item["date"]
    date_obj = datetime.fromisoformat(iso_date)
    item["date"] = date_obj.strftime("%b %d, %Y")

# Save new JSON with proper characters
with open('data_formatted.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
