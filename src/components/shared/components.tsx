import { motion, type Variants } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

export const fadeInFromLeft: Variants = {
    hidden: {
        opacity: 0,
        x: -30,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export const fadeInFromRight: Variants = {
    hidden: {
        opacity: 0,
        x: 30,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export function FadeInFromLeft(
    props: HTMLMotionProps<"div">
) {
    return (
        <motion.div
            {...props}
            variants={fadeInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        />
    );
}
export function FadeInFromRight(
    props: HTMLMotionProps<"div">
) {
    return (
        <motion.div
            {...props}
            variants={fadeInFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        />
    );
}