import React from "react";
import { render } from "@testing-library/react";
import { Header } from "./Header";

describe("<Header />", () => {
    const setup = () => {
        const utils = render(<Header>Test title</Header>);

        return { ...utils };
    };

    it("should renders passed title", () => {
        const { getByText } = setup();

        expect(getByText("Test title")).toBeVisible();
    });

    it("should show PL and EN languages buttons", () => {
        const { getByText } = setup();

        expect(getByText("PL")).toBeVisible();
        expect(getByText("EN")).toBeVisible();
    });
});
