import React, { useCallback, useEffect, useState, useRef } from 'react';
import './HomePage_Sample1.css'; // Import the CSS file
import DummyData from '../HomePage/DummyMovies';
import {
  useFocusable,
  FocusContext,
  setFocus,
} from '@noriginmedia/norigin-spatial-navigation';

const logo = require('../logo.svg').default;


function MenuItem() {
  const { ref, focused } = useFocusable();
  return <div ref={ref} className={`menu-item-box ${focused ? 'focused' : ''}`} />;
}

function Menu({ focusKey }) {
  const {
    ref,
    hasFocusedChild,
    focusKey: currentFocusKey
  } = useFocusable({
    focusable: true,
    saveLastFocusedChild: true,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    focusKey,
    preferredChildFocusKey: null,
    onEnterPress: () => {},
    onEnterRelease: () => {},
    onArrowPress: () => true,
    onArrowRelease: () => {},
    onFocus: () => {},
    onBlur: () => {},
    extraProps: { foo: 'bar' }
  });

  return (
    <FocusContext.Provider value={currentFocusKey}>
      <div ref={ref} className={`menu-wrapper ${hasFocusedChild ? 'has-focused-child' : ''}`}>
        <img src={logo} className="nm-logo" alt="Logo" />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </FocusContext.Provider>
  );
}

function Asset({ title, color, onEnterPress, onFocus }) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    onFocus,
    extraProps: { title, color }
  });

  return (
    <div ref={ref} className="asset-wrapper">
      <div className={`asset-box ${focused ? 'focused' : ''}`} style={{ backgroundColor: color }} />
      <div className="asset-title">{title}</div>
    </div>
  );
}

function ContentRow({ title, onAssetPress, onFocus, data }) {
  const { ref, focusKey } = useFocusable({ onFocus });
  const scrollingRef = useRef(null);

  const onAssetFocus = useCallback(
    ({ x }) => {
      scrollingRef.current.scrollTo({
        left: x,
        behavior: 'smooth'
      });
    },
    [scrollingRef]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="content-row-wrapper">
        <div className="content-row-title">{title}</div>
        <div className="content-row-scrolling-wrapper" ref={scrollingRef}>
          <div className="content-row-scrolling-content">
            {data.map((item, index) => (
              <Asset
                index={index}
                title={item.title}
                key={item.mediaID}
                color={'blue'}
                onEnterPress={onAssetPress}
                onFocus={onAssetFocus}
              />
            ))}
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  );
}

function Content({ focusKey: focusKeyParam }) {
  const { ref, focusKey } = useFocusable({
    focusKey: focusKeyParam
  });
  const [selectedAsset, setSelectedAsset] = useState(null);

  const onAssetPress = useCallback((asset) => {
    setSelectedAsset(asset);
  }, []);

  const onRowFocus = useCallback(
    ({ y }) => {
      ref.current.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    },
    [ref]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <div className="content-wrapper">
        <div className="content-title">KableOne</div>
        <div className="scrolling-rows" ref={ref}>
          <div>
            {DummyData.map((item) => (
              <ContentRow
                key={item.playListId}
                title={item.playlistName}
                onAssetPress={onAssetPress}
                onFocus={onRowFocus}
                data={item.playlistItems}
              />
            ))}
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  );
}

function HomePage_Sample1() {
  useEffect(() => {
    setFocus('MENU');
  }, []);

  return (
    <div className="app-container hide-scrollbar">
      <Menu focusKey="MENU" />
      <Content focusKey='ABC' />
    </div>
  );
}

export default HomePage_Sample1;