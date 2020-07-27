import React, { ChangeEvent, KeyboardEvent } from "react";

import { CreditCardInputStyled } from "./styles";

type CreditCardCVCProps = {
    onChange: ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
    value: string;
};

export const CreditCardCVC = React.forwardRef<HTMLInputElement, CreditCardCVCProps>(
    ({ onChange, onKeyPress, value }, ref) => (
        <CreditCardInputStyled ref={ref} placeholder="CVC" onChange={onChange} onKeyPress={onKeyPress} value={value} />
    ),
);
