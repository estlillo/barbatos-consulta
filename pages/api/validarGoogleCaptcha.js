
import axios from "axios";
const handler = (req, res) => {
  console.log("llega al handler 2");

  try {
    let gRecaptchaToken = req.body.gReCaptchaToken;

    console.log(process.env.GOOGLE_RECAPTCHA_SECRET_KEY);
    console.log(req.body.gReCaptchaToken);
    console.log(
      `secret=${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${gRecaptchaToken}`
    );



  const body = `secret=${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${gRecaptchaToken}`;



    axios
      .post("https://www.google.com/recaptcha/api/siteverify", body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      })
      .then((reCaptchaRes) => {

        console.log("Response from Google reCaptcha verification API");

        if (reCaptchaRes?.data?.score > 0.5) {
          // Save data to the database from here
          res.status(200).json({
            status: "success",
            message: "Enquiry submitted successfully",
          });
        } else {
          res.status(200).json({
            status: "failure",
            message: "Google ReCaptcha Failure",
          });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default handler;
