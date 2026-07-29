import { Header } from "@/widgets/Header";
import { MobileMenu } from "@/widgets/MobileMenu";
import { Hero } from "@/widgets/Hero";
import { RoomCard } from "@/widgets/Room-card";
import { About } from "@/widgets/About";
import { Footer } from "@/widgets/Footer";

export const HomePage = () => {
    return (
        <>
            <Header />
            <MobileMenu />
            <Hero />
            <RoomCard />
            <About />
            <Footer />
        </>
    );
};