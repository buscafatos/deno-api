import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
const {google} = require('googleapis');
const customsearch = google.customsearch('v1');

const SEARCH_ENGINE_ID = '9145e8c50ed1b4c5a'
const API_KEY = 'AIzaSyBKURzCt4zi4iQ1Indcf007Ws_-2avnoCk'

serve((_req) => {
  // return new Response("Hello World!", {
  //   headers: { "content-type": "text/plain" },
  // });
  
  const res = await customsearch.cse.list({
    cx: SEARCH_ENGINE_ID,
    q: _req.params.q,
    auth: API_KEY,
  });
  return res.data;
});