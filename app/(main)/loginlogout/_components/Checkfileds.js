
export default function Checkfields({
  nameref,
  emailref,
  passwordref,
  phonenumref,
  addressref,
  setmessagefn,
  signupform,
}) {
  // if fields are empty
  const refarray = [nameref, emailref, passwordref, phonenumref, addressref];
  for (let i = 0; i < refarray.length; i++) {
    if (refarray[i]?.current?.value == "") {
      refarray[i]?.current?.focus();
      setmessagefn("Please fill this field");
      return false;
    }
  }
  // name check
  if (signupform) {
    if (nameref.current.value.length < 3) {
      nameref.current.focus();
      setmessagefn("Name is too short");
      return false;
    }
    if (nameref.current.value.length > 50) {
      nameref.current.focus();
      setmessagefn("Name is too big");
      return false;
    }
  }

  // email check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailref.current.value)) {
    emailref.current.focus();
    setmessagefn("Invalid email");
    return false;
  }

  // mobile check
  if (signupform) {
    const mobileregex = /^\d{10}$/;
    if (!mobileregex.test(phonenumref.current.value)) {
      emailref.current.focus();
      setmessagefn("Invalid mobile number");
      return false;
    }
  }

  // password check
  const minLength = 8;
  const maxLength = 100;

  if (passwordref.current.value.length < minLength) {
    passwordref.current.focus();
    setmessagefn("Password is too short ( " + minLength + " chars min )*");
    return false;
  }

  if (passwordref.current.value.length > maxLength) {
    passwordref.current.focus();
    setmessagefn("Password is too big ( " + maxLength + " chars min )*");
    return false;
  }

  // pass test
  return true;
}
