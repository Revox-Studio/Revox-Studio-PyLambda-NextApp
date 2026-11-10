import Image from "next/image";
import { ArrowRightCircle } from "lucide-react";
import Button from "@/app/components/ui/Button";
import NoticeBar from "@/app/components/NoticeBar";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background font-sans text-foreground">
      <NoticeBar linkText="Learn more" href="/updates">
        We just launched a new feature.
      </NoticeBar>
      <main className="flex w-full flex-1 flex-col items-center justify-between bg-background px-8 py-16 sm:items-start sm:px-16">
        <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        <div className="btn flex flex-row gap-4 p-2">
          <Button size="md" icon={<ArrowRightCircle />} iconPosition="right">
            Get started
          </Button>

          <Button variant="secondary" size="md" icon={<ArrowRightCircle />} iconPosition="right">
            Learn more
          </Button>
        </div>
        
      </main>
    </div>
  );
}
