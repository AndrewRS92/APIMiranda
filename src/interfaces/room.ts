export interface Room {
    id: number
    name: string
    images: string[]
    type: 'Suite' | 'Single Bed' | 'Double Bed' | 'Double Superior'
    price: number
    offer: number
    amenities: string[]
    available: boolean
}