import lineClamp from '@tailwindcss/line-clamp';

const tailwindConfig = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    plugins: [
      lineClamp,
    ],
  };

export default tailwindConfig;