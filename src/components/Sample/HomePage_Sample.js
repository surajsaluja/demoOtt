import React, { useCallback, useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import styled, { createGlobalStyle } from 'styled-components';
import shuffle from 'lodash/shuffle';

import DummyData from '../HomePage/DummyMovies';
import {
  useFocusable,
  FocusContext,
  setFocus,
} from '@noriginmedia/norigin-spatial-navigation'

const logo = require('./logo.svg').default;


const rows = shuffle([
  { title: 'Recommended' },
  { title: 'Movies' },
  { title: 'Series' },
  { title: 'TV Channels' },
  { title: 'Sport' }
]);

const assets = [
  { title: 'Asset 1', color: '#714ADD' },
  { title: 'Asset 2', color: '#AB8DFF' },
  { title: 'Asset 3', color: '#512EB0' },
  { title: 'Asset 4', color: '#714ADD' },
  { title: 'Asset 5', color: '#AB8DFF' },
  { title: 'Asset 6', color: '#512EB0' },
  { title: 'Asset 7', color: '#714ADD' },
  { title: 'Asset 8', color: '#AB8DFF' },
  { title: 'Asset 9', color: '#512EB0' }
];

const MenuItemBox = styled.div`
  width: 171px;
  height: 51px;
  background-color: #b056ed;
  border-color: white;
  border-style: solid;
  border-width: ${({ focused }) => (focused ? '6px' : 0)};
  box-sizing: border-box;
  border-radius: 7px;
  margin-bottom: 37px;
`;

function MenuItem() {
  const { ref, focused } = useFocusable();
  return <MenuItemBox ref={ref} focused={focused} />;
}

const MenuWrapper = styled.div`
  flex: 1;
  max-width: 246px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ hasFocusedChild }) =>
    hasFocusedChild ? '#4e4181' : '#362C56'};
  padding-top: 37px;
`;

const NmLogo = styled.img`
  height: 57px;
  width: 175px;
  margin-bottom: 51px;
`;

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
      <MenuWrapper ref={ref} hasFocusedChild={hasFocusedChild}>
        <NmLogo src={logo} />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </MenuWrapper>
    </FocusContext.Provider>
  );
}

const AssetWrapper = styled.div`
  margin-right: 22px;
  display: flex;
  flex-direction: column;
`;

const AssetBox = styled.div`
  width: '225px';
  height: 127px;
  background-color: ${({ color }) => color};
  border-color: white;
  border-style: solid;
  border-width: ${({ focused }) => (focused ? '6px' : 0)};
  box-sizing: border-box;
  border-radius: 7px;
`;

const AssetTitle = styled.div`
  color: white;
  margin-top: 10px;
  font-family: 'Segoe UI';
  font-size: 24px;
  font-weight: 400;
`;

function Asset({ title, color, onEnterPress, onFocus, isShuffleSize, index }) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    onFocus,
    extraProps: { title, color }
  });

  return (
    <AssetWrapper ref={ref}>
      <AssetBox
        index={index}
        color={color}
        focused={focused}
        isShuffleSize={isShuffleSize}
      />
      <AssetTitle>{title}</AssetTitle>
    </AssetWrapper>
  );
}

const ContentRowWrapper = styled.div`
  margin-bottom: 37px;
`;

const ContentRowTitle = styled.div`
  color: white;
  margin-bottom: 22px;
  font-size: 27px;
  font-weight: 700;
  font-family: 'Segoe UI';
  padding-left: 60px;
`;

const ContentRowScrollingWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  flex-shrink: 1;
  flex-grow: 1;
  padding-left: 60px;
`;

const ContentRowScrollingContent = styled.div`
  display: flex;
  flex-direction: row;
`;

function ContentRow({ title, onAssetPress, onFocus, isShuffleSize,data }) {
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
      <ContentRowWrapper ref={ref}>
        <ContentRowTitle>{title}</ContentRowTitle>
        <ContentRowScrollingWrapper ref={scrollingRef}>
          <ContentRowScrollingContent>
            {data.map((item, index) => (
              <Asset
                index={index}
                title={item.title}
                key={item.mediaID}
                color={'blue'}
                onEnterPress={onAssetPress}
                onFocus={onAssetFocus}
                isShuffleSize={isShuffleSize}
              />
            ))}
          </ContentRowScrollingContent>
        </ContentRowScrollingWrapper>
      </ContentRowWrapper>
    </FocusContext.Provider>
  );
}

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ContentTitle = styled.div`
  color: white;
  font-size: 48px;
  font-weight: 600;
  font-family: 'Segoe UI';
  text-align: center;
  margin-top: 52px;
  margin-bottom: 37px;
`;

const SelectedItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectedItemBox = styled.div`
  height: 282px;
  width: 1074px;
  background-color: ${({ color }) => color};
  margin-bottom: 37px;
  border-radius: 7px;
`;

const SelectedItemTitle = styled.div`
  position: absolute;
  bottom: 75px;
  left: 100px;
  color: white;
  font-size: 27px;
  font-weight: 400;
  font-family: 'Segoe UI';
`;

const ScrollingRows = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 1;
  flex-grow: 1;
`;

function Content({focusKey : focusKeyParam}) {
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
      <ContentWrapper>
        <ContentTitle>Norigin Spatial Navigation</ContentTitle>
        <ScrollingRows ref={ref}>
          <div>
            {DummyData.map((item) => (
              <ContentRow
                key={item.playListId}
                title={item.playlistName}
                onAssetPress={onAssetPress}
                onFocus={onRowFocus}
                isShuffleSize={Math.random() < 0.5}
                data = {item.playlistItems}
              />
            ))}
          </div>
        </ScrollingRows>
      </ContentWrapper>
    </FocusContext.Provider>
  );
}

const AppContainer = styled.div`
  background-color: #221c35;
  width: 1440px;
  height: 810px;
  display: flex;
  flex-direction: row;
`;

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none;
  }
`;

function HomePage_Sample() {
    useEffect(() => {
        setFocus('MENU');
      }, []);
  return (
      <AppContainer>
        <GlobalStyle />
        <Menu focusKey="MENU" />
        <Content focusKey='ABC'/>
      </AppContainer>
  );
}

export default HomePage_Sample