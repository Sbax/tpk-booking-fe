import React, { useState } from "react";

interface PrivacyCheckboxProps {
  isChecked: boolean;
  setIsChecked: (checked: boolean) => void;
}

export const PrivacyCheckbox: React.FC<PrivacyCheckboxProps> = ({
  isChecked,
  setIsChecked,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex items-center">
      <label className="justify-start cursor-pointer label">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          checked={isChecked}
          onChange={(event) => setIsChecked(event.target.checked)}
        />
        <span className="ml-2 label-text">Ho letto e accetto i</span>
      </label>

      <a onClick={toggleModal} className="underline cursor-pointer label-text">
        Termini e Condizioni
      </a>

      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Informativa sulla Privacy ai sensi del GDPR
            </h3>
            <p className="py-4">
              Per poter usufruire dei nostri servizi, ti informiamo che
              raccoglieremo e conserveremo il tuo indirizzo email. Questi dati
              verranno trattati nel rispetto del Regolamento Generale sulla
              Protezione dei Dati (GDPR – Regolamento UE 2016/679).
            </p>
            <ul className="py-2 list-disc list-inside">
              <li>
                <strong>Finalità del trattamento:</strong> L'indirizzo email
                verrà utilizzato esclusivamente per gestire la tua
                prenotazione/servizio e per inviarti comunicazioni necessarie.
              </li>
              <li>
                <strong>Base giuridica:</strong> La raccolta dei dati è
                necessaria per eseguire il contratto e fornire il servizio
                richiesto.
              </li>
              <li>
                <strong>Conservazione dei dati:</strong> I tuoi dati saranno
                conservati per il tempo necessario a completare il servizio, e
                successivamente per adempiere a eventuali obblighi legali.
              </li>
              <li>
                <strong>Diritti dell'interessato:</strong> Hai il diritto di
                accedere, rettificare o cancellare i tuoi dati, limitare il
                trattamento, opporsi e richiedere la portabilità dei dati. Puoi
                anche revocare il consenso in qualsiasi momento, contattandoci
                all'indirizzo email [tuo indirizzo email di contatto].
              </li>
              <li>
                <strong>Trasferimento dei dati:</strong> I tuoi dati non saranno
                trasferiti a terze parti senza il tuo esplicito consenso, a meno
                che non sia richiesto dalla legge.
              </li>
              <li>
                <strong>Sicurezza dei dati:</strong> Adottiamo misure tecniche e
                organizzative appropriate per garantire la sicurezza dei tuoi
                dati personali.
              </li>
            </ul>

            <div className="flex justify-center space-x-4 w-full">
              <button className="flex-1 btn" onClick={toggleModal}>
                Chiudi
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};
