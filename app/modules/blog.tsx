import * as React from 'react';
import { useState } from 'react';
import { Buttons } from '../components/button';
import { HStack, VStack } from '../components/flexbox';
import DesktopLayout from '../components/layout';
import { DesktopHeader, HomeNav } from '../components/navbar';

const FilterButton: React.FC<{ text: string }> = (props) => {
    return (
        <Buttons.Standard className='bg-pink border-white border-2 text-white font-jim-pam font-extrabold text-3xl w-full p-4'>
            {props.text}
        </Buttons.Standard>
    )
}

const BlogPost: React.FC<{ date: string, title: string, pictures: React.ReactElement[], description: string }> = (props) => {
    return (
        <VStack className="rounded shadow-lg w-[50vw]">
            <HStack className="rounded-t bg-pink py-2 px-4 text-white text-xl">
                {props.date}
            </HStack>
            <VStack className="justify-center py-2 px-8">
                <HStack className="font-jim-pam font-bold text-5xl justify-center py-3">
                    {props.title}
                </HStack>
                <HStack className="justify-center space-x-8 py-8">
                    {props.pictures.map(picture => {
                        return (
                            picture
                        )
                    })}
                </HStack>
                <HStack className="font-marion text-[24px] whitespace-pre-wrap justify-center">
                    {props.description}
                </HStack>
            </VStack>
        </VStack>
    )
}

const welcomePostDescription = `I am beyond thrilled to welcome you to my new website. Although I have been active on TpT and Instagram for a
while now- I am excited to venture into this new realm of blogging.

What you need to understand about me is… I GET IT. If you’re a fellow educator, there is no doubt in my mind that
you are passionate about teaching and growing the minds of our little ones. But, sometimes the millions of hats we
wear as teachers can be straight up overwhelming… I am here to MAKE YOUR LIFE EASIER! From organization
hacks, to teaching and lesson planning tips, you can count on me to help you navigate through the twists and turns of a
crazy school year. Here, I will provide resources, tips, ideas and life hacks to make your school year shine.

If you haven’t already, be sure to subscribe to my newsletter for monthly freebies and follow me on Instagram. I cannot
wait to grow this online community and collaborate with all of you amazing educators!`


export const Blog: React.FC = () => {
    const [categoryFilter, setCategoryFilter] = useState(null);

    return (
        <DesktopLayout>
            <HStack className="py-8">
                <DesktopHeader />
                <HomeNav />
            </HStack>
            <VStack>
                <HStack className="bg-pink border-white justify-center items-center">
                    <div className='font-little-spark text-white text-[64px] p-4'>Blog</div>
                </HStack>
                <HStack>
                    <FilterButton text="Classroom Design & Decor" />
                    <FilterButton text="Classroom Management" />
                    <FilterButton text="ELA & Reading" />
                    <FilterButton text="Holidays & Seasonal" />
                </HStack>
                <HStack className="p-8 justify-center">
                    <BlogPost
                        date={"Sunday, August 7th 2021"}
                        title={"Welcome To My Blog"}
                        pictures={[
                            <img src='/welcomePost.png' className="w-[250px]"/>,
                            <img src='/welcomePost_2.png' className="w-[250px]"/>
                        ]}
                        description={welcomePostDescription}
                    />
                </HStack>
            </VStack>
        </DesktopLayout>
    )
}