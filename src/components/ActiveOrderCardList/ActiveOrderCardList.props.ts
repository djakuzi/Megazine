import {OrderItems } from "../../redux/slices/user.slice";


export interface ActiveOrderCardListProps{
    activeCard: boolean;
    order: OrderItems[]
    setActiveCard: React.Dispatch<React.SetStateAction<boolean>>;
}