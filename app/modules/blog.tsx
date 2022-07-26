import * as React from 'react';
import { Buttons } from '../components/button';
import { HStack, VStack } from '../components/flexbox';
import DesktopLayout from '../components/layout';
import { DesktopHeader, HomeNav } from '../components/navbar';

const FilterButton: React.FC<{ text: string }> = (props) => {
    return (
        <Buttons.Standard className='bg-pink border-white border-2 text-white font-jim-pam font-extrabold text-3xl w-full p-4'>
            { props.text }
        </Buttons.Standard>
    )
}

export const Blog: React.FC = () => {
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
                    <FilterButton text="Classroom Design & Decor"/>
                    <FilterButton text="Classroom Management"/>
                    <FilterButton text="ELA & Reading"/>
                    <FilterButton text="Holidays & Seasonal"/>
                </HStack>
            </VStack>
        </DesktopLayout>
    )
}