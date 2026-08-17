import {Link, useNavigate} from "react-router-dom";
import {
    IconButton, ListItemButton, List, MenuItem, ListItemIcon,
    Avatar, Typography, Menu, ListItemText, Box, Drawer,
} from "@mui/material";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import EventNoteIcon from "@mui/icons-material/EventNote";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import CampaignIcon from "@mui/icons-material/Campaign";
import PersonIcon from "@mui/icons-material/Person";
import {styles} from "./styles";
import {useAppTheme} from "../theme/AppThemeProvider";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {usePermissions} from "../permissions/usePermissions.ts";
import ChangePasswordDialog from "../dialogs/changePasswordDialog/ChangePasswordDialog.tsx";
import type {ChangePasswordRequest} from "../types/ChangePasswordRequest.ts";
import {changePassword} from "../services/passwordApi.ts";
import {notifyError, notifySuccess} from "../shared/toast.ts";
import LanguageSwitcher from "../components/LanguageSwitcher.tsx";

type MainLayoutProps = {
    children: React.ReactNode;
};

function MainLayout({children}: MainLayoutProps) {
    const navigate = useNavigate();
    const permission = usePermissions();
    const {darkMode, toggleTheme} = useAppTheme();
    const {t} = useTranslation();

    const email = localStorage.getItem("email") || "";
    const avatarLetter = email.charAt(0).toUpperCase();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);

    const open = Boolean(anchorEl);

    const handleOpen = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("email");

        navigate("/login");
    };

    const handleChangePassword = async (
        request: ChangePasswordRequest
    ) => {

        try {

            await changePassword(request);

            notifySuccess(t("userMenu.passwordChanged"));

            setChangePasswordOpen(false);
            handleClose();

        } catch (error: any) {
            notifyError(
                error.response?.data?.message ?? t("userMenu.passwordChangeFailed"));
        }
    };

    return (
        <Box sx={styles.layout}>
            <Drawer variant="permanent"
                    sx={styles.drawer}>
                <Typography
                    variant="h6"
                    sx={styles.title}>
                    Duty Manager
                </Typography>

                <List>
                    <ListItemButton
                        component={Link}
                        to="/">
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>

                        <ListItemText primary={t("navigation.dashboard")}/>
                    </ListItemButton>

                    <ListItemButton
                        component={Link}
                        to="/employees">
                        <ListItemIcon>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary={t("navigation.employees")}/>
                    </ListItemButton>

                    <ListItemButton
                        component={Link}
                        to="/duties">
                        <ListItemIcon>
                            <EventNoteIcon/>
                        </ListItemIcon>
                        <ListItemText primary={t("navigation.duties")}/>
                    </ListItemButton>
                    {permission.uploadSchedule && (
                        <ListItemButton
                            component={Link}
                            to="/upload">
                            <ListItemIcon>
                                <UploadFileIcon/>
                            </ListItemIcon>
                            <ListItemText primary={t("navigation.upload")}/>
                        </ListItemButton>
                    )}

                    {permission.sendNotifications && (
                        <ListItemButton
                            component={Link}
                            to="/notifications">
                            <ListItemIcon>
                                <CampaignIcon/>
                            </ListItemIcon>

                            <ListItemText primary={t("navigation.notifications")}/>
                        </ListItemButton>
                    )}
                    {permission.manageUsers && (
                        <ListItemButton
                            component={Link}
                            to="/users">
                            <ListItemIcon>
                                <PersonIcon/>
                            </ListItemIcon>
                            <ListItemText primary={t("navigation.users")}/>
                        </ListItemButton>
                    )}

                    {permission.viewAuditLogs && (
                        <ListItemButton
                            component={Link}
                            to="/audit-logs">
                            <ListItemIcon>
                                <HistoryIcon/>
                            </ListItemIcon>
                            <ListItemText primary={t("navigation.auditLogs")}/>
                        </ListItemButton>
                    )}
                </List>
            </Drawer>

            <Box sx={{flexGrow: 1}}>
                <Box sx={styles.header}>
                    <LanguageSwitcher/>
                    <IconButton onClick={toggleTheme}>
                        {darkMode
                            ? <LightModeIcon/>
                            : <DarkModeIcon/>}
                    </IconButton>

                    <IconButton onClick={handleOpen}>
                        <Avatar>{avatarLetter}</Avatar>
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem disabled>
                            {email}
                        </MenuItem>

                        <MenuItem
                            onClick={() => setChangePasswordOpen(true)}>
                            {t("userMenu.changePassword")}
                        </MenuItem>

                        <MenuItem onClick={handleLogout}>
                            {t("userMenu.logout")}
                        </MenuItem>

                    </Menu>
                    <ChangePasswordDialog
                        open={changePasswordOpen}
                        onClose={() => setChangePasswordOpen(false)}
                        onSave={handleChangePassword}
                    />
                </Box>

                <Box
                    component="main"
                    sx={styles.content}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default MainLayout;