from pyannote.audio import Pipeline
from dotenv import load_dotenv
import os
import torch

x = torch.rand(5, 3)
print(x)

load_dotenv()

print(os.getenv("HF_API_KEY"))
pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization", use_auth_token=os.getenv("HF_API_KEY"))
diarization = pipeline("test.wav.aiff")