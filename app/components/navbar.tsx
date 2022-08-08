import { HStack, VStack } from "./flexbox";
import { FiExternalLink, FiInstagram, FiSearch } from "react-icons/fi";
import { FaPinterestP } from 'react-icons/fa';
import React from "react";
import { Buttons } from "./button";
import { useRouter } from "next/router";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface Section {
    title: string,
    component?: React.ReactNode
}

const NavButton: React.FC<HTMLBaseElement & any> = (props: HTMLBaseElement & {
    href: string,
    title: string
}) => {
    return (
        <HStack {...props}>
            <a href={props.href}>
                <span>{props.title}</span>
            </a>

        </HStack>
    )
}

const sections: Section[] = [
    {
        title: 'Home',
        component: <NavButton title="Home" href="/app/home" />
    },
    {
        title: 'About',
        component: <NavButton title="About" href="/app/about" />
    },
    {
        title: 'Shop',
        component:
            <a href="https://www.teacherspayteachers.com/Store/The-Very-Tiny-Teacher" target={"_blank"}>
                <NavButton title="Shop" />
            </a>
    },
    {
        title: 'Blog',
        component: <NavButton title="Blog" href="/app/blog" />
    }
]

export const DesktopHeader: React.FC<any> = (props) => {
    return (
        <HStack {...props} className="items-center w-full justify-center">
            <img className={"h-[200px]"} src="/website_header.png" />
        </HStack>)
}

const DesktopNav = (props) => {
    return (
        <HStack className={"bg-pink w-full h-12 px-4 shadow-md"}>
            {/* <HStack className="space-x-2 w-full items-center">
                {sections.map((item, index) => {
                    return (
                        <div key={index} className="p-2 text-white text-3xl">
                            {item.component}
                        </div>
                    )
                })}
            </HStack> */}
            <HStack className="p-2 space-x-4 justify-end w-full">
                <a href="https://www.instagram.com/theverytinyteacher/" target={"_blank"}>
                    <FiInstagram className="w-[32px] h-[32px] text-white" />
                </a>
                {/* <a href="https://www.instagram.com/theverytinyteacher/" target={"_blank"}>
                    <FaPinterestP className="w-full h-full text-white" />
                </a>  */}
            </HStack>
        </HStack>
    )
}

const ShopDropdownButton: React.FC<{}> = () => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Buttons.Standard className="flex h-full bg-deep-orange rounded-md px-2 hover:shadow-md">
                    <VStack className="h-full justify-end">
                        <img src="/Shop Icon.svg" />
                        <span className="font-jim-pam text-3xl font-extrabold">SHOP</span>
                    </VStack>
                </Buttons.Standard>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content 
                className="rounded shadow-lg p-6 bg-white"
                style={{ 
                    left: '0',
                    zIndex: '1000'
                }}
            >
                <DropdownMenu.Item className="py-2 text-deep-orange">
                    <a href={""} target={"_blank"}>
                        <HStack className="items-center space-x-4">
                            <div>Amazon Store</div>
                            <FiExternalLink/>
                        </HStack>
                    </a>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="py-2 text-deep-orange">
                    <a href={"https://www.teacherspayteachers.com/Store/The-Very-Tiny-Teacher"} target={"_blank"}>
                        <HStack className="items-center space-x-4">
                            <div>Teachers Pay Teachers</div>
                            <FiExternalLink/>
                        </HStack>
                    </a>
                </DropdownMenu.Item>
            </DropdownMenu.Content>

        </DropdownMenu.Root>
    )
}

export const HomeNav: React.FC<any> = (props) => {
    const router = useRouter();

    return (
        <HStack className={"w-full space-x-10 justify-center py-4"}>
            <Buttons.Standard className="flex bg-powder-blue rounded-md px-2 hover:shadow-md" onClick={() => {
                router.push("/");
            }}>
                <VStack className="h-full justify-end">
                    <img src="/home button.svg" />
                    <span className="font-jim-pam text-3xl font-extrabold">HOME</span>
                </VStack>
            </Buttons.Standard>
            <Buttons.Standard className="flex bg-sea-green rounded-md px-2 hover:shadow-md" onClick={() => {
                router.push("/app/about");
            }}>
                <VStack className="h-full justify-end">
                    <img className="max-h-[140px]" src="/About Me Icon.svg" />
                    <span className="font-jim-pam text-3xl font-extrabold">ABOUT ME</span>
                </VStack>
            </Buttons.Standard>
            <HStack>
                <ShopDropdownButton />
            </HStack>
            <Buttons.Standard
                className="flex bg-pink rounded-md px-2 hover:shadow-md"
                onClick={() => { router.push("/app/blog") }}
            >
                <VStack className="h-full justify-end">
                    <img src="/Blog Icon.svg" />
                    <span className="font-jim-pam text-3xl font-extrabold">BLOG</span>
                </VStack>
            </Buttons.Standard>
        </HStack>
    )
}

const NavBar = (props) => {
    return (
        <DesktopNav />
    )
}

export default NavBar;