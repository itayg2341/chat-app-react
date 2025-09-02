import os

def check_chat_input():
  """
  Reads and prints the content of ChatInput.jsx.
  """
  file_path = "public/src/components/ChatInput.jsx"
  if os.path.exists(file_path):
    with open(file_path, 'r') as f:
      print(f.read())
  else:
    print(f"File not found: {file_path}")

if __name__ == "__main__":
  check_chat_input()
