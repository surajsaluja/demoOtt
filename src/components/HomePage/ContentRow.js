import React, { useRef, useCallback } from "react";
import { useFocusable, FocusContext } from "@noriginmedia/norigin-spatial-navigation";
import './ContentRow.css'
import Asset from "./Asset";

const ContentRow = ({ title, onAssetPress, onFocus, data, focusKey }) => {
    const { ref, focusKey: currentFocusKey, hasFocusedChild } = useFocusable({
        focusKey,
        trackChildren: true,
        saveLastFocusedChild: true,
        onFocus
    });

    const scrollingRowRef = useRef(null);

    const onAssetFocus = useCallback(({ x }) => {
            scrollingRowRef.current.scrollTo({
                left: x,
                behavior: 'smooth'
            });
        
    }, [scrollingRowRef]);

    return (
        <>
        <FocusContext.Provider value={currentFocusKey}>
            <div ref={ref} className={`contentRowWrapper ${hasFocusedChild ? 'RowFocused' : ''}`}>
                <div className='ContentRowTitle'>
                    {title}
                </div>
                <div className="ContentRowScrollingWrapper" ref={scrollingRowRef}>
                    <div className="ContentRowScrollingContent">
                        {data.map((item,index) => (
                           <Asset
                           index={index}
                           title={item.title}
                           key={item.mediaID}
                           color={'blue'}
                           image={item.mobileThumbnail}
                           data={item}
                           onEnterPress={onAssetPress}
                           onFocus={onAssetFocus}
                         />
                        ))}
                    </div>
                </div>
            </div>
        </FocusContext.Provider>
        </>
    );

};

export default ContentRow;