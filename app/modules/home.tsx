import Carousel from 'nuka-carousel';
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Buttons } from '../components/button';
import { HStack, VStack } from '../components/flexbox';
import { DefaultLayout } from '../components/layout';
import NavBar, { DesktopHeader, HomeNav } from '../components/navbar';
import { useGetLatestBlogQuery } from '../src/generated/graphql';
import { BlogPost, BlogPreview } from './blog/blog';
import { useRouter } from 'next/router';

// const HomePageSec

const Home: React.FC<any> = ({ }) => {
    const { data, loading } = useGetLatestBlogQuery();
    const router = useRouter();

    return (
        <DefaultLayout>
            <VStack className={'justify-center'} >
                <HStack className={""}>
                    {/* <DesktopHeader /> */}
                    <HomeNav />
                </HStack>
                <HStack className="flex flex-col items-center py-12 shadow">
                    {/* <span className="font-lobster font-semibold text-pink text-[64px]">resources</span> */}

                    <HStack className='px-16 justify-center'>
                        <Carousel
                            wrapAround={true}
                            renderCenterLeftControls={({ previousSlide }) => {
                                return (
                                    <div className='px-2 cursor-pointer' onClick={previousSlide}>
                                        <HStack className='rounded-[50%] justify-center bg-white opacity-80'>
                                            <FiChevronLeft className='text-deep-orange w-[32px] h-[32px]' />
                                        </HStack>
                                    </div>
                                )
                            }}
                            renderCenterRightControls={({ nextSlide }) => {
                                return (
                                    <div className='px-2 cursor-pointer' onClick={nextSlide}>
                                        <HStack className='rounded-[50%] justify-center bg-white opacity-80'>
                                            <FiChevronRight className='text-deep-orange w-[32px] h-[32px]' />
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
                </HStack>
                <HStack className="flex flex-col py-16 px-64 gap-y-4">
                    <span className="font-lobster font-bold text-pink text-[64px]">sarah adler</span>
                    <span className="font-jim-pam text-pink font-semibold text-[32px] w-[70%]">A very fine teacher. A fantastic teacher. Some say the best of the rest. Checkout her materials and blog insights here.</span>
                    <Buttons.Standard onClick={() => {
                        router.push("/app/blogs");   
                    }} className="border border-pink rounded-md w-[100px] shadow">
                        <span className="font-lobster text-pink">Latest Blog</span>
                    </Buttons.Standard>
                </HStack>
            </VStack>
        </DefaultLayout>
    )
}

export default Home;