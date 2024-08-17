import satori from "satori";
import sharp from "sharp";

const BackgroundSVG = `
<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a202c;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2d3748;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="400" fill="url(#grad)" />
  <circle cx="700" cy="300" r="200" fill="#4a5568" fill-opacity="0.1" />
  <circle cx="100" cy="100" r="150" fill="#4a5568" fill-opacity="0.1" />
</svg>
`;

export async function getOgImage(title: string, author: string, date: string) {
  const fontData = await getFontData();
  const svg = await satori(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        fontFamily: "Noto Sans JP",
        color: "white",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#90cdf4",
          }}
        >
          Chalkboard
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            {title}
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "20px",
              color: "#a0aec0",
            }}
          >
            <span style={{ marginRight: "16px" }}>{author}</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>,
    {
      width: 800,
      height: 400,
      fonts: [
        {
          name: "Noto Sans JP",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );

  const svgBuffer = Buffer.from(svg);
  const backgroundSvgBuffer = Buffer.from(BackgroundSVG);

  const finalImage = await sharp(backgroundSvgBuffer)
    .composite([{ input: svgBuffer, top: 0, left: 0 }])
    .png()
    .toBuffer();

  return finalImage;
}

async function getFontData() {
  const API = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap`;

  const css = await (
    await fetch(API, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
  ).text();

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (!resource) throw new Error("Font not found");

  return await fetch(resource[1]).then((res) => res.arrayBuffer());
}