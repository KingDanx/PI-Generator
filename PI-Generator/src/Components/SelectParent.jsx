import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

const SelectParent = ({
  realms,
  realm,
  region,
  setRegion,
  setRealms,
  setRealm,
  tokener,
}) => {
  const [realmText, setRealmText] = useState("doggoshit");
  const realmSelect = useRef();
  // const realmText = useRef();
  // console.log(refetchRef.current);
  // refetch();
  const getRealms = async (region, token) => {
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

  const handleChange = (event, setState, callback) => {
    setState(event.target.value);
  };

  // console.log(realms);
  return (
    <div style={{ display: "flex" }}>
      {/* Region Select */}
      <Box sx={{ minWidth: 120 }}>
        <FormControl>
          <InputLabel id="region">Region</InputLabel>
          <Select
            labelId="region"
            id="region"
            value={region}
            label="region"
            onChange={(e) =>
              handleChange(e, setRegion, getRealms(e.target.value, tokener))
            }
          >
            <MenuItem value={"us"}>US</MenuItem>
            <MenuItem value={"eu"}>EU</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* Realm Select */}
      <Box sx={{ minWidth: 120 }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={realms}
          // value={realm}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Realms" />}
          onChange={(e) => handleChange(e, setRealm)}
        />
        {/* <Select
            labelId="realm"
            id="realm"
            value={realm}
            label="realm"
            onChange={(e) => handleChange(e, setRealm)}
            inputRef={realmSelect}
            disableTyping
          >
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              // inputRef={realmText}
              onInput={(e) => handleChange(e, setRealmText)}
            />
            {!realms
              ? null
              : realms.map((el, i) =>
                  el.data.name.en_US.includes(realmText) ? (
                    <MenuItem
                      key={el.data.name.en_US}
                      value={el.data.name.en_US}
                    >
                      {`${el.data?.name?.en_US}`}
                    </MenuItem>
                  ) : null
                )}
          </Select> */}
      </Box>
    </div>
  );
};

export default SelectParent;
