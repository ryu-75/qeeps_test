import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { useGetUsersQuery } from "./stores/api/users";
import Home from "./pages/Home";
import Subscription from "./pages/Subscription.tsx";

function App() {
  // const { data, isLoading, isError } = useGetUsersQuery();
  // const [count, setCount] = useState(0);

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/register/:type`} element={<Subscription />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
