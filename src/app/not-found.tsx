import Link from "next/link";

export default async function NotFound() {
  return (
    <section className="flex flex-col justify-center items-center space-x-4 my-4 min-h-full">
      <h2 className="mt-4 font-semibold text-3xl text-secondary">
        Hai fallito il tiro salvezza!
      </h2>
      <h2 className="mt-4 font-semibold text-xl">...o forse è colpa nostra?</h2>
      <p className="mt-4 text-lg text-neutral">
        In ogni caso questa pagina non esiste
      </p>
      <Link href="/" className="mt-6 btn btn-primary">
        Torna alla home
      </Link>
    </section>
  );
}
