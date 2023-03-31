import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import SelectParent from "./Components/SelectParent";
import "./App.css";

const App = () => {
  const [realms, setRealms] = useState([]);
  const [region, setRegion] = useState("us");
  const [key, setKey] = useState(null);
  const [realm, setRealm] = useState("Mal'Ganis");
  const [firstFetch, setFirstFetch] = useState(true);

  const url = "http://localhost:5000/auth";

  const getToken = async () => {
    await axios
      .get(url)
      .then((data) => {
        if (firstFetch) {
          setKey(data.data.token);
          getRealms(data.data.token);
          setFirstFetch(false);
        }
      })
      .catch((e) => console.log(e));
  };

  const getRealms = async (token) => {
    await axios
      .get(
        `https://${region}.api.blizzard.com/data/wow/search/realm?namespace=dynamic-${region}&orderby=realmname:asc&_pageSize=500&_page=1&access_token=${token}`
      )
      .then((data) => {
        console.log(data.data.results);
        setRealms(
          data.data.results.map((el) => (el = el.data.name.en_US)).sort()
        );
      })
      .catch((e) => console.log(e));
  };

  const token = useQuery("auth", getToken);

  // const realmList = useQuery("realms", getRealms());

  useEffect(() => {
    token.refetch();
  }, []);

  return (
    <div>
      <SelectParent
        realms={realms}
        realm={realm}
        region={region}
        setRegion={setRegion}
        setRealm={setRealm}
        setRealms={setRealms}
        getToken={getToken}
        tokener={key}
      />
    </div>
  );
};

export default App;
