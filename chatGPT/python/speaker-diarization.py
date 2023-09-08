from pyannote.audio import Pipeline
from dotenv import load_dotenv
import simpleaudio as sa
import os
import torch
from pyannote.database import FileFinder, get_protocol
from pyannote.metrics.diarization import DiarizationErrorRate


x = torch.rand(5, 3)
print(x)

load_dotenv()

# Example (from colab): https://colab.research.google.com/github/pyannote/pyannote-audio/blob/develop/tutorials/intro.ipynb#scrollTo=5MclWK2GYnp_
pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization", use_auth_token=os.getenv("HF_API_KEY"))
recordingFilename = '/home/jobin/Development/testing/TheVeryTinyTeacher/chatGPT/python/gettysburg.wav'
diarization = pipeline(recordingFilename)

wave_obj = sa.WaveObject.from_wave_file(recordingFilename)
play_obj = wave_obj.play()
play_obj.wait_done()

# for speech_turn, track, speaker in diarization.itertracks(yield_label=True):
#     print(f"{speech_turn.start:4.1f} {speech_turn.end:4.1f} {speaker}")
#     print(speech_turn)

# for speech in diarization.get_timeline().support():
#     print(speech)

# Adapting trained pipeline to personal data
databasePath = "/home/jobin/Development/testing/content/AMI-diarization-setup/pyannote/database.yml"
os.environ["PYANNOTE_DATABASE_CONFIG"] = databasePath
dataset = get_protocol("AMI-SDM.SpeakerDiarization.mini", {"audio": FileFinder()})
metric = DiarizationErrorRate()

for file in dataset.test():
    # Apply pretrained model
    file["pretrained pipeline"] = pipeline(file)
    print(file)
    print('pre-trained: ')
    print(file["pretrained pipeline"])
    print('annotation: ')
    print(file["annotation"])
    # Evaluate performance 
    metric(file["annotation"], file["pretrained pipeline"], uem=file["annotated"])

print(f"The pretrained pipeline reaches a Diarization Error Rate (DER) of {100 * abs(metric):.1f}% on {dataset.name} test set.")


