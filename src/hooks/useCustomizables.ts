import {Customizable} from "../models/Customizable.ts";
import {useQuery} from "@tanstack/react-query";
import {getCustomizables} from "../services/customizablesService.ts";


interface UseCustomizablesReturn {
    customizables: Customizable[] | [];
    isLoading: boolean;
    isError: boolean;
}

const useCustomizables = (): UseCustomizablesReturn => {

    const {data: customizables, isLoading, isError} = useQuery<Customizable[]>({
        queryKey: ['customizables'],
        queryFn: getCustomizables,
        staleTime: 5 * 60 * 1000,
        retry: 3,
    });

    return {
        customizables: customizables ?? [],
        isLoading,
        isError
    };
};

export default useCustomizables;