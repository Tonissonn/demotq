import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./hooks/userProvider";
import Main from "./pages/main/main";
import store from "./redux/store";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Routes>
          <Route
            path="*"
            element={
              <Provider store={store}>
                <Main />
              </Provider>
            }
          />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
