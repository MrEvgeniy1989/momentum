import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/app/store";

// типизированный dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
