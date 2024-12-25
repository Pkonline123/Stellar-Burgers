import { createAsyncThunk } from "@reduxjs/toolkit";
import requestWrapper from "../../utils/requestWrapper";
import { BASE_URL } from "../../utils/consts";

export const getCurrentOrder = createAsyncThunk(
    'currentOrder/getOrderInfo',
    async (id: string) => {
        const result = await requestWrapper(() =>
            fetch(`${BASE_URL}/orders/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        );

        return result;
    }
)