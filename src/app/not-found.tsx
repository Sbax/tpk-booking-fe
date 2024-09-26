import Link from "next/link";

export default async function NotFound({
  description = "In ogni caso questa pagina non esiste",
  ctaLabel = "Torna alla home",
}) {
  return (
    <section className="flex flex-col justify-center items-center my-4 min-h-full text-center">
      <h2 className="mt-4 font-semibold text-3xl text-secondary">
        Hai fallito il tiro salvezza!
      </h2>
      <h2 className="mt-4 font-semibold text-xl">...o forse è colpa nostra?</h2>
      <p className="mt-4 text-lg text-neutral">{description}</p>
      <Link href="/" className="mt-6 btn btn-primary">
        {ctaLabel}
      </Link>
    </section>
  );
}
