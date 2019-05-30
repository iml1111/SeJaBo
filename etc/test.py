import requests
import json
from pprint import pprint
#shin10256
token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTg4Njk2ODgsIm5iZiI6MTU1ODg2OTY4OCwianRpIjoiNWFmNDMwODktZjk5Yy00NmM4LTk4MjAtOWVkMmM2YmM3ZTllIiwiaWRlbnRpdHkiOiIxNjAxMTA4OSIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.kyIeJIZ6tyzyXXiWpVE4zkOup7XqBrt32XwbtzyGP1U"

header = {
	'Authorization':"Bearer " + token
}
#Debug Here
url = "http://localhost/mod_post"
data = {
#POST
"id":"16011089",
"pw":"!hkw10256",
"title":"qsc",
"content":"asdcasdwe",
"url":"asd"
}
######
#GET 방식
#html = requests.get(url, headers =header, data = data).content
#POST 방식
html = requests.post(url, headers =header, data = data).content
html = json.loads(html)
pprint(html)