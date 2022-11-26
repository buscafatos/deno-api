# Busca Fatos - /search API BETA

Este é um script BETA para ser deployado no [deno](https://deno.com/).
É uma simples pesquisa personalizada no Google em sites específicos - listados abaixo.

## Experimente

- https://app.swaggerhub.com/apis/fcavalcantirj/busca-fatos-api/0.0.3

## Requisitos

* nodejs
* crie uma conta no [deno](https://deno.com/)
* crie um 'programmablesearch' de pesquisa do google [aqui](https://programmablesearchengine.google.com/)

```bash
  Crie duas variáveis de ambiente no deno;
  
  * SEARCH_ENGINE_ID = buscar no console do Google acima
  * API_KEY = buscar no console do Google acima
```

## Deploy

A maneira mais fácil é instalar [deployctl](https://deno.com/deploy/docs/deployctl)
```bash
  deployctl deploy --project[NOME_DO_PROJETO_DENO] --exclude=node_modules --prod index.js
```


## Sites utilizados na busca

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


## Contribuidores

* [fcavalcantirj](https://github.com/fcavalcantirj)
* [brunomanoel](https://github.com/brunomanoel)

## Suporte

<a href="https://www.buymeacoffee.com/Buscafatos" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174" ></a>

## Licença

[MIT](https://choosealicense.com/licenses/mit/)