//TODO: improve this dto
export type OrderStatus = {
    id: string;
    state: "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED";
    };