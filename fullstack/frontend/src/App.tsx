import { Component, ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import RegisterWrapper from "./pages/Register";
import EmailRegister from "./pages/EmailRegister";
import HomeWrapper from "./pages/Home";

class App extends Component {
  render(): ReactNode {
    return (
      <ChakraProvider>
        <Router>
          <Routes>
            {/* Route vers le composant principale de l'application */}
            <Route path="/" element={<HomeWrapper />} />
            {/* Route vers le type spécifié après sélection dans Home */}
            <Route path="/register/:type" element={<RegisterWrapper />} />
            {/* Route vers l'inscription par e-mail avec un type spécifié qui correspond au status du client 'agent' OU 'candidat' */}
            <Route path="/register/:type/email" element={<EmailRegister />} />
          </Routes>
        </Router>
      </ChakraProvider>
    );
  }
}

export default App;
