# Execution guide

> Run and process:
````
1.	Open the Terminal o CMD

2.	In the current path of this README file, run the commands

3.	Run "npm start" for start the server and nodemon

4.	This will activate the server in the 4000 port
````

### REST request:
````
1.	Use Postman or another request progrmas

2.	Into a "post" request use the follow url and structure
````

> Crate, save and sent quote
````
- Into a "post" request use the follow URL: http://localhost:4000/api/send_quote and we need the json body to insert:

{
  "selected_services": [
    {
      "service": "",
      "area": "",
      "service_type": "",
      "service_sub_type": "",
      "description": "",
      "price_usd": "",
      "price_mxn": ""
    }
  ],
  "contact_name": "",
  "email": "",
  "phone": "",
  "company": "",
  "address": {
    "street": "",
    "city": "",
    "state": "",
    "country": "",
    "postalCode": ""
  },
  "prepared_date": "",
  "expiration_date": "",
  "contact": "",
  "preparer": "",
  "payment": "",
  "quoteID": 1,
  "subtotal": ,
  "sales_tax": 
}

- The result it's a single json with the ObjectId of the last document created, like this:

{
    status: 200,
    message: Message sent: Quote ID 1
}

````