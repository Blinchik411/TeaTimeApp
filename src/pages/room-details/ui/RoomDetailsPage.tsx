import { Route } from '@/app/router/routes/room/$roomId';
import { useRoom } from '@/entities/room/model/useRoom';
import {RoomHeader} from "@/widgets/room-header/ui/RoomHeader";
import {ExperienceSection} from "@/widgets/experience-section/ExperienceSection";
import {Footer} from '@/widgets/footer'
import {ReviewsSection} from "@/widgets/review-section/ReviewSection";


export const RoomDetailsPage = () => {

    const { roomId } = Route.useParams();
    const { room, loading, error } = useRoom(roomId);

    if (loading) return <div>Загрузка информации о комнате...</div>;
    if (error || !room) return <div>Ошибка: {error || 'Комната не найдена'}</div>;

    return (
<>
    <RoomHeader room={room}/>
    <ExperienceSection room={room}/>
    <ReviewsSection reviews={room.reviews}/>
    <Footer theme={'light'}/>
</>
    );
};