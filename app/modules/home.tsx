import React from 'react';
import { Buttons } from '../components/button';
import { HStack, VStack } from '../components/flexbox';
import DesktopLayout from '../components/layout';
import { DesktopHeader, HomeNav } from '../components/navbar';

const Home: React.FC<any> = ({ }) => {
    return (
        <DesktopLayout>
            <VStack className={'justify-center'} >
                <HStack className={"py-4"}>
                    <DesktopHeader />
                </HStack>
                <HStack className={"w-full justify-center py-4"}>
                    <HomeNav />
                </HStack>
                <HStack className={"justify-center py-4 bg-sea-green space-x-8 shadow-md"}>
                    <HStack>
                        <img className='w-[320px] h-[320px] rounded' src="/TPT HEADSHOT.jpg" />
                    </HStack>
                    <HStack className={"border rounded-md p-8 text-5xl max-w-[30%] font-jim-pam text-center items-center cursor-pointer"}>
                        Click here to sign up for freebies and updates!
                    </HStack>
                </HStack>
                <HStack className={"justify-center py-4 space-x-8"}>
                    <HStack>
                        <Buttons.Standard className=''>
                            <svg width="216" height="215" xmlns="http://www.w3.org/2000/svg" overflow="hidden"><defs><clipPath id="clip0"><rect x="-16" y="741" width="216" height="215" /></clipPath><clipPath id="clip1"><rect x="-15" y="742" width="215" height="214" /></clipPath><clipPath id="clip2"><rect x="-15" y="742" width="216" height="214" /></clipPath><clipPath id="clip3"><rect x="-15" y="742" width="216" height="214" /></clipPath></defs><g clip-path="url(#clip0)" transform="translate(16 -741)"><g clip-path="url(#clip1)"><g clip-path="url(#clip2)"><g clip-path="url(#clip3)"><path d="M171.646 77.575C151.583 55.7292 129.96 70.6646 113.465 74.4542 113.019 69.1042 111.681 64.2 110.121 59.5188 117.031 58.85 127.285 56.6208 134.419 49.2646 146.01 37.6729 144.896 18.0563 144.896 18.0563 144.896 18.0563 125.056 16.9417 113.688 28.5333 108.338 33.8833 105.663 41.0167 104.325 47.2583 94.5167 30.7625 80.25 22.0688 79.3583 21.4L72.4479 32.7687C72.6708 32.9917 96.7458 47.9271 100.09 74.2313 83.8167 70.2188 61.9708 55.7292 42.3542 77.3521 20.7313 101.204 39.2333 223.363 107.223 189.702 174.99 223.585 193.269 101.427 171.646 77.575Z" fill="#e9fffeff" fill-rule="nonzero" fill-opacity="0.65" transform="matrix(1.00467 0 0 1 -15 742)" /></g></g></g></g></svg>
                        </Buttons.Standard>
                        <Buttons.Standard className='relative'>
                            <span className={"font-boom-roasted absolute w-full top-[50%] left-0"}>Classroom Management Resources</span>
                            <img className='text-sea-green' src="/apple icon .svg" />
                        </Buttons.Standard>
                    </HStack>
                </HStack>
            </VStack>
        </DesktopLayout>
    )
}

export default Home;