import {Link} from "@tanstack/react-router";
import {Icon} from "@/shared/ui/Icon";
import styles from './Logo.module.scss'


interface LogoProps {
    to?: string;
    className?: string;
    width?: number;
    height?: number;
}

export const Logo = ({
    to='/',
    className= '',
    width=250,
    height=39,
                     }:LogoProps) => {
    return (
        <Link to={to} className={`${styles.headerLogo} ${className}`}>
            <Icon
                name="SlowTeaHouse"
                className={styles.headerLogoImage}
                width={width}
                height={height}
            />
        </Link>
    )
}




// <div className={styles.headerLogo}>
//     <Link to="/" className={styles.logo}>
//         <Icon
//             name="SlowTeaHouse"
//             className={styles.headerLogoImage}
//             width={250}
//             height={39}
//         />
//     </Link>
// </div>