import { Header } from "@/widgets/header";
import { MobileMenu } from '@/features/mobileMenu'
import { Hero } from "@/widgets/hero";
import { About } from "@/widgets/about";
import {Footer} from "@/widgets/footer";
import { RoomCarousel } from "@/widgets/rooms-carousel/ui/RoomCarousel";
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