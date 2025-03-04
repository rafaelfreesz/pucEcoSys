import requests
import shutil

category = 'technology'
width = 600
height = 640
api_url = f'https://api.api-ninjas.com/v1/randomimage?category={category}&height={height}'
for i in range(1,652):
    print(i)
    response = requests.get(api_url, headers={'X-Api-Key': '8E27FAjKmjzgZ1cub7fR6Q==lthFs7wtkwlhdcW0', 'Accept': 'image/jpg'}, stream=True)
    if response.status_code == requests.codes.ok:
        with open(f'output/imgs/img-prod-{i}.jpg', 'wb') as out_file:
            shutil.copyfileobj(response.raw, out_file)
    else:
        print("Error:", response.status_code, response.text)