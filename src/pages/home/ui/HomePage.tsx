import { Header } from "@/widgets/header";
import { Hero } from "@/widgets/hero";
import { About } from "@/widgets/about";
import {Footer} from "@/widgets/footer";
import { RoomCarousel } from "@/widgets/rooms-carousel";
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
            <Hero />
            <RoomCarousel rooms={rooms} />
            <About />
            <Footer />
        </>
    );
};