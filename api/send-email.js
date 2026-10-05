module.exports = async (req, res) => {
  const { to, message } = req.body;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + process.env.RESEND_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'onboarding@resend.dev',
      to: to,
      subject: 'EMERGENCY ALERT',
      text: message
    })
  });

  const data = await response.json();

  if (response.ok) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ success: false, error: data });
  }
};