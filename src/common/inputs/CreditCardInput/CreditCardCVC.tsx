import React, { ChangeEvent, KeyboardEvent } from "react";

import { CreditCardInputStyled } from "./styles";

type CreditCardCVCProps = {
    onChange: ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
    value: string;
};

export const CreditCardCVC: React.FC<CreditCardCVCProps> = ({ onChange, onKeyPress, value }) => (
    <CreditCardInputStyled placeholder="CVC" onChange={onChange} onKeyPress={onKeyPress} value={value} />
);
