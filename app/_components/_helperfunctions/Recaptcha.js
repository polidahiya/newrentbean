import Verifyrecaptcha from "@/app/_serveractions/Recaptchaverify";

export default async function Recaptcha(
  successcallbackfn,
  failedcallbackfn,
) {
  grecaptcha.ready(function () {
    grecaptcha
      .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" })
      .then(async (token) => {
        const res = await Verifyrecaptcha(token);
        if (res.success) {
          successcallbackfn();
        } else {
          failedcallbackfn();
        }
      });
  });
}
