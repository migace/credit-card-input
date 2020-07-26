import React, { ChangeEvent, KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";

import { CARD_TYPES, CARD_IMAGES } from "./consts";
import { CardTypeStyled, CreditCardNumberWrapperStyled, CreditCardNumberInputStyled } from "./styles";

type CreditCardNumberProps = {
    onChange: ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
    value: string;
    cardType: CARD_TYPES;
};

export const CreditCardNumber: React.FC<CreditCardNumberProps> = ({
    cardType = CARD_TYPES.NONE,
    onChange,
    onKeyPress,
    value,
}) => {
    const { t } = useTranslation("common");

    return (
        <CreditCardNumberWrapperStyled>
            <CardTypeStyled src={CARD_IMAGES[cardType]} alt={cardType} />
            <CreditCardNumberInputStyled
                data-testid="credit-card-number"
                value={value}
                placeholder={t("app.card-number")}
                onChange={onChange}
                onKeyPress={onKeyPress}
            />
        </CreditCardNumberWrapperStyled>
    );
};
