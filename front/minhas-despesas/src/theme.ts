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