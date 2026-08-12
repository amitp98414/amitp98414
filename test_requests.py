import requests
import time

url = 'http://127.0.0.1:8001/health'
headers = {'X-API-Key': 'demo'}
for i in range(1,8):
    try:
        r = requests.get(url, headers=headers, timeout=5)
        print(f'Request {i}: {r.status_code}')
        print('Content-Security-Policy:', r.headers.get('Content-Security-Policy'))
        print('Strict-Transport-Security:', r.headers.get('Strict-Transport-Security'))
        print('X-Frame-Options:', r.headers.get('X-Frame-Options'))
    except Exception as e:
        print(f'Request {i}: error - {e}')
    time.sleep(1)
