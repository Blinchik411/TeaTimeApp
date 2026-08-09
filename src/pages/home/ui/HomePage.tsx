import { Header } from "@/widgets/Header";
import { MobileMenu } from "@/widgets/MobileMenu";
import { Hero } from "@/widgets/Hero";
import { RoomCard } from "@/widgets/Room-card";
import { About } from "@/widgets/About";
import { Footer } from "@/widgets/Footer";
import {useRoom} from "@/entities/room/model/useRoom";
import RoomCarousel from "@/widgets/RoomsCarousel/ui/RoomCarousel";

export const HomePage = () => {

    // const { room, loading, error } = useRoom();
    //
    // if (loading) return <div>Загрузка данных...</div>;
    // if (error || !room) return <div>Ошибка: {error || 'Не удалось загрузить данные'}</div>;

    return (
        <>
            <Header />
            <MobileMenu />
            <Hero />
            <RoomCarousel slides={[1,2]}/>
            {/*<RoomCard room={room} />*/}
            <About />
            <Footer />
        </>
    );
};