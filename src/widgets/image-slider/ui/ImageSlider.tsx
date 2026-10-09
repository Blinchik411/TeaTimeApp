import { useState } from 'react'
import styles from './ImageSlider.module.scss'

interface ImageSliderProps {
  images: string[]
  title: string
}

export const ImageSlider = ({ images, title }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  const currentPhotoUrl = images[currentIndex]

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleSelectSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className={styles.sliderContainer}>
      <img
        src={currentPhotoUrl}
        alt={`${title} - фото ${currentIndex + 1}`}
        className={styles.slideImage}
      />

      <div className={styles.overlay} />

      <button
        type="button"
        className={`${styles.arrowButton} ${styles.prevArrow}`}
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        &#8249;
      </button>

      <button
        type="button"
        className={`${styles.arrowButton} ${styles.nextArrow}`}
        onClick={handleNext}
        aria-label="Next slide"
      >
        &#8250;
      </button>

      <div className={styles.contentOverlay}>
        {title && <h3 className={styles.slideTitle}>{title}</h3>}
        <div className={styles.pagination}>
          {images.map((_, index) => (
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
  )
}
