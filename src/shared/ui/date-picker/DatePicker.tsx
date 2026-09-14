import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css";

interface DatePickerProps {
    selectedDate?: Date;
    onSelectDate: (date: Date | undefined) => void;
    className?: string;
}

export function DatePicker({ selectedDate, onSelectDate, className }: DatePickerProps) {

    const today = new Date();

    return (
        <DayPicker
            animate
            mode="single"
            navLayout="around"
            selected={selectedDate}
            onSelect={onSelectDate}
            disabled={{ before: today }}
            className={className}
        />
    );
}