import { useRouter } from "next/router";
import React from "react";
import { Buttons } from "../../components/button";
import { HStack, VStack } from "../../components/flexbox";
import DesktopLayout from "../../components/layout";
import { DesktopHeader, HomeNav } from "../../components/navbar";
import { useGetLatestBlogQuery } from "../../src/generated/graphql";
import { BlogPost } from "./blog";
import { BsArrowReturnLeft } from "react-icons/bs";
import { BlogDocument } from "../../prismicio-types";

const BlogPage = (props: {blog: BlogDocument}) => {
    const { data, loading } = useGetLatestBlogQuery();
    const router = useRouter();

    return (
        <DesktopLayout>
            <HStack className="py-8">
                <DesktopHeader />
                <HomeNav />
            </HStack>
            <VStack
                className="w-full items-center px-28 space-y-4"
            >
                <HStack className="w-full bg-pink p-4 rounded shadow-lg">
                    <Buttons.Standard
                        className="text-brown border border-white rounded"
                        onClick={() => router.push("/app/blogs")}
                    >
                        <HStack className="p-4 space-x-2 items-center">
                            <BsArrowReturnLeft className="text-white" />
                            <span className="text-white">Back to Blogs</span>
                        </HStack>
                    </Buttons.Standard>
                </HStack>
                <HStack className="w-full justify-center">
                    <BlogPost
                        date={props.blog.first_publication_date}
                        title={props.blog.data?.title?.[0]?.text}
                        pictures={[props.blog.data?.body[0]?.text]}
                        description={props.blog.data?.body[0]?.text}
                    />
                </HStack>
            </VStack>
        </DesktopLayout>
    )
}

export default BlogPage;