# blainerrichardson.cloud-api

## Getting Started

### Local Development
1. Install packages:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Create a .env file in root dir - example below:
```text
NODE_ENV=LOCAL
DATACENTER_ENV=ONPREM
PORT=3000
ALLOWED_ORIGINS=*
JWT_SECRET=jwtsecret123abc
COOKIE_SECRET=cookiesecret123abc
CRYPTOGRAPHY_KEY=cryptograpykey123abc
```

4. Open default browser and travel to [graphiql web ide](http://127.0.0.1:3000/graphiql)