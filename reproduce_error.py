import requests
import os
from bson import ObjectId

# Create a dummy file to upload
with open("test.txt", "w") as f:
    f.write("This is a test file.")

# Define the API endpoint
url = "http://localhost:5000/api/messages/addmsg/"

# Generate valid ObjectIds
from_user = str(ObjectId())
to_user = str(ObjectId())

# Prepare the request data
data = {
    "from": from_user,
    "to": to_user,
    "message": "Test message",
}

files = {
    "file": ("test.txt", open("test.txt", "rb"), "text/plain")
}

# Send the request
response = requests.post(url, data=data, files=files)

# Check the response
if response.status_code == 200:
    print("File uploaded successfully!")
    print(response.json())
else:
    print(f"Error uploading file: {response.status_code}")
    print(response.text)

# Clean up the dummy file
os.remove("test.txt")
