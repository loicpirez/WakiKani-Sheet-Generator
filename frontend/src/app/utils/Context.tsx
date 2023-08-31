import { Context, createContext, useContext } from "react";

export const DataContext = createContext<DataContextType | undefined>(undefined);

// @TODO: enum
export const useContextContent = (field: "data" | "error" | "loading" | "fetchData"): ApiResponseType | ApiErrorType | boolean | (() => Promise<void>)=> {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }

    return context[field];
}
