export default async function handler(req, res) {
  const { to, message } = req.body;

  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const fromNumber = process.env.TWILIO_FROM;

  const url = 'https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/Messages.json';

  const params = new URLSearchParams();
  params.append('To', to);
  params.append('From', fromNumber);
  params.append('Body', message);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(accountSid + ':' + authToken).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });

  const data = await response.json();

  if (response.ok) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ success: false, error: data });
  }
}