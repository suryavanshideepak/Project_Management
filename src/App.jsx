import React from "react";
import MyRouter from "./routes";
import MainContext from "./context/MainContext";

function App() {
  return (
    <MainContext>
      <MyRouter/>
    </MainContext>
  );
}

export default App;
