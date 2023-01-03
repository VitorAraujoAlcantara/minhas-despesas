import { Route, Routes } from "react-router-dom"
import FrmDespesa from "./screens/frm-despesa"
import FrmDespesaAdd from "./screens/frm-despesa-add"
import FrmDespesaPeriodoAdd from "./screens/frm-despesa-periodo-add"
import FrmGrupoDespesa from "./screens/frm-grupo-despesa"
import FrmGrupoDespesaAdd from "./screens/frm-grupo-despesa-add"
import FrmGrupoDespesaEdit from "./screens/frm-grupo-despesa-edit"
import FrmLogin from "./screens/frm-login"
import Home from "./screens/home"
import Template from "./screens/template"

const AppRoutes = () => {
    return (
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
    )
}

export default AppRoutes