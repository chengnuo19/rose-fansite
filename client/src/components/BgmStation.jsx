import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { bgmTracks } from "../lib/siteFun";

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "00:00";
  }

  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${mins}:${secs}`;
}

export default function BgmStation() {
  const audioRef = useRef(null);
  const [activeTrackId, setActiveTrackId] = useState(bgmTracks[0].id);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [audioReady, setAudioReady] = useState(false);

  const activeIndex = useMemo(
    () => bgmTracks.findIndex((track) => track.id === activeTrackId),
    [activeTrackId],
  );
  const activeTrack = bgmTracks[activeIndex] || bgmTracks[0];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return undefined;
    }

    audio.volume = volume;

    function handleTimeUpdate() {
      setCurrentTime(audio.currentTime || 0);
    }

    function handleLoadedMetadata() {
      setDuration(audio.duration || 0);
      setAudioReady(true);
    }

    function handleEnded() {
      handleNext();
    }

    function handlePlay() {
      setIsPlaying(true);
    }

    function handlePause() {
      setIsPlaying(false);
    }

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [activeTrackId, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const shouldResume = isPlaying;
    setAudioReady(false);
    setCurrentTime(0);
    setDuration(0);
    audio.load();

    if (shouldResume) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [activeTrackId]);

  async function togglePlay() {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function handlePrevious() {
    const nextIndex = activeIndex <= 0 ? bgmTracks.length - 1 : activeIndex - 1;
    setActiveTrackId(bgmTracks[nextIndex].id);
  }

  function handleNext() {
    const nextIndex = activeIndex >= bgmTracks.length - 1 ? 0 : activeIndex + 1;
    setActiveTrackId(bgmTracks[nextIndex].id);
  }

  function handleSeek(event) {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const nextTime = Number(event.target.value);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  return (
    <section className="section-shell pt-14">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blush-200/80">
              BGM Station
            </p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              现在已经是站内可播放的 BGM 播放器
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              这一版不再只是跳外链，而是可以直接在网站里播放、暂停、切歌和拖动进度。
              目前先使用站内现有本地媒体做播放器底稿，后面你给我新的音频文件，我可以再替换成正式歌单。
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsExpanded((current) => !current)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
          >
            {isExpanded ? "收起播放器" : "展开播放器"}
          </button>
        </div>

        {isExpanded ? (
          <div className="mt-8 grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[1.7rem] border border-white/10 bg-black/20 p-6">
              <audio ref={audioRef} preload="metadata" loop={false}>
                <source src={activeTrack.audioSrc} type="audio/mp4" />
                <source src={activeTrack.audioSrc} type="video/mp4" />
              </audio>

              <div className="flex items-center gap-4">
                <img
                  src={activeTrack.poster}
                  alt={activeTrack.title}
                  className="h-24 w-24 rounded-[1.4rem] object-cover shadow-xl shadow-black/30"
                />
                <div>
                  <p className="text-sm text-slate-400">当前播放</p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">{activeTrack.title}</h3>
                  <p className="mt-2 text-sm text-sky-200">{activeTrack.subtitle}</p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-300">{activeTrack.vibe}</p>

              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-slate-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{audioReady ? "已就绪" : "正在读取媒体"}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  step="0.1"
                  value={Math.min(currentTime, duration || 0)}
                  onChange={handleSeek}
                  className="mt-4 w-full accent-blush-400"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10"
                >
                  <SkipBack className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={togglePlay}
                  className="inline-flex items-center gap-2 rounded-full bg-blush-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blush-400"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? "暂停" : "播放"}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10"
                >
                  <SkipForward className="h-5 w-5" />
                </button>

                <div className="ml-auto flex min-w-[180px] items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3">
                  <Volume2 className="h-4 w-4 text-blush-200" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(event) => setVolume(Number(event.target.value))}
                    className="w-full accent-blush-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              {bgmTracks.map((track) => (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => setActiveTrackId(track.id)}
                  className={`rounded-[1.4rem] border px-5 py-4 text-left transition ${
                    track.id === activeTrackId
                      ? "border-blush-300/40 bg-blush-400/10"
                      : "border-white/10 bg-black/20 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={track.poster}
                      alt={track.title}
                      className="h-16 w-16 rounded-[1rem] object-cover"
                    />
                    <div>
                      <p className="text-lg font-semibold text-white">{track.title}</p>
                      <p className="mt-1 text-sm text-sky-200">{track.subtitle}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{track.vibe}</p>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
