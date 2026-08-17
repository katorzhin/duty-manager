import {
    Card,
    CardContent,
    Grid,
    Typography
} from "@mui/material";
import type {ReactNode} from "react";
import type {SxProps} from "@mui/material";
import {styles} from "./styles.ts";

type DashboardStatCardProps = {
    title: string;
    value: number;
    icon: ReactNode;
    cardStyle: SxProps;
};

function DashboardStatCard({
                               title,
                               value,
                               icon,
                               cardStyle,
                           }: DashboardStatCardProps) {

    return (
        <Grid size={3}>
            <Card sx={cardStyle}>
                <CardContent sx={styles.statCardContent}>
                    {icon}

                    <Typography color="text.secondary">
                        {title}
                    </Typography>

                    <Typography variant="h4">
                        {value}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default DashboardStatCard;