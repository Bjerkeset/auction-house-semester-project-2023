"use client";
import React from "react";
import {useState, cloneElement, ReactElement} from "react";

type MinimizedProviderProps = {
  children: ReactElement;
};

const MinimizedProvider = ({children}: MinimizedProviderProps) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
    console.log("isMinimized in MinimizedProvider", isMinimized);
  };

  const childrenWithProps = cloneElement(children, {isMinimized});

  return <div onClick={toggleMinimized}>{childrenWithProps}</div>;
};

export default MinimizedProvider;
