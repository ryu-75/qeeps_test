import React, { Component, ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import RegisterWrapper from "./pages/Register";
import EmailRegister from "./pages/EmailRegister";
import { UserBase } from "./stores/api/users/users";

interface AppState {
  data: UserBase[] | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      isError: false,
      error: null,
    };
  }

  // I think I should to centralize all data manipulation here and post values if I add new data in user data

  render(): ReactNode {
    // const { data, isLoading, isError, error } = this.state;

    // if (isLoading) return <div>Loading...</div>;
    // if (isError) return <div>Error: {error}</div>;

    return (
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register/:type" element={<RegisterWrapper />} />
            <Route path="/register/:type/email" element={<EmailRegister />} />
          </Routes>
        </Router>
      </ChakraProvider>
    );
  }
}

export default App;
