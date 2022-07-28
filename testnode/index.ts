import { json } from "stream/consumers";
import * as inputMails from "./mails.json"
import * as fs from 'fs';

interface Mail{
    from: string;
    date: string;
    to: string[];
}

function addToJson(newMail: Mail){
    let oldData: string = fs.readFileSync("./mails.json", "utf8")
    let jsonData: Mail[] = JSON.parse(oldData)

    jsonData.push(newMail);

    fs.writeFileSync('./add.json', JSON.stringify(jsonData, null, 4) , 'utf-8')
}

function deleteFromJson(index: number){
    let oldData: string = fs.readFileSync("./mails.json", "utf8")
    let jsonData: Mail[] = JSON.parse(oldData)

    if (index > -1) {
        jsonData.splice(index, 1);
    }

    fs.writeFileSync('./del.json', JSON.stringify(jsonData, null, 4) , 'utf-8')
}

function updateToJson(newMail: Mail, pos: number){
    let oldData: string = fs.readFileSync("./mails.json", "utf8")
    let jsonData: Mail[] = JSON.parse(oldData)
    
    jsonData[pos]=newMail

    fs.writeFileSync('./update.json', JSON.stringify(jsonData, null, 4) , 'utf-8')
}

function getOneFromJson(pos: number){
    let oldData: string = fs.readFileSync("./mails.json", "utf8")
    let jsonData: Mail[] = JSON.parse(oldData)

    console.log(jsonData[pos])
}

addToJson({from:"Ana",date:"acum",to:["idk"]})
deleteFromJson(1)
updateToJson({from:"Marina",date:"atunci",to:["noone"]}, 1)
getOneFromJson(1)