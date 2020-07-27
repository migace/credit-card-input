import React, { ChangeEvent, KeyboardEvent, useState } from "react";

import { CreditCardNumber } from "./CreditCardNumber";
import { CreditCardExpiryDate } from "./CreditCardExpiryDate";
import { WrapperStyled } from "./styles";
import { formatCardNumber, formatExpiryDate, getCardType, hasReachedMaximumLength, isNumeric } from "./utils";
import { CARD_TYPES } from "./consts";

export const CreditCardInput: React.FC = () => {
    const [credictCardNumber, setCreditCardNumber] = useState("");
    const [creditCardExpiryDate, setCreditCardExpiryDate] = useState("");
    const [cardType, setCardType] = useState(CARD_TYPES.NONE);

    const creditCardNumberOnChangeHandler = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
        setCardType(getCardType(value));
        setCreditCardNumber(formatCardNumber(value));
    };

    const creditCardNumberKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) =>
        (!isNumeric(e.key) || hasReachedMaximumLength(credictCardNumber)) && e.preventDefault();

    const creditCardExpiryDateOnChangeHandler = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
        setCreditCardExpiryDate(formatExpiryDate(value));
    };

    return (
        <WrapperStyled>
            <CreditCardNumber
                cardType={cardType}
                value={credictCardNumber}
                onChange={creditCardNumberOnChangeHandler}
                onKeyPress={creditCardNumberKeyPressHandler}
            />
            <CreditCardExpiryDate value={creditCardExpiryDate} onChange={creditCardExpiryDateOnChangeHandler} />
        </WrapperStyled>
    );
};
