<p align="center">
  <a href="https://example.com/">
    <img src="https://www.code-genius.dev/_next/image?url=%2Flogo%2Fcode-genius.svg&w=32&q=75" alt="Logo" width=72 height=72>
  </a>

  <h3 align="center">Codegenius</h3>

  <p align="center">
    This project aims to generate code suggestions to help the developer code faster and smarther.
    <br>
    <a href="https://github.com/lautapercuspain/open-ai-api/issues/new">Report bug</a>
    ·
    <a href="https://github.com/lautapercuspain/open-ai-api/issues/new">Request feature</a>
  </p>
</p>

## Table of contents

- [Quick start](#quick-start)
- [Status](#status)
- [Folder Structure](#folder-structure)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Contributing](#contributing)
- [Creators and contributors](#creators-and-contributors)
- [Thanks](#thanks)
- [Copyright and license](#copyright-and-license)


## Quick start

How to set up the project to run it locally.

- Go to [OpenAI](https://beta.openai.com/) and make an account if you don't have one yet.
- OpenAI will provide a [personal API key](https://beta.openai.com/account/api-keys); copy it and put it in a file called `.env` at the root level inside the project directory.
- On your local host, run `yarn` and after dependencies installation.
- Run the application in the command line and it will be available at `http://localhost:3000`.

```bash
yarn dev
```

## Status

- Codegenius is open source: anyone can contribute in order to help the project grow!
- The project is built on [Next.js](https://nextjs.org), using [Tailwind CSS](https://tailwindcss.com/) and [RSC](https://nextjs.org/docs/app/building-your-application/rendering/server-components).
- We are up and running on our [official website](https://www.code-genius.dev/), but still there's a lot of work to do in order to make Codegenius the best.
- Our community keeps expanding, with new devs contributing to the project everyday.
- If you are interested in partnerships and sponsors, please contact [@lautapercuspain](https://www.github.com/lautapercuspain).

## Folder structure

- We are using the [Next.js App directory](https://nextjs.org/docs/app) to provide a solid skeleton for our project.
- The aforementioned [RSC](https://nextjs.org/docs/app/building-your-application/rendering/server-components) is a key part of our website.
- [OpenAI API](https://openai.com/blog/openai-api) is a must, being the base of Codegenius since day one!
- Every one of our routes includes a page.tsx and client.tsx file

```Example of our repo's internal structure
OPEN-AI-API/
└── app/
    ├── code-chat/
    │   ├── client.tsx
    │   ├── error.tsx
    │   ├── layout.tx
    │   └── page.tsx
    └── dashboard/
        ├── client.tsx
        ├── error.tsx
        └── page.tsx
```

## Bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](https://reponame/blob/master/CONTRIBUTING.md) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/lautapercuspain/open-ai-api/issues/new).

## Contributing

Please read through our [contributing guidelines](https://reponame/blob/master/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

Moreover, all HTML, CSS and TSX files should conform to the [Code Guide](https://github.com/mdo/code-guide), maintained by [@lautapercuspain](https://www.github.com/lautapercuspain).

## Creators and contributors

**Creator**

- <https://www.github.com/lautapercuspain>

**Contributors**

- <https://www.github.com/roznerx>

## Thanks

Thanks for reading!

## Copyright and license

Codegenius and documentation copyright 2022-2024 the authors. Code released under the [MIT License](https://reponame/blob/master/LICENSE).

[Markdown template](https://github.com/Ismaestro/markdown-template/tree/master) provided by [@Ismaestro](https://www.github.com/Ismaestro).

Enjoy :metal:
