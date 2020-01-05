const mailjet = require ('node-mailjet')
  .connect('1094af2ac628de029bbb9c81b98f0c41', '95c005f0939b361819a2eb3bad3a437f');

const request = mailjet
  .post("send", {'version': 'v3.1'})
  .request({
    "Messages":[
      {
        "From": {
          "Email": "noreply@itsupplies.co",
          "Name": "IT Supplies"
        },
        "To": [
          {
            "Email": "feranmiakinlade@gmail.com",
            "Name": "Harold"
          }
        ],
        "Subject": "Greetings from Mailjet.",
        "TextPart": "My first Mailjet email",
        "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
        "CustomID": "AppGettingStartedTest"
      }
    ]
  });

request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  });
