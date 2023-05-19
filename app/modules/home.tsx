import Carousel from 'nuka-carousel';
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Buttons } from '../components/button';
import { HStack, VStack } from '../components/flexbox';
import DesktopLayout from '../components/layout';
import { DesktopHeader, HomeNav } from '../components/navbar';
import { useGetLatestBlogQuery } from '../src/generated/graphql';
import { BlogPost, BlogPreview } from './blog/blog';

// const HomePageSec

const Home: React.FC<any> = ({ }) => {
    const { data, loading } = useGetLatestBlogQuery();

    return (
        <DesktopLayout>
            <VStack className={'justify-center'} >
                <HStack className={"py-8 shadow"}>
                    <DesktopHeader />
                    <HomeNav />
                </HStack>
                <HStack className="flex flex-col py-16 px-64 gap-y-4 border-t border-[#F4F3F2]">
                    <span className="font-lobster font-semibold text-pink text-[64px]">sarah adler</span>
                    <span className="font-jim-pam text-pink text-[32px] w-[70%]">A very fine teacher.A fantastic teacher . Some say the best of the rest  Checkout her materials and blog insights here.</span>
                    <Buttons.Standard className="border border-pink rounded-md w-[100px] shadow">
                        <span className="font-lobster text-pink">Latest Blog</span>
                    </Buttons.Standard>
                </HStack>
                <HStack className="flex flex-col items-center outline outline-offset-2 outline-1 outline-[#F4F3F2] py-12">
                    <span className="font-lobster font-semibold text-pink text-[64px]">resources</span>

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
                <VStack className="bg-white py-12 outline outline-offset-2 outline-1 outline-[#F4F3F2]">
                    <HStack className={"justify-center py-4 space-x-8"}>
                        <span className={'text-[64px] font-lobster text-pink font-semibold'}>featured post</span>
                    </HStack>
                    <HStack className="justify-center py-4">
                        <HStack className="bg-white rounded justify-center p-8 space-x-4">
                            <BlogPreview
                                blog={data?.latestBlog}
                            />
                        </HStack>
                    </HStack>
                </VStack>
            </VStack>
        </DesktopLayout>
    )
}

export default Home;