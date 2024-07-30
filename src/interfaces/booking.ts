export interface Booking {
    guest: string;
    picture: string;
    orderdate: string;
    checkin: string;
    checkout: string;
    note: string | null;
    roomtype: string;
    roomid: number;
    status: string;
}