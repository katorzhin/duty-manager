import Chip from "@mui/material/Chip";

const STATUS_CONFIG = {
    ACTIVE: {
        label: "Active",
        color: "success",
    },
    INACTIVE: {
        label: "Inactive",
        color: "default",
    },
} as const;

interface Props {
    status: keyof typeof STATUS_CONFIG;
}

export default function EmployeeStatusChip({ status }: Props) {
    const config = STATUS_CONFIG[status];

    return (
        <Chip
            label={config.label}
            color={config.color}
            size="small"
        />
    );
}