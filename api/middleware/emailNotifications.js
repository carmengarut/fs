const mailjet = require('node-mailjet')
  .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)

const sendInviteUserEmail = (senderName, receiverEmail, contractTitle) => {
  const request = mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: 'contracts@etrustapp.com',
            Name: senderName
          },
          To: [
            {
              Email: receiverEmail,
              Name: ''
            }
          ],
          TemplateID: 3451333,
          TemplateLanguage: true,
          Subject: contractTitle,
          Variables: {
            contract_title: contractTitle,
            email: receiverEmail,
            name: senderName
          }
        }
      ]
    })

  request
    .then((result) => {
      console.log(result.body)
    })
    .catch((err) => {
      console.log(err.statusCode)
    })
}

const sendProposeChangeEmail = (senderName, receiverName, receiverEmail, contractTitle) => {
  const request = mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: 'contracts@etrustapp.com',
            Name: senderName
          },
          To: [
            {
              Email: receiverEmail,
              Name: receiverName
            }
          ],
          TemplateID: 3455877,
          TemplateLanguage: true,
          Subject: contractTitle,
          Variables: {
            contract_title: contractTitle,
            receiver_name: receiverName,
            modifier_name: senderName
          }
        }
      ]
    })
  request
    .then((result) => {
      console.log(result.body)
    })
    .catch((err) => {
      console.log(err.statusCode)
    })
}

module.exports = { sendInviteUserEmail, sendProposeChangeEmail }
