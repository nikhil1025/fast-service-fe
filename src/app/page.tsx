import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/StatsSection'
import CategoriesSection from '@/components/CategoriesSection'
import BannerSection from '@/components/BannerSection'
import CleaningServicesSection from '@/components/CleaningServicesSection'
import MovingBannerSection from '@/components/MovingBannerSection'
import MovingServicesSection from '@/components/MovingServicesSection'
import MaintenanceBannerSection from '@/components/MaintenanceBannerSection'
import MaintenanceServicesSection from '@/components/MaintenanceServicesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import CallToActionSection from '@/components/CallToActionSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <BannerSection />
      <CleaningServicesSection />
      <MovingBannerSection />
      <MovingServicesSection />
      <MaintenanceBannerSection />
      <MaintenanceServicesSection />
      <TestimonialsSection />
      <CallToActionSection />
    </>
  )
}