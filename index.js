import { anonFolderList } from "./anonFoldeList.js";
import {} from "dotenv/config";
import fs from "fs";
import { Connect, disConnect, Select, Insert } from "./postgres.js";

let AddRow = async (parent, id, kind, name, mimeType) => {
    return await Insert(db, `INSERT INTO public.entry (parent, id, kind, name, mime) VALUES ('${parent}', '${id}', '${kind}', '${name.toString().replaceAll("'","''")}','${mimeType}');`)};

let db = Connect();

let selectCallback = async (result) => {
  let k = 0    
  for (let i = 0; i < result.length; i++) {
    console.log(i, result[i].name);
    let RecursiveExplore = async (folderId) => {
      k++
      let ret = await anonFolderList(folderId);
      console.log(`request number '${k}', folderID '${folderId}', read files '${ret.files.length}'` );
      for (let j = 0; j < ret.files.length; j++) {
        if (ret.files[j].mimeType == "application/vnd.google-apps.folder") {
          await AddRow(folderId, ret.files[j].id, ret.files[j].kind, ret.files[j].name, ret.files[j].mimeType);
          console.log(`new recursion ${ret.files[j].name}`);
          await RecursiveExplore(ret.files[j].id)
        } else {
          await AddRow(folderId, ret.files[j].id, ret.files[j].kind, ret.files[j].name, ret.files[j].mimeType);
        }
      }
    };
    await RecursiveExplore(result[i].id)
  }
  await disConnect(db);
};

await Select(db, "SELECT * FROM public.entry where mime ='application/vnd.google-apps.folder';", selectCallback);
