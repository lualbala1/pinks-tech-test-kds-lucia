import s from "./Riders.module.scss";
import Rider from "@/bases/Rider";
import { useRiders } from "@/contexts/Riders.context";
import { useStore } from "@/contexts/Store.context";
import { RiderDto } from "@/dtos/Rider.dto";
import { mockStores } from "@/mocks/stores";
import { useEffect, useState } from "react";

export default function Riders() {
  const { riders } = useRiders();
  const { selectedStore } = useStore();
  const [filteredRiders, setFilteredRiders] = useState<RiderDto[]>([]);
  
  // Filter riders based on the selected store
  useEffect(() => {
    setFilteredRiders(
      riders.filter((rider) => {
        const storeId = selectedStore?.id ?? mockStores[0].id;
        return rider.storeId === storeId;
      })
    );
  }, [riders, selectedStore]);

  return (
    <section className={s["pk-riders__container"]}>
      <div className={s["pk-riders"]}>
        <h3>Riders:</h3>
        {filteredRiders.map((rider, index) => (
          <Rider riderInfo={rider} key={index} />
        ))}
      </div>
    </section>
  );
}
