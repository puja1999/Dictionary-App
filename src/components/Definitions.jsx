import React from "react";
import "../styles/definitions.css";

const Definitions = ({ meanings, word, LightTheme, category }) => {
  return (
    <div className="meanings">
      {/* audio---------------------------- */}
      {/* // if the word only available in meanings 0th index mns in the first element, if the cateogory is english, as audio can be only in english, if there is something inside the word*/}
      {meanings[0] && word && category === "en" && (
        <audio
          style={{ backgroundColor: "#fff", borderRadius: 10 }}
          src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
          controls
        >
          Your browser does not support the audio element.
        </audio>
      )}
      {/* audio---------------------------- */}

{/* // if there nothing, then render the text find any word */}
      {word === "" ? (
        <span className="subTitle">Find any word exist in the world</span>
      ) : (
        meanings.map((mean) =>
          mean.meanings.map((item) =>
            item.definitions.map((def) => (
              <div
                className="singleMean"
                style={{
                  // if the light mode turned on,
                  backgroundColor: LightTheme ? "teal" : "white",
                  color: LightTheme ? "white" : "black",
                }}
              >
                <b>{def.definition}</b>
                <hr style={{ backgroundColor: "black", width: "100%" }} />
                {def.example && (
                  <span>
                    <b>Example :</b> {def.example}
                  </span>
                )}
                {def.synonyms && (
                  <span>
                    {/* // since there are many synonyms so we have to map through it */}
                    <b>Synonyms :</b> {def.synonyms.map((s) => `${s}, `)}
                  </span>
                )}
              </div>
            ))
          )
        )
      )}
    </div>
  );
};

export default Definitions;

//#3b5360