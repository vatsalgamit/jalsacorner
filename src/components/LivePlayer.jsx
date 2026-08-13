import { useEffect, useRef, useState } from 'react';
import styles from './LivePlayer.module.css';

const PLAYLIST_ID = 'PLT-xElPdNxyg';
const FALLBACK_VIDEO_ID = '3mG3xeWDpUk';

let apiPromise = null;
function loadYouTubeApi() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prevCallback) prevCallback();
      resolve(window.YT);
    };
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  });
  return apiPromise;
}

export default function LivePlayer() {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState({ title: 'Loading…', artist: '' });
  const [hereNow, setHereNow] = useState(14);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !containerRef.current) return;

      playerRef.current = new YT.Player(containerRef.current, {
        width: '100%',
        height: '100%',
        playerVars: {
          listType: 'playlist',
          list: PLAYLIST_ID,
          playsinline: 1,
          loop: 1,
        },
        events: {
          onReady: () => setReady(true),
          onStateChange: (e) => {
            setPlaying(e.data === YT.PlayerState.PLAYING);
            const data = e.target.getVideoData?.();
            if (data?.title) {
              setTrack({ title: data.title, artist: data.author || 'Jalsa Corner Radio' });
            }
          },
          onError: () => {
            // fall back to a single known-good video if the playlist item fails
            playerRef.current?.loadVideoById(FALLBACK_VIDEO_ID);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy?.();
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setHereNow((n) => Math.max(6, Math.min(28, n + (Math.random() > 0.5 ? 1 : -1))));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (playing) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
  };

  const skip = (dir) => {
    if (!playerRef.current) return;
    if (dir === 'next') playerRef.current.nextVideo();
    else playerRef.current.previousVideo();
  };

  return (
    <div className={`${styles.widget} ${collapsed ? styles.collapsed : ''}`}>
      {!collapsed && (
        <div className={styles.liveBadge}>
          <span className={styles.pulseDot}>
            <span className={styles.pulseRing} />
            <span className={styles.pulseCore} />
          </span>
          <span className={styles.liveCount}>{hereNow}</span>
          <span className={styles.liveLabel}>here now</span>
        </div>
      )}

      <div className={styles.card}>
        {!collapsed && (
          <button
            type="button"
            className={styles.minimizeBtn}
            aria-label="Minimize player"
            onClick={() => setCollapsed(true)}
          >
            ⌄
          </button>
        )}

        <div
          className={`${styles.artWrap} ${playing ? styles.spinning : ''}`}
          onClick={collapsed ? () => setCollapsed(false) : undefined}
          role={collapsed ? 'button' : undefined}
          aria-label={collapsed ? 'Expand player' : undefined}
        >
          <div ref={containerRef} className={styles.ytFrame} />
          {collapsed && (
            <span className={styles.miniPulse}>
              <span className={styles.pulseRing} />
              <span className={styles.pulseCore} />
            </span>
          )}
        </div>

        {!collapsed && (
          <>
            <div className={styles.info}>
              <p className={styles.title}>{track.title}</p>
              <p className={styles.artist}>{track.artist}</p>
            </div>

            <div className={styles.controls}>
              <button
                type="button"
                className={styles.ctrlBtn}
                aria-label="Previous track"
                onClick={() => skip('prev')}
                disabled={!ready}
              >
                ⏮
              </button>
              <button
                type="button"
                className={styles.playBtn}
                aria-label={playing ? 'Pause' : 'Play'}
                onClick={togglePlay}
                disabled={!ready}
              >
                {playing ? '⏸' : '▶'}
              </button>
              <button
                type="button"
                className={styles.ctrlBtn}
                aria-label="Next track"
                onClick={() => skip('next')}
                disabled={!ready}
              >
                ⏭
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
