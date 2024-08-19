import { createContext } from "react";
import { IAppContext } from "../types/types";

export const AppContext = createContext<IAppContext>({} as IAppContext);