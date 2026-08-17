import {
    IconButton,
    InputAdornment,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import {styles} from "../pages/duties/styles.ts";

type Props = {
    visible: boolean;
    onClear: () => void;
};

function SelectClearAdornment({visible, onClear}: Props) {

    if (!visible) {
        return null;
    }

    return (
        <InputAdornment
            position="end"
            sx={styles.clearAdornment}
        >
            <IconButton
                size="small"
                onClick={(event) => {
                    event.stopPropagation();
                    onClear();
                }}
            >
                <ClearIcon fontSize="small"/>
            </IconButton>
        </InputAdornment>
    );
}

export default SelectClearAdornment;