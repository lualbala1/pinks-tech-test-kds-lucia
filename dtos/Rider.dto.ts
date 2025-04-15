
export type RiderDto = {
  orderWanted: string;
  storeId: number;
  orderReady: boolean;
  pickup: (order?: string) => void;
};
