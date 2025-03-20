import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react";
import Home from "./page";
import "@testing-library/jest-dom";

interface MotionDivProps {
  children: React.ReactNode;
  whileHover?: Record<string, unknown>;
  whileTap?: Record<string, unknown>;
  [key: string]: unknown;
}

// Mock framer-motion to avoid animation-related issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, whileHover, whileTap, ...props }: MotionDivProps) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("Home Component", () => {
  it("renders the main heading and initial content", () => {
    render(<Home />);

    // Check main elements are present
    expect(screen.getByText("Wedding Invitation")).toBeInTheDocument();
    expect(
      screen.getByText("Join us in celebrating our special day")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Open Invitation" })
    ).toBeInTheDocument();
  });

  it("shows invitation details when Open Invitation button is clicked", async () => {
    render(<Home />);

    // Click the Open Invitation button
    const openButton = screen.getByRole("button", { name: "Open Invitation" });
    await act(async () => {
      fireEvent.click(openButton);
    });

    // Check if invitation details are displayed
    expect(screen.getByText("Sarah & John")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We are delighted to invite you to our wedding celebration"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Saturday, December 31st, 2024")
    ).toBeInTheDocument();
    expect(screen.getByText("4:00 PM")).toBeInTheDocument();
    expect(
      screen.getByText("123 Wedding Lane, New York, NY 10001")
    ).toBeInTheDocument();
  });

  it("hides invitation details when Close button is clicked", async () => {
    render(<Home />);

    // Open the invitation
    const openButton = screen.getByRole("button", { name: "Open Invitation" });
    await act(async () => {
      fireEvent.click(openButton);
    });

    // Close the invitation
    const closeButton = screen.getByRole("button", { name: "Close" });
    await act(async () => {
      fireEvent.click(closeButton);
    });

    // Check if invitation details are no longer displayed
    expect(screen.queryByText("Sarah & John")).not.toBeInTheDocument();
  });

  it("renders all icons correctly", () => {
    render(<Home />);

    // Check if the heart icon is present
    expect(screen.getByTestId("heart-icon")).toBeInTheDocument();

    // Open the invitation to check other icons
    const openButton = screen.getByRole("button", { name: "Open Invitation" });
    fireEvent.click(openButton);

    // Check if all icons in the invitation details are present
    expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
    expect(screen.getByTestId("clock-icon")).toBeInTheDocument();
    expect(screen.getByTestId("map-pin-icon")).toBeInTheDocument();
  });

  it("applies correct styles and animations", () => {
    render(<Home />);

    // Check if main container has correct background classes
    const mainElement = screen.getByRole("main");
    expect(mainElement).toHaveClass(
      "min-h-screen",
      "bg-gradient-to-br",
      "from-pink-50",
      "via-white",
      "to-pink-100"
    );

    // Check if button has correct styles
    const openButton = screen.getByRole("button", { name: "Open Invitation" });
    expect(openButton).toHaveClass(
      "bg-pink-600",
      "hover:bg-pink-700",
      "text-white",
      "rounded-full"
    );
  });
});
