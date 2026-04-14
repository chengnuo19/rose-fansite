import { Download, ImagePlus } from "lucide-react";
import { useMemo, useState } from "react";

function createDownloadFromCanvas({ imageUrl, title, note }) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imageUrl;

  img.onload = () => {
    const width = 1080;
    const height = 1400;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");

    context.fillStyle = "#f8f4ef";
    context.fillRect(0, 0, width, height);

    context.drawImage(img, 80, 80, width - 160, 930);

    context.fillStyle = "#131313";
    context.font = "bold 48px Georgia";
    context.fillText(title, 90, 1110);

    context.fillStyle = "#5f5a55";
    context.font = "28px Inter, sans-serif";
    context.fillText(note || "Rosé fan-made polaroid", 90, 1170);

    context.fillStyle = "#8d877f";
    context.font = "24px Inter, sans-serif";
    context.fillText("Rosé Gallery", 90, 1240);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "rose-polaroid.png";
    link.click();
  };
}

export default function PolaroidGenerator({ images }) {
  const availableImages = useMemo(() => images.slice(0, 10), [images]);
  const [selectedId, setSelectedId] = useState(availableImages[0]?.id || null);
  const [note, setNote] = useState("still falling for rosie.");

  const selectedImage =
    availableImages.find((item) => item.id === selectedId) || availableImages[0];

  if (!selectedImage) {
    return null;
  }

  return (
    <section className="section-shell pt-14">
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-blush-200/80">
            Polaroid Lab
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            拍立得留言生成器
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            选一张喜欢的图，写一句话，就能生成一张带粉丝站气质的拍立得海报。
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {availableImages.slice(0, 6).map((image) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedId(image.id)}
                className={`overflow-hidden rounded-[1.2rem] border transition ${
                  image.id === selectedImage.id
                    ? "border-blush-300/50 ring-2 ring-blush-300/25"
                    : "border-white/10 opacity-80 hover:opacity-100"
                }`}
              >
                <img src={image.imageUrl} alt={image.title} className="aspect-[4/5] w-full object-cover" />
              </button>
            ))}
          </div>

          <textarea
            rows={3}
            value={note}
            onChange={(event) => setNote(event.target.value.slice(0, 80))}
            className="mt-5 w-full rounded-[1.4rem] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            placeholder="写一句要印在拍立得上的话..."
          />

          <button
            type="button"
            onClick={() =>
              createDownloadFromCanvas({
                imageUrl: selectedImage.imageUrl,
                title: selectedImage.title,
                note,
              })
            }
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
          >
            <Download className="h-4 w-4" />
            下载拍立得海报
          </button>
        </div>

        <div className="flex items-center justify-center rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-6">
          <div className="polaroid-preview max-w-[360px]">
            <div className="relative overflow-hidden rounded-[1.2rem] border-[10px] border-white bg-white pb-20 shadow-[0_32px_90px_rgba(0,0,0,0.32)]">
              <img src={selectedImage.imageUrl} alt={selectedImage.title} className="aspect-[4/5] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-white px-6 pb-6 pt-4 text-slate-950">
                <p className="font-display text-2xl">{selectedImage.title}</p>
                <p className="mt-2 text-sm italic text-slate-500">{note}</p>
              </div>
            </div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.26em] text-blush-200/80">
              <ImagePlus className="h-4 w-4" />
              fan-made polaroid
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
