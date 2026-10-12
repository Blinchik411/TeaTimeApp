import { type EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { NextButton, PrevButton } from './RoomCarouselArrowButtons'
import { DotButton } from './RoomCarouselDotButton'
import { usePrevNextButtons } from '../model/usePrevNextButtons'
import { useDotButton } from '../model/useDotButton'
import { RoomCard, type RoomPreview } from '@/entities/room'
import './embla-room.css'
import { useEffect } from 'react'

type PropType = {
  rooms: RoomPreview[]
  options?: EmblaOptionsType
}

export const RoomCarousel = (props: PropType) => {
  const { rooms, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit()
    }
  }, [emblaApi, rooms])

  return (
    <div id={'rooms'} className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {rooms.map((room) => (
            <div className="embla__slide" key={room.id}>
              <div className="embla__slide__number">
                <RoomCard room={room}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : '',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
