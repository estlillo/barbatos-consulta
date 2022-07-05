export default function handler(req, res) {
  const siteKey = process.env.GOOGLE_RECAPTCHA_SITE_KEY;
  res.status(200).json({ siteKey: siteKey });
}
