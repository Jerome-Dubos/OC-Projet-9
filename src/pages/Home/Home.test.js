import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./Home";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<Home />);
    const allTitleElements = await screen.findAllByText(/nos réalisations/i);
    const firstTitleElement = allTitleElements[0];
    expect(firstTitleElement).toBeInTheDocument();
  })
  it("a list a people is displayed", async () => {
    render(<Home />);
    await screen.findByText("Isabelle");
  })
  it("a footer is displayed", async () => {
    render(<Home />);
    await screen.findByText("Contactez-nous");
  })
  it("an event card, with the last event, is displayed", async () => {
    render(<Home />);
   const allTitleElements = await screen.findAllByText(/conférence/i);
   const firstTitleElement = allTitleElements[0];
   expect(firstTitleElement).toBeInTheDocument();
  })
});
