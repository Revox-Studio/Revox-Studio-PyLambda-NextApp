import Image from "next/image";
import {
  ArrowRightCircle,
  Bolt,
  Pencil,
  SlidersHorizontal,
} from "lucide-react";
import Button from "@/app/components/ui/Button";
import NoticeBar from "@/app/components/NoticeBar";

const features = [
  {
    icon: Bolt,
    title: "Fast by default",
    description: "Server rendering and smart routing keep every page quick.",
  },
  {
    icon: SlidersHorizontal,
    title: "Easy to customize",
    description: "Reusable Button and NoticeBar components styled with Tailwind.",
  },
  {
    icon: Pencil,
    title: "Smooth motion",
    description: "GSAP animation brings the welcome text in from the left.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background font-sans text-foreground">
      <NoticeBar linkText="Learn more" href="/updates">
        We just launched a new feature.
      </NoticeBar>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 sm:px-8">
        <header className="flex h-14 shrink-0 items-center">
          <Image
            className="h-5 w-[100px] dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
        </header>

        <section className="flex flex-1 flex-col items-center justify-center py-10 text-center sm:py-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-brand-accent" />
            Built with Next.js and GSAP
          </p>

          <h1 className="mt-5 font-momo text-7xl font-semibold leading-none tracking-tight text-brand dark:text-brand-accent sm:text-8xl">
            Welcome
          </h1>

          <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Start building your next app on a fast, modern stack. Clean
            components, smooth motion, ready to ship.
          </p>

          <div className="mt-7 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-3">
            <Button
              size="md"
              icon={<ArrowRightCircle />}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              Get started
            </Button>

            <Button
              variant="secondary"
              size="md"
              icon={<ArrowRightCircle />}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              Learn more
            </Button>
          </div>
        </section>

        <section
          aria-label="Features"
          className="grid w-full gap-3 pb-8 sm:grid-cols-3 sm:gap-4 sm:pb-10"
        >
          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-2xl border border-border bg-surface/70 p-4 text-left transition-colors hover:border-brand/30 hover:bg-surface sm:p-5"
            >
              <Icon aria-hidden="true" className="h-4 w-4 text-brand-accent" />
              <h2 className="mt-3 text-sm font-semibold text-foreground">
                {title}
              </h2>
              <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
