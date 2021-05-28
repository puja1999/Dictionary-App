import { createMuiTheme, TextField, ThemeProvider } from "@material-ui/core";
import React, { useCallback } from "react";
import "../styles/header.css";
import MenuItem from "@material-ui/core/MenuItem";
import countries from "../data/category";
import { debounce } from "lodash";

// sending as props, uisng destructuring
const Header = ({
  category,
  setCategory,
  setWord,
  word,
  setMeanings,
  LightTheme,
}) => {
  const darkTheme = createMuiTheme({
    palette: {
      primary: {
        // if the lightMode turned on,
        main: LightTheme ? "#000" : "#fff",
      },
      type: LightTheme ? "light" : "dark",
    },
  });

  const handleChange = (e) => {
    setCategory(e.target.value);
    setWord("");
    setMeanings([]);
  };

  const deb = useCallback(
    debounce((text) => setWord(text), 1000),
    []
  );

  const handleText = (text) => {
    deb(text);
  };

  return (
    <div className="header">
      {/* // if there is not any word then print word hunt */}
      <span className="title">{word ? word : "Dictionary"}</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          {/* // to input words  */}
          <TextField
            className="search"
            id="filled-basic"
            // value={word}
            label="Search Your Word"
            onChange={(e) => handleText(e.target.value)}
          />
          <TextField
            select
            label="Language"
            value={category}
            onChange={(e) => handleChange(e)}
            className="select"
          >
            {/* //to map through jaon data consisting all countries */}
            {countries.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
