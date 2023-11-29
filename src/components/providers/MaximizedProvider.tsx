"use client";
import React from "react";
import {useState, cloneElement, ReactElement} from "react";

type MinimizedProviderProps = {
  children: ReactElement;
};

const MinimizedProvider = ({children}: MinimizedProviderProps) => {
  return <> {children} </>;
};

export default MinimizedProvider;
