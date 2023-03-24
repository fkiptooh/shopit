# ShopIT Backend
This backend is build with Mongo, Express and Node. The aim of backend basically is to expose the endpoints that we will be using or rather consuming in our frontend. Since I will building backend first, I will be using Postman API test client to check if my apis are working correctly until I set up the front end so as to consume the apis responsively/respectively.
### API screenshot demo.
I have a postman environmental setup to have all the backend apis for each functionality. Here below is a sample of a fetch products api. An essential api in any ecommerce, fetching all the products.

**Fetch all products**
 ![Fetch all products](https://github.com/fkiptooh/shopit/blob/main/backend/screenshots/backenAPI.png "Fetch products")

 ### Error handling using global error handling class
 This is a convenient way to handle errors that the apis may throw using a friendly method that javascript offers.

 **Error handling response in Production environment - A case where the user is not a developer**
 ![ProductionErr](https://github.com/fkiptooh/shopit/blob/main/backend/screenshots/Error%20in%20Production.png)

 **Error handling in development environment-Technically for debugging purposes**
 ![DevelopmentErr](https://github.com/fkiptooh/shopit/blob/main/backend/screenshots/Error%20in%20development.png)

 ### Catching Async Errors
 **Example screenshot for catching an async error when adding a new product without name property for instance**
 ![AsyncError](https://github.com/fkiptooh/shopit/blob/main/backend/screenshots/catching%20async%20error.png)