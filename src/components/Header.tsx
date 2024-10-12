import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.png";

export const Header = () => {
  return (
    <header className="flex-col bg-base-200 mb-4 rounded-md navbar">
      <Link href="/">
        <Image
          src={logo}
          alt="Logo Total Party Kon"
          style={{
            width: "100%",
            height: "auto",
          }}
          width={120}
        />
      </Link>
      <ul className="space-x-2 font-bold menu menu-horizontal">
        <li>
          <Link href="https://www.totalpartykon.it/">Cos'è TPK!</Link>
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
    </header>
  );
};
