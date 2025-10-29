import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.png";

export const Header = () => {
  return (
    <header className="flex flex-col items-center space-y-4 mb-4 w-full">
      <section className="flex flex-col items-center space-y-4">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo Total Party Kon"
            style={{
              width: "auto",
              height: "100%",
            }}
            height={100}
          />
        </Link>
        <h2>
          <b>
            22 e 23 Novembre 2025 @{" "}
            <a className="underline" href="https://www.progettolapieve.com/">
              Pieve di Cologno
            </a>{" "}
            (MI)
          </b>
        </h2>
      </section>

      <nav className="bg-base-200 rounded-md navbar">
        <ul className="flex justify-center space-x-2 font-bold menu menu-horizontal">
          <li>
            <Link href="https://www.totalpartykon.it/">Cos&apos;è TPK!</Link>
          </li>
          <li>
            <Link href="https://www.totalpartykon.it/dove-e-quando">
              Dove e quando?
            </Link>
          </li>
          <li>
            <Link href="https://www.totalpartykon.it/contatti">Contatti</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
