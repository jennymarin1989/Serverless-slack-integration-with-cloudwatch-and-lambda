const https = require('https')

exports.alertService = (event, callback) => {
  const message = JSON.parse(event.Records[0].Sns.Message)
  const { AlarmName } = message

  const payload = JSON.stringify({
    channel: '@your-slack-channel',
    text: `This cloudwatch alarm went off: ${AlarmName}`,
    username: 'bot',
    icon_emoji: ':robot_face:'
  })

  const options = {
    hostname: 'hooks.slack.com',
    method: 'POST',
    path: '/${webhook-url}'
  }

  const req = https.request(options, res => res.on('data', () => callback(null, 'OK')))
  req.on('error', error => callback(JSON.stringify(error)))
  req.write(payload)
  req.end()
}
