
import csv
import json

with open('keto-limit-default-rtdb-export.json', 'r') as f:
    data = json.load(f)

with open('keto-limit-default-rtdb-export.csv', 'w') as f:
    writer = csv.writer(f, delimiter='|', quoting=csv.QUOTE_NONNUMERIC)
    writer.writerow(data[0].keys())  # field names
    for row in data:
        writer.writerow(row.values())
