import { Container, Switch, withStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Definitions from "./components/Definitions";

function App() {
  const [word, setWord] = useState(""); // state for our word which w'll search for
  const [meanings, setMeanings] = useState([]); // state holding meanings from api
  const [category, setCategory] = useState("en"); // state for category, and default value is english
  const [LightTheme, setLightTheme] = useState(false); // creating state for dark and light mode

  const dictionaryApi = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      setMeanings(data.data); // setting state
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(meanings);

  useEffect(() => {
    dictionaryApi();   // calling api
  
  }, [word, category]); // as w'll call it everytime 


  // to switch between dark and light mode
  const ThemeSwitch = withStyles({
    switchBase: {
      color: grey[50],
      "&$checked": {
        color: grey[900],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  return (
    <>
      <div
        className="App"
        style={{
          height: "100vh",
          // if the lightMode is turned on, then style accordingly
          backgroundColor: LightTheme ? "#fff" : "#282c34",
          color: LightTheme ? "black" : "white",
          transition: "all 0.5s linear",
        }}
      >
        <Container
          maxWidth="md"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            justifyContent: "space-evenly",
          }}
        >
          <div
            style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}
          >
            {/* // if the lightmode is turned on, then its gonna render dark mode, else light */}
            <span>{LightTheme ? "Dark" : "Light"} Mode</span>
            {/* // rendering switch mode */}
            <ThemeSwitch
              checked={LightTheme}
              onChange={() => setLightTheme(!LightTheme)}
            />
          </div>
          {/* // sending details to header component */}
          <Header
            setWord={setWord}
            category={category}
            setCategory={setCategory}
            word={word}
            setMeanings={setMeanings}
            LightTheme={LightTheme}
          />

          {/* // sending details to Deifinition component */}
          {meanings && (
            <Definitions
              meanings={meanings}
              word={word}
              LightTheme={LightTheme}
              category={category}
            />
          )}
        </Container>
      </div>
    </>
  );
}

export default App;
