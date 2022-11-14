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
  let _url = 'https://www.googleapis.com/customsearch/v1?num=10&safe=active&key='+API_KEY+'&cx='+SEARCH_ENGINE_ID+'&q='+queryObject.q;

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