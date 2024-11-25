/* istanbul ignore file */
import "./App.scss";
import Page from "./pages/Home/Home";
import { DataProvider } from "./contexts/DataContext/DataContext";

function App() {
  return (
    <DataProvider>
      <Page />
    </DataProvider>
  );
}

export default App;
