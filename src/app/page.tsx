import BannerCarousel from '@/components/ui/BannerCarousel';
import CategoryGrid from '@/components/ui/CategoryGrid';
import AboutSection from '@/components/sections/AboutSection';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 轮播图区域 */}
      <section className="h-[600px] w-full">
        <BannerCarousel />
      </section>

      {/* 热门分类 */}
      <section className="container mx-auto px-4 py-12">
        <CategoryGrid />
      </section>

      {/* 关于我们 */}
      <section className="bg-gray-50">
        <AboutSection />
      </section>
    </div>
  );
}
