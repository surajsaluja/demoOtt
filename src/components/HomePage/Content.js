import React, { useRef, useCallback } from "react";
import { useFocusable, FocusContext } from "@noriginmedia/norigin-spatial-navigation";
import './Content.css'
import ContentRow from "./ContentRow";
// import { useNavigate } from "react-router-dom";
import { withRouter } from "react-router-dom";

const Content = ({focusKey : focusKeyParam, data , location, history}) =>{

    // const navigate = useNavigate();

    const {ref, focusKey} = useFocusable({
        focusKey : focusKeyParam,
        trackChildren: true,
        saveLastFocusedChild: true,
    });


    const onRowFocus = useCallback(({ y }) => {
            ref.current.scrollTo({
                top: y,
                behavior: 'smooth'
            });  
    }, [ref]);

    const onAssetPress = (item) =>{
       history.push("/detail",item.data);
    }



    return(<FocusContext.Provider value={focusKey}>
        <div className="ContentWrapper">
            <div className="ContentRow" ref={ref}>
                {data.map((item)=>(
                    <ContentRow 
                    title={item.playlistName} 
                    onFocus={onRowFocus} 
                    key={item.playlistId} 
                    data={item.playlistItems}
                    onAssetPress={onAssetPress} 
                    />    
                ))}
            </div>
        </div>  
    </FocusContext.Provider>)
}

export default withRouter(Content);