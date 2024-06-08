<span>
    <a href="#" >
        <img alt="Node Version 20.10.0" src="https://img.shields.io/badge/Node-20.10.0-nodedotjs?logo=nodedotjs&logoColor=white"/>
    </a>
    <a href="#">
        <img alt="Swagger Documentation" src="https://img.shields.io/badge/Swagger-/docs-swagger?logo=swagger"/>
    </a>
    <a href="#" >
        <img alt="Yarn" src="https://img.shields.io/badge/Yarn-1.22-blue?logo=yarn&logoColor=white"/>
    </a>
    <a href="#" >
        <img alt="Docker" src="https://img.shields.io/badge/-Dockerized-blue?logo=docker&logoColor=white"/>
    </a>
        <a href="https://github.com/arg0WAK/joke-api/actions/workflows/publish-docker.yml">
        <img alt="Publish Docker Image" src="https://github.com/arg0WAK/joke-api/actions/workflows/publish-docker.yml/badge.svg?branch=main"/>
    </a>
</span>
<br/><br/>
# JokeAPI

A simple API that returns a random joke with multi languages. Free and Open Source Joke API, entirely self-hosted.

## API Reference

#### Get Categories List

```http
  GET /
```

#### Response

```json
{
    "title": "Welcome to the Joke API by arg0WAK",
    "description": "A simple API that returns a random joke",
    "endpoints": [
    {
        "url": "/:category",
        "method": "GET",
        "description": "Return jokes from /:category"
    }
    ]
}
```

#### Get Jokes from Category

```http
  GET /:category
```

#### Response

```json
{
"genres": {
    "political": [
        {
        "en": { "joke": "English joke about politics." },
        "tr": { "joke": "Türkçe politik şaka." },
        "es": { "joke": "Chiste político en español." },
        "pt": { "joke": "Piada política em português." },
        "fr": { "joke": "Blague politique en français." },
        "de": { "joke": "Politischer Witz auf Deutsch." },
        "ru": { "joke": "Политическая шутка на русском." }
        }
    ]
}
}
```

## Swagger Execution

```http
  GET /docs
```

| Parameter | Type      | Description                                                                                                        |
| :-------- | :-------- | :----------------------------------------------------------------------------------------------------------------- |
| `type`    | `string`  | Defined to retrieve any subtype from genre.                                                                        |
| `lang`    | `string`  | Defined to retrieve any language from subtypes.                                                                    |
| `random`  | `boolean` | Defined to receive an random joke from any subtype, subject to the **requirement** that a `lang` must be assigned. |

## Install and Run

Firstly clone repository on your local.

```bash
 $ git clone git@github.com:arg0WAK/joke-api.git
```

Install `Node 20.10.0` with Node Version Manager.

```bash
 $ nvm install 20.10.0
```

Install dependencies

```bash
$ yarn install
```

Make `.env` file.

```bash
$ echo "PORT=3000" > .env
```

Run it.

```bash
$ yarn start
```

## Run with Docker

You can also run the application with [docker](https://www.docker.com/)

```bash
$ docker-compose up -d --build
```

## Update

If you're using docker:

```bash
$ docker pull arg0wak/joke-api
```

## Supported Languages

| Language   | Available | Reviewed |
| ---------- | --------- | -------- |
| Turkish    | ✅        | ✅       |
| English    | ✅        | ✅       |
| Spanish    | ✅        | ❌       |
| Portuguese | ✅        | ❌       |
| French     | ✅        | ❌       |
| German     | ✅        | ❌       |
| Russian    | ✅        | ❌       |

## Roadmap

-   ⌛ API key integration.
-   ⌛ Extended Rate-Limit.
-   ⌛ Blacklist flags.
-   ⌛ New joke categories.
-   ⌛ New languages.
-   ⌛ Front-end development for joke suggestions.

_Enjoy it._
