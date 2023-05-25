import React, { useMemo, useState } from "react";
import { HStack, VStack } from "../components/flexbox";
import DefaultLayout from "../components/layout";
import { DesktopHeader, HomeNav } from "../components/navbar";
import { usePocket } from "../database";
import { PostsRecord } from "../src/generated/db-types";

enum PicturePosition {
    Left,
    Right
}

const AboutSection: React.FC<{ title: string, body: string, picture?: React.ReactElement, picturePosition?: PicturePosition }> = (props) => {
    return (
        <VStack className={"items-center"}>
            <HStack>
                {props.picturePosition === PicturePosition.Left &&
                    (
                        <React.Fragment>
                            <HStack className="px-4">
                                { props.picture }
                            </HStack>
                        </React.Fragment>
                    ) 
                }
                <VStack className="space-y-4">
                    <HStack className={"text-3xl font-bold italic font-marion justify-center"}>
                        {props.title}
                    </HStack>
                    <HStack className={"font-jim-pam text-2xl font-bold h-full items-center px-8"}>
                        {props.body}
                    </HStack>
                </VStack>
                {props.picturePosition === PicturePosition.Right &&
                    (
                        <React.Fragment>
                            <HStack className="px-4">
                                { props.picture }
                            </HStack>
                        </React.Fragment>
                    ) 
                }
            </HStack>
        </VStack>
    )
}

const About = () => {
    const { aboutMeIntro, educationAndCareer, spareTime, theVeryTinyTeacher } = {
        aboutMeIntro: `Welcome to my site! I’m a teacher, dog mom and organizational enthusiast. I’m an east Austin local who lives, breathes and works in Austin, Texas. 

Born and raised in New York - the north east will always have a special place in my heart.
`,
        educationAndCareer: `Since graduating the University of Texas at Austin, I’ve been been teaching the 3rd grade. Right now, I teach ELA & Reading- I LOVE it. Throughout my time in the classroom- I’ve found a passion in creating resources that help not only me, but educators like me in staying organized and creating a bright and cheerful classroom community. I believe a loving and FUN classroom is what leads to the best learning for our little ones!`,
        spareTime: `When I’m not lesson planning or creating resources - you’ll find me travelling to new places, exploring ATX, trying new foods & hanging outdoors with my ADORABLE labradoodle, Finnegan.`,
        theVeryTinyTeacher: `The Very Tiny Teacher began during the COVID-19 pandemic, in 2020. During quarantine, I created endless virtual resources for the new realm of online teaching we all had to endure. I found comfort in knowing I could help other teachers by sharing my resources. Since then, I’ve been creating virtual & non-virtual resources to sell on my 
teachers pay teachers page. I work my hardest to make sure my resources are quality products that explicitly teach standards while bringing fun to the classroom. I love to share my classroom experiences and resources on my Instagram & Pinterest account. I hope you’ll follow along with my journey!`
    }
    const [posts, setPosts] = useState<PostsRecord[]>();
    // const pocket = usePocket();
    
    // useMemo(() => {
    //     if (!pocket?.user) {
    //         pocket?.login("nw.white22@gmail.com", "serapio22@");
    //     } else {
    //         pocket?.findAll("posts").then(res => setPosts(res?.items)).catch(err => console.log(err));
    //     }
    // }, [pocket?.user]);

    return (
        <DefaultLayout>
            <VStack className="px-32">
                <HStack className={"py-4"}>
                    <DesktopHeader />
                    <HStack className={"w-full justify-center py-4"}>
                        <HomeNav />
                    </HStack>
                </HStack>
                <HStack className="text-sea-green text-[100px] justify-center font-little-spark">About Me</HStack>
                { posts?.length > 0 && 
                    posts.map(post => {
                        return (
                            <div dangerouslySetInnerHTML={{ __html: post.body }} />
                        )
                    })
                }
                <HStack className={"grid space-y-6 shadow-lg bg-pink rounded p-4 mb-[200px]"}>
                    <AboutSection
                        title={" Hey, I'm Sarah Adler!"}
                        body={aboutMeIntro}
                        picture={(
                            <img className="rounded" src="/about_me_1.png" />
                        )}
                        picturePosition={PicturePosition.Right}
                    />
                    <AboutSection
                        title={"Education & Career"}
                        body={educationAndCareer}
                        picture={(
                            <img className="rounded min-w-[400px]" src="/me teaching.jpg" />
                        )}
                        picturePosition={PicturePosition.Left}
                    />
                    <AboutSection
                        title={"In my spare time..."}
                        body={spareTime}
                        picture={(
                            <img className="rounded min-w-[20vw]" src="/me travelling.jpg" />
                        )}
                        picturePosition={PicturePosition.Right}
                    />
                    <AboutSection
                        title={"The Very Tiny Teacher"}
                        body={theVeryTinyTeacher}
                    />
                    <HStack className={"items-center justify-center"}>
                        <HStack className={"w-600 h-600"}>
                            <img className='w-full h-full' src="/me on laptop.jpg" />
                        </HStack>
                    </HStack>
                </HStack>
            </VStack>
        </DefaultLayout>
    )
}

export default About;