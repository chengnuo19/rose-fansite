import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Pause,
  Play,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import PhotoCard from "./PhotoCard";

function wrapIndex(index, length) {
  if (!length) {
    return 0;
  }

  return (index + length) % length;
}

function ImmersiveGalleryOverlay({
  image,
  images,
  isOpen,
  isAutoplay,
  onClose,
  onNext,
  onPrevious,
  onSelect,
  onToggleAutoplay,
  onOpenComments,
}) {
  const startXRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrevious]);

  if (!isOpen || !image) {
    return null;
  }

  function handleTouchStart(event) {
    startXRef.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event) {
    if (startXRef.current == null) {
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? startXRef.current;
    const deltaX = startXRef.current - endX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        onNext();
      } else {
        onPrevious();
      }
    }

    startXRef.current = null;
  }

  return (
    <div className="fixed inset-0 z-[70] bg-slate-950/95 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-blush-200/70">
              Immersive Gallery
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{image.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleAutoplay}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              {isAutoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isAutoplay ? "暂停轮播" : "继续轮播"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid flex-1 gap-6 overflow-hidden px-4 py-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:py-6">
          <div className="relative flex min-h-0 items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] px-3 py-6 sm:px-6">
            <button
              type="button"
              onClick={onPrevious}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-slate-950/70 p-3 text-white transition hover:bg-slate-900 sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div
              className="immersive-photo-shell relative w-full max-w-5xl"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                className="max-h-[72vh] w-full rounded-[1.7rem] object-contain shadow-[0_28px_90px_rgba(0,0,0,0.45)]"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[1.7rem] border border-white/10" />
            </div>
            <button
              type="button"
              onClick={onNext}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-slate-950/70 p-3 text-white transition hover:bg-slate-900 sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <aside className="flex min-h-0 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
            <div className="border-b border-white/10 px-5 py-5">
              <p className="text-sm uppercase tracking-[0.28em] text-blush-200/70">Now Showing</p>
              <p className="mt-3 text-base leading-7 text-slate-300">{image.description}</p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-400">
                <span>{image.likeCount} 赞</span>
                <span>{image.commentCount} 评论</span>
                <span>{image.fanCount} 热度</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenComments(image);
                }}
                className="mt-5 inline-flex rounded-full bg-blush-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blush-400"
              >
                打开互动面板
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-3">
                {images.map((item) => (
                  <button
                    key={`immersive-thumb-${item.id}`}
                    type="button"
                    onClick={() => onSelect(item.id)}
                    className={`overflow-hidden rounded-[1.2rem] border transition ${
                      item.id === image.id
                        ? "border-blush-300/60 ring-2 ring-blush-300/25"
                        : "border-white/10 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="aspect-[4/5] h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function GallerySection({ images, onOpen, onLike }) {
  const featured = useMemo(
    () => images.filter((item) => item.featured).slice(0, 8),
    [images],
  );
  const [displayMode, setDisplayMode] = useState("flipbook");
  const [albumIndex, setAlbumIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isImmersiveOpen, setIsImmersiveOpen] = useState(false);
  const [isStagePaused, setIsStagePaused] = useState(false);
  const stageTouchStartRef = useRef(null);

  useEffect(() => {
    if (!featured.length) {
      return;
    }

    setAlbumIndex((current) => wrapIndex(current, featured.length));
  }, [featured.length]);

  useEffect(() => {
    if (!isAutoplay || isStagePaused || featured.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setAlbumIndex((current) => wrapIndex(current + 1, featured.length));
    }, 3400);

    return () => window.clearInterval(timer);
  }, [featured.length, isAutoplay, isStagePaused]);

  const activeFeatured = featured[albumIndex] || featured[0];

  function goPrevious() {
    setAlbumIndex((current) => wrapIndex(current - 1, featured.length));
  }

  function goNext() {
    setAlbumIndex((current) => wrapIndex(current + 1, featured.length));
  }

  function openImmersive(index = albumIndex) {
    setAlbumIndex(wrapIndex(index, featured.length));
    setIsImmersiveOpen(true);
  }

  function handleSelectById(id) {
    const nextIndex = featured.findIndex((item) => item.id === id);
    if (nextIndex >= 0) {
      setAlbumIndex(nextIndex);
    }
  }

  function handleStageTouchStart(event) {
    stageTouchStartRef.current = event.touches[0]?.clientX ?? null;
  }

  function handleStageTouchEnd(event) {
    if (stageTouchStartRef.current == null) {
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? stageTouchStartRef.current;
    const deltaX = stageTouchStartRef.current - endX;

    if (Math.abs(deltaX) > 45) {
      if (deltaX > 0) {
        goNext();
      } else {
        goPrevious();
      }
    }

    stageTouchStartRef.current = null;
  }

  return (
    <section id="gallery" className="section-shell pt-14">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-blush-200/80">
            Image Wall
          </p>
          <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">
            Rosé Moments
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            现在支持杂志翻页和拍立得相册两种展示模式自由切换，还加入了自动翻页、
            手机滑动和全屏沉浸式看图，让首页浏览体验更完整、更有层次。
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setDisplayMode("flipbook")}
              className={`rounded-full px-4 py-2 text-sm transition ${
                displayMode === "flipbook"
                  ? "bg-white text-slate-950"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              杂志翻页
            </button>
            <button
              type="button"
              onClick={() => setDisplayMode("album")}
              className={`rounded-full px-4 py-2 text-sm transition ${
                displayMode === "album"
                  ? "bg-white text-slate-950"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              拍立得相册
            </button>
          </div>
          <button
            type="button"
            onClick={() => setIsAutoplay((current) => !current)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            {isAutoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isAutoplay ? "暂停自动翻页" : "开启自动翻页"}
          </button>
          {activeFeatured ? (
            <button
              type="button"
              onClick={() => openImmersive(albumIndex)}
              className="inline-flex items-center gap-2 rounded-full bg-blush-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blush-400"
            >
              <Expand className="h-4 w-4" />
              全屏沉浸看图
            </button>
          ) : null}
        </div>
      </div>

      {!!featured.length && (
        <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div
            className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-5 sm:p-6"
            onMouseEnter={() => setIsStagePaused(true)}
            onMouseLeave={() => setIsStagePaused(false)}
            onTouchStart={handleStageTouchStart}
            onTouchEnd={handleStageTouchEnd}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.28em] text-blush-100/80">
                <Sparkles className="h-4 w-4 text-blush-300" />
                {displayMode === "flipbook" ? "Magazine Spread" : "Polaroid Album"}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={goPrevious}
                  className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {displayMode === "flipbook" ? (
              <div className="book-stage magazine-stage">
                <div className="book-frame">
                  {featured.map((item, index) => {
                    const offset = wrapIndex(index - albumIndex, featured.length);
                    const visualOffset = offset > featured.length / 2 ? offset - featured.length : offset;
                    const depth = Math.abs(visualOffset);
                    const isActive = index === albumIndex;

                    return (
                      <button
                        key={`featured-${item.id}`}
                        type="button"
                        onClick={() => openImmersive(index)}
                        className={`book-page ${isActive ? "book-page-active" : ""}`}
                        style={{
                          transform: `translateX(${visualOffset * 26}px) rotateY(${isActive ? 0 : -28 + visualOffset * 4}deg) rotateZ(${visualOffset * 1.3}deg) scale(${Math.max(0.82, 1 - depth * 0.06)})`,
                          zIndex: featured.length - depth,
                          opacity: depth > 3 ? 0 : 1,
                        }}
                      >
                        <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
                        <div className="magazine-kicker">
                          Editorial Pick
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                          <p className="text-xs uppercase tracking-[0.3em] text-blush-200/80">
                            Featured Spread
                          </p>
                          <h3 className="mt-2 text-2xl font-semibold text-white">{item.title}</h3>
                          <p className="mt-2 max-w-md text-sm leading-7 text-slate-200">{item.subtitle}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="album-stage polaroid-stage">
                <div className="album-spotlight rounded-[1.8rem] border border-white/10 bg-black/20 p-4 sm:p-5">
                  {featured.map((item, index) => {
                    const offset = index - albumIndex;
                    const distance = Math.abs(offset);
                    const visible = distance <= 1;

                    return (
                      <button
                        key={`album-${item.id}`}
                        type="button"
                        onClick={() => {
                          if (index === albumIndex) {
                            openImmersive(index);
                            return;
                          }

                          setAlbumIndex(index);
                        }}
                        className="album-card"
                        style={{
                          transform: `translate(-50%, -50%) translateX(${offset * 22}%) scale(${index === albumIndex ? 1 : 0.84}) rotate(${offset * 5}deg)`,
                          opacity: visible ? 1 : 0,
                          zIndex: index === albumIndex ? 4 : 3 - distance,
                          pointerEvents: visible ? "auto" : "none",
                        }}
                      >
                        <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                        <div className="album-card-tape album-card-tape-left" />
                        <div className="album-card-tape album-card-tape-right" />
                        <div className="absolute inset-x-0 bottom-0 bg-white px-5 pb-5 pt-4 text-left text-slate-950">
                          <p className="font-display text-lg leading-none">{item.title}</p>
                          <p className="mt-2 text-xs uppercase tracking-[0.26em] text-slate-500">
                            Rosie Archive
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="album-strip mt-5">
                  {featured.map((item, index) => (
                    <button
                      key={`album-strip-${item.id}`}
                      type="button"
                      onClick={() => setAlbumIndex(index)}
                      className={`album-strip-card ${
                        index === albumIndex ? "album-strip-card-active" : ""
                      }`}
                    >
                      <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {activeFeatured ? (
              <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-blush-200/70">当前页</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{activeFeatured.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{activeFeatured.description}</p>
                <div className="mt-5 flex gap-3 text-sm text-slate-400">
                  <span>{activeFeatured.likeCount} 赞</span>
                  <span>{activeFeatured.commentCount} 评论</span>
                  <span>{activeFeatured.fanCount} 热度</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => onOpen(activeFeatured)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                  >
                    打开评论
                  </button>
                  <button
                    type="button"
                    onClick={() => onLike(activeFeatured.id)}
                    className="rounded-full bg-blush-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blush-400"
                  >
                    点赞应援
                  </button>
                </div>
              </div>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {featured.map((item, index) => (
                <button
                  key={`featured-note-${item.id}`}
                  type="button"
                  onClick={() => setAlbumIndex(index)}
                  className={`rounded-[1.4rem] border px-4 py-4 text-left transition ${
                    index === albumIndex
                      ? "border-blush-300/40 bg-blush-400/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-xs leading-6 text-slate-400">{item.subtitle}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {images.map((image) => (
          <PhotoCard key={image.id} image={image} onOpen={onOpen} onLike={onLike} />
        ))}
      </div>

      <ImmersiveGalleryOverlay
        image={activeFeatured}
        images={featured}
        isOpen={isImmersiveOpen}
        isAutoplay={isAutoplay}
        onClose={() => setIsImmersiveOpen(false)}
        onNext={goNext}
        onPrevious={goPrevious}
        onSelect={handleSelectById}
        onToggleAutoplay={() => setIsAutoplay((current) => !current)}
        onOpenComments={onOpen}
      />
    </section>
  );
}
