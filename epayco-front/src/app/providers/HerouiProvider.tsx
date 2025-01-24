"use client";

import React from "react";

import { HeroUIProvider } from "@heroui/react";

const HerouiProvider = ({children}: { children: React.ReactNode }) => {
  return (
    <HeroUIProvider>
        {children}
    </HeroUIProvider>
  )
}

export default HerouiProvider