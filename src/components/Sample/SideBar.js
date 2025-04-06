import React, { useEffect, useState } from "react";
import "./SideBar.css"; // Ensure styling for sidebar animations
import { setFocus, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import FocusableButton from "./FocusableButton";

const SideBar = ({ isOpen, onClose, onEnterPress, captions, selectedCaption, onCaptionSelect }) => {

    const { ref, focused } = useFocusable({
        onEnterPress
    });

    useEffect(() => {
        setFocus('Menu_T1');
    }, [isOpen])

    return (
        <div id='sideBar' className={`sidebar ${isOpen ? "open" : ""}`}>
            <div ref={ref} style={{
                display: 'flex', flex: 1, flexDirection: 'row',
                gap: '20px'
            }}>
                <FocusableButton text={'Menu'} focuskey={'Menu_T1'} />
                <FocusableButton text={'Audio'} />
                {captions.length > 0 && (
                    <>
                        <h3>Captions</h3>
                        {captions.map((caption) => (
                            <FocusableButton
                                key={caption.id}
                                text={caption.label}
                                onEnterPress={() => onCaptionSelect(caption.id)}
                                isSelected={caption.id === selectedCaption}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default SideBar