import "./App.css";
import { Provider } from "react-redux";
import store from "./utils/store";
import Layout from "./layouts/Layout";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Provider store={store}>
      <NavBar/>
      <Layout /> {/* ✅ Not <App /> again! */}
    </Provider>
  );
}

export default App;
