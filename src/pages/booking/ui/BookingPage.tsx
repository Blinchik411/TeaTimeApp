import {BookingHeader} from "@/widgets/booking-header"; // или из вашего пути

export const BookingPage = () => {
    return (
        <div className="booking-page">
            <BookingHeader />
            <main>
                {/* Содержимое страницы */}
            </main>
        </div>
    );
};