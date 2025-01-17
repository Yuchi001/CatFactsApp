export type Palette = {
    default: {background: string; color: string};
    focus: {background: string; color: string};
    hover: {background: string; color: string};
    active: {background: string; color: string};
    disabled: {background: string; color: string};
};

export const theme: {
    primary: Palette;
    secondary: Palette;
    error: string;
    success: string;
    text: {primary: string; secondary: string};
} = {
    primary: {
        default: {
            background: "#222222",
            color: "white"
        },
        focus: {
            background: "#222222",
            color: "white"
        },
        hover: {
            background: "#555555",
            color: "white"
        },
        active: {
            background: "#3B3B3B",
            color: "white"
        },
        disabled: {
            background: "#222222",
            color: "white"
        }
    },
    secondary: {
        default: {
            background: "transparent",
            color: "#222222"
        },
        focus: {
            background: "transparent",
            color: "#555555"
        },
        hover: {
            background: "transparent",
            color: "#555555"
        },
        active: {
            background: "transparent",
            color: "#3B3B3B"
        },
        disabled: {
            background: "transparent",
            color: "#222222"
        }
    },
    error: "#A3270C",
    success: "#0CA32D",
    text: {
        primary: "#222222",
        secondary: "white"
    }
};

export type PaletteType = "primary" | "secondary";
export const palette = (variant: PaletteType | undefined): Palette => {
    return variant === "secondary" ? theme.secondary : theme.primary;
};
