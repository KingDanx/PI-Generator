import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import SelectParent from "./Components/SelectParent";
import "./App.css";

const App = () => {
  const [count, setCount] = useState(0);
  let auth;
  const [realms, setRealms] = useState([]);
  const [region, setRegion] = useState("us");
  const [realm, setRealm] = useState("us");

  const url = "http://localhost:5000/auth";

  const getToken = async () => {
    await axios
      .get(url)
      .then((data) => (auth = data.data.token))
      .catch((e) => console.log(e));
  };

  const getRealms = async () => {
    await axios
      .get(
        `https://${region}.api.blizzard.com/data/wow/search/connected-realm?namespace=dynamic-${region}&orderby=name&_page=1&access_token=${auth}`
      )
      .then((data) => {
        console.log(data.data.results);
        setRealms(data.data.results);
      });
  };

  const token = useQuery("auth", getToken);

  const realmList = useQuery("realms", getRealms);

  return (
    <div>
      <SelectParent auth={auth} realms={realms} realm={realm} region={region} />
    </div>
  );
};

export default App;
