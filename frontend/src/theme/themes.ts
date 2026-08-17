import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",

        background: {
            default: "#2b2d30",
            paper: "#313335"
        },

        text: {
            primary: "#d4d4d4"
        }
    },

    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#313335"
                }
            }
        },

        MuiTableCell: {
            styleOverrides: {
                root: {
                    color: "#d4d4d4",
                    borderColor: "#43454a"
                },

                head: {
                    backgroundColor: "#3c3f41",
                    color: "#ffffff"
                }
            }
        },

        MuiTableRow: {
            styleOverrides: {
                root: {
                    backgroundColor: "#2b2d30"
                }
            }
        }
    }
});