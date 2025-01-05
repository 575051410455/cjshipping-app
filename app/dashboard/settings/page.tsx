import { SearchParams } from "nuqs/server";
import ProfileViewPage from "./_components/profile-view-page";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";

type pageProps = {
    searchParams: Promise<SearchParams>;
};

export const metadata = {
    title: 'Dashboard : Profile'
}

export default async function Page({ searchParams }: pageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
        <Suspense>
          <ProfileViewPage />
        </Suspense>
    </div>
  )
}
