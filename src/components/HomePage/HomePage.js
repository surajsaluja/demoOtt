import React, { useEffect } from "react";
import { setFocus } from "@noriginmedia/norigin-spatial-navigation";
import DummyData from "./DummyMovies";
import Menu from "../Menu_Home/Menu";
import Content from "./Content";

const HomePage = () => {

    const keyDownHandler = (e) => {
        if (e.keyCode == 10009 || e.keyCode == 8) {
            if (window.tizen && window.tizen.application.getCurrentApplication()) {
                window.tizen.application.getCurrentApplication();
                return;
            }
        }

    }

    useEffect(() => {
        setFocus('Menu_Abc');
        window.addEventListener('keydown', keyDownHandler)
        return () => {
            window.removeEventListener("keydown", keyDownHandler);
        };
    }, []);

    const MenuItems = [{
        id: 1,
        label: 'Menu 1',
        icon: 'Home'
    }, {
        id: 2,
        label: 'Menu 2',
        icon: 'Home'
    }, {
        id: 3,
        label: 'Menu 3',
        icon: 'Home'
    }, {
        id: 4,
        label: 'Menu 4',
        icon: 'Home'
    }, {
        id: 5,
        label: 'Menu 5',
        icon: 'Home'
    }, {
        id: 6,
        label: 'Menu 6',
        icon: 'Home'
    }, {
        id: 7,
        label: 'Menu 7',
        icon: 'Home'
    }, {
        id: 8,
        label: 'Menu 8',
        icon: 'Home'
    }, {
        id: 9,
        label: 'Menu 9',
        icon: 'Home'
    }, {
        id: 10,
        label: 'Menu 10',
        icon: 'Home'
    }];

    return (<>
        <Menu focusKey='Menu_Abc' Menu={MenuItems} />
        <Content data={DummyData} />
    </>)
};

export default HomePage;