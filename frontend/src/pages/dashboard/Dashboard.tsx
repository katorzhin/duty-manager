import {Card, CardContent, Grid, Typography} from "@mui/material";
import {useDashboard} from "./useDashboard.ts";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import BadgeIcon from "@mui/icons-material/Badge";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import {styles} from "./styles.ts";
import DashboardStatCard from "./DashboardStatCard.tsx";
import {useTranslation} from "react-i18next";

function Dashboard() {
    const {
        employeesCount, dutiesCount, todayDuties, subscribersCount, next5Duties
    } = useDashboard();

    const {t} = useTranslation();

    const onDutyTodayCount = todayDuties.reduce(
        (sum, duty) => sum + duty.employees.length,
        0
    );

    return (
        <>
            <Typography
                variant="h4"
                sx={styles.title}>
                {t("dashboard.title")}
            </Typography>

            <Typography
                sx={styles.subtitle}>
                {t("dashboard.subtitle")}
            </Typography>

            {/* Statistics */}

            <Grid container spacing={2}>

                <DashboardStatCard
                    title={t("dashboard.employees")}
                    value={employeesCount}
                    icon={
                        <PeopleIcon color="primary" sx={styles.icon}/>
                    }
                    cardStyle={styles.employeesCard}
                />

                <DashboardStatCard
                    title={t("dashboard.duties")}
                    value={dutiesCount}
                    icon={<EventNoteIcon sx={styles.dutiesIcon}/>}
                    cardStyle={styles.dutiesCard}
                />

                <DashboardStatCard
                    title={t("dashboard.onDutyToday")}
                    value={onDutyTodayCount}
                    icon={<BadgeIcon sx={styles.onDutyIcon}/>}
                    cardStyle={styles.onDutyCard}
                />

                <DashboardStatCard
                    title={t("dashboard.subscribers")}
                    value={subscribersCount}
                    icon={<NotificationsActiveIcon sx={styles.subscribersIcon}/>}
                    cardStyle={styles.subscribersCard}
                />
                <Grid
                    container
                    spacing={2}
                    sx={{mt: 0}}
                >

                    <Grid size={12}>
                        <Card
                            variant="outlined"
                            sx={styles.todayCard}>
                            <CardContent sx={styles.todayContent}>

                                <Typography
                                    variant="h6"
                                    sx={{mb: 1}}>
                                    {t("dashboard.todayDuty")}
                                </Typography>

                                {todayDuties.length === 0 && (
                                    <Typography color="text.secondary">
                                        {t("dashboard.noTodayDuty")}
                                    </Typography>
                                )}

                                {todayDuties.map(duty => (
                                    <div key={duty.id}>
                                        {duty.employees.map(employee => (

                                            <Typography
                                                key={employee}
                                                variant="h6"
                                                sx={{mb: 1}}>
                                                👤 {employee}
                                            </Typography>
                                        ))}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>


                    <Grid size={12}>
                        <Card>
                            <CardContent sx={{py: 0.5}}>
                                <Typography
                                    variant="h5"
                                    sx={{mb: 3}}>
                                    {t("dashboard.upcomingDuties")}
                                </Typography>

                                {next5Duties.length === 0 && (
                                    <Typography color="text.secondary">
                                        {t("dashboard.noUpcomingDuties")}
                                    </Typography>
                                )}

                                {next5Duties.map(duty => (

                                    <Card
                                        key={duty.id}
                                        variant="outlined"
                                        sx={styles.upcomingCard}>

                                        <CardContent sx={styles.upcomingContent}>
                                            <Typography
                                                sx={styles.date}>
                                                📅 {duty.dutyDate}
                                            </Typography>

                                            <Typography
                                                color="text.secondary">
                                                👥 {duty.employees.join(", ")}
                                            </Typography>
                                        </CardContent>
                                    </Card>

                                ))}

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Dashboard;