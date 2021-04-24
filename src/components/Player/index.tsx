import {useRef, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {usePlayer } from '../../contexts/PlayerContext';
import Image from 'next/image';
import styles from  './styles.module.scss';

export function Player(){
    const audioRef = useRef<HTMLAudioElement>(null);

    const {
        episodeList, 
        currentEpisodeIndex, 
        isPlaying, 
        isLooping,
        togglePlay,
        toggleLoop,
        setPlayingState,
        playPrevious,
        playerNext,
        hasPrevious,
        hasNext
    } = usePlayer();

    //essa função será chamada toda vez que o isPlaying for alterado
    useEffect(() => {
        if(!audioRef.current){
            return;
        }

        if(isPlaying){
            audioRef.current.play();
        }else {
            audioRef.current.pause();
        }
    }, [isPlaying])

    const episode = episodeList[currentEpisodeIndex];


    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Playing now"/>
                <strong>Playing now</strong>
            </header>

            {episode ? (
                <div className={styles.currentEpisode}>
                    <Image 
                        width={592} 
                        height={592} 
                        src={episode.thumbnail} 
                        objectFit="cover"
                    />     
                    <strong>{episode.title}</strong>      
                    <strong>{episode.members}</strong>       
                </div>
            ) : (
                <div className={styles.emptyPlayer}>
                    <strong>Select a podcast to listen</strong>
                </div>
            )}
            

            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        { episode ?
                        (
                            <Slider
                                trackStyle={{ backgroundColor: '#04d361'}}
                                railStyle={{backgroundColor: '#9f75ff'}}
                                handleStyle={{borderColor:'#04d361', borderWidth: 4}}
                            />
                        ): (
                            <div className={styles.emptySlider}/>
                        )}
                    </div>
                    <span>00:00</span>
                </div>

                {episode && (
                    <audio
                        src={episode.url}
                        ref={audioRef}
                        autoPlay
                        loop={isLooping}
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                    />
                )}

                <div className={styles.buttons}>
                    <button type="button" disabled={!episode}>
                        <img src="/shuffle.svg" alt="Shuffle"/>
                    </button>
                    <button 
                        type="button" 
                        disabled={!episode || !hasPrevious}
                        onClick={playPrevious}
                    >
                        <img src="/play-previous.svg" alt="Play previous"/>
                    </button>
                    <button 
                        type="button" 
                        className={styles.playButton} 
                        disabled={!episode}
                        onClick={togglePlay}
                    >
                            {isPlaying ? 
                                (<img src="/pause.svg" alt="Play"/>)
                                :
                                (<img src="/play.svg" alt="Play"/>)
                            }
                    </button>
                    <button 
                        type="button" 
                        disabled={!episode || !hasNext}
                        onClick={playerNext}
                    >
                        <img src="/play-next.svg" alt="Play next"/>
                    </button>
                    <button 
                        type="button" 
                        disabled={!episode}
                        onClick={toggleLoop}
                        className={isLooping ? styles.isActive : ''}
                    >
                        <img src="/repeat.svg" alt="Repeat"/>
                    </button>
                </div>
            </footer>
        </div>
    );
}