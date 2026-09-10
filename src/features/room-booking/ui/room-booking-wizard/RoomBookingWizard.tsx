import {useState} from "react";


export const RoomBookingWizard = ({ room }: RoomBookingWizardProps) => {
    const [step, setStep] = useState<1 | 2 | 3>(1);

    return (
        <div className={styles.wizardLayout}>
            {/* Левая часть: меняется в зависимости от шага */}
            <div className={styles.wizardMain}>
                {step === 1 && <DateStep onNext={() => setStep(2)} />}
                {step === 2 && <ContactStep onNext={() => setStep(3)} onBack={() => setStep(1)} />}
                {step === 3 && <PaymentStep onBack={() => setStep(2)} />}
            </div>

            {/* Правая часть: зафиксирована на всех шагах */}
            <aside className={styles.wizardSidebar}>
                <RoomDetailsInfo room={room} showPrice={false} />
            </aside>
        </div>
    );
};