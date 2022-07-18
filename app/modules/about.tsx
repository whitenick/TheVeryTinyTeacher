import { HStack, VStack } from "../components/flexbox";
import DesktopLayout from "../components/layout";
import { DesktopHeader, HomeNav } from "../components/navbar";

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
    return (
        <DesktopLayout>
            <VStack>
                <HStack className={"py-4"}>
                    <DesktopHeader />
                    <HStack className={"w-full justify-center py-4"}>
                        <HomeNav />
                    </HStack>
                </HStack>
                <HStack className="text-sea-green text-[100px] justify-center font-little-spark">About Me</HStack>
                <HStack className={"m-auto grid w-[60vw] space-y-6 shadow bg-powder-blue p-4"}>
                    <VStack className={"items-center"}>
                        <HStack>
                            <VStack className="space-y-4">
                                <HStack className={"text-3xl font-bold italic font-marion"}>
                                    Hey, I'm Sarah Adler!
                                </HStack>
                                <HStack>
                                    {aboutMeIntro}
                                </HStack>
                            </VStack>
                            <HStack className="px-4">
                                <img className="rounded" src="/about_me_1.png" />
                            </HStack>
                        </HStack>
                    </VStack>
                    <VStack className={"items-center"}>
                        <HStack className={"text-3xl italic font-bold font-marion p-4"}>
                            Education & Career
                        </HStack>
                        <HStack>
                            <HStack className="px-4">
                                <img className="rounded min-w-[400px]" src="/about_me_1.png" />
                            </HStack>
                            <HStack className>
                                {educationAndCareer}
                            </HStack>
                        </HStack>
                    </VStack>
                    <VStack className={"items-center"}>
                        <HStack className={"text-3xl italic font-bold font-marion p-4"}>
                            In my spare time...
                        </HStack>
                        <HStack>
                            <HStack className={"text-base"}>
                                {spareTime}
                            </HStack>
                        </HStack>
                    </VStack>
                    <VStack className={"items-center"}>
                        <HStack className={"text-3xl italic font-bold font-marion p-4"}>
                            The Very Tiny Teacher
                        </HStack>
                        <HStack className={"text-base"}>
                            {theVeryTinyTeacher}
                        </HStack>
                    </VStack>
                    <HStack className={"items-center"}>
                        <HStack className={"w-60 h-60"}>
                            <img src="/about_me_1.png" />
                        </HStack>
                    </HStack>
                </HStack>
            </VStack>
        </DesktopLayout>
    )
}

export default About;