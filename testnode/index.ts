import { json } from "stream/consumers";
import * as inputMails from "./mails.json"
import * as fs from 'fs';
import { ServerResponse, IncomingMessage } from "http";
import path from "path";

interface Mail{
    from: string;
    date: string;
    to: string[];
}

function addToJson(newMail: Mail){
    let oldData: string = fs.readFileSync("./mails.json", "utf8")
    let jsonData: Mail[] = JSON.parse(oldData)

    jsonData.push(newMail);

    fs.writeFileSync('./mails.json', JSON.stringify(jsonData, null, 4) , 'utf-8')
    return newMail;
}

function deleteFromJson(index: number){
    let oldData: string = fs.readFileSync("./mails.json", "utf8")
    let jsonData: Mail[] = JSON.parse(oldData)

    if (index > -1 && index < jsonData.length) {
        jsonData.splice(index, 1);
        fs.writeFileSync('./mails.json', JSON.stringify(jsonData, null, 4) , 'utf-8')
        return true;
    }
    return false;
}

function updateToJson(newMail: Mail, pos: number){
    let oldData: string = fs.readFileSync("./mails.json", "utf8")
    let jsonData: Mail[] = JSON.parse(oldData)
    if (pos > -1 && pos < jsonData.length) {
        jsonData[pos]=newMail
        fs.writeFileSync('./mails.json', JSON.stringify(jsonData, null, 4) , 'utf-8')
        return true;
    }
    return false;
}

function getOneFromJson(pos: number){
    let oldData: string = fs.readFileSync("./mails.json", "utf8")
    let jsonData: Mail[] = JSON.parse(oldData)
    return jsonData[pos];
    console.log(jsonData[pos])
}

function getAllFromJson(){
    let oldData: string = fs.readFileSync("./mails.json", "utf8")
    let jsonData: Mail[] = JSON.parse(oldData)
    return jsonData;
    console.log(jsonData)
}



// addToJson({from:"Ana",date:"acum",to:["idk"]})
// deleteFromJson(1)
// updateToJson({from:"Marina",date:"atunci",to:["noone"]}, 1)
// getOneFromJson(1)

export {Mail,addToJson as addMail,deleteFromJson as delMail,updateToJson as updMail,getOneFromJson as getMail, getAllFromJson as getMails};
