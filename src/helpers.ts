import CryptoJS from "crypto-js";
import axios from "axios";
import camelcaseKeys from "camelcase-keys";

export const getLoginData = (
  email: string,
  password: string
): { email: string; password: string } => {
  return {
    email,
    password: CryptoJS.enc.Base64.stringify(
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      CryptoJS.SHA256(password + email.toLowerCase())
    ),
  };
};

export const parseIracingResponse = async (link: string) => {
  const res = await axios.get(link);

  if (!res?.data) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return camelcaseKeys(res.data, { deep: true }) as Record<string, any>;
};
