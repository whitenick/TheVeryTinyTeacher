import React, { useEffect } from 'react';
import { HStack, VStack } from "../../components/flexbox";
import dynamic from "next/dynamic";
const GaugeChart: React.ComponentType<{
    id: string,
    hideText?: boolean,
    nrOfLevels: number,
    arcWidth: number,
    colors: string[],
    percent: number,
    style: any

}> = dynamic(() => import('react-gauge-chart'), { ssr: false });
import { SideNavLayout } from '../../components/layout';
import { useLoudContext } from './atom';
import BananaBackground from '../../components/bananas/banana-animation';

const Gauge = () => {
    let loudAtom = useLoudContext();

    useEffect(() => {
        if (!window) return;
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        })
            .then(function (stream) {
                const audioContext = new AudioContext();
                const analyser = audioContext.createAnalyser();
                const microphone = audioContext.createMediaStreamSource(stream);
                const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

                analyser.smoothingTimeConstant = .9;
                analyser.fftSize = 1024;

                microphone.connect(analyser);
                analyser.connect(scriptProcessor);
                scriptProcessor.connect(audioContext.destination);
                scriptProcessor.onaudioprocess = function () {
                    const array = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(array);
                    const arraySum = array.reduce((a, value) => a + value, 0);
                    const average = arraySum / array.length;
                    console.log(Math.round(average));
                    loudAtom.actions.setAudioVolume(Math.round(average));
                    // colorPids(average);
                };
            })
            .catch(function (err) {
                /* handle the error */
                console.error(err);
            });
    }, []);

    return (
        <SideNavLayout>
            <HStack className={"h-full w-[80vw] items-start p-10 space-x-24 bg-opacity-0"}>
                <VStack>
                    <nav className="flex flex-col space-y-1">
                        <a
                            href=""
                            className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                        >
                            General
                        </a>

                        <a
                            href=""
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            Teams
                        </a>

                        <a
                            href=""
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            Billing
                        </a>

                        <a
                            href=""
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            Invoices
                        </a>

                        <a
                            href=""
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            Account
                        </a>
                    </nav>
                </VStack>
                <VStack className='w-full bg-opacity-0'>
                    <BananaBackground>
                        <div className="fixed top-24 left-[40%] z-100">
                            <article
                                className="flex flex-col gap-4 rounded-lg border bg-white border-gray-100 p-6 w-44"
                            >
                                <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                                        />
                                    </svg>

                                    <span className="text-xs font-medium"> 67.81% </span>
                                </div>

                                <div>
                                    <strong className="block text-sm font-medium text-gray-500"> Volume </strong>

                                    <p>
                                        <span className="text-2xl font-medium text-gray-900">{`${loudAtom.volume}%`}</span>

                                        <span className="text-xs text-gray-500"> from $404.32 </span>
                                    </p>
                                </div>
                            </article>
                            <GaugeChart
                                id={"loud-chart-1"}
                                hideText={true}
                                nrOfLevels={10}
                                arcWidth={.8}
                                colors={['#FFFFFF', '#e3c7b9', '#c56f25ff']}
                                percent={((loudAtom.volume) / 100) * .5}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    display: 'flex'
                                }}
                            />
                        </div>
                    </BananaBackground>
                </VStack>
            </HStack>
        </SideNavLayout>
    )
}

export default Gauge;