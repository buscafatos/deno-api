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
  import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
  import url from  "https://esm.sh/url";

  const SEARCH_ENGINE_ID = Deno.env.get("SEARCH_ENGINE_ID");
  const API_KEY = Deno.env.get("API_KEY");


  function handler(_req) {

    const queryObject = url.parse(_req.url, true).query;

    if (!queryObject.q) {
      return '';
    }

    console.log('last search term=' + queryObject.q);

    // https://developers.google.com/custom-search/v1/overview
    // https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list#request

    let _url = new URL('https://www.googleapis.com/customsearch/v1');
    _url.searchParams.set('num', '10');
    _url.searchParams.set('safe', 'active');
    _url.searchParams.set('q', queryObject.q);
    _url.searchParams.set('key', API_KEY);
    _url.searchParams.set('cx', SEARCH_ENGINE_ID);

      // pagination
      if (queryObject.st) {
        let start = parseInt(queryObject.st);
        if (Number.isInteger(start))
        _url.searchParams.set('start', start);
      }

    const request = new Request(_url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const res = fetch(request);

    return res;
  }

  serve(handler);