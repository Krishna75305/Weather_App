import React from 'react';

// Import animated GIF assets for different weather conditions
import Thunderstorm from '../assets/Thunderstorm.gif';
import Rain from '../assets/Rain.gif';
import SnowDay from '../assets/Snow.gif';
import ClearDay from '../assets/ClearDay.gif';
import ClearNight from '../assets/ClearNight.gif';
import CloudsDay from '../assets/CloudsDay.gif';
import CloudsNight from '../assets/CloudsNight.gif';
import Haze from '../assets/Haze.gif';

// Import fallback video background
import video from '../assets/857251-hd_1620_1080_25fps.mp4';


const WeatherBackground = ({ condition }) => {
  // Map weather types to their corresponding animated assets
  const gifs = {
    Thunderstorm,
    Drizzle: Rain, // Drizzle uses same asset as Rain
    Rain,
    Snow: SnowDay,
    Clear: { day: ClearDay, night: ClearNight }, // Separate assets for day/night
    Clouds: { day: CloudsDay, night: CloudsNight }, // Separate assets for day/night
    Mist: Haze,
    Smoke: Haze,
    Haze,
    Fog: Haze,
    default: video // Fallback background (video)
  };

  /**
   * Returns the correct background asset (GIF or video)
   * based on the given weather condition.
   */
  const getBackground = () => {
    if (!condition) return gifs.default; // No condition yet → fallback video
    const weatherType = condition.main;
    const asset = gifs[weatherType];

    if (!asset) return gifs.default; // Unknown type → fallback video

    // If the asset is an object, choose day or night GIF
    if (typeof asset === 'object') {
      return condition.isDay ? asset.day : asset.night;
    }

    return asset; // Otherwise return GIF directly
  };

  const background = getBackground();

  return (
    <div className='fixed inset-0 z-0 overflow-hidden'>
      {/* Render either the video or a GIF based on the selected background */}
      {background === video ? (
        <video
          autoPlay
          loop
          muted
          className='w-full h-full object-cover opacity-100 pointer-events-none animate-fade-in'
        >
          <source src={video} type='video/mp4' />
        </video>
      ) : (
        <img
          src={background}
          alt='Weather background'
          className='w-full h-full object-cover opacity-20 pointer-events-none animate-fade-in'
        />
      )}

      {/* Semi-transparent dark overlay to improve readability of foreground content */}
      <div className='absolute inset-0 bg-black/30' />
    </div>
  );
};

export default WeatherBackground;
