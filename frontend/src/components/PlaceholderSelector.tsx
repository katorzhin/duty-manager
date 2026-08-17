import {Chip, Stack, Typography} from "@mui/material";

type Placeholder = {
    label: string;
    value: string;
};

type PlaceholderSelectorProps = {
    value: string;
    onChange: (value: string) => void;
    placeholders: Placeholder[];
};

function PlaceholderSelector({
                                 value,
                                 onChange,
                                 placeholders,
                             }: PlaceholderSelectorProps) {

    const insertPlaceholder = (placeholder: string) => {

        onChange(value + placeholder);
    };

    return (
        <>
            <Typography
                variant="caption"
                color="text.secondary"
            >
                Click placeholder to insert
            </Typography>

            <Stack
                direction="row"
                spacing={1}
            >
                {placeholders.map((placeholder) => (
                    <Chip
                        key={placeholder.value}
                        clickable
                        label={placeholder.label}
                        onClick={() => insertPlaceholder(placeholder.value)}
                    />
                ))}
            </Stack>
        </>
    );
}

export default PlaceholderSelector;