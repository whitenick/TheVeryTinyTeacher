package resources

import (
	"encoding/binary"
	"fmt"
	"log"
	"math"
	"os"
	"time"

	"github.com/faiface/beep"
	"github.com/faiface/beep/speaker"
	beepWav "github.com/faiface/beep/wav"
	"github.com/go-audio/audio"
	"github.com/go-audio/wav"
	"github.com/gordonklaus/portaudio"
)

func RecordAudio() error {
	// Set up the audio capture
	sampleRate := 44100
	// bufferSize := 1024
	// Create a new WAV file for the captured audio
	file, err := os.Create(fmt.Sprintf("recording-%v.wav", time.Now().Unix()))
	if err != nil {
		return fmt.Errorf("error creating WAV file: %v", err)
	}
	defer file.Close()

	// Write the WAV file header
	bitDepth := 16
	numChannels := 2

	format := &wav.Encoder{
		WavAudioFormat: 1,
	}

	audioFormat := &audio.Format{
		NumChannels: 2,
		SampleRate: sampleRate,
	}

	e := wav.NewEncoder(file, audioFormat.SampleRate, bitDepth, numChannels, format.WavAudioFormat)

	err = portaudio.Initialize()
	defer portaudio.Terminate()

	if err != nil {
		return fmt.Errorf("error initializing PortAudio: %v", err)
	}

	stream, err := portaudio.OpenDefaultStream(1, 0, float64(audioFormat.SampleRate), 0, func(in []float32) {
		// Process audio data
		err := writeAudioData(in, e)
		if err != nil {
			fmt.Println("Error writing audio data:", err)
		}
		fmt.Println(e.WrittenBytes)
		fmt.Println("hi")
	})

	if err != nil {
		return fmt.Errorf("error setting up audio capture: %v", err)
	}
	defer stream.Close()

	// Start the audio capture
	err = stream.Start()
	if err != nil {
		return fmt.Errorf("error starting audio capture: %v", err)
	}

	if err != nil {
		return fmt.Errorf("error writing WAV file header: %v", err)
	}

	defer stream.Stop()
	defer e.Close()

	// Wait for the capture to finish
	fmt.Println("Recording started...")
	fmt.Println("Press Ctrl+C to stop recording.")
	for {
	}

	return nil
}

func byteToIntSlice(bytes []byte) ([]int, error) {
	// Convert byte slice to integer slice
	var intData []int
	for i := 0; i < len(bytes); i += 4 {
		val := int(bytes[i]) | int(bytes[i+1])<<8 |
			int(bytes[i+2])<<16 | int(bytes[i+3])<<24
		intData = append(intData, val)
	}
	return intData, nil
}

func PlayAudio() error {
	// sampleRate := 44100
	// Open the WAV file for reading
	f, err := os.Open("recording-1681099773.wav")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	// Create a new WAV decoder
	decoder := wav.NewDecoder(f)
	if !decoder.IsValidFile() {
		panic("invalid WAV file")
	}
	// Read the audio data from the decoder and convert it to int16
	// buffer, err := decoder.FullPCMBuffer()
	if err != nil {
		panic(err)
	}

	// for {
	// 	riff, err := decoder.NextChunk()

	// 	if err != nil {
	// 		fmt.Println(err)
	// 		break;
	// 	}

	// 	fmt.Println(riff)
	// }
	
	// Convert the int16 audio data to float32
	// floatData := buffer.Data

	// Initialize PortAudio
	portaudio.Initialize()
	defer portaudio.Terminate()

	audioFormat := &audio.Format{
		NumChannels: int(decoder.NumChans),
		SampleRate: int(decoder.SampleRate),
	}

	// Open a new output stream
	playStream, err := portaudio.OpenDefaultStream(0, audioFormat.NumChannels, float64(audioFormat.SampleRate), 0, func(out []float32) {
		// Copy the audio data to the output buffer
		
	})
	if err != nil {
		panic(err)
	}
	defer playStream.Close()

	// Start the audio playback stream
	err = playStream.Start()
	if err != nil {
		panic(err)
	}

	// Play the audio for 5 seconds
	fmt.Println("Playing recorded audio for 5 seconds...")
	time.Sleep(5 * time.Second)

	// Stop the audio playback stream and close the decoder
	playStream.Stop()

	fmt.Println("Done")

	return nil
	// byteArray := []byte{}
	// fmt.Println(f.Read(byteArray))
	// fmt.Println("Decoding file...")
	// // Decode the WAV data
	// streamer, format, err := beepWav.Decode(f)
	// fmt.Println(streamer.Len())
	// if err != nil {
	// 	log.Fatal(err)
	// } 

	// fmt.Println("Decoded file!")

	// // Initialize the speaker
	// speaker.Init(format.SampleRate, format.SampleRate.N(time.Second/10))

	// // Play the audio stream
	// done := make(chan bool)
	// speaker.Play(beep.Seq(streamer, beep.Callback(func() {
	// 	done <- true
	// })))

	// // Wait for playback to finish
	// <-done

	// fmt.Println("Playback finished")

	// return nil
}

