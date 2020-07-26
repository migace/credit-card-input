import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import { CARD_TYPES, CARD_IMAGES } from "./consts";
import { CardTypeStyled, CreditCardNumberWrapperStyled, CreditCardNumberInputStyled } from "./styles";

type CreditCardNumberProps = {
    onChange: ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    cardType: CARD_TYPES;
};

export const CreditCardNumber: React.FC<CreditCardNumberProps> = ({ cardType, onChange, value }) => {
    const { t } = useTranslation("common");

    return (
        <CreditCardNumberWrapperStyled>
            {cardType && <CardTypeStyled src={CARD_IMAGES[cardType]} alt={cardType} />}
            <CreditCardNumberInputStyled placeholder={t("app.card-number")} onChange={onChange} value={value} />
        </CreditCardNumberWrapperStyled>
    );
};
