export const containerAnim = {
    hidden: {
        y: 300,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: .4,
            delay: .3,
            when: "beforeChildren",
            staggerChildren: .15,
        }
    }
}
export const shadowAnim = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            duration: .4,
            delay: .04,
        }
    }
}