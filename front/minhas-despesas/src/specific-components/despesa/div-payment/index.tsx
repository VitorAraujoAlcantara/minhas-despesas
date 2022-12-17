import { useEffect, useState } from "react";
import styled from "styled-components";
import BtnSubmit from "../../../components/buttons/btn-submit";
import InputText from "../../../components/inputs/input-text";
import LabelBold from "../../../components/labels/label-bold";
import { DespesaDto } from "../../../models/despesa-dto";
import { DespesaPagamentoCreateDto } from "../../../models/despesa-pagamento-create-dto";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { despesaPagamentoCrudSlice } from "../../../store/reducers/despesa-pagamento";
import DivDespesaDetail from "../div-despesa-detail";

const DivRoot = styled.div`
    display: flex;
    flex:1;
    flex-direction: column;
`

const DivBody = styled.div`
    display: flex; 
    flex: 1;
`

const DivFrmPayment = styled.form`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const DivFrmPaymentBody = styled.div`
    flex: 1;
`

interface DivPaymentProps {
    itemToPay?: DespesaDto;
    onCancel: () => void;
    onPayment: () => void;
}

const DivPayment = (props: DivPaymentProps) => {
    const dispach = useAppDispatch();
    const { created, erro } = useAppSelector(state => state.despesaPagamento);
    const [payment, setPayment] = useState<DespesaPagamentoCreateDto>({
        despesaId: '',
        valor: 0.00,
    })

    useEffect(() => {
        dispach(despesaPagamentoCrudSlice.clearData());
    }, [])

    useEffect(() => {
        if (!props.itemToPay) {
            return;
        }

        setPayment(
            { ...payment, despesaId: props.itemToPay.despesaId }
        )
    }, [props.itemToPay])

    useEffect(() => {
        if (!created) {
            return;
        }

        dispach(despesaPagamentoCrudSlice.clearData());
        props.onPayment();

    }, [created])

    const handleFormSubmit = () => {
        dispach(despesaPagamentoCrudSlice.create(payment))
    }
    return (
        <DivRoot>
            <DivBody>
                <DivDespesaDetail
                    entity={props.itemToPay}
                />
                <DivFrmPayment
                    onSubmit={e => {
                        e.preventDefault();
                        handleFormSubmit();
                    }}
                >
                    <DivFrmPaymentBody>
                        <InputText
                            caption="Valor a pagar:"
                            inputType="number"
                            onChangeValue={value => {
                                setPayment(
                                    { ...payment, valor: parseFloat(value) }
                                )
                            }}
                            value={payment.valor.toString()}
                            autoFocus={true}
                            required={true}
                        />
                        <InputText
                            caption="Observação:"
                            inputType="text"
                            onChangeValue={value => {
                                setPayment(
                                    { ...payment, observacao: value }
                                )
                            }}
                            value={payment.observacao}
                        />

                        {erro && 
                            <LabelBold>{erro}</LabelBold>
                        }
                    </DivFrmPaymentBody>
                    <BtnSubmit
                        caption="Pagar"
                    />
                </DivFrmPayment>
            </DivBody>

            <BtnSubmit
                caption="Cancelar"
                onClick={() => {
                    dispach(despesaPagamentoCrudSlice.clearData());
                    props.onCancel();
                }}
            />

        </DivRoot>
    )
}

export default DivPayment