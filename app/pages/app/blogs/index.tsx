import { BlogsList } from "../../../modules/blog/blog";
import { createClient } from "../../../prismicio";
import * as prismicH from "@prismicio/helpers";
import { BlogDocument } from "../../../prismicio-types";


const Page = (props: {
    blogs: BlogDocument[]
}) => {
    return (
        <BlogsList blogs={props.blogs}/>
    )
}

export default Page;

export async function getStaticProps({ params, previewData }) {
    const client = createClient({ previewData });

    const blogs = await client.getAllByType("blog");
    // const navigation = await client.getSingle("navigation");
    // const settings = await client.getSingle("settings");

    return {
        props: {
            blogs
        },
    };
}