import React, { ChangeEvent, KeyboardEvent, useState } from "react";

import { CreditCardNumber } from "./CreditCardNumber";
import { WrapperStyled } from "./styles";
import { formatCardNumber, getCardType, hasReachedMaximumLength, isNumeric } from "./utils";
import { CARD_TYPES } from "./consts";

export const CreditCardInput: React.FC = () => {
    const [credictCardNumber, setCreditCardNumber] = useState("");
    const [cardType, setCardType] = useState(CARD_TYPES.NONE);

    const creditCardNumberOnChangeHandler = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
        setCardType(getCardType(value));
        setCreditCardNumber(formatCardNumber(value));
    };

    const creditCardNumberKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) =>
        (!isNumeric(e.key) || hasReachedMaximumLength(credictCardNumber)) && e.preventDefault();

    return (
        <WrapperStyled>
            <CreditCardNumber
                cardType={cardType}
                value={credictCardNumber}
                onChange={creditCardNumberOnChangeHandler}
                onKeyPress={creditCardNumberKeyPressHandler}
            />
        </WrapperStyled>
    );
};
