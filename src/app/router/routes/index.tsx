import { createFileRoute } from '@tanstack/react-router';
import {HomePage} from "@/pages/home/ui";

export const Route = createFileRoute('/')({
    component: HomePage,
});