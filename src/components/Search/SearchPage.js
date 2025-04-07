import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import React, { useState, useRef, useEffect } from "react";

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null);
  const {ref} = useFocusable();

  useEffect(()=>{
    inputRef.current.focus();
  },[])

  const openTizenKeyboard = () => {
    try{
    if (window.webapis && window.webapis.avplay && window.tizen) {
      // Focus the input field
      inputRef.current.focus();

      // Launch the IME keyboard for Tizen
      window.tizen.tvinputdevice.registerKey("Enter");
      window.tizen.tvinputdevice.getSupportedKeys();
      
      const ime = new window.tizen.ime.InputMethod();
      ime.show();
    } else {
      console.log("Tizen APIs are not available.");
    }
} catch (e){
    console.log('Tizen Ime ' + e);
}
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    // Handle search logic here
    console.log("Searching for:", searchText);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Tizen Search Page</h2>
      <FocusContext.Provider value="search">
        <div ref={ref}>
        <input
        type="text"
        value={searchText}
        ref={inputRef}
        onChange={handleInputChange}
        onFocus={openTizenKeyboard}
        style={styles.input}
        placeholder="Type to search..."
      />
      <button onClick={handleSearch} style={styles.button}>Search</button>
        </div>
      </FocusContext.Provider>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    background: "#111",
    color: "#fff",
    height: "100vh",
  },
  heading: {
    marginBottom: "20px",
  },
  input: {
    width: "60%",
    fontSize: "24px",
    padding: "10px",
  },
  button: {
    fontSize: "20px",
    marginLeft: "10px",
    padding: "10px 20px",
  },
};

export default SearchPage;
