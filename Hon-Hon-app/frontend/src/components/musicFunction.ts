import { Audio } from 'expo-av';

let sound: Audio.Sound | null = null;

const sounds:any = {
  'Bird': require('../assets/Audio/bird.mp3'),
  'Fire': require('../assets/Audio/fire.mp3'),
  'Rain': require('../assets/Audio/rain.mp3'),
  'Sea': require('../assets/Audio/sea.mp3'),
  'Snowfall': require('../assets/Audio/snowfall.mp3'),
  'Water': require('../assets/Audio/water.mp3'),
};

export const playSound = async (name: any) => {

  // หยุดและล้างเสียงเดิมถ้ามีการเล่นอยู่
  if (sound) {
    await sound.stopAsync();
    await sound.unloadAsync();
    sound = null;
  }

  // ตรวจสอบว่าไฟล์เสียงที่ต้องการมีอยู่ในออบเจกต์หรือไม่
  const soundFile = sounds[name];
  if (!soundFile) {
    console.warn(`Sound ${name} not found!`);
    return;
  }

  // โหลดและเล่นไฟล์เสียงใหม่
  const { sound: newSound } = await Audio.Sound.createAsync(soundFile, { isLooping: true });
  sound = newSound;
  await sound.playAsync();
};

export const stopSound = async () => {
  if (sound) {
    await sound.stopAsync();
    await sound.unloadAsync();
    sound = null;
  }
};
