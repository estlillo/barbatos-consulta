import "@/styles/globals.css";
import Layout from "@/layout/Layout";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function MyApp({ Component, pageProps }) {
  console.log(process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY);
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
