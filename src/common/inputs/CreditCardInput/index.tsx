import React, { ChangeEvent, KeyboardEvent, useState, useEffect } from "react";

import { CreditCardNumber } from "./CreditCardNumber";
import { CreditCardExpiryDate } from "./CreditCardExpiryDate";
import { CreditCardCVC } from "./CreditCardCVC";
import { MessagesStyled, WrapperStyled } from "./styles";
import {
    formatCardNumber,
    formatExpiryDate,
    getCardType,
    hasReachedMaximumLength,
    hasCVCReachedMaxLength,
    isNumeric,
    validateExpiryDate,
} from "./utils";
import { CARD_TYPES, DEFAULT_EXPIRY_DATE_LENGTH } from "./consts";

export const CreditCardInput: React.FC = () => {
    const [credictCardNumber, setCreditCardNumber] = useState("");
    const [creditCardExpiryDate, setCreditCardExpiryDate] = useState("");
    const [creditCardCVC, setCreditCardCVC] = useState("");
    const [message, setMessage] = useState("");
    const [cardType, setCardType] = useState(CARD_TYPES.NONE);

    useEffect(() => {
        if (creditCardExpiryDate.length === DEFAULT_EXPIRY_DATE_LENGTH) {
            setMessage(validateExpiryDate(creditCardExpiryDate.split(" / ").join("/")));
        }
    }, [creditCardExpiryDate]);

    const creditCardNumberOnChangeHandler = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
        setCardType(getCardType(value));
        setCreditCardNumber(formatCardNumber(value));
    };

    const creditCardNumberKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) =>
        (!isNumeric(e.key) || hasReachedMaximumLength(credictCardNumber.split(" ").join(""))) && e.preventDefault();

    const creditCardExpiryDateOnChangeHandler = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
        setCreditCardExpiryDate(formatExpiryDate(value));

    const creditCardCVCOnChangeHandler = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
        setCreditCardCVC(value);

    const creditCardCVCKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) =>
        (!isNumeric(e.key) || hasCVCReachedMaxLength(creditCardCVC)) && e.preventDefault();

    return (
        <>
            <WrapperStyled>
                <CreditCardNumber
                    cardType={cardType}
                    value={credictCardNumber}
                    onChange={creditCardNumberOnChangeHandler}
                    onKeyPress={creditCardNumberKeyPressHandler}
                />
                <CreditCardExpiryDate value={creditCardExpiryDate} onChange={creditCardExpiryDateOnChangeHandler} />
                <CreditCardCVC
                    value={creditCardCVC}
                    onChange={creditCardCVCOnChangeHandler}
                    onKeyPress={creditCardCVCKeyPressHandler}
                />
            </WrapperStyled>
            <MessagesStyled>{message}</MessagesStyled>
        </>
    );
};
