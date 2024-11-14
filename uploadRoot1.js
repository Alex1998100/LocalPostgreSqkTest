import { anonFolderList } from "./anonFoldeList.js";
import {} from "dotenv/config";
import fs from "fs";
import { Connect, disConnect, Select, Insert } from "./postgres.js";

let db = Connect();

let insertCallback = async (result) => {
  console.log(result);
};
let selectCallback = async (result) => {
  console.log(result);
};

//1	"000000000000000000000000000000000"	"1M88r7TS5uZkDrWj-3SZ9AoQQtBXOfyPD"	"root"	"JS-VBNET-1"	"root"					
//2	"000000000000000000000000000000000"	"1VF7Nbcs1FikmSYuFbf5FqII2ZIeFK5ef"	"root"	"JS-VBNET-2"	"root"					

fs.readFile("./root1.json", async (err, data)=> {
    await Select(db, "truncate table public.entry RESTART IDENTITY;", selectCallback);
    await Insert(db,`INSERT INTO public.entry(parent, id, kind, name, mime) VALUES ('000000000000000000000000000000000', '1M88r7TS5uZkDrWj-3SZ9AoQQtBXOfyPD', 'root', 'JS-VBNET-1','root');`,insertCallback)
    await Insert(db,`INSERT INTO public.entry(parent, id, kind, name, mime) VALUES ('000000000000000000000000000000000', '1VF7Nbcs1FikmSYuFbf5FqII2ZIeFK5ef', 'root', 'JS-VBNET-2','root');`,insertCallback)
     let obj = JSON.parse(data)
    for (let i = 0; i < obj.length; i++) {
        await Insert(db,`INSERT INTO public.entry(parent, id, kind, name, mime) VALUES ('1M88r7TS5uZkDrWj-3SZ9AoQQtBXOfyPD', '${obj[i].id}', '${obj[i].kind}', '${obj[i].name}','${obj[i].mimeType}');`,insertCallback)
    }
    await Select(db, "SELECT * FROM public.entry;", selectCallback);
    await disConnect(db);
})
