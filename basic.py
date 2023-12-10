from openai import OpenAI
import os 

# key = os.environ.get("OPENAI_API_KEY")
# print(key)

client = OpenAI(
    base_url= "http://127.0.0.1:5678/v1",
api_key="zer"
  #apiKey = "zer"
  )
# defaults to getting the key using os.environ.get("OPENAI_API_KEY")
# if you saved the key under a different environment variable name, you can do something like:
# client = OpenAI(
#   api_key=os.environ.get("CUSTOM_ENV_NAME"),
# )

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  # messages=[
  #   {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
  #   {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
  # ]
    messages=[
    {"role": "system", "content": "Tu es un assistant poétique, habile à expliquer des concepts de programmation complexes avec un flair créatif."},
   # {"role": "user", "content": "Compose un poème qui explique le concept de récursivité en programmation."}
     {"role": "user", "content": "Compose un poème qui explique les trois concepts de navigation en React Native."}
  ]
)


print(completion.choices[0].message)


