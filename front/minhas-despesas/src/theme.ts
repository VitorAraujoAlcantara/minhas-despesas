import { DefaultTheme } from 'styled-components'

export const defaultTheme: DefaultTheme = {
    font: {
        family: {
            sanSerif: 'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
            monospace: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;'
        }
    },
    palette: {
        common: {
            black: '#222831',
            white: '#ffffff'
        },
        primary: {
            main: '#001932',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#003b64',
            contrastText: '#ffffff'
        },
        danger: {
            main: '#c0424e',
            contrastText: '#ffffff'
        }
    }
}

export const greenTheme: DefaultTheme = {
    ...defaultTheme,
    palette: {
        common: {
            ...defaultTheme.palette.common
        },
        primary: {
            main: '#28430a',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#507b00',
            contrastText: '#ffffff'
        },
        danger: {
            main: '#7b4425',
            contrastText: '#ffffff'
        }
    }
}

export const royalTheme: DefaultTheme = {
    ...defaultTheme,
    palette: {
        common: {
            ...defaultTheme.palette.common
        },
        primary: {
            main: '#040f57',
            contrastText: '#e79556'
        },
        secondary: {
            main: '#12348d',
            contrastText: '#ffffff'
        },
        danger: {
            main: '#bd2b48',
            contrastText: '#ffffff'
        }
    }
}

export const darkTheme: DefaultTheme = {
    ...defaultTheme,
    palette: {
        common: {
            ...defaultTheme.palette.common
        },
        primary: {
            main: '#000000',
            contrastText: '#C69749'
        },
        secondary: {
            main: '#282A3A',
            contrastText: '#ffffff'
        },
        danger: {
            main: '#bd2b48',
            contrastText: '#ffffff'
        }
    }
}

export const nightTheme: DefaultTheme = {
    ...defaultTheme,
    palette: {
        common: {
            ...defaultTheme.palette.common
        },
        primary: {
            main: '#14274E',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#394867',
            contrastText: '#ffffff'
        },
        danger: {
            main: '#bd2b48',
            contrastText: '#ffffff'
        }
    }
}

export const coffeTheme: DefaultTheme = {
    ...defaultTheme,
    palette: {
        common: {
            ...defaultTheme.palette.common
        },
        primary: {
            main: '#1A120B',
            contrastText: '#D5CEA3'
        },
        secondary: {
            main: '#3C2A21',
            contrastText: '#E5E5CB'
        },
        danger: {
            main: '#D1512D',
            contrastText: '#ffffff'
        }
    }
}

export const seaTheme: DefaultTheme = {
    ...defaultTheme,
    palette: {
        common: {
            ...defaultTheme.palette.common
        },
        primary: {
            main: '#277BC0',
            contrastText: '#FFF4CF'
        },
        secondary: {
            main: '#5BC0F8',
            contrastText: '#FFFFFF'
        },
        danger: {
            main: '#D1512D',
            contrastText: '#ffffff'
        }
    }
}

export const vintageTheme: DefaultTheme = {
    ...defaultTheme,
    palette: {
        common: {
            ...defaultTheme.palette.common
        },
        primary: {
            main: '#2B3A55',
            contrastText: '#E8C4C4'
        },
        secondary: {
            main: '#CE7777',
            contrastText: '#F2E5E5'
        },
        danger: {
            main: '#D1512D',
            contrastText: '#ffffff'
        }
    }
}