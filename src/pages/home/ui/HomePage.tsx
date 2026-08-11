import { Header } from "@/widgets/Header";
import { MobileMenu } from "@/widgets/MobileMenu";
import { Hero } from "@/widgets/Hero";
import { About } from "@/widgets/About";
import { Footer } from "@/widgets/Footer";
import RoomCarousel from "@/widgets/RoomsCarousel/ui/RoomCarousel";
import {useRooms} from "@/entities/room/model/useRooms";

export const HomePage = () => {
    const { rooms, loading, error } = useRooms();

    if (loading) {
        return <div>Загрузка данных...</div>;
    }

    if (error || !rooms) {
        return <div>Ошибка: {error || 'Не удалось загрузить данные'}</div>;
    }

    return (
        <>
            <Header />
            <MobileMenu />
            <Hero />
            <RoomCarousel rooms={rooms} />
            <About />
            <Footer />
        </>
    );
};