import { useEffect, useMemo, useState } from "react";
import FanPulseSection from "../components/FanPulseSection";
import FanModal from "../components/FanModal";
import FloatingCommentWall from "../components/FloatingCommentWall";
import GallerySection from "../components/GallerySection";
import HeroSection from "../components/HeroSection";
import MusicPlatformSection from "../components/MusicPlatformSection";
import PolaroidGenerator from "../components/PolaroidGenerator";
import QuizSection from "../components/QuizSection";
import RandomPhotoSpotlight from "../components/RandomPhotoSpotlight";
import RoseTimelineSection from "../components/RoseTimelineSection";
import ThemeSwitcher from "../components/ThemeSwitcher";
import UploadFanPhotoSection from "../components/UploadFanPhotoSection";
import { api } from "../lib/api";

function getStats(images) {
  return images.reduce(
    (result, item) => {
      result.totalPhotos += 1;
      result.totalFans += item.fanCount;
      result.totalComments += item.commentCount;
      return result;
    },
    {
      totalPhotos: 0,
      totalFans: 0,
      totalComments: 0,
    },
  );
}

const fanLines = [
  "今晚也一起给 Rosé 留下新的应援评论。",
  "热门图片会随着互动数量持续变化。",
  "你每点一次赞，首页的热度感就更强一点。",
  "这面图片墙会因为粉丝留言慢慢长出情绪。",
];

export default function HomePage({ theme, onThemeChange }) {
  const [images, setImages] = useState([]);
  const [recentComments, setRecentComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    let mounted = true;

    Promise.all([api.getImages(), api.getRecentComments()])
      .then(([imagesData, commentsData]) => {
        if (mounted) {
          setImages(imagesData.images);
          setRecentComments(commentsData.comments);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLineIndex((current) => (current + 1) % fanLines.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  const stats = useMemo(() => getStats(images), [images]);
  const activeFans = useMemo(
    () => Math.max(188, Math.round(stats.totalFans / 91)),
    [stats.totalFans],
  );

  async function refreshRecentComments() {
    try {
      const data = await api.getRecentComments();
      setRecentComments(data.comments);
    } catch {
      return;
    }
  }

  async function handleLike(imageId) {
    try {
      const data = await api.likeImage(imageId);
      setImages((current) =>
        current.map((item) => (item.id === imageId ? data.image : item)),
      );

      setSelectedImage((current) =>
        current && current.id === imageId ? data.image : current,
      );
    } catch (err) {
      setError(err.message);
    }
  }

  function handleCommentCreated(updatedImage) {
    setImages((current) =>
      current.map((item) => (item.id === updatedImage.id ? updatedImage : item)),
    );
    setSelectedImage(updatedImage);
    refreshRecentComments();
  }

  function handleRandomPick() {
    if (!images.length) {
      return;
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];
    setSelectedImage(randomImage);
  }

  return (
    <main className="pb-20">
      <HeroSection stats={stats} />
      <ThemeSwitcher currentTheme={theme} onThemeChange={onThemeChange} />
      <RandomPhotoSpotlight onPick={handleRandomPick} />

      <section id="community" className="section-shell pt-14">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-blush-200/80">
              Fan Energy
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              图片浏览、评论互动与投稿内容集中展示。
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              每张图片都支持点赞、评论与互动管理，相关内容会同步更新到首页展示区域。
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-sky-400/15 to-white/5 p-6">
            <p className="text-3xl font-semibold text-white">{stats.totalPhotos}</p>
            <p className="mt-2 text-sm text-slate-300">已导入的本地图片素材</p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-blush-400/15 to-white/5 p-6">
            <p className="text-3xl font-semibold text-white">{stats.totalComments}</p>
            <p className="mt-2 text-sm text-slate-300">当前站内可见评论总数</p>
          </div>
        </div>
      </section>

      {!loading && !error ? (
        <FanPulseSection
          images={images}
          recentComments={recentComments}
          activeFans={activeFans}
          currentLine={fanLines[lineIndex]}
        />
      ) : null}

      {!loading && !error ? <FloatingCommentWall comments={recentComments} /> : null}

      {loading ? (
        <section className="section-shell pt-16">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-16 text-center text-slate-300">
            正在加载图片墙...
          </div>
        </section>
      ) : error ? (
        <section className="section-shell pt-16">
          <div className="rounded-[2rem] border border-rose-300/20 bg-rose-400/10 px-6 py-16 text-center text-rose-100">
            {error}
          </div>
        </section>
      ) : (
        <GallerySection
          images={images}
          onOpen={setSelectedImage}
          onLike={handleLike}
        />
      )}

      {!loading && !error ? <RoseTimelineSection /> : null}
      {!loading && !error ? <MusicPlatformSection /> : null}
      {!loading && !error ? <PolaroidGenerator images={images} /> : null}
      <QuizSection />

      <UploadFanPhotoSection />

      <section className="section-shell pt-14">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-white/5 to-white/[0.03] px-6 py-8 sm:px-8">
          <p className="text-sm uppercase tracking-[0.3em] text-blush-200/70">
            Built For Fans
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            站内已集成完整的互动与管理功能。
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
            页面同时包含时间轴、主题切换、音乐入口、拍立得生成器、
            漂流留言墙、随机看图和粉丝小测试等内容模块。
          </p>
        </div>
      </section>

      <FanModal
        image={selectedImage}
        isOpen={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        onLike={handleLike}
        onCommentCreated={handleCommentCreated}
      />
    </main>
  );
}
