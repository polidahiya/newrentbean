"use server";

export default async function Verifyrecaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  const response = await fetch(verifyUrl, {
    method: "POST",
  });
  const data = await response.json();

  return { status: data?.success ? 200 : 400, success: data?.success };
}
