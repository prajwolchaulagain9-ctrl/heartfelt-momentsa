import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const cheerRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedCelebration, setHasPlayedCelebration] = useState(false);

  useEffect(() => {
    // Auto-play with user interaction
    const playAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch((error) => {
          console.log('Auto-play prevented:', error);
        });
      }
    };

    // Try to play immediately
    playAudio();

    // Also try to play on first user interaction (for browsers that block autoplay)
    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, playAudio, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, playAudio);
      });
    };
  }, []);

  // Listen for celebration event from Question page
  useEffect(() => {
    const handleCelebration = () => {
      console.log('Celebration event received!');
      
      if (!hasPlayedCelebration) {
        // Stop background music
        if (audioRef.current) {
          audioRef.current.pause();
          console.log('Background music paused');
        }
        
        // Play celebration sound
        if (cheerRef.current) {
          console.log('Playing celebration sound...');
          cheerRef.current.volume = 0.7;
          cheerRef.current.play()
            .then(() => console.log('Celebration sound playing successfully'))
            .catch((error) => {
              console.error('Celebration sound error:', error);
            });
        }
        
        setHasPlayedCelebration(true);
      }
    };

    window.addEventListener('celebrate', handleCelebration);
    
    return () => {
      window.removeEventListener('celebrate', handleCelebration);
    };
  }, [hasPlayedCelebration]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  return (
    <>
      {/* Background music */}
      <audio
        ref={audioRef}
        loop
        onPlay={handlePlay}
        onPause={handlePause}
      >
        {/* Using URL - Replace with your legitimate music URL */}
        <source src="https://archive.org/download/andeeday/Ed%20Sheeran%20-%20Perfect%20%5BOfficial%20Audio%5D.mp3" type="audio/mpeg" />
      </audio>

      {/* Celebration sound */}
      <audio ref={cheerRef} preload="auto">
        {/* Using multiple sources for better compatibility */}
        <source src="https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3" type="audio/mpeg" />
        <source src="https://www.soundjay.com/misc/sounds/magic-chime-01.mp3" type="audio/mpeg" />
      </audio>

      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg"
        onClick={toggleMute}
        title={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>
    </>
  );
};

export default BackgroundMusic;
