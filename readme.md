# Bigcommerce Base App (Node.js, Express, HBS)
A node module for authentication and use with the BigCommerce API
## Installation

To install the module using YARN:

```
yarn install
```
To host locally with NGROK:

```
ngrok http https://localhost:4000
```

## Setup

### Create the BigCommerce App at devtools.bigcommerce.com

Callback URLs:

{url}/auth

{url}/load

{url}/unistall

### Local Enviroment Settings

Copy the .env-sample to .env

Replace the Client_ID & Client_Secret from your newly created BigCommerce App by clicking "view Client ID". 

Set the Callback_URL to {url}/auth .

## Routes

Auth
Load
Uninstall
Index