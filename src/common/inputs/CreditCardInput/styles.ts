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

export const CreditCardNumberInputStyled = styled.input`
    height: 30px;
    padding-left: 40px;
`;

export const CardTypeStyled = styled.img`
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    height: 20px;
`;
