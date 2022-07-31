import Carousel from 'nuka-carousel';
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Buttons } from '../components/button';
import { HStack, VStack } from '../components/flexbox';
import DesktopLayout from '../components/layout';
import { DesktopHeader, HomeNav } from '../components/navbar';

const Home: React.FC<any> = ({ }) => {
    return (
        <DesktopLayout>
            <VStack className={'justify-center'} >
                <HStack className={"py-8"}>
                    <DesktopHeader />
                    <HomeNav />
                </HStack>
                <HStack className='px-16 justify-center'>
                    <Carousel
                        wrapAround={true}
                        renderCenterLeftControls={({previousSlide}) => {
                            return (
                                <div className='px-2 cursor-pointer' onClick={previousSlide}>
                                    <HStack className='rounded-[50%] justify-center bg-white opacity-80'>
                                        <FiChevronLeft className='text-deep-orange w-[32px] h-[32px]'/>
                                    </HStack>
                                </div>
                            )
                        }}
                        renderCenterRightControls={({nextSlide}) => {
                            return (
                                <div className='px-2 cursor-pointer' onClick={nextSlide}>
                                    <HStack className='rounded-[50%] justify-center bg-white opacity-80'>
                                        <FiChevronRight className='text-deep-orange w-[32px] h-[32px]'/>
                                    </HStack>
                                </div>
                            )
                        }}
                        defaultControlsConfig={
                            {
                                pagingDotsClassName: 'px-4',
                                pagingDotsStyle: {
                                    fill: 'white'
                                }
                            }
                        }
                    >
                        <img className='w-[100vw] rounded' src="/1.svg" />
                        <img className='w-[100vw] rounded' src="/2.svg" />
                        <img className='w-[100vw] rounded' src="/3.svg" />
                        <img className='w-[100vw] rounded' src="/4.svg" />
                    </Carousel>
                </HStack>
                <VStack className="bg-white">
                    <HStack className={"justify-center py-4 space-x-8"}>
                        <span className={'text-[64px] font-little-spark text-pink font-semibold'}>Featured Post</span>
                    </HStack>
                    <HStack className="justify-center py-4">
                        <HStack className="bg-white rounded justify-center p-8 space-x-4 border hover:shadow-lg cursor-pointer">
                            <HStack>
                                Placeholder Image
                            </HStack>
                            <HStack>Blog post description goes here</HStack>
                        </HStack>
                    </HStack>
                </VStack>
            </VStack>
        </DesktopLayout>
    )
}

export default Home;