import { HStack, VStack } from "./flexbox";
import NavBar from "./navbar";
import ScrollView from "./scrollview";

const DesktopLayout = (props) => {
    return (
        <div
            className={
                // "grid grid-rows-[1fr]" 
                "flex flex-col bg-[#fdfafa] h-[100vh]"
            }
        >
            <NavBar />
            <VStack className={"h-full w-full bg-friendly-eskimo"}>
                <ScrollView className={"h-full w-full"}>{props.children}</ScrollView>
            </VStack>
        </div>
    )
}

export default DesktopLayout;