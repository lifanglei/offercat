**User Register**
----
  User send username, password, captcha and email to register

* **URL**

  /accounts/api/register/

* **Method:**

  `POST`|`GET`

*  **URL Params**

   `None`

* **Data Params**

   **Required:**

   `username=[CharFied]`
   `password=[CharField]`
   `email=[EmailField]`
   `captcha_val=[CharFied]`
   `captcha_key=[CharFied]`

* **Success Response:**

  * **Code:** 201 CREATED [POST]
    **Content:** `{
    "username": "test",
    "email": "mashenjun@sina.cn",
    'registersuccess':True,
    "token":<token>
}`

  * **Code:** 200 OK [POST]
    **Content:** `{
      "captcha_key": <key>,
      "captcha_refresh": <url>,
      "audio_url": null,
      "captcha2x_url": <url>,
      "captcha_url": <url>"
  }`
 
* **Error Response:**

  * **Code:** 400 BADREQUEST
    **Content:** `{
                'username': 'test',
                'registersuccess':False,
                'errormessage': {...}
            }`

* **Sample Call:**

  `curl -X POST -H "Content-Type: application/json" -d '{"username":"test2","password":"test2","email":"mashenjun@sina.cn"}' http://localhost:8080/accounts/api/register/`
  `curl -X GET -H "Content-Type: application/json" http://localhost:8080/accounts/api/register/`

* **Notes:**

**User Login**
----
  User send username, password and captcha to login

* **URL**

  /accounts/api/login/

* **Method:**

  `POST`|`GET`

*  **URL Params**

   `None`

* **Data Params**

   **Required:**

   `username=[CharFied]`
   `password=[CharField]`
   `captcha_val=[CharFied]`
   `captcha_key=[CharFied]`

* **Success Response:**

  * **Code:** 200 OK [POST]
    **Content:** `{
    "username": "test",
    "email": "mashenjun@sina.cn",
    'loginsuccess': True,
    "token":<token>
  }`

  * **Code:** 200 OK [POST]
    **Content:** `{
      "captcha_key": <key>,
      "captcha_refresh": <url>,
      "audio_url": null,
      "captcha2x_url": <url>,
      "captcha_url": <url>"
  }`

* **Error Response:**

  * **Code:** 400 BADREQUEST
    **Content:** `{
                'username': 'test',
                'loginsuccess': False,
                'errormessage': {...}
            }`

* **Sample Call:**

  `curl -X POST -H "Content-Type: application/json" -d '{"username":"test2","password":"test2","captcha_val":"ACBD","captcha_key":<key>}' http://localhost:8080/accounts/api/login/`
  `curl -X GET -H "Content-Type: application/json"  http://localhost:8080/accounts/api/login/`

* **Notes:**
