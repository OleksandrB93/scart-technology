export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.8,
    rotateY: 180,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
      duration: 0.6,
    },
  },
};
