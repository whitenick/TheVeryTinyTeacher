import React, { useEffect } from 'react';
import { VStack } from "../../components/flexbox";
// import GaugeChart from 'react-gauge-chart';
import DesktopLayout from '../../components/layout';
import { useLoudContext } from './atom';

const Gauge = () => {
    let loudAtom = useLoudContext();

    useEffect(() => {
        if (!window) return;
        navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(
            stream => {

                const recorder = new MediaRecorder(stream);

                recorder.ondataavailable = (event) => {
                    console.log(event?.data);
                    let array = new Uint8Array(event.data.size);
                    event.data.arrayBuffer().then(buffer => {
                        array = new Uint8Array(buffer);

                        if (array.length <= 0) return;

                        let total = array?.reduce((acc, curr) => {
                            return acc + curr;
                        });

                        let avgVol = Math.sqrt(total / array.length);
                        
                        if (!avgVol) return;

                        loudAtom.actions.setAudioVolume(avgVol);
                    });
                };

                recorder.start(500);
            }
        )
    }, []);

    return (
        <DesktopLayout>
            <VStack className={"bg-neutral-400 h-full w-[80vw] items-center"}>
                {/* <GaugeChart
                    id={"loud-chart-1"}
                    nrOfLevels={10}
                    arcWidth={0.3}
                    colors={['#73D2DE', '#FBB13C', '#218380', '#8F2D56', '#D81159']}
                    percent={loudAtom.volume}
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex'
                    }}
                /> */}
            </VStack>
        </DesktopLayout>
    )
}

export default Gauge;