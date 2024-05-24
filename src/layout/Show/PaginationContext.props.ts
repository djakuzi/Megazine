import { Meta } from "../../pages/Menu/Meta.prop";


export interface PaginationContextProps{
    currentPage: number;
    setMetaDevice: React.Dispatch<React.SetStateAction<Meta | undefined>>
}

