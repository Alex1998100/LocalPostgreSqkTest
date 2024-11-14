import { anonFolderList } from "./anonFoldeList.js";
import {} from "dotenv/config";
import fs from "fs";
import { Connect, disConnect, Select, Insert } from "./postgres.js";

let db = Connect()

let insertCallback = async (result) => {
    console.log(result)
  };
let selectCallback = async (result) => {
    console.log(result)
  };

await Insert(db,"INSERT INTO public.test(txt)VALUES ('1');",insertCallback)  
await Insert(db,"INSERT INTO public.test(txt)VALUES ('2');",insertCallback)  

await Select(db,'SELECT * FROM public.test;', selectCallback)
await disConnect(db)