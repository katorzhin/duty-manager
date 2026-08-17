import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography
} from "@mui/material";

import {useLogin} from "./useLogin";

export default function Login() {

    const {
        email,
        password,
        error,
        setEmail,
        setPassword,
        handleLogin
    } = useLogin();

    return (
        <Container maxWidth="sm">

            <Paper
                sx={{
                    mt: 15,
                    p: 4
                }}
            >
                <Typography
                    variant="h4"
                    sx={{ mb: 3 }}
                >
                    Login
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                >
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                    />

                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                    />

                    {error && (
                        <Typography color="error">
                            {error}
                        </Typography>
                    )}

                    <Button
                        variant="contained"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}