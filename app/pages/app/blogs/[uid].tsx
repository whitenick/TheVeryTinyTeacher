import DefaultLayout from '../../../components/layout';
import { BlogsList } from '../../../modules/blog/blog';
import BlogPage from '../../../modules/blog/blog-page';
import { createClient } from '../../../prismicio';
import * as prismicH from "@prismicio/helpers";
import { BlogDocument } from '../../../prismicio-types';

const Blog = (props: {
    blog: BlogDocument
}) => {
    console.log(props)

    return (
        <BlogPage blog={props.blog} />
    )
}

export default Blog;

export async function getStaticProps({ params, previewData }) {
    const client = createClient({ previewData });

    const blog = await client.getByUID("blog", params.uid);
    // const navigation = await client.getSingle("navigation");
    // const settings = await client.getSingle("settings");

    return {
        props: {
            blog
        },
    };
}

export async function getStaticPaths() {
    const client = createClient();

    const blogs = await client.getAllByType("blog");

    return {
        paths: blogs.map((blog) => prismicH.asLink(blog)),
        fallback: false,
    };
}