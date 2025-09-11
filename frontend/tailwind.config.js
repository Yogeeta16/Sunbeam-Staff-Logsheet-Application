/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light mode colors
        light: {
          // Background colors
          background: "#ffffff", // Your custom background color
          foreground: "#1b2027",
          
          // Card colors
          card: "#ffffff",
          "card-foreground": "#1b2027",
          
          // Popover colors
          popover: "#ffffff",
          "popover-foreground": "#1b2027",
          
          // Brand colors
          primary: "#1B4F9B", // hsl(217, 91%, 25%)
          "primary-foreground": "#fafafa", // hsl(0, 0%, 98%)
          "primary-light": "#2563EB", // hsl(217, 91%, 35%)
          "primary-dark": "#0F2957", // hsl(217, 91%, 15%)
          
          secondary: "#8B9DC3", // hsl(215, 20%, 65%)
          "secondary-foreground": "#fafafa", // hsl(0, 0%, 98%)
          
          // Muted colors
          muted: "#f5f5f6", // hsl(220, 13%, 96%)
          "muted-foreground": "#64748B", // hsl(215, 25%, 45%)
          
          // Accent colors
          accent: "#22C55E", // hsl(142, 71%, 45%)
          "accent-foreground": "#fafafa", // hsl(0, 0%, 98%)
          
          // Status colors
          success: "#22C55E", // hsl(142, 71%, 45%)
          "success-foreground": "#fafafa", // hsl(0, 0%, 98%)
          "success-light": "#f0fdf4", // hsl(142, 71%, 95%)
          
          warning: "#F59E0B", // hsl(38, 92%, 50%)
          "warning-foreground": "#fafafa", // hsl(0, 0%, 98%)
          "warning-light": "#fffbeb", // hsl(38, 92%, 95%)
          
          destructive: "#EF4444", // hsl(0, 84%, 60%)
          "destructive-foreground": "#fafafa", // hsl(0, 0%, 98%)
          "destructive-light": "#fef2f2", // hsl(0, 84%, 95%)
          
          // UI elements
          border: "#e2e8f0", // hsl(220, 13%, 91%)
          input: "#e2e8f0", // hsl(220, 13%, 91%)
          ring: "#1B4F9B", // hsl(217, 91%, 25%)
          
          // Sidebar colors
          "sidebar-background": "#fafafa", // hsl(0, 0%, 98%)
          "sidebar-foreground": "#404040", // hsl(240, 5.3%, 26.1%)
          "sidebar-primary": "#1a1a1a", // hsl(240, 5.9%, 10%)
          "sidebar-primary-foreground": "#fafafa", // hsl(0, 0%, 98%)
          "sidebar-accent": "#f5f5f5", // hsl(240, 4.8%, 95.9%)
          "sidebar-accent-foreground": "#1a1a1a", // hsl(240, 5.9%, 10%)
          "sidebar-border": "#e2e8f0", // hsl(220, 13%, 91%)
          "sidebar-ring": "#3B82F6", // hsl(217.2, 91.2%, 59.8%)
        },
        
        // Dark mode colors
        dark: {
          // Background colors
          background: "#1E2A3A", // hsl(217, 19%, 13%)
          foreground: "#fafafa", // hsl(0, 0%, 98%)
          
          // Card colors
          card: "#233244", // hsl(217, 19%, 15%)
          "card-foreground": "#fafafa", // hsl(0, 0%, 98%)
          
          // Popover colors
          popover: "#233244", // hsl(217, 19%, 15%)
          "popover-foreground": "#fafafa", // hsl(0, 0%, 98%)
          
          // Brand colors
          primary: "#2563EB", // hsl(217, 91%, 35%)
          "primary-foreground": "#fafafa", // hsl(0, 0%, 98%)
          "primary-light": "#3B82F6", // hsl(217, 91%, 45%)
          "primary-dark": "#1B4F9B", // hsl(217, 91%, 25%)
          
          secondary: "#3E4651", // hsl(215, 20%, 25%)
          "secondary-foreground": "#fafafa", // hsl(0, 0%, 98%)
          
          // Muted colors
          muted: "#2A3441", // hsl(217, 19%, 20%)
          "muted-foreground": "#8B9DC3", // hsl(215, 25%, 65%)
          
          // Accent colors
          accent: "#22C55E", // hsl(142, 71%, 45%)
          "accent-foreground": "#fafafa", // hsl(0, 0%, 98%)
          
          // Status colors
          success: "#22C55E", // hsl(142, 71%, 45%)
          "success-foreground": "#fafafa", // hsl(0, 0%, 98%)
          "success-light": "#1a2e1a", // hsl(142, 71%, 20%)
          
          warning: "#F59E0B", // hsl(38, 92%, 50%)
          "warning-foreground": "#fafafa", // hsl(0, 0%, 98%)
          "warning-light": "#2d1b0a", // hsl(38, 92%, 20%)
          
          destructive: "#EF4444", // hsl(0, 84%, 60%)
          "destructive-foreground": "#fafafa", // hsl(0, 0%, 98%)
          "destructive-light": "#2d1a1a", // hsl(0, 84%, 20%)
          
          // UI elements
          border: "#3E4651", // hsl(217, 19%, 25%)
          input: "#3E4651", // hsl(217, 19%, 25%)
          ring: "#2563EB", // hsl(217, 91%, 35%)
          
          // Sidebar colors
          "sidebar-background": "#1A252F", // hsl(217, 19%, 10%)
          "sidebar-foreground": "#f2f2f2", // hsl(0, 0%, 95%)
          "sidebar-primary": "#2563EB", // hsl(217, 91%, 35%)
          "sidebar-primary-foreground": "#fafafa", // hsl(0, 0%, 98%)
          "sidebar-accent": "#2A3441", // hsl(217, 19%, 20%)
          "sidebar-accent-foreground": "#f2f2f2", // hsl(0, 0%, 95%)
          "sidebar-border": "#3E4651", // hsl(217, 19%, 25%)
          "sidebar-ring": "#2563EB", // hsl(217, 91%, 35%)
        },
        
        // Legacy color definitions for backward compatibility
        background: "#ffffff",
        foreground: "#1b2027",
        
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1b2027",
        },
        
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#1b2027",
        },
        
        primary: {
          DEFAULT: "#1B4F9B",
          foreground: "#fafafa",
          light: "#2563EB",
          dark: "#0F2957",
        },
        
        secondary: {
          DEFAULT: "#8B9DC3",
          foreground: "#fafafa",
        },
        
        muted: {
          DEFAULT: "#f5f5f6",
          foreground: "#64748B",
        },
        
        accent: {
          DEFAULT: "#22C55E",
          foreground: "#fafafa",
        },
        
        success: {
          DEFAULT: "#22C55E",
          foreground: "#fafafa",
          light: "#f0fdf4",
        },
        
        warning: {
          DEFAULT: "#F59E0B",
          foreground: "#fafafa",
          light: "#fffbeb",
        },
        
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#fafafa",
          light: "#fef2f2",
        },
        
        border: "#e2e8f0",
        input: "#e2e8f0",
        ring: "#1B4F9B",
        
        sidebar: {
          DEFAULT: "#fafafa",
          foreground: "#404040",
          primary: "#1a1a1a",
          "primary-foreground": "#fafafa",
          accent: "#f5f5f5",
          "accent-foreground": "#1a1a1a",
          border: "#e2e8f0",
          ring: "#3B82F6",
        },
      },
      
      // Border radius
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      
      // Box shadows
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 40px rgba(27, 79, 155, 0.3)',
      },
      
      // Background images (gradients)
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1B4F9B, #2563EB)',
        'gradient-success': 'linear-gradient(135deg, #22C55E, #16A34A)',
        'gradient-warning': 'linear-gradient(135deg, #F59E0B, #D97706)',
      },
      
      // Transitions
      transitionProperty: {
        'smooth': 'all',
      },
      
      // Animation duration
      transitionDuration: {
        'smooth': '300ms',
      },
      
      // Animation timing functions
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      // Keyframes for custom animations
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      
      // Custom animations
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
    },
  },
  plugins: [],
}