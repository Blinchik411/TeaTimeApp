import { type EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {
    NextButton,
    PrevButton,
    usePrevNextButtons
} from './RoomCarouselArrowButtons'
import { DotButton, useDotButton } from './RoomCarouselDotButton'
import type { RoomPreview} from "@/entities/room/model/types";
import {RoomCard} from "@/widgets/Room-card";
import './embla-room.css'

type PropType = {
    rooms: RoomPreview[]
    options?: EmblaOptionsType
}

const RoomCarousel = (props: PropType) => {
    const { rooms, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {rooms.map((room) => (
                        <div className="embla__slide" key={room.id}>
                            <div className="embla__slide__number">
                                <RoomCard room={room}></RoomCard>
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
                                index === selectedIndex ? ' embla__dot--selected' : ''
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RoomCarousel

