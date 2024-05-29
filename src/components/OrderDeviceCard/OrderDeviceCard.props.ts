import { OrderItems } from "../../redux/slices/user.slice";


export interface OrderDeviceCardProps{
   order: OrderItems;
   setActiveCard: React.Dispatch<React.SetStateAction<boolean>>;
}