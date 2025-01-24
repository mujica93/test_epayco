"use client"
import React, { useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@heroui/react";

const NavbarComponent = () => {

    const EpaycoLogo = () => {
        return (
            <img src="/images/epayco_logo.png" alt="" height={100} width={100}/>
        );
    };

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        {
            label: "Inicio",
            route: "/",
        },
        {
            label: "Registro",
            route: "/auth/register",
        },
        {
            label: "Consultar saldo",
            route: "/wallet/detail",
        },
        {
            label: "Recargar saldo",
            route: "/wallet/charge",
        },
        {
            label: "Realizar compra",
            route: "/wallet/buy",
        }
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isBordered >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <EpaycoLogo />
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">

                {
                    menuItems.map((item, index) => (
                        <NavbarItem key={`${item}-${index}`} isActive={item.route === window.location.pathname}>
                            <Link  
                                href={item.route}
                                style={{
                                    padding: "0.5rem 1rem",
                                    borderRadius: "0.5rem",
                                    backgroundColor: item.route === window.location.pathname ? "#f0f0f0" : "transparent",
                                    color: "#1c0e49"
                                }}
                            >
                                {item.label}   
                            </Link>
                        </NavbarItem>
                    ))
                }
            </NavbarContent>
            <NavbarContent justify="end">
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`} isActive={item.route === window.location.pathname}>
                    <Link
                        className="w-full"
                        href={item.route}
                        size="lg"
                        style={{
                            padding: "0.5rem 1rem",
                            borderRadius: "0.5rem",
                            color: "#1c0e49"
                        }}
                    >
                        {item.label}
                    </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );

};

export default NavbarComponent;