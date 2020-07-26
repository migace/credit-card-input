import React, { ChangeEvent, useState } from "react";

import { CreditCardNumber } from "./CreditCardNumber";
import { WrapperStyled } from "./styles";
import { formatCardNumber, getCardType } from "./utils";
import { CARD_TYPES } from "./consts";

export const CreditCardInput: React.FC = () => {
    const [credictCardNumber, setCreditCardNumber] = useState("");
    const [cardType, setCardType] = useState(CARD_TYPES.NONE);

    const creditCardNumberHandler = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
        setCardType(getCardType(value));
        setCreditCardNumber(formatCardNumber(value));
    };

    return (
        <WrapperStyled>
            <CreditCardNumber cardType={cardType} value={credictCardNumber} onChange={creditCardNumberHandler} />
        </WrapperStyled>
    );
};
