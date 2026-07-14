import { writeFile } from 'fs/promises';
import { render } from 'takumi-js';
import { routes } from '../src/app/app.routes';

async function generateComponentOg(title: string, description: string, outputPath: string) {
  const webp = await render(
    `
    <div
      tw="flex h-full w-full flex-col relative overflow-hidden text-white"
      style="background-image: radial-gradient(circle at 100% 0%, rgba(0, 150, 137, 0.35) 0%, transparent 55%), linear-gradient(135deg, #0c1410 0%, #070a0a 55%, #0c070f 100%)"
    >
      <div
        tw="flex flex-col w-full h-full relative justify-between p-[90px_60px]"
      >
        <div tw="flex flex-col gap-8 mb-10 text-pretty">
          <span
            tw="text-[72px] font-extrabold leading-[1.1] tracking-[-0.04em] text-white"
          >${title}</span>
          <span
            tw="text-[44px] font-normal leading-[1.4] max-w-[95%] tracking-[-0.01em] line-clamp-2 overflow-hidden text-ellipsis text-white"
          >${description}</span>
        </div>

        <div tw="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#009689"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            tw="size-8"
          >
            <path d="M18 17a1 1 0 0 0-1 1v1a2 2 0 1 0 2-2z" />
            <path d="M20.97 3.61a.45.45 0 0 0-.58-.58C10.2 6.6 6.6 10.2 3.03 20.39a.45.45 0 0 0 .58.58C13.8 17.4 17.4 13.8 20.97 3.61" />
            <path d="m6.707 6.707 10.586 10.586" />
            <path d="M7 5a2 2 0 1 0-2 2h1a1 1 0 0 0 1-1z" />
          </svg>
          <span
            tw="text-[32px] font-bold tracking-[-0.02em] text-white/90"
          >
            elbe/<span tw="text-[#009689]">ui</span>
          </span>
        </div>
      </div>
    </div>
    `,
    { width: 1200, height: 630, format: 'webp' },
  );

  await writeFile(outputPath, webp);
}

async function generateOg() {
  const webp = await render(
    `<div tw="flex h-full w-full flex-col justify-center gap-4 items-center p-20"
        style="background-image: radial-gradient(circle at 100% 0%, rgba(0, 150, 137, 0.35) 0%, transparent 55%), linear-gradient(135deg, #0c1410 0%, #070a0a 55%, #0c070f 100%)"
    >
      <div tw="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#009689"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          tw="size-20"
        >
          <path d="M18 17a1 1 0 0 0-1 1v1a2 2 0 1 0 2-2z" />
          <path d="M20.97 3.61a.45.45 0 0 0-.58-.58C10.2 6.6 6.6 10.2 3.03 20.39a.45.45 0 0 0 .58.58C13.8 17.4 17.4 13.8 20.97 3.61" />
          <path d="m6.707 6.707 10.586 10.586" />
          <path d="M7 5a2 2 0 1 0-2 2h1a1 1 0 0 0 1-1z" />
        </svg>
        <h1 tw="m-0 text-8xl font-bold leading-none tracking-tighter text-white">
          elbe/<span tw="text-[#009689]">ui</span>
        </h1>
      </div>
      <p tw="text-white text-3xl text-balance text-center text-white">Angular UI components built with Tailwind CSS and spartan/ui.</p>
    </div>`,
    { width: 1200, height: 630, format: 'webp' },
  );

  await writeFile(`./public/assets/og/og.webp`, webp);
}

async function main() {
  const componentRoutes = routes
    .flatMap((r) => r.children ?? [])
    .filter((r) => r.data?.['meta']?.['ogImage']);
  for (const route of componentRoutes) {
    const meta = route.data!['meta'] as { description: string; ogImage: string };
    await generateComponentOg(route.title as string, meta.description, `./public${meta.ogImage}`);
  }

  await generateOg();
}

main();
