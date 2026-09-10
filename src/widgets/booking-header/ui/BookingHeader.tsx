import {Logo} from "@/shared/ui/logo/Logo";
import styles from './BookingHeader.module.scss'


export const BookingHeader = () => {

    return (
        <header className={`${styles.header} container`}>
            <Logo/>
        </header>

    )
}