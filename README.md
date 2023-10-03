# [Codegenius MVP](https://code-friend-mvp.vercel.app/)

This project generates code suggestions to help the developer code faster and smarther.

## Set up the project to run it locally

After cloning the repo, go to [OpenAI](https://beta.openai.com/account/api-keys) to make an account and put your API key in a file called `.env` at the root level inside the project directory. On your local host, run `yarn` and after dependencies installation..

Then, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
yarn dev
```

### Environment Variables

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=uJ8hpI13bgK8z7XviBWh3fNUluWxJEtbkpqR2RUgbuI=

Create a new project in Google Console: https://console.cloud.google.com/ and then configure the API & Services to generate a GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET, so you are able to work with authenticated users.

Ask credentials for the Harper DB.
