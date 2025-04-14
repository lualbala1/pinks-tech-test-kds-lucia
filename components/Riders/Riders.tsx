import s from "./Riders.module.scss";
import Rider from "@/bases/Rider";
import { useRiders } from "@/contexts/Riders.context";
import { useState } from "react";

export default function Riders() {
  const { riders } = useRiders();
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  return (
    <section className={s["pk-riders__container"]}>
      <div className={s["pk-riders"]}>
        <h3>Riders:</h3>
        {riders.map((rider) => (
          <>
            {showConfirmation ? (
              <div>hola</div>
            ) : (
              <Rider
                riderInfo={rider}
                setShowConfirmation={setShowConfirmation}
              />
            )}
          </>
        ))}
      </div>
    </section>
  );
}
