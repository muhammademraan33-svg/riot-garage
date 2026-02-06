import { TopNav } from "../ui/TopNav";
import { ShopifyCollection } from "../ui/ShopifyCollection";

/**
 * Kits and Bundles Page
 * Displays Shopify collections for kits and bundles
 */
export function KitsAndBundles() {
  // Collection ID from the client's example: '306307367048'
  // This can be made configurable later if there are multiple collections
  const collectionId = '306307367048';

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative">
      <TopNav />

      <main className="mx-auto max-w-[1920px] px-3 sm:px-4 md:px-6 pt-4 sm:pt-5 md:pt-6 pb-6 sm:pb-8 md:pb-10 relative z-0">
        {/* Page Header */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[0.16em] text-white uppercase mb-4">
            Kits & Bundles
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-3xl">
            Complete your detailing setup with our curated kits and bundles. 
            Save time and money with pre-configured product combinations.
          </p>
        </div>

        {/* Shopify Collection */}
        <div className="rounded-xl border border-[#333333] bg-black/40 p-6 sm:p-8 md:p-10">
          <ShopifyCollection 
            collectionId={collectionId}
            componentId="kits-bundles-collection"
          />
        </div>
      </main>
    </div>
  );
}
