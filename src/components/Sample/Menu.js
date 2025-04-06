import React from "react";
import { FocusContext, useFocusable, init } from "@noriginmedia/norigin-spatial-navigation";
import { useEffect } from "react";

function MenuItem() {
    const { ref, focused } = useFocusable();
  
    return (
      <div
        ref={ref}
        style={{
          width: '171px',
          height: '51px',
          backgroundColor: '#b056ed',
          border: focused ? '6px solid white' : 'none',
          borderRadius: '7px',
          marginBottom: '37px',
          boxSizing: 'border-box',
        }}
      />
    );
  }
  
  function Menu({ focusKey: focusKeyParam }) {
    const {
      ref,
      focusSelf,
      hasFocusedChild,
      focusKey,
    } = useFocusable({
      focusable: true,
      trackChildren: true,
      autoRestoreFocus: true,
      focusKey: focusKeyParam,
    });
  
    useEffect(() => {
      focusSelf();
    }, [focusSelf]);
  
    return (
      <FocusContext.Provider value={focusKey}>
        <div
          ref={ref}
          style={{
            flex: 1,
            maxWidth: '246px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: hasFocusedChild ? '#4e4181' : '#362C56',
            paddingTop: '37px',
          }}
        >
          {[...Array(5)].map((_, index) => (
            <MenuItem key={index} />
          ))}
        </div>
      </FocusContext.Provider>
    );
  }
  

  export default Menu