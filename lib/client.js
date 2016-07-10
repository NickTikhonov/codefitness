"use babel"

import request from "request"

import { find } from "./finder"

const CLIENTSIDE = true
const ENDPOINT = "http://6755ad07.ngrok.io/user/save"

export const call = (language, code) => {
  return new Promise((resolve, reject) => {
    if (!CLIENTSIDE) {
      request({
        url: ENDPOINT,
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({
          language: language,
          fileString: code
        })
      }, function(error, response, body){
        if(error || response.statusCode !== 200) {
          console.log("FALLING BACK TO LOCAL")
          resolve(find(code))
        } else {
          console.log(body)
          resolve(JSON.parse(body))
        }
      });
    } else {
      resolve(find(code))
    }
  })

}
