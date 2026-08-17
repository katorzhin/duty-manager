import {CSS} from "@dnd-kit/utilities";
import {useSortable} from "@dnd-kit/sortable";
import {
    ListItem,
    ListItemText,
    Paper,
} from "@mui/material";

import type {Employee} from "../../types/employee/Employee.ts";

type SortableEmployeeItemProps = {
    employee: Employee;
};

function SortableEmployeeItem({
                                  employee,
                              }: SortableEmployeeItemProps) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: employee.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        marginBottom: 8,
        cursor: "grab",
    };

    return (
        <Paper
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <ListItem>
                <ListItemText
                    primary={employee.name}
                    secondary={employee.email}
                />
            </ListItem>
        </Paper>
    );
}

export default SortableEmployeeItem;