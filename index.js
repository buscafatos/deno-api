import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import url from  "https://esm.sh/url";

const SEARCH_ENGINE_ID = Deno.env.get("SEARCH_ENGINE_ID");
const API_KEY = Deno.env.get("API_KEY");


function handler(_req) {

  const queryObject = url.parse(_req.url, true).query;
  console.log(queryObject.q);

  let _url = 'https://www.googleapis.com/customsearch/v1?key='+API_KEY+'&cx='+SEARCH_ENGINE_ID+'&q='+queryObject.q;
  console.log('url =' + _url);

  const request = new Request(_url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  return fetch(request);
}

serve(handler);