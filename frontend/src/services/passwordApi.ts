import type {ChangePasswordRequest} from "../types/ChangePasswordRequest.ts";
import api from "../api/axios.ts";

export const changePassword = async (
    request: ChangePasswordRequest
): Promise<void> => {

    await api.patch(
        "/password/change",
        request
    );
};