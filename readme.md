# Bigcommerce for Node.js
A node module for authentication and use with the BigCommerce API
## Installation

To install the module using YARN:

```
yarn install
```
To host locally with NGROK:

```
ngrok https 4000
```

## Setup

### Create the BigCommerce App at devtools.bigcommerce.com

Callback URLs:

{url}/auth

{url}/load

{url}/unistall

### Local Enviroment Settings

Copy the .env-sample to .env

Replace the Client_ID & Client_Secret based on the App created from 

Set the Callback_URL to the ngrok url and append /auth

## Routes

Auth
Load
Uninstall
Index