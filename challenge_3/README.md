# Multistep Checkout Experience

My implementation of the Multistep Checkout Experience shall meet the following requirements:

* [X] Use express to serve static files and to route the POST endpoint
* [X] Client app consists of transpilered React JSX by Babel, no Webpack involved
* [X] Contains three forms for account, personal, and payment information
* [X] Upon checkout, the client will create and populate a FormData object and send it via Fetch
* [X] On Express, uses multer to parse the multipart FormData into a consumable Object 
* [X] Allows the user to checkout again without reloading the page
* [X] Uses a database to store checkout data, specifically MongoDB
