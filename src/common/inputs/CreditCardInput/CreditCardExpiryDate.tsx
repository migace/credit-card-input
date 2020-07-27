import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import { CreditCardInputStyled } from "./styles";

type CreditCardExpiryDateProps = {
    onChange: ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => void;
    value: string;
};

export const CreditCardExpiryDate: React.FC<CreditCardExpiryDateProps> = ({ onChange, value }) => {
    const { t } = useTranslation("common");

    return <CreditCardInputStyled placeholder={t("app.expiryDatePlaceholder")} onChange={onChange} value={value} />;
};
