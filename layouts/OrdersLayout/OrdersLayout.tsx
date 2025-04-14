import Logo from "@/bases/Logo";
import s from "./OrdersLayout.module.scss";
import Riders from "@/components/Riders";
import Kanban from "@/components/Kanban";
import StoreSelector from "@/components/StoreSelector";

export default function OrdersLayout() {
  return (
    <main className={s["pk-layout"]}>
      <nav className={s["pk-layout__navbar"]}>
        <div className={s["pk-layout__navbar__title"]}>
          <Logo size="S" />
          <span>KDS: Krazy Display Service</span>
        </div>
        <StoreSelector />
      </nav>
      <article className={s["pk-layout__app"]}>
        <Kanban />
        <Riders />
      </article>
    </main>
  );
}
