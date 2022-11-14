import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import {google} = from 'googleapis';
const customsearch = google.customsearch('v1');

const SEARCH_ENGINE_ID = Deno.env.get("SEARCH_ENGINE_ID");
const API_KEY = Deno.env.get("API_KEY");

serve((_req) => {

  // return new Response("Hello World!", {
  //   headers: { "content-type": "text/plain" },
  // });

    customsearch.cse.list({
      cx: SEARCH_ENGINE_ID,
      q: _req.params.q,
      auth: API_KEY,
    }, function(res){
      return res.data;
    });

});