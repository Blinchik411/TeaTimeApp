import { Route } from '@/app/router/routes/room/$roomId';
import { useRoom } from '@/entities/room/model/useRoom';
import {RoomHeader} from "@/widgets/room-header";
import {ExperienceSection} from "@/widgets/experience-section";
import {Footer} from '@/widgets/footer'
import {ReviewSection} from "@/widgets/review-section";
import {ImageSlider} from "@/widgets/image-slider/ui/imageSlider";


export const RoomDetailsPage = () => {

    const { roomId } = Route.useParams();
    const { room, loading, error } = useRoom(roomId);

    if (loading) return <div>Загрузка информации о комнате...</div>;
    if (error || !room) return <div>Ошибка: {error || 'Комната не найдена'}</div>;

    return (
<>
    <RoomHeader room={room}/>
    <ImageSlider
        images={room.detailImageUrl}
        title={room.title}
    />
    <ExperienceSection room={room}/>
    <ReviewSection reviews={room.reviews} roomId={roomId}/>
    <Footer theme={'light'}/>
</>
    );
};