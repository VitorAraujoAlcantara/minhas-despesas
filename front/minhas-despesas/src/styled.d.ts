import styled from "styled-components";

interface IPalette {
    main: string
    contrastText: string
}

interface IFontFamily {
    sanSerif: string
    monospace: string
}

declare module 'styled-components' {
    export interface DefaultTheme {
        font: {
            family: IFontFamily
        }
        palette: {
            common: {
                black: string
                white: string
            }
            primary: IPalette
            secondary: IPalette
            danger: IPalette
        }
    }
}