import { Adventure, Booking } from "@/types";
import { Resend } from "resend";

const resendEnabled = process.env.RESEND_ENABLED;
const baseUrl = process.env.BASE_URL;
const resend = new Resend(process.env.RESEND_API_KEY);
const sender = process.env.MAIL_SENDER;

export async function sendConfirmationEmail({
  booking,
  adventure,
}: {
  booking: Booking;
  adventure: Adventure;
}) {
  const { id: bookingId, name, email, seats } = booking;
  const { title } = adventure;

  if (!resendEnabled) return;

  return resend.emails.send({
    from: sender as string,
    to: email,
    subject: "Conferma Prenotazione",
    text: [
      `Ciao ${name},`,
      `Grazie per aver prenotato ${seats} posti per l'avventura "${title}".`,
      `Puoi gestire la tua prenotazione su ${baseUrl}/bookings/${bookingId}`,
      `Cordiali saluti,\nIl Team`,
    ].join("\n\n"),
  });
}
