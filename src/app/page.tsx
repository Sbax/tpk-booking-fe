import { FormHandler } from "@/components/FormHandler";

export default async function Home() {
  return (
    <>
      <h1 className="mb-2 font-bold text-xl">Prenota una sessione</h1>
      <FormHandler />
    </>
  );
}
