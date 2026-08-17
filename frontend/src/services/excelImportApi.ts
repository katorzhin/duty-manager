import api from "../api/axios";

const UPLOAD_URL = "/upload";

export const uploadExcel = async (
    file: File,
    replace = false
) => {

    const formData = new FormData();

    formData.append("file", file);

    return api.post(
        `${UPLOAD_URL}?replace=${replace}`,
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );
};
