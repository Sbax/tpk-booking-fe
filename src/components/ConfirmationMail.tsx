import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Link,
} from "@react-email/components";
import { Adventure, Booking } from "@/types";

const baseUrl = process.env.BASE_URL;

interface ConfirmationEmailProps {
  subject: string;
  booking: Booking;
  adventure: Adventure;
}

export const ConfirmationEmail: React.FC<ConfirmationEmailProps> = ({
  subject,
  booking,
  adventure,
}) => {
  const { name, seats, id: bookingId } = booking;
  const { title, timeSlot } = adventure;

  const time = timeSlot === 1 ? "10.00 - 14.00" : "16.00 - 20.00";
  const mail = process.env.MAIL_CONTACT;

  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.4" }}>
        <Container>
          <Heading>Ciao {name},</Heading>
          <Text>
            È ufficiale: hai {seats} post{seats === 1 ? "o" : "i"} prenotati per
            l&apos;avventura {title} al TPK!
          </Text>

          <Text style={{ fontSize: "16px", marginBottom: "20px" }}>
            I dettagli da sapere:
          </Text>
          <Text style={{ fontSize: "16px", lineHeight: "1.6" }}>
            - <strong>Avventura:</strong> {title}
            <br />- <strong>Data:</strong> Sabato 23 Novembre 2024
            <br />- <strong>Presso:</strong>{" "}
            <Link href="https://maps.app.goo.gl/WUAuStwHQdpZ1XLt6">
              La Pieve di Cologno, Piazza S. Matteo, 24, Cologno Monzese MI
            </Link>
            <br />- <strong>Orario:</strong> {time}
            <br />- <strong>Numero di posti prenotati:</strong> {seats}
          </Text>

          <Text>
            Puoi gestire la tua prenotazione cliccando{" "}
            <Link href={`${baseUrl}/bookings/${bookingId}`}>qui</Link>.
          </Text>

          <Text>
            Quest'anno avremo anche la possibilità di pranzare e cenare assieme
            sempre presso La Pieve di Cologno, lo stesso posto dove si svolgerà
            la convention. Se vuoi unirti a noi puoi compilare{" "}
            <Link href="https://forms.gle/ZRguXEYn6mUiPEMK6">questo form</Link>.
          </Text>

          <Text>
            Per qualsiasi dubbio, domanda, o richiesta particolare sentiti
            liberə di contattarci a <Link href={`mailto:${mail}`}>{mail}</Link>.
          </Text>

          <Text>
            Alleanza OSR Pizza
            <br />
            <Link href="https://www.totalpartykon.it/">totalpartykon.it</Link>
            <br />
            <Link href="https://linktr.ee/alleanzaosrpizza">
              linktr.ee/alleanzaosrpizza
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};
