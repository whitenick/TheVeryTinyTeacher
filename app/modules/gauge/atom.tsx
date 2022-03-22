import { Atom, swap, useAtom } from '@dbeining/react-atom';

interface LoudState {
    audioContext: AudioContext;
    volume: number;
    readReady: boolean;
}

interface LoudActions {
    setAudioContext,
    setAudioVolume,
    setReadReady
}

const loudAtom = Atom.of<LoudState>({
    audioContext: null,
    volume: 0,
    readReady: true
});

const setAudioContext = (context: AudioContext) => {
    swap(loudAtom, (s) => {
        return {
            ...s,
            audioContext: context
        }
    })
}

const setAudioVolume = (vol: number) => {
    swap(loudAtom, (s) => {
        return {
            ...s,
            volume: vol
        }
    })
}

const setReadReady = (val: boolean) => {
    swap(loudAtom, (s) => {
        return {
            ...s,
            readReady: val
        }
    })
}

export const useLoudContext = () : LoudState & { actions: LoudActions } => {
    let loudContext = useAtom(loudAtom);

    return {
        actions: {
            setAudioContext,
            setAudioVolume,
            setReadReady
        },
        ...loudContext
    }
}