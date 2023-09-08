import BananaBackground from "../../../components/bananas/banana-animation";

const Page = ({ content }) => {
    return (
        <>
            <BananaBackground>
                <div className={'fixed top-[40%] left-[20%] w-[60%] p-20 bg-pink-100/50 transparent rounded-lg text-center font-lobster text-5xl'}>
                    The Banana Machine
                </div>
            </BananaBackground>
        </>
    )
}

// export async function getStaticProps() {
//     return {
//         content: <BananaBackground/>
//     }
// }

export default Page;