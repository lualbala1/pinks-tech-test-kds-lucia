import { StoreProvider } from "@/contexts/Store.context";
import OrdersLayout from "@/layouts/OrdersLayout";

export default function Index() {
  return (
    <>
    <StoreProvider>
      <OrdersLayout />
    </StoreProvider>
    </>
  );
}
