/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        premium: {
          black: "#0A0A0A",
          "black-light": "#1A1A1A",
          "gray-dark": "#2A2A2A",
          "gray-medium": "#3A3A3A",
          "gray-light": "#4A4A4A",
          white: "#FFFFFF",
          "white-soft": "#F8F8F8",
          gold: "#D4AF37",
          "gold-light": "#E6C757",
          blue: "#1E40AF",
          "blue-electric": "#3B82F6",
          "blue-neon": "#06B6D4",
          red: "#DC2626",
          green: "#059669",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "cinematic-fade": {
          "0%": { opacity: "0", transform: "scale(1.1)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "text-reveal": {
          "0%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up-elegant": {
          "0%": { opacity: "0", transform: "translateY(100px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(212, 175, 55, 0.6)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "rotate-3d": {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(212, 175, 55, 0.4)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(212, 175, 55, 0.8)",
            transform: "scale(1.05)",
          },
        },
        "slide-down": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "cinematic-fade": "cinematic-fade 2s ease-out",
        "text-reveal": "text-reveal 1s ease-out",
        "slide-up-elegant": "slide-up-elegant 0.8s ease-out",
        "float-gentle": "float-gentle 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "rotate-3d": "rotate-3d 20s linear infinite",
        "scale-in": "scale-in 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.6s ease-out",
        "slide-in-left": "slide-in-left 0.6s ease-out",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "slide-down": "slide-down 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        shimmer: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
