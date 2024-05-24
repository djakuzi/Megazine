import { Meta } from "../../pages/Menu/Meta.prop";


export interface PaginationProps{
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    metaDevice?: Meta | undefined;
}