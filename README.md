# Busca Fatos - search API BETA

This is a simple script to be deployed on [deno](https://deno.com/).
It's a simple custom google search on specific sites - listed bellow.

## Try it out

- https://app.swaggerhub.com/apis/fcavalcantirj/busca-fatos-api/0.0.2

## Requirements

* nodejs
* [deno](https://deno.com/) account
* create a google search engine [here](https://programmablesearchengine.google.com/)

```bash
  Create two environment variables on deno;
  
  * SEARCH_ENGINE_ID = fetch from google console above
  * API_KEY = fetch from google console above
```

## Deploy

Easiest way is to install [deployctl](https://deno.com/deploy/docs/deployctl)
```bash
  deployctl deploy --project[DENO_PROJECT_NAME] --exclude=node_modules --prod index.js
```


## Sites searched

* www.justicaeleitoral.jus.br/
* www.boatos.org/
* www.g1.globo.com/fato-ou-fake/
* www.aosfatos.org/
* www.noticias.uol.com.br/confere/
* www.projetocomprova.com.br/
* www.e-farsas.com/
* www.afp.com/pt/
* www.politica.estadao.com.br/blogs/estadao-verifica/
* www.lupa.uol.com.br/


## Contributors

* [fcavalcantirj](https://github.com/fcavalcantirj)
* [brunomanoel](https://github.com/brunomanoel)

## Support

<a href="https://www.buymeacoffee.com/Buscafatos" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174" ></a>

## License

[MIT](https://choosealicense.com/licenses/mit/)