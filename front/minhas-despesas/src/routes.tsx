import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { DefaultTheme, ThemeProvider } from "styled-components"
import FrmDespesa from "./screens/frm-despesa"
import FrmDespesaAdd from "./screens/frm-despesa-add"
import FrmDespesaPeriodoAdd from "./screens/frm-despesa-periodo-add"
import FrmGrupoDespesa from "./screens/frm-grupo-despesa"
import FrmGrupoDespesaAdd from "./screens/frm-grupo-despesa-add"
import FrmGrupoDespesaEdit from "./screens/frm-grupo-despesa-edit"
import FrmLogin from "./screens/frm-login"
import Home from "./screens/home"
import Template from "./screens/template"
import { useAppDispatch, useAppSelector } from "./store/hooks"
import { getThemeFromLocalStorage } from "./store/reducers/app"
import { coffeTheme, darkTheme, defaultTheme, greenTheme, neonTheme, nightTheme, royalTheme, seaTheme, vintageTheme } from "./theme"

const AppRoutes = () => {
    const dispach = useAppDispatch();
    const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(royalTheme)
    const { theme } = useAppSelector(state => state.app);

    useEffect(() => {
        dispach(getThemeFromLocalStorage())
    }, [])

    useEffect(() => {
        switch (theme) {
            case 'royal':
                setCurrentTheme(royalTheme);
                break;
            case 'green':
                setCurrentTheme(greenTheme);
                break;
            case 'dark':
                setCurrentTheme(darkTheme);
                break;
            case 'night':
                setCurrentTheme(nightTheme);
                break;
            case 'coffe':
                setCurrentTheme(coffeTheme);
                break;
            case 'sea':
                setCurrentTheme(seaTheme);
                break;
            case 'vintage':
                setCurrentTheme(vintageTheme);
                break;
            case 'neon':
                setCurrentTheme(neonTheme);
                break;
            default:
                setCurrentTheme(defaultTheme);
                break;
        }

    }, [theme]);

    return (
        <ThemeProvider theme={currentTheme}>
            <Routes>
                <Route element={<Template />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<FrmLogin />} />

                    {/* Grupos */}
                    <Route path="/group" element={<FrmGrupoDespesa />} />
                    <Route path="/group/add" element={<FrmGrupoDespesaAdd />} />
                    <Route path="/group/:id/edit" element={<FrmGrupoDespesaEdit />} />

                    {/* Despesas */}
                    <Route path="/expense" element={<FrmDespesa />} />
                    <Route path="/expense/:id" element={<FrmDespesa />} />
                    <Route path="/expense/period/add" element={<FrmDespesaPeriodoAdd />} />
                    <Route path="/expense/:id/add" element={<FrmDespesaAdd />} />

                </Route>
            </Routes>
        </ThemeProvider>
    )
}

export default AppRoutes