import { useState, useEffect } from "react";
import Profile from "./Profile";
import Nav from "./Nav";
import AutoComplete from "./AutoComplete";
function App() {
  const [commander, setCommander] = useState<string>("Necrobloom");

  useEffect(() => {
    // Make the HTTP request when the component mounts
    fetch('http://localhost:8080/getCommander')
      .then((res) => res.json())
      .then((data) => {
        setCommander(data.commander);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []); // <-- empty array = run only once when the component mounts
  return (
    <>
      <Nav />
      <Profile commander={commander} />
      <AutoComplete />
    </>
  )
}

export default App;
