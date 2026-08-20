import { useState } from 'react';
import styles from './ImageSlider.module.scss';
import type { Room } from "@/entities/room/model/types";

interface ImageSliderProps {
    room: Room;
}

export const ImageSlider = ({ room }: ImageSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);


    const photosArray = room.detailImageUrl

    if (!photosArray || photosArray.length === 0) return null;

    const currentPhotoUrl = photosArray[currentIndex];

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? photosArray.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === photosArray.length - 1 ? 0 : prev + 1));
    };

    const handleSelectSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className={styles.sliderContainer}>
            {/* Текущая фотография */}
            <img
                src={currentPhotoUrl}
                alt={`${room.title} - фото ${currentIndex + 1}`}
                className={styles.slideImage}
            />

            {/* Затемнение снизу */}
            <div className={styles.overlay} />

            {/* Стрелка Влево */}
            <button
                type="button"
                className={`${styles.arrowButton} ${styles.prevArrow}`}
                onClick={handlePrev}
                aria-label="Previous slide"
            >
                &#8249;
            </button>

            {/* Стрелка Вправо */}
            <button
                type="button"
                className={`${styles.arrowButton} ${styles.nextArrow}`}
                onClick={handleNext}
                aria-label="Next slide"
            >
                &#8250;
            </button>

            {/* Контент: Название комнаты и Пагинация */}
            <div className={styles.contentOverlay}>
                <h3 className={styles.slideTitle}>{room.title}</h3>

                <div className={styles.pagination}>
                    {photosArray.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                            onClick={() => handleSelectSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={index === currentIndex ? 'true' : 'false'}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};