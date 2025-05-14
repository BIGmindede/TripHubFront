import { useSelector } from "react-redux";
import { AppState } from "app/providers/storeProvider/config/appReducer";

export const useAppSelector = useSelector.withTypes<AppState>(); 