var player = require("play-sound")(opts = {});
const Launchpad = require("launchpad-mini");
const pad = new Launchpad();

const sounds = {
    "0_0": ["sounds/MLMPoints.mp3"],
    "0_1": ["sounds/Pisse aus meinem Arsch !.mp3", 60],
    "0_2": ["sounds/Eheh.mp3"],
    "0_3": ["sounds/Eine Armbanduhr.MP3"],
    "0_4": ["sounds/Fettklops.mp3"],
    "0_5": ["sounds/Hitler NEIN!.mp3"],
    "0_6": ["sounds/LosFickMichDoch.mp3"],
    "0_7": ["sounds/Nein.wav"],
    "1_0": ["sounds/No.wav"],
    "1_1": ["sounds/Penis.wav"],
    "1_2": ["sounds/Sack.wav", 70],
    "1_3": ["sounds/Titten.wav"],
    "1_4": ["sounds/Waaa!.wav", 60],
    "1_5": ["sounds/WackelpuddingEiswürfelGemacht.mp3"],
    "1_6": ["sounds/MirIstGeradeLangweilig.mp3"],
    "1_7": ["sounds/-KonnteIchNichtVerstehen-.mp3"],
    "2_0": ["sounds/letsfxxxx.mp3"],
    "2_1": ["sounds/ObstAufDeutsch.mp3"],
    "2_2": ["sounds/IchBinEinIdiot.mp3"],
    "2_3": ["sounds/Fischen.mp3"],
    "2_4": ["sounds/Du alter Sack!.wav"],
    "2_5": ["sounds/Salatsoße.wav"],
    "2_6": ["sounds/Gogogo.mp3", 70],
    "2_7": ["sounds/Guck nicht so behindert, Spasti!.MP3", 70],
    "3_0": ["sounds/Sound of a Murloc.mp3", 60],
    "3_1": ["sounds/Muschi.wav", 50],
    "3_2": ["sounds/Piss dich alde!.wav"],
    "3_3": ["sounds/Donk3 G(Wet).wav", 80],
    "3_4": ["sounds/NuttenBumser!.wav", 70],
    "3_5": ["sounds/Nega.mp3"],
    "3_6": ["sounds/Nazi.WAV", 50],
    "3_7": ["sounds/jah.mp3"],
    "4_0": ["sounds/Fischen.mp3"],
    "4_1": ["sounds/firstblood.wav", 60],
    "4_2": ["sounds/Den Hodensack in kaltes Wasser hängen - TV Total.mp3", 80],
    "4_3": ["sounds/Communismuss.mp3"],
    "4_4": ["sounds/Black Bird Screaming Meme.mp3"],
    "4_5": ["sounds/Backfisch.wav", 60],
    "4_6": ["sounds/2 Stunden später.wav", 80],
    "4_7": ["sounds/3 Stunden später.wav", 80],
    "5_0": ["sounds/What Is Going On in Here Breakfast   Original Video.mp3", 60],
    "5_1": ["sounds/Vollidiot.mp3"],
    "5_2": ["sounds/gleich eins aufs Maul.wav", 60],
    "5_3": ["sounds/Geil ne Bombe.wav", 80],
    "5_4": ["sounds/VillagerSound.mp3"]
    // "3_4": ["sounds/Stop you are violating the law.mp3"],
};

const playing = {};

(async () => {
    await pad.connect();

    await pad.reset(2);

    pad.on('key', async (key) => {
        const {pressed, x, y} = key;
        const keyPos = x + "_" + y;

        if (!sounds[keyPos]) {
            return;
        }

        if (playing[keyPos] && !pressed) {
            pad.col(pad.green, key);
            playing[keyPos].kill('SIGINT');
            playing[keyPos] = null;
            return;
        }

        if (playing[keyPos] && pressed) {
            return;
        }

        if (!playing[x + "_" + y] && pressed) {
            const soundFile = sounds[keyPos][0];
            const soundVolume = sounds[keyPos].length > 1 ? sounds[keyPos][1] : 100;

            pad.col(pad.red, key);

            playing[x + "_" + y] = player.play(soundFile, {mplayer: ['-ao', 'pulse::SoundBoardOnly', '-volume', String(soundVolume)]}, (err) => {
                if (err) {
                    // console.log("error playing sound", err);
                }
                console.log(x, y);
                // delete playing[keyPos];
                pad.col(pad.green, key);
            });
            /*console.log(playing[keyPos]);*/
        }
    });
})();
