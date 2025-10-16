import { ConfirmationEmail } from "@/components/mail/ConfirmationMail";
import { Booking, Session } from "@/types";
import { render } from "@react-email/render";
import { getTranslations } from "next-intl/server";
import { Resend } from "resend";
import config from "@/utils/config";

const resend = new Resend(config.resendApiKey);

export async function sendConfirmationEmail({
  booking,
  session,
  update,
}: {
  booking: Booking;
  session: Session;
  update?: boolean;
}) {
  const { email } = booking;
  const t = await getTranslations("email");
  if (!config.resendEnabled) return;

  const subject = update ? t("subject.update") : t("subject.create");

  const emailHtml = await render(
    <ConfirmationEmail subject={subject} booking={booking} session={session} />
  );

  return resend.emails.send({
    from: config.mailSender,
    to: email,
    subject,
    html: emailHtml,
  });
}
