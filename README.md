# Secret Match API

## API Endpoints

### 1. User management:
*  **POST - /users/register**
    * *requires*: name, email and password
    * *returns*: success message
*  **POST - /users/login**
    * *requires*: email and password
    * *returns*: JWT token
*  **POST - /users/message**
    * *requires*: authentication and message string
    * *returns*: success message

### 2. Join the Matching Event:
* **POST - /match/join**
    * *requires*: authentication 
    * *returns*: success message

### 3. Pairing System:
* **POST - /match/assign**
    * *requires*: authentication and admin access
    * *returns*: success message

### 4. Check Assigned Match:
* **GET - /match/view**
    * *requires*: authentication
    * *returns*: success message