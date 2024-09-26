import { Booking } from "@/types";

export function anonymizeEmail(email: Booking["email"]): string {
  const [localPart, domainPart] = email.split("@");

  const maskedLocalPart = `${localPart[0]}****${
    localPart[localPart.length - 1]
  }`;

  const [domainName, domainExtension] = domainPart.split(".");

  const maskedDomain = `${domainName[0]}****.${domainExtension}`;

  return `${maskedLocalPart}@${maskedDomain}`;
}
