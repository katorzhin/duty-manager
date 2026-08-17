import {useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Alert, Button, Container, Paper, Stack, Typography} from "@mui/material";
import {styles} from "./styles.ts";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ConflictDialog from "../../dialogs/conflictDialog/ConflictDialog.tsx";
import {uploadExcel} from "../../services/excelImportApi.ts";

function UploadExcel() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [conflicts, setConflicts] = useState<string[]>([]);
    const [openConflict, setOpenConflict] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const {t} = useTranslation();

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.files?.length) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {

        if (!file) {
            return;
        }

        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {

            const response = await uploadExcel(file);
            setSuccessMessage(response.data);
            setFile(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

        } catch (error: any) {

            if (error.response?.status === 409) {

                setConflicts(error.response.data.dates);

                setOpenConflict(true);

                return;
            }

            console.error(error);
            setErrorMessage(error.response?.data?.message ??
                t("upload.uploadFailed"));
        } finally {
            setLoading(false);
        }
    };

    const handleReplace = async () => {

        if (!file) {
            return;
        }

        setLoading(true);

        try {

            const response = await uploadExcel(file, true);

            setSuccessMessage(response.data);
            setOpenConflict(false);
            setConflicts([]);
            setFile(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

        } catch (error) {
            console.error(error);
            setErrorMessage(t("upload.replaceFailed"));

        } finally {
            setLoading(false);
        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={styles.container}
        >
            <Paper sx={styles.paper}>

                <Typography
                    variant="h4"
                    sx={styles.title}>
                    {t("upload.title")}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={styles.subtitle}>
                    {t("upload.subtitle")}
                </Typography>

                <Stack spacing={2}>

                    <Button
                        component="label"
                        variant="outlined"
                        startIcon={<UploadFileIcon/>}
                        size="large">
                        {t("upload.chooseFile")}

                        <input
                            ref={fileInputRef}
                            hidden
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={handleFileChange}
                        />
                    </Button>

                    {file && (
                        <Typography sx={styles.fileName}>
                            📄 {file.name}
                        </Typography>
                    )}

                    <Button
                        variant="contained"
                        size="large"
                        disabled={!file || loading}
                        onClick={handleUpload}
                    >
                        {loading
                            ? t("upload.uploading")
                            : t("upload.upload")}
                    </Button>
                </Stack>

                {successMessage && (
                    <Alert
                        severity="success"
                        sx={styles.successAlert}>
                        {successMessage}
                    </Alert>
                )}

                {errorMessage && (
                    <Alert
                        severity="error"
                        sx={styles.errorAlert}>
                        {errorMessage}
                    </Alert>
                )}

            </Paper>
            <ConflictDialog
                open={openConflict}
                dates={conflicts}
                onClose={() => setOpenConflict(false)}
                onReplace={handleReplace}
            />
        </Container>
    );
}

export default UploadExcel;