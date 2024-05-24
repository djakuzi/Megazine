import { MemoryPriceProps } from "./MemoryPrice.props";


export interface DeviceCardProps{
    id: number;
    idDevice: number;
    category: string;
    name: string;
    color: string;
    image: string;
    memoryPrice: MemoryPriceProps[];
    characteristics: string[];
}