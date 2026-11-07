import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { RiskBadge } from "./RiskBadge";

describe("RiskBadge", () => {
  it("shows the translated label and the numeric result", () => {
    render(<RiskBadge nivelRiesgo="intolerable" resultado={20} />);
    expect(screen.getByText("Intolerable (20)")).toBeInTheDocument();
  });
});
