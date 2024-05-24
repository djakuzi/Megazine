import { InputHTMLAttributes } from "react";

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement>{
    searchValue: string | undefined;
    setSearchValue: React.Dispatch<React.SetStateAction<string | undefined>>
}