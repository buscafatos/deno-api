/**
 * V1 BETA
 * this version has no 'intelligence'
 * and it searches google ONLY on the following sites;
 *  
 * www.justicaeleitoral.jus.br/*
 * www.boatos.org/*
 * g1.globo.com/fato-ou-fake/*
 * www.aosfatos.org/*
 * noticias.uol.com.br/confere/*
 * *.projetocomprova.com.br/*
 * www.e-farsas.com/*
 * www.afp.com/pt/*
 * politica.estadao.com.br/blogs/estadao-verifica/*
 * lupa.uol.com.br/*
 * 
 * What id does? Return raw answer (JSON) from google custom client search api
 * via REST.
 * 
 * */
import { Application, Router, isHttpError } from "https://deno.land/x/oak/mod.ts";
import url from  "https://esm.sh/url";
import { transform } from "https://esm.sh/node-json-transform";

const SEARCH_ENGINE_ID = Deno.env.get("SEARCH_ENGINE_ID");
const API_KEY = Deno.env.get("API_KEY");


let baseMap = {
  item: {
    totalResults: "queries.request.0.totalResults",
    searchTerms: "queries.request.0.searchTerms",
    count: "queries.request.0.count",
    startIndex: "queries.request.0.startIndex",
    items: "items"
  },
  operate: [
    {
      run: function(ary) { 
        return transform(ary, nestedMap);
      }, 
      on: "items"
    }
  ]
};

let nestedMap = {
  "item" : {
    "title": "title",
    "source": "displayLink",
    "htmlTitle": "htmlTitle",
    "link": "link",
    "snippet": "snippet",
    "htmlSnippet": "htmlSnippet",
    "thumbnail": "pagemap.cse_thumbnail.0.src"
  }
};


async function asyncHandler(requestUrl, query) {

	   console.log('searchTerm = [%s] --- requestUrl = [%s]', query, requestUrl);

    const queryObject = url.parse(requestUrl.toString(), true).query;

    // console.log('last search term [%s]', query);

    // https://developers.google.com/custom-search/v1/overview
    // https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list#request

    let _url = new URL('https://www.googleapis.com/customsearch/v1/siterestrict');
    _url.searchParams.set('num', '10');
    _url.searchParams.set('safe', 'active');
    _url.searchParams.set('q', query);
    _url.searchParams.set('key', API_KEY);
    _url.searchParams.set('cx', SEARCH_ENGINE_ID);
    

      // pagination
      if (queryObject.st) {
        let start = parseInt(queryObject.st);
        if (Number.isInteger(start))
        _url.searchParams.set('start', start);
      }

      // count
      if (queryObject.count) {
        let count = parseInt(queryObject.count);
        if (Number.isInteger(count))
        _url.searchParams.set('num', count);
      }

      // sort
      if (queryObject.sort) {
        _url.searchParams.set('sort', queryObject.sort);
      }      


      const resp = await fetch(_url, {
        headers: {
          accept: "application/json",
        },
      });

      // raw json from google
      if (queryObject.raw && '1' == queryObject.raw) {

      	return resp.body;

      } else {
        // simpler transformed json

        let json = await resp.json();
        // console.log(json);
        let _result = transform(json, baseMap);
        // console.log(_result);
        return _result;

      }
}

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = `<!DOCTYPE html>
<html>
  <head><title>Busca Fatos</title><head>
  <body>
    <h1>Busca Fatos BETA API</h1>
    <ul>
      <li>working version BETA 0.2 <a href="https://busca-fatos.deno.dev/v1/search/something">here</a></li>
      <li><a href="https://github.com/buscafatos/deno-api">Github</a></li>
      <li><a href="https://app.swaggerhub.com/apis/fcavalcantirj/busca-fatos-api/0.0.2">Swagger</a></li>
    </ul>
  </body>
</html>
  `;
  })
  .get("/v1/search/:query", async (context) => {
      context.response.body = await asyncHandler(context.request.url, context.params.query);
  });

  function errorHandler(error) {
    if(error.error && !new String(error.error).includes('UnexpectedEof: early eof')) {
      // console.log('error');
      console.log(error.error);
    }
  }

const app = new Application();

// app.use(async (context, next) => {
//   try {
//     await next();
//   } catch (err) {
//     if (isHttpError(err)) {
//       context.response.status = err.status;
//     } else {
//       context.response.status = 500;
//     }
//     context.response.body = { error: err.message };
//     context.response.type = "json";
//   }
// });

app.use(router.routes());
app.use(router.allowedMethods());
app.addEventListener("error", errorHandler)

await app.listen({ port: 8000 });