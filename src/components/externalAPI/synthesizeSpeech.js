import * as sdk from "microsoft-cognitiveservices-speech-sdk";
export function synthesizeSpeech(voice, text) {
    const speechConfig = sdk.SpeechConfig.fromSubscription("8f440378f438490494627680eca8cae6", "westeurope");
    const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
    speechConfig.speechSynthesisVoiceName=voice;

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
    synthesizer.speakTextAsync(
        text,
        result => {
            if (result) {
                synthesizer.close();
                return result.audioData;
            }
        },
        error => {
            console.log(error);
            synthesizer.close();
        });
  }
/* const voices=["en-PH-JamesNeural", "en-US-GuyNeural", "en-GB-LibbyNeural", "en-IE-ConnorNeural", "en-CA-LiamNeural", "en-IN-PrabhatNeural", "en-AU-NatashaNeural"];
  const characters=["elgringo", "willythekid", "rosedoolan", "paulregret", "jourdonnais", "bartcassidy", "suzylafayette"]; */
//voices for each character