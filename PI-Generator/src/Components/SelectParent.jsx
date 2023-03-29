import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

const SelectParent = ({ realms, realm, region }) => {
  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  console.log(realms);
  return (
    <div>
      {/* Region Select */}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="region">Region</InputLabel>
          <Select
            labelId="region"
            id="region"
            value={region}
            label="region"
            onChange={(e) => handleChange(e, setRegion)}
          >
            <MenuItem value={"us"}>US</MenuItem>
            <MenuItem value={"eu"}>EU</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* Realm Select */}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="realm">Realm</InputLabel>
          <Select
            labelId="realm"
            id="realm"
            value={realm}
            label="realm"
            onChange={(e) => handleChange(e, setRealm)}
          >
            {!realms
              ? null
              : realms.map((el, i) => (
                  <MenuItem value={el.data.realms[0].name.en_US || "unknown"}>
                    {`${el.data?.realms[0]?.name?.en_US}`}
                  </MenuItem>
                ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default SelectParent;
