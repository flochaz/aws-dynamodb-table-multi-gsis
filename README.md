# create-cdk-stack
> Sensible, minimalistic CDK stack starter

# Features
**✓ Minimalistic** - Only contains one folder - `/src`  
**✓ .dotenv support** - Start using environment vars for config right away ([3. Store Config in the Environment](https://12factor.net/config))  

## Get it!
`$ npx startmeup github.com/uncloud-agency/create-cdk-stack . my-cdk-stack`

## Setup
1. Setup your local AWS credentials
2. Setup the `.env` file: `$ cp env.template .env` (and fill in the blanks)
3. Install `node_modules`: `$ yarn`

## Deploy
`yarn deploy`