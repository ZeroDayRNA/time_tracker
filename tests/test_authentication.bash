# Should return encrypted password, username, and userid in json format.
curl -d "username=testname&password=testpass" -X POST http://localhost:8000/api/user/register/
# Should return access and refresh tokens in json format.
curl -d "username=testname&password=testpass" -X POST http://localhost:8000/api/token/