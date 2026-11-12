import { motion } from 'framer-motion';

const Loader = ({ fullScreen = false, text = 'Memuat...' }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-4 border-primary-100 border-t-primary-600"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border-4 border-gold-100 border-t-gold-400"
        />
      </div>
      {text && <p className="text-sm text-gray-500 font-medium animate-pulse">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-20">{spinner}</div>;
};

export default Loader;