func PlayBeepAudio() error {
	f, err := os.Open("recording-1681099773.wav")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	streamer, format, err := beepWav.Decode(f)
	if err != nil {
		log.Fatal(err)
	} else {
		log.Default()
	}

	fmt.Println(streamer.Len())

	// // Read all of the audio data into a buffer
	// buffer := beep.NewBuffer(format)
	// buffer.Append(streamer)

	speaker.Init(format.SampleRate, format.SampleRate.N(time.Second/10))

	done := make(chan bool)
	speaker.Play(beep.Seq(streamer, beep.Callback(func() {
		close(done)
	})))
	// speaker.Play(beep.Seq(streamer, beep.Callback(func() {
	// 	fmt.Println("hello")
	// 	done <- true
	// })))

	for {
		select {
		case <-done:
			fmt.Println("done again")
			return nil
		case <-time.After(time.Second):
			speaker.Lock()
			fmt.Println(format.SampleRate.D(streamer.Position()).Round(time.Second))
			speaker.Unlock()
		}
	}

}

func bitsToFloat(b []byte) float32 {
	var bits uint32
	switch len(b) {
	case 2:
		bits = uint32(binary.LittleEndian.Uint16(b))
	case 4:
		bits = uint32(binary.LittleEndian.Uint32(b))
	case 8:
		bits = binary.LittleEndian.Uint32(b)
	default:
		panic("Can't parse to float..")
	}
	float := math.Float32frombits(bits)
	return float
}

func int16ToInt(buffer *[]int16) {
	// Create an int16 array
	int16Data := *buffer

	// Convert the int16 array to an int array
	intData := make([]int, len(int16Data))
	for i := range int16Data {
		intData[i] = int(int16Data[i])
	}

	// Print the int array
	fmt.Println(intData)
}

func writeAudioData(data []float32, stream *wav.Encoder) error {
	// Convert float32 data to int16 data
	intData := make([]int, len(data))
	for i := range data {
		intData[i] = int(data[i] * 32767)
	}

	buffer := &audio.IntBuffer{
		Format: &audio.Format{
			NumChannels: 2,
			SampleRate:  44100,
		},
		Data: intData,
	}
	fmt.Println(buffer.Data)
	// Write the int16 data to the WAV encoder
	err := (stream.Write(buffer.AsIntBuffer()))
	if err != nil {
		return err
	}

	return nil
}

func readWav() {

}

func Decibel() {
	// err := RecordAudio()
	// err := PlayAudio()
	// err := PlayBeepAudio()
	PortAudio("test.wav.aiff")
	// PortAudioRecord("test.aiff")
	// if err != nil {
	// 	fmt.Println("Error recording audio:", err)
	// }
}
