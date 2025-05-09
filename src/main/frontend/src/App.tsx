import { useState, useEffect } from "react";
import Profile from "./Profile";
import Nav from "./Nav";
import AutoComplete from "./AutoComplete";
import AdvanceSearch from "./AdvanceSearch";
function App() {
  const [commander, setCommander] = useState<string>("Necrobloom");
  const [name, setName] = useState("")

  useEffect(() => {
    // Make the HTTP request when the component mounts
    fetch('http://localhost:8080/user')
      .then((res) => res.json())
      .then((data) => {
        setCommander(data.commander);
        setName(data.userName)
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []); // <-- empty array = run only once when the component mounts
  return (
    <>
      <Nav />
      <Profile commander={commander} name={name} />
      <AutoComplete />
      <AdvanceSearch />
    </>
  )
}

export default App;
