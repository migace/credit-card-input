import styled from "@emotion/styled";

export const WrapperStyled = styled.div`
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
`;

export const CreditCardNumberWrapperStyled = styled.div`
    position: relative;
    display: flex;
`;

export const CreditCardInputStyled = styled.input`
    height: 30px;
    border: 0;
    width: 55px;

    &:focus {
        outline: 0;
    }
`;

export const CreditCardNumberInputStyled = styled(CreditCardInputStyled)`
    padding-left: 45px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    width: auto;
`;

export const CardTypeStyled = styled.img`
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    height: 20px;
`;

export const MessagesStyled = styled.div`
    color: #ff0000;
    font-size: 10px;
    padding: 0 5px;
`;
