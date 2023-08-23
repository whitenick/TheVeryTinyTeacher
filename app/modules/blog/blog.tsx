import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import { Buttons } from '../../components/button';
import { HStack, VStack } from '../../components/flexbox';
import {DefaultLayout} from '../../components/layout';
import { DesktopHeader, HomeNav } from '../../components/navbar';
import { Blog, useGetAllBlogsQuery } from '../../src/generated/graphql';
import { BlogDocument } from '../../prismicio-types';
import { RTTextNode } from '@prismicio/client';

const FilterButton: React.FC<{ text: string }> = (props) => {
    return (
        <Buttons.Standard className='bg-pink border-white border-2 text-white font-jim-pam font-extrabold text-3xl w-full p-4'>
            {props.text}
        </Buttons.Standard>
    )
}

export const formatStringToDate = (dateString: string) => {
    return dateString ? DateTime.fromISO(dateString)?.toLocaleString(DateTime.DATE_MED) : null;
}

export const BlogPost: React.FC<{ date: string, title: string, pictures: string[], description: string }> = (props) => {
    let dateString: string = props.date ? DateTime.fromISO(props.date)?.toLocaleString(DateTime.DATE_MED) : null;

    console.log(props.date)
    console.log(dateString)

    return (
        <VStack className="rounded shadow-lg w-[100%] md:w-[50vw]">
            <HStack className="rounded-t bg-pink py-2 px-4 text-white text-xl">
                {!dateString ? null : dateString.toString()}
            </HStack>
            <VStack className="justify-center py-2 px-8">
                <HStack className="font-jim-pam font-bold text-5xl justify-center py-3">
                    {props.title}
                </HStack>
                <HStack className="justify-center space-x-8 py-8">
                    {props?.pictures?.map(picture => {
                        return (
                            <img src={picture} />
                        )
                    })}
                </HStack>
                <HStack className="font-serif text-md whitespace-pre-wrap justify-center">
                    <div className="w-full" dangerouslySetInnerHTML={{ __html: props.description }} />
                    {/* {props.description} */}
                </HStack>
            </VStack>
        </VStack>
    )
}

export const BlogPreview: React.FC<{ blog: Blog }> = (props) => {
    const router = useRouter();

    return (
        <VStack className="rounded shadow-lg w-[100%] md:w-[50vw] bg-white">
            <HStack className="rounded-t bg-pink py-2 px-4 text-white text-xl">
                {!props.blog?.date ? null : formatStringToDate(props.blog?.date)?.toString()}
            </HStack>
            <VStack className="justify-center py-2 px-8">
                <HStack className="font-jim-pam font-bold text-5xl justify-center py-3">
                    {props.blog?.title}
                </HStack>
                {/* <HStack className="justify-center space-x-8 py-8">
                    {props.blog?.pictures.map(picture => {
                        return (
                            <img src={picture}/>
                        )
                    })}
                </HStack> */}
            </VStack>
            <HStack className="justify-end py-4 px-8">
                <Buttons.Standard
                    className="justify-end border-[2px] !border-pink rounded"
                    onClick={() => router.push("/app/blogs/" + props.blog.id + "/")}
                >
                    <div className="p-4 text-pink text-xl">Click Here</div>
                </Buttons.Standard>
            </HStack>
        </VStack>
    )
}

export const BlogsList = (props : {
    blogs: BlogDocument[]
}) => {
    const [categoryFilter, setCategoryFilter] = useState(null);
    const { data, loading } = useGetAllBlogsQuery();
    console.log(data?.blogs)
    const blogs = data?.blogs ? [...data?.blogs] : []

    return (
        <DefaultLayout>
            <HStack className="py-8">
                <DesktopHeader />
                <HomeNav />
            </HStack>
            <HStack>
                <VStack className="w-full">
                    <HStack className="bg-pink border-white justify-center items-center">
                        <div className='font-little-spark text-white text-[64px] p-4'>Blog</div>
                    </HStack>
                </VStack>
            </HStack>
            <HStack className="sticky top-0">
                <FilterButton text="Classroom Design & Decor" />
                <FilterButton text="Classroom Management" />
                <FilterButton text="ELA & Reading" />
                <FilterButton text="Holidays & Seasonal" />
            </HStack>
            <VStack>
                <VStack className="p-8 items-center space-y-14">
                    {!loading && props.blogs?.length > 0 ?
                        props.blogs
                            ?.sort((a, b) => {
                                if (DateTime.fromISO(a?.first_publication_date) < DateTime.fromISO(b?.first_publication_date)) {
                                    return 1;
                                } else if (DateTime.fromISO(a?.first_publication_date) > DateTime.fromISO(b?.first_publication_date)) {
                                    return -1;
                                } 
                            })
                            ?.map(d => {
                                console.log(d)
                                return (
                                    <BlogPreview
                                        blog={{
                                            id: d?.id,
                                            title: (d?.data?.title?.[0] as RTTextNode)?.text,
                                            description: (d?.data?.body?.[0] as RTTextNode)?.text,
                                            date: d?.data?.publish_date
                                        }}
                                    />
                                )
                            }) : null
                    }
                </VStack>
            </VStack>
        </DefaultLayout>
    )
